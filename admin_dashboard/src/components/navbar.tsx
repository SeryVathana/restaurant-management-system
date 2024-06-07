import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut } from "@/redux/slice/authThunk";
import { RootState } from "@/redux/store";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";

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
    <nav className="flex justify-between w-full p-5">
      <div className=" flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
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
              <li className="w-full bg-gray-100" onClick={() => setIsOpen(false)}>
                <Button variant={"sidebar"} className="py-6" asChild>
                  <Link to={"/edit-profile"}>Edit Profile</Link>
                </Button>
              </li>
              <li className="w-full bg-gray-100" onClick={() => setIsOpen(false)}>
                <Button className="border-t-0 py-6" variant={"sidebar"} onClick={(e) => handleLogout(e)}>
                  Logout
                </Button>
              </li>
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
