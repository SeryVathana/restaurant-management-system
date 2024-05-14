import { food } from "@/Pages/OrderPage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut } from "@/redux/slice/authThunk";
import { RootState } from "@/redux/store";
import { getCart } from "@/utils/HelperFunctions";
import { Check, Clock9, History, Minus, MoveRight, Plus, Timer, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { format, formatDistance, formatRelative, set, subDays } from "date-fns";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((state: RootState) => state.auth);
  const user = auth.userData;

  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState<any>({});
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(signOut());
    navigate("/");
  };

  useEffect(() => {
    fetch("http://localhost:3000/order/getMyOrders", { headers: { Authorization: `Bearer ${auth.token}` } })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.data);
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
    <nav className="flex justify-between text-black w-full my-10">
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
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="p-0">
                  <History className="w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="">
                <SheetHeader>
                  <SheetTitle className="">Your Orders</SheetTitle>
                </SheetHeader>

                <ul className="w-full flex flex-col items-center justify-center pt-10 px-5">
                  <div className="w-full flex justify-between items-center mb-2">
                    <p className="text-xs font-semibold">Total orders: {orders.length}</p>
                  </div>
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
                              <p className="text-sm font-medium">Total: ${order.total_price.toPrecision(4)}</p>
                            </div>
                            <div
                              className={cn(
                                "flex items-center gap-2 ml-auto",
                                order.order_status == "pending"
                                  ? "text-yellow-500"
                                  : order.order_status == "completed"
                                  ? "text-primary"
                                  : "text-orange-500"
                              )}
                            >
                              <p>{order.order_status == "pending" ? "Pending" : order.order_status == "completed" ? "Completed" : "Delivering"}</p>
                              {order.order_status == "pending" ? (
                                <Clock9 className="w-5" />
                              ) : order.order_status == "completed" ? (
                                <Check className="w-5" />
                              ) : (
                                <Truck className="w-5" />
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
                                    <p className="text-sm font-medium col-span-1">${food.price}</p>
                                    <p className="text-sm font-medium col-span-1">{food.quantity}</p>
                                  </div>
                                );
                              })}
                              <p className="text-sm font-medium mt-2 w-full text-end">Total: ${orderDetails?.total_price?.toPrecision(4)}</p>
                            </div>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    );
                  })}
                </ul>
              </SheetContent>
            </Sheet>
            {/* <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="p-0">
                  <ShoppingCart className="w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="">
                <SheetHeader>
                  <SheetTitle className="">Your Food Cart</SheetTitle>
                </SheetHeader>

                <ul className="w-full flex flex-col items-center justify-center pt-10 px-5">
                  <div className="w-full flex justify-between items-center mb-2">
                    <p className="text-xs font-semibold">Selected: 1</p>
                    <Button variant="ghost" className="space-x-0 text-xs font-semibold" onClick={(e) => handleClearCart(e)}>
                      <Trash className="p-0 w-4 h-4" />
                      <p>Clear</p>
                    </Button>
                  </div>
                  {cart?.map((food: food, index: number) => {
                    return (
                      <li className="w-full border-b py-3 flex items-center" key={index}>
                        <div className="w-10 h-10 overflow-hidden flex items-center">
                          <img src={food.img_url} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col justify-center ml-3">
                          <h3 className="text-md font-semibold">{food.title}</h3>
                          <p className="text-sm font-semibold">${Number(food.price).toPrecision(3)}</p>
                        </div>
                        <div className="flex items-center gap-4 ml-auto">
                          <Button className="p-0 broder w-7 h-7" variant="outline" size="icon">
                            <Minus className="w-3 h-3" />
                          </Button>
                          <p>{food.quantity}</p>
                          <Button className="p-0 broder w-7 h-7" variant="outline" size="icon">
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="w-full p-5 flex">
                  <p className="font-semibold text-xl">
                    Total : <span>${totalPrice.toPrecision(3)}</span>
                  </p>
                </div>
                <div className="px-5 flex justify-end">
                  <Button className="">Check out</Button>
                </div>
              </SheetContent>
            </Sheet> */}
            <Sheet>
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
                  <li className="w-full bg-gray-100">
                    <Button variant={"sidebar"} className="py-6" asChild>
                      <Link to={"/"}>Edit Profile</Link>
                    </Button>
                  </li>
                  <li className="w-full bg-gray-100">
                    <Button variant={"sidebar"} className="border-t-0 py-6" asChild>
                      <Link to={"/"}>Cart</Link>
                    </Button>
                  </li>
                  <li className="w-full bg-gray-100">
                    <Button variant={"sidebar"} className="border-t-0 py-6" asChild>
                      <Link to={"/"}>Order History</Link>
                    </Button>
                  </li>
                  <li className="w-full bg-gray-100">
                    <Button
                      className="border-t-0 py-6  bg-destructive-foreground hover:bg-destructive hover:text-white"
                      variant={"sidebar"}
                      onClick={(e) => handleLogout(e)}
                    >
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

export default Navbar;
