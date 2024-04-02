const Navbar = () => {
  return (
    <nav className="flex justify-between text-black w-full my-10">
      <div className="px-4 xl:px-12 flex w-full items-center">
        <p className="font-sans text-2xl font-medium">Fooddie</p>

        <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
          <li>
            <a className="hover:underline" href="#">
              Menus
            </a>
          </li>
          <li>
            <a className="hover:underline" href="#">
              About Us
            </a>
          </li>
          <li>
            <a className="hover:underline border border-gray-300 px-4 py-2 rounded-3xl bg-yellow-200" href="#">
              Order Now
            </a>
          </li>
        </ul>
        <div className="ml-auto flex items-center space-x-2">
          <a href="#" className="text-blue-500 hover:text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </a>
          <ul className="ml-2 pr-4 mx-auto font-bold space-x-12 whitespace-nowrap ">
            <li>
              <a className="hover:underline" href="#">
                Log In
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
