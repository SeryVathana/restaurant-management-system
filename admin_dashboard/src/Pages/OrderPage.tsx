import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { toCapitalize } from "@/utils/utils";
import { format } from "date-fns";
import { ListFilterIcon, MoreHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OrderPage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const [orders, setOrders] = useState([] as any[]);
  const [sort, setSort] = useState<string>("newest");

  const handleFetchOrders = () => {
    fetch("http://localhost:3000/order/getAllOrders?" + new URLSearchParams({ sort: sort ? sort : "" }), {
      headers: { Authorization: `Bearer ${auth.token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.code == 200) setOrders(data.data);
      });
  };

  useEffect(() => {
    handleFetchOrders();
  }, []);

  useEffect(() => {
    handleFetchOrders();
  }, [sort]);

  return (
    <main className="grid flex-1 items-start gap-4">
      <div className="flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="gap-1" variant="outline">
              <ListFilterIcon className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={sort == ""} onClick={() => setSort("")}>
              None
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={sort == "newest"} onClick={() => setSort("newest")}>
              Newest
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={sort == "oldest"} onClick={() => setSort("oldest")}>
              Oldest
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader className="py-4">
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">No</span>
                </TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Customer Email</TableHead>
                <TableHead className="hidden md:table-cell text-center">Food Qty</TableHead>
                <TableHead className="hidden md:table-cell text-center">Total Price</TableHead>
                <TableHead className="hidden md:table-cell text-center">Order Status</TableHead>
                <TableHead className="hidden md:table-cell">Created at</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((order, index) => {
                return (
                  <TableRow className="" key={index}>
                    <TableCell className="hidden sm:table-cell">{index + 1}</TableCell>
                    <TableCell className="font-medium">{order?.user_fullname}</TableCell>
                    <TableCell className="font-medium">{order?.user_email}</TableCell>
                    <TableCell className="hidden md:table-cell text-center">{order?.total_foods}</TableCell>
                    <TableCell className="hidden md:table-cell text-center">${order?.total_price?.toFixed(2)}</TableCell>
                    <TableCell
                      className={cn(
                        "hidden md:table-cell text-center",
                        order?.order_status == "pending"
                          ? "text-yellow-500"
                          : order?.order_status == "completed"
                          ? "text-green-500"
                          : "text-orange-500"
                      )}
                    >
                      {order.order_status}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{format(new Date(order?.created_at), "Pp")}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" className="p-0" variant="ghost">
                            <MoreHorizontalIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <OrderDetailsBtn order_id={order._id} />
                          <ChangeStatusBtn order_id={order._id} handleFetchOrders={handleFetchOrders} />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing
            <strong> 1-10</strong> of <strong>32</strong> users
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

const OrderDetailsBtn = ({ order_id }: { order_id: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-sm w-full text-left justify-start p-2" variant="ghost" size="sm">
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-sm">
        <DialogHeader>
          <DialogTitle>Order Detail</DialogTitle>
          <OrderDetails order_id={order_id} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const ChangeStatusBtn = ({ order_id, handleFetchOrders }: { order_id: string; handleFetchOrders: Function }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-sm w-full text-left justify-start p-2" variant="ghost" size="sm">
          Edit Status
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-sm">
        <DialogHeader>
          <DialogTitle>Update order status</DialogTitle>
          <UpdateDetails order_id={order_id} handleFetchOrders={handleFetchOrders} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const OrderDetails = ({ order_id }: { order_id: string }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const [detail, setDetail] = useState({} as any);
  useEffect(() => {
    fetch(`http://localhost:3000/order/getOrderById/${order_id}`, { headers: { Authorization: `Bearer ${auth.token}` } })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.code == 200) setDetail(data.data);
      });
  }, [order_id]);
  return (
    <>
      <div className="py-5 text-sm">
        <p>
          Customer Name: <span className="font-semibold">{detail?.user_fullname}</span>
        </p>
        <p>
          Customer Email: <span className="font-semibold">{detail?.user_email}</span>
        </p>
        <p>
          Total Foods: <span className="font-semibold">{detail?.total_foods}</span>
        </p>
        <p>
          Total Prices: <span className="font-semibold">${detail?.total_price}</span>
        </p>
        <p>
          Order Status: <span className="font-semibold">{detail?.order_status}</span>
        </p>
        <p>
          Order date: <span className="font-semibold">{format(new Date(), "Pp")}</span>
        </p>
      </div>
      <div className="pb-5">
        <p className="text-sm font-semibold mb-2">Ordered food</p>
        <div className="border-b-[1px] w-full grid grid-cols-7 items-center bg-gray-50 px-5 py-2">
          <p className="text-sm font-medium col-span-1"></p>
          <p className="text-sm font-medium col-span-3">Food</p>
          <p className="text-sm font-medium col-span-1">Price</p>
          <p className="text-sm font-medium col-span-1">Qty</p>
          <p className="text-sm font-medium col-span-1">Total Price</p>
        </div>
        {detail?.foods?.map((food, index: number) => {
          return (
            <div className="border-b-[1px] w-full grid grid-cols-7 items-center bg-gray-50 px-5 py-1" key={index}>
              <div className="col-span-1 w-10 h-10 overflow-hidden">
                <img src={food?.img_url} className="object-cover object-center" alt="" />
              </div>
              <p className="text-sm font-medium col-span-3">{food?.title}</p>
              <p className="text-sm font-medium col-span-1">${food?.price.toFixed(2)}</p>
              <p className="text-sm font-medium col-span-1">{food?.quantity}</p>
              <p className="text-sm font-medium col-span-1">${(food?.quantity * food?.price).toFixed(2)}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

const UpdateDetails = ({ order_id, handleFetchOrders }: { order_id: string; handleFetchOrders: Function }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const [detail, setDetail] = useState({} as any);
  const [status, setStatus] = useState<string>("pending");
  useEffect(() => {
    fetch(`http://localhost:3000/order/getOrderById/${order_id}`, { headers: { Authorization: `Bearer ${auth.token}` } })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.code == 200) {
          setDetail(data.data);
          setStatus(data.data.order_status);
        }
      });
  }, [order_id]);

  const handleUpdate = (val: string) => {
    console.log("update status", val);
    fetch(`http://localhost:3000/order/updateOrderStatus/${order_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({ order_status: val }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.code == 200) {
          handleFetchOrders();
        }
      });
  };

  if (!detail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="py-5 text-sm">
        <p>
          Customer Name: <span className="font-semibold">{detail?.user_fullname}</span>
        </p>
        <p>
          Customer Email: <span className="font-semibold">{detail?.user_email}</span>
        </p>
        <p>
          Total Foods: <span className="font-semibold">{detail?.total_foods}</span>
        </p>
        <p>
          Total Prices: <span className="font-semibold">${detail?.total_price}</span>
        </p>
        <p>
          Order Status: <span className="font-semibold">{detail?.order_status}</span>
        </p>
        <p>
          Order date: <span className="font-semibold">{format(new Date(), "Pp")}</span>
        </p>
      </div>
      <div className="pb-5">
        <p className="text-sm font-semibold mb-2">Edit</p>
        <div className="grid grid-cols-3 items-center">
          <Label htmlFor="order-status" className="col-span-1 text-sm">
            Order Status
          </Label>
          {detail?._id && (
            <>
              <Select
                defaultValue={status}
                onValueChange={(e) => {
                  handleUpdate(e);
                }}
              >
                <SelectTrigger id="order-status" className="col-span-2">
                  <SelectValue placeholder={toCapitalize(status)} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="delivering">Delivering</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderPage;
