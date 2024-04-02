import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import { UserAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const Navbar = () => {
  const auth = UserAuth();

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  return (
    <nav className="flex justify-between text-black w-full my-10">
      <div className="px-4 flex w-full items-center">
        <Link to={"/"} className="font-sans text-2xl font-medium">
          Fooddie
        </Link>

        <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12 items-center">
          <li>
            <Link className="hover:underline" to="/menu">
              Menus
            </Link>
          </li>
          <li>
            <a className="hover:underline" href="#">
              About Us
            </a>
          </li>
          <li>
            <Link to="/order">
              <Button className="rounded-full" variant={"outline"}>
                Order Now
              </Button>
            </Link>
          </li>
        </ul>
        <div className="flex gap-5 items-center">
          <Link to="/login">
            <Button className="ml-auto flex items-center space-x-2  gap-2">
              <User className="w-5 h-5" />
              Log In
            </Button>
          </Link>
          <Link to="/register">
            <Button className="ml-auto flex items-center space-x-2 gap-2" variant={"secondary"}>
              <User className="w-5 h-5" />
              Register
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
