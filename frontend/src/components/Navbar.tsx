import { food } from "@/Pages/OrderPage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut } from "@/redux/slice/authThunk";
import { RootState } from "@/redux/store";
import { format } from "date-fns";
import { Check, Clock9, History, MoveRight, Truck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((state: RootState) => state.auth);
  const user = auth.userData;
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(signOut());
    navigate("/");
  };

  return (
    <nav className="flex justify-between w-full my-10">
      <div className=" flex w-full items-center">
        <Link to={"/"} className="font-sans text-2xl font-medium">
          Fooddie
        </Link>

        <ul className="hidden md:flex px-4 mx-auto font-heading space-x-12 items-center">
          <li>
            <Link className="hover:underline" to="/menu">
              Menus
            </Link>
          </li>
          <li>
            <Link to="/order">
              <Button className="rounded-none bg-primary">
                Order Now <MoveRight className="ml-2 mt-[2px] w-5" />
              </Button>
            </Link>
          </li>
        </ul>
        {user.email ? (
          <div className="flex gap-5">
            <OrderHistory />
            <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
              <SheetTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="">{String(user.first_name).toUpperCase() + " " + String(user.last_name).toUpperCase()}</SheetTitle>
                  <SheetTitle className="text-sm text-muted-foreground">{user.email}</SheetTitle>
                </SheetHeader>

                <ul className="w-full flex flex-col items-center justify-center pt-10">
                  <li className="w-full " onClick={() => setIsOpen(false)}>
                    <Button variant={"sidebar"} className="py-6" asChild>
                      <Link to={"/edit-profile"}>Edit Profile</Link>
                    </Button>
                  </li>

                  <li className="w-full">
                    <Button className="border-t-0 py-6" variant={"sidebar"} onClick={(e) => handleLogout(e)}>
                      Logout
                    </Button>
                  </li>
                </ul>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex gap-5 items-center">
            <Link to="/register">
              <Button className="ml-auto flex items-center space-x-2 gap-2 rounded-none px-5">Register</Button>
            </Link>
            <Link to="/login">
              <Button className="ml-auto flex items-center space-x-2 gap-2 rounded-none px-5" variant={"outline"}>
                Log In
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

const OrderHistory = () => {
  const [ordersLength, setOrdersLength] = useState(0);
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="p-0">
            <History className="w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent className="max-h-full overflow-auto">
          <SheetHeader>
            <SheetTitle className="">Your Orders</SheetTitle>
          </SheetHeader>

          <ul className="w-full flex flex-col items-center justify-center pt-10 px-5">
            <div className="w-full flex justify-between items-center mb-2">
              <p className="text-xs font-semibold">Total orders: {ordersLength}</p>
            </div>
          </ul>
          <OrderHistoryContent setOrdersLength={setOrdersLength} />
        </SheetContent>
      </Sheet>
    </>
  );
};

const OrderHistoryContent = ({ setOrdersLength }) => {
  const auth = useAppSelector((state: RootState) => state.auth);
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState<any>({});
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3000/order/getMyOrders", { headers: { Authorization: `Bearer ${auth.token}` } })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrders(data.data);
        setOrdersLength(data.data.length);
      });
  }, []);

  useEffect(() => {
    console.log(selectedOrderId);
    if (selectedOrderId != "") {
      fetch(`http://localhost:3000/order/getOrderById/${selectedOrderId}`, { headers: { Authorization: `Bearer ${auth.token}` } })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setOrderDetails(data.data);
        });
    }
  }, [selectedOrderId]);
  return (
    <>
      {orders?.map((order: any, index: number) => {
        return (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <Button
                className="w-full border-b h-20 flex items-center justify-between"
                variant="ghost"
                onClick={() => setSelectedOrderId(order._id)}
              >
                <div className="flex flex-col justify-center items-start gap-2">
                  <h3 className="text-md font-semibold">{format(new Date(order.created_at), "Pp")}</h3>
                  <p className="text-sm font-medium">Total: ${Number(order?.total_price).toFixed(2)}</p>
                </div>
                <div
                  className={cn(
                    "flex items-center gap-2 ml-auto",
                    order.order_status == "pending"
                      ? "text-yellow-500"
                      : order.order_status == "completed"
                      ? "text-primary"
                      : order.order_status == "delivering"
                      ? "text-orange-500"
                      : "text-red-500"
                  )}
                >
                  <p>
                    {order.order_status == "pending"
                      ? "Pending"
                      : order.order_status == "completed"
                      ? "Completed"
                      : order.order_status == "delivering"
                      ? "Delivering"
                      : "Failed"}
                  </p>
                  {order.order_status == "pending" ? (
                    <Clock9 className="w-5" />
                  ) : order.order_status == "completed" ? (
                    <Check className="w-5" />
                  ) : order.order_status == "delivering" ? (
                    <Truck className="w-5" />
                  ) : (
                    <X className="w-5" />
                  )}
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Order Detail</DialogTitle>
                <DialogDescription>
                  Order Status: <span className="font-semibold">{order.order_status.toUpperCase()}</span>
                </DialogDescription>
                <div className="py-5">
                  <p className="text-sm font-semibold mb-2">Ordered food</p>
                  <div className="border-b-[1px] w-full grid grid-cols-6 items-center bg-gray-50 px-5 py-2">
                    <p className="text-sm font-medium col-span-1"></p>
                    <p className="text-sm font-medium col-span-3">Food</p>
                    <p className="text-sm font-medium col-span-1">Price</p>
                    <p className="text-sm font-medium col-span-1">Qty</p>
                  </div>
                  {orderDetails?.foods?.map((food: food, index: number) => {
                    return (
                      <div className="border-b-[1px] w-full grid grid-cols-6 items-center bg-gray-50 px-5 py-1" key={index}>
                        <div className="col-span-1 w-10 h-10 overflow-hidden">
                          <img src={food.img_url} className="object-cover object-center" alt="" />
                        </div>
                        <p className="text-sm font-medium col-span-3">{food.title}</p>
                        <p className="text-sm font-medium col-span-1">${Number(food?.price).toFixed(2)}</p>
                        <p className="text-sm font-medium col-span-1">{food.quantity}</p>
                      </div>
                    );
                  })}
                  <p className="text-sm font-medium mt-2 w-full text-end">Total: ${orderDetails?.total_price?.toFixed(2)}</p>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );
      })}
    </>
  );
};

export default Navbar;
