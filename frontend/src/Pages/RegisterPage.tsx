import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
// import { register } from "@/redux/slice/authSlice";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNum, setPhoneNum] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("register: ", firstName, lastName, email, phoneNum, password);
    // dispatch(register({ email }));
  };

  return (
    <div className="flex flex-wrap items-center relative">
      <div className="absolute top-10 left-10">
        <Link to={"/"} className="text-2xl px-0 text-primary">
          Fooddie
        </Link>
      </div>
      <div className="w-full sm:w-6/12 mb-10">
        <div className="container mx-auto h-full">
          <div className="space-y-4">
            <h1 className="flex justify-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Register</h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  First Name
                </label>
                <Input
                  type="text"
                  name="first-name"
                  id="first-name"
                  placeholder="first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required={true}
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Last Name
                </label>
                <Input
                  type="text"
                  name="last-name"
                  id="last-name"
                  placeholder="last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required={true}
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Phone number
                </label>
                <Input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="085928192"
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                  required={true}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={true}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Checkbox id="term" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="term" className="text-gray-500 dark:text-gray-300">
                      Accept term and conditions
                    </label>
                  </div>
                </div>
              </div>
              <Button
                onClick={(e) => handleSubmit(e)}
                className="w-full font-medium text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign up
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Login
                </Link>
              </p>
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

export default RegisterPage;
