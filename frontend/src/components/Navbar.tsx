import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut } from "@/redux/slice/authThunk";
import { RootState } from "@/redux/store";
import { getCart } from "@/utils/HelperFunctions";
import { CircleCheckBig, Minus, MoveRight, Plus, ShoppingCart, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { food } from "@/Pages/OrderPage";
import { clearUserCart } from "@/redux/slice/cartThunk";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((state: RootState) => state.auth);
  const userCart = useAppSelector((state: RootState) => state.cart);
  const user = auth.userData;

  const [cart, setCart] = useState<food[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(signOut());
    navigate("/");
  };

  const handleClearCart = (e) => {
    e.preventDefault();

    dispatch(clearUserCart());
  };

  useEffect(() => {
    const localCart = getCart();
    const jsonCart = JSON.parse(localCart);

    if (jsonCart) {
      setCart(jsonCart);

      const totalPrices = jsonCart.reduce((accumulator, currentFood) => {
        return accumulator + currentFood.price * currentFood.quantity;
      }, 0);

      setTotalPrice(totalPrices);
    }
  }, [userCart]);

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
            <Button variant="outline" size="icon" className="p-0">
              <CircleCheckBig className="w-5" />
            </Button>

            <Sheet>
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
            </Sheet>
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
