const OrderPage = () => {
  return (
    <>
      <section className="text-gray-700 body-font">
        <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Start Your Order Now</h1>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-contain h-30 w-30 object-center float-right rounded"
              alt="hero"
              src="https://i.pinimg.com/564x/2c/d3/28/2cd3288a45254ca3f6a0251ce47b7bd4.jpg"
            />
          </div>
        </div>

        <div className="flex justify-between px-5">
          <div className="relative w-1/2 mr-2">
            <input
              className="appearance-none border-2 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-gray-600 focus:border-gray-600 focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Search..."
            />
            <div className="absolute right-0 inset-y-0 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>

          <select
            id="pricingType"
            name="pricingType"
            className="w-32 md:w-40 h-10 border-2 border-gray-300 focus:outline-none focus:border-gray-600 text-gray-00 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider pr-5"
          >
            <option value="All" selected>
              All
            </option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>
      </section>

      <div className="px-5">
        <div className="relative w-full overflow-hidden">
          <input type="checkbox" className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer" />
          <div className="h-12 w-full flex items-center">
            <h1 className="text-lg font-bold font-sans text-gray-900">Breakfast</h1>
          </div>
          <div className="absolute top-3 right-3 text-black transition-transhtmlForm duration-500 rotate-0 peer-checked:rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className=" overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-100 p border border-gray-900 rounded-md shadow-sm relative">
                <input type="checkbox" className="absolute top-0 left-0 w-6 h-6 rounded-tl-md" />
                <img
                  src="https://i.pinimg.com/564x/20/1e/18/201e18f0292c0c6163f477784fb84939.jpg"
                  alt="Hot Noodle Soup (Kuy Teav)"
                  className="w-full h-64 object-cover rounded-md"
                />
                <p className="text-sm p-2">Hot Noodle Soup (Kuy Teav)</p>

                <div className="flex items-center p-2">
                  <p className="text-lg font-semibold mr-3">$3.00</p>
                  <div className="ml-auto ">
                    <label htmlFor="quantity" className="mr-4">
                      Quantity
                    </label>
                    <select
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-md  rounded-lg w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option selected>1</option>
                      <option value="id">2</option>
                      <option value="id">3</option>
                      <option value="id">4</option>
                      <option value="id">5</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p border border-gray-900 rounded-md shadow-sm relative">
                <input type="checkbox" className="absolute top-0 left-0 w-6 h-6 rounded-tl-md" />
                <img
                  src="https://i.pinimg.com/564x/44/8d/45/448d45eac11ad22e80f06227a2022d71.jpg"
                  alt="Hot Noodle Soup (Kuy Teav)"
                  className="w-full h-64 object-cover rounded-md"
                />

                <p className="text-sm p-2">Hot Noodle Soup (Kuy Teav)</p>
                <div className="flex items-center p-2">
                  <p className="text-lg font-semibold mr-3">$3.00</p>
                  <div className="ml-auto ">
                    <label htmlFor="quantity" className="mr-4">
                      Quantity
                    </label>
                    <select
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-md  rounded-lg w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option selected>1</option>
                      <option value="id">2</option>
                      <option value="id">3</option>
                      <option value="id">4</option>
                      <option value="id">5</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p border border-gray-900 rounded-md shadow-sm relative">
                <input type="checkbox" className="absolute top-0 left-0 w-6 h-6 rounded-tl-md" />
                <img
                  src="https://i.pinimg.com/564x/20/1e/18/201e18f0292c0c6163f477784fb84939.jpg"
                  alt="Hot Noodle Soup (Kuy Teav)"
                  className="w-full h-64 object-cover rounded-md"
                />
                <p className="text-sm p-2">Hot Noodle Soup (Kuy Teav)</p>

                <div className="flex items-center p-2">
                  <p className="text-lg font-semibold mr-3">$3.00</p>
                  <div className="ml-auto ">
                    <label htmlFor="quantity" className="mr-4">
                      Quantity
                    </label>
                    <select
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-md  rounded-lg w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option selected>1</option>
                      <option value="id">2</option>
                      <option value="id">3</option>
                      <option value="id">4</option>
                      <option value="id">5</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100  border border-gray-900 rounded-md shadow-sm relative">
                <input type="checkbox" className="absolute top-0 left-0 w-6 h-6 rounded-tl-md" />
                <img
                  src="https://i.pinimg.com/564x/20/1e/18/201e18f0292c0c6163f477784fb84939.jpg"
                  alt="Hot Noodle Soup (Kuy Teav)"
                  className="w-full h-64 object-cover rounded-md"
                />
                <p className="text-sm p-2">Hot Noodle Soup (Kuy Teav)</p>

                <div className="flex items-center p-2">
                  <p className="text-lg font-semibold mr-3">$3.00</p>
                  <div className="ml-auto ">
                    <label htmlFor="quantity" className="mr-4">
                      Quantity
                    </label>
                    <select
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-md  rounded-lg w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option selected>1</option>
                      <option value="id">2</option>
                      <option value="id">3</option>
                      <option value="id">4</option>
                      <option value="id">5</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <input type="checkbox" className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer" />
          <div className="h-12 w-full  flex items-center">
            <h1 className="text-lg font-bold font-sans text-gray-900">Lunch</h1>
          </div>
          <div className="absolute top-3 right-3 text-black transition-transhtmlForm duration-500 rotate-0 peer-checked:rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className=" overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-100 p border border-gray-900 rounded-md shadow-sm relative">
                <input type="checkbox" className="absolute top-0 left-0 w-6 h-6 rounded-tl-md" />
                <img
                  src="https://i.pinimg.com/564x/20/1e/18/201e18f0292c0c6163f477784fb84939.jpg"
                  alt="Hot Noodle Soup (Kuy Teav)"
                  className="w-full h-64 object-cover rounded-md"
                />
                <p className="text-sm p-2">Hot Noodle Soup (Kuy Teav)</p>

                <div className="flex items-center p-2">
                  <p className="text-lg font-semibold mr-3">$3.00</p>
                  <div className="ml-auto ">
                    <label htmlFor="quantity" className="mr-4">
                      Quantity
                    </label>
                    <select
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-md  rounded-lg w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option selected>1</option>
                      <option value="id">2</option>
                      <option value="id">3</option>
                      <option value="id">4</option>
                      <option value="id">5</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p border border-gray-900 rounded-md shadow-sm relative">
                <input type="checkbox" className="absolute top-0 left-0 w-6 h-6 rounded-tl-md" />
                <img
                  src="https://i.pinimg.com/564x/44/8d/45/448d45eac11ad22e80f06227a2022d71.jpg"
                  alt="Hot Noodle Soup (Kuy Teav)"
                  className="w-full h-64 object-cover rounded-md"
                />

                <p className="text-sm p-2">Hot Noodle Soup (Kuy Teav)</p>
                <div className="flex items-center p-2">
                  <p className="text-lg font-semibold mr-3">$3.00</p>
                  <div className="ml-auto ">
                    <label htmlFor="quantity" className="mr-4">
                      Quantity
                    </label>
                    <select
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-md  rounded-lg w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option selected>1</option>
                      <option value="id">2</option>
                      <option value="id">3</option>
                      <option value="id">4</option>
                      <option value="id">5</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p border border-gray-900 rounded-md shadow-sm relative">
                <input type="checkbox" className="absolute top-0 left-0 w-6 h-6 rounded-tl-md" />
                <img
                  src="https://i.pinimg.com/564x/20/1e/18/201e18f0292c0c6163f477784fb84939.jpg"
                  alt="Hot Noodle Soup (Kuy Teav)"
                  className="w-full h-64 object-cover rounded-md"
                />
                <p className="text-sm p-2">Hot Noodle Soup (Kuy Teav)</p>

                <div className="flex items-center p-2">
                  <p className="text-lg font-semibold mr-3">$3.00</p>
                  <div className="ml-auto ">
                    <label htmlFor="quantity" className="mr-4">
                      Quantity
                    </label>
                    <select
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-md  rounded-lg w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option selected>1</option>
                      <option value="id">2</option>
                      <option value="id">3</option>
                      <option value="id">4</option>
                      <option value="id">5</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100  border border-gray-900 rounded-md shadow-sm relative">
                <input type="checkbox" className="absolute top-0 left-0 w-6 h-6 rounded-tl-md" />
                <img
                  src="https://i.pinimg.com/564x/20/1e/18/201e18f0292c0c6163f477784fb84939.jpg"
                  alt="Hot Noodle Soup (Kuy Teav)"
                  className="w-full h-64 object-cover rounded-md"
                />
                <p className="text-sm p-2">Hot Noodle Soup (Kuy Teav)</p>

                <div className="flex items-center p-2">
                  <p className="text-lg font-semibold mr-3">$3.00</p>
                  <div className="ml-auto ">
                    <label htmlFor="quantity" className="mr-4">
                      Quantity
                    </label>
                    <select
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-md  rounded-lg w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option selected>1</option>
                      <option value="id">2</option>
                      <option value="id">3</option>
                      <option value="id">4</option>
                      <option value="id">5</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <input type="checkbox" className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer" />
          <div className="h-12 w-full  flex items-center">
            <h1 className="text-lg font-bold font-sans text-gray-900">Dinner</h1>
          </div>
          <div className="absolute top-3 right-3 text-black transition-transhtmlForm duration-500 rotate-0 peer-checked:rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className=" overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-100 p border border-gray-900 rounded-md shadow-sm relative">
                <input type="checkbox" className="absolute top-0 left-0 w-6 h-6 rounded-tl-md" />
                <img
                  src="https://i.pinimg.com/564x/20/1e/18/201e18f0292c0c6163f477784fb84939.jpg"
                  alt="Hot Noodle Soup (Kuy Teav)"
                  className="w-full h-64 object-cover rounded-md"
                />
                <p className="text-sm p-2">Hot Noodle Soup (Kuy Teav)</p>

                <div className="flex items-center p-2">
                  <p className="text-lg font-semibold mr-3">$3.00</p>
                  <div className="ml-auto ">
                    <label htmlFor="quantity" className="mr-4">
                      Quantity
                    </label>
                    <select
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-md  rounded-lg w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option selected>1</option>
                      <option value="id">2</option>
                      <option value="id">3</option>
                      <option value="id">4</option>
                      <option value="id">5</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p border border-gray-900 rounded-md shadow-sm relative">
                <input type="checkbox" className="absolute top-0 left-0 w-6 h-6 rounded-tl-md" />
                <img
                  src="https://i.pinimg.com/564x/44/8d/45/448d45eac11ad22e80f06227a2022d71.jpg"
                  alt="Hot Noodle Soup (Kuy Teav)"
                  className="w-full h-64 object-cover rounded-md"
                />

                <p className="text-sm p-2">Hot Noodle Soup (Kuy Teav)</p>
                <div className="flex items-center p-2">
                  <p className="text-lg font-semibold mr-3">$3.00</p>
                  <div className="ml-auto ">
                    <label htmlFor="quantity" className="mr-4">
                      Quantity
                    </label>
                    <select
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-md  rounded-lg w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option selected>1</option>
                      <option value="id">2</option>
                      <option value="id">3</option>
                      <option value="id">4</option>
                      <option value="id">5</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p border border-gray-900 rounded-md shadow-sm relative">
                <input type="checkbox" className="absolute top-0 left-0 w-6 h-6 rounded-tl-md" />
                <img
                  src="https://i.pinimg.com/564x/20/1e/18/201e18f0292c0c6163f477784fb84939.jpg"
                  alt="Hot Noodle Soup (Kuy Teav)"
                  className="w-full h-64 object-cover rounded-md"
                />
                <p className="text-sm p-2">Hot Noodle Soup (Kuy Teav)</p>

                <div className="flex items-center p-2">
                  <p className="text-lg font-semibold mr-3">$3.00</p>
                  <div className="ml-auto ">
                    <label htmlFor="quantity" className="mr-4">
                      Quantity
                    </label>
                    <select
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-md  rounded-lg w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option selected>1</option>
                      <option value="id">2</option>
                      <option value="id">3</option>
                      <option value="id">4</option>
                      <option value="id">5</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100  border border-gray-900 rounded-md shadow-sm relative">
                <input type="checkbox" className="absolute top-0 left-0 w-6 h-6 rounded-tl-md" />
                <img
                  src="https://i.pinimg.com/564x/20/1e/18/201e18f0292c0c6163f477784fb84939.jpg"
                  alt="Hot Noodle Soup (Kuy Teav)"
                  className="w-full h-64 object-cover rounded-md"
                />
                <p className="text-sm p-2">Hot Noodle Soup (Kuy Teav)</p>

                <div className="flex items-center p-2">
                  <p className="text-lg font-semibold mr-3">$3.00</p>
                  <div className="ml-auto ">
                    <label htmlFor="quantity" className="mr-4">
                      Quantity
                    </label>
                    <select
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-md  rounded-lg w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option selected>1</option>
                      <option value="id">2</option>
                      <option value="id">3</option>
                      <option value="id">4</option>
                      <option value="id">5</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center sm:justify-end w-full my-10 px-5">
          <div className="flex items-center justify-between">
            <p className="font-manrope mx-10 font-semibold text-2xl leading-9 text-gray-900">Total</p>
            <p className="font-manrope font-bold text-2xl leading-9 text-gray-900">$300.00</p>
          </div>
        </div>
        <div className="px-5">
          <div className="w-full font-bold text-lg">
            <p>About Costumer</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 items-center">
            <div className="sm:col-span-3">
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 "
                />
              </div>
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
            </div>

            <div className="sm:col-span-3">
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                />
              </div>
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
            </div>

            <div className="sm:col-span-3">
              <div className="mt-2">
                <input
                  type="text"
                  name="phone-number"
                  id="phone-number"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                />
              </div>
              <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
            </div>

            <div className="sm:col-span-3">
              <div className="mt-2">
                <input
                  type="text"
                  name="table-number"
                  id="table-number"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                />
              </div>
              <label htmlFor="table-number" className="block text-sm font-medium leading-6 text-gray-900">
                Table Number
              </label>
            </div>

            <div className="sm:col-span-3">
              <div className="mt-2">
                <textarea
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                  name="bio"
                ></textarea>
                <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
                  Comment
                </label>
              </div>
            </div>
            <div className="sm:col-span-3 flex justify-end">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
