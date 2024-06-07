import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/redux/slice/authThunk";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const auth = useAppSelector((state: RootState) => state.auth);

  if (auth.token) {
    navigate("/");
  }

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUserLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="flex flex-wrap items-center relative min-h-[100vh]">
      <div className="absolute top-10 left-10">
        <Link to={"/"} className="text-2xl px-0 text-primary">
          Fooddie
        </Link>
      </div>
      <div className="w-full sm:w-6/12 mb-10">
        <div className="container mx-auto h-full">
          <div className="space-y-4">
            <h1 className="flex justify-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Log In</h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  required={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  required={true}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                onClick={(e) => handleUserLogin(e)}
                className="w-full font-medium rounded-none text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </Button>
            </form>
          </div>
        </div>
      </div>
      <img
        src="https://as1.ftcdn.net/v2/jpg/02/84/70/12/1000_F_284701276_eHv6Yx8dcotf71ppDOrzUcfkJTCZW9s0.jpg"
        alt="Leafs"
        className="w-full h-48 object-cover sm:h-screen sm:w-6/12"
      />
    </div>
  );
};

export default LoginPage;
