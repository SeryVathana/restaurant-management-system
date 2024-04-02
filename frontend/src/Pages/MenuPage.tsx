const MenuPage = () => {
  return (
    <>
      <h2 className="m-5 text-3xl font-bold text-gray-900 text-center">Fooddie's Menus</h2>

      <div id="breakfast" className="mx-10">
        <p className="font-bold text-gray-900 text-center text-2xl underline m-8">Breakfast</p>

        <div className="flex flex-wrap justify-between mb-3">
          <div className="w-full md:w-1/2">
            <a
              href="#"
              className="flex flex-col items-start rounded-lg border border-gray-800 bg-white shadow hover:bg-gray-100 md:max-w-xl md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex flex-col justify-between pl-4 leading-normal w-2/3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Bay Sach Jruk</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  grilled pork marinated in a fragrant blend of soy sauce, garlic, accompanied by aromatic broken rice and a side of tangy pickled
                  vegetables.
                </p>
                <p className="mb-3 font-bold text-gray-900">$3.00</p>
              </div>
              <img
                className="h-48 w-full object-cover md:h-48 md:w-52 md:rounded-none md:rounded-e-lg"
                src="https://i.pinimg.com/564x/b3/5f/1d/b35f1d6db15515f66b717d4f81df5b3d.jpg"
                alt=""
              />
            </a>
          </div>

          <div className="w-full md:w-1/2">
            <a
              href="#"
              className="flex flex-col items-start rounded-lg border border-gray-800 bg-white shadow hover:bg-gray-100 md:max-w-xl md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex flex-col justify-between pl-4 leading-normal w-2/3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Borbor Kroeung</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  dish of simmered rice, water, chicken or pork and other ingredients to becomes thick and creamy.
                </p>
                <p className="mb-3 font-bold text-gray-900">$3.00</p>
              </div>
              <img
                className="h-48 w-full object-cover md:h-48 md:w-52 md:rounded-none md:rounded-e-lg"
                src="https://images.deliveryhero.io/image/fd-kh/Products/1129689.jpg?width=%s"
                alt=""
              />
            </a>
          </div>
        </div>

        <div className="flex flex-wrap justify-between mb-3">
          <div className="w-full md:w-1/2">
            <a
              href="#"
              className="flex flex-col items-start rounded-lg border border-gray-800 bg-white shadow hover:bg-gray-100 md:max-w-xl md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex flex-col justify-between pl-4 leading-normal w-2/3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Nom Banh Chok</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  rice noodles topped with green fish gravy and lots of fresh vegetables.
                </p>
                <p className="mb-3 font-bold text-gray-900">$3.00</p>
              </div>
              <img
                className="h-48 w-full object-cover md:h-48 md:w-52 md:rounded-none md:rounded-e-lg"
                src="https://kohsantepheap.tv/wp-content/uploads/2020/07/8Q3A0210.jpg"
                alt=""
              />
            </a>
          </div>

          <div className="w-full md:w-1/2">
            <a
              href="#"
              className="flex flex-col items-start rounded-lg border border-gray-800 bg-white shadow hover:bg-gray-100 md:max-w-xl md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex flex-col justify-between pl-4 leading-normal w-2/3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Kuy Teav</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  noodle soup with pork or beef stock and rice vermicelli and toppings including bean sprouts and green onions.
                </p>
                <p className="mb-3 font-bold text-gray-900">$3.00</p>
              </div>
              <img
                className="h-48 w-full object-cover md:h-48 md:w-52 md:rounded-none md:rounded-e-lg"
                src="https://i.pinimg.com/564x/f1/59/1a/f1591a705e641b7527a6aa7960cf7cfc.jpg"
                alt=""
              />
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2">
            <a
              href="#"
              className="flex flex-col items-start rounded-lg border border-gray-800 bg-white shadow hover:bg-gray-100 md:max-w-xl md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex flex-col justify-between pl-4 leading-normal w-2/3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Lort Cha</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  stir-fried noodle with a lot of ingredients including vegetables, meat, and soy sauce
                </p>
                <p className="mb-3 font-bold text-gray-900">$3.00</p>
              </div>
              <img
                className="h-48 w-full object-cover md:h-48 md:w-52 md:rounded-none md:rounded-e-lg"
                src="https://foodbuzz.site/api/v1/files/318C85CE-8CA3-4EAB-B8F8-81562011C6E8"
                alt=""
              />
            </a>
          </div>

          <div className="w-full md:w-1/2">
            <a
              href="#"
              className="flex flex-col items-start rounded-lg border border-gray-800 bg-white shadow hover:bg-gray-100 md:max-w-xl md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex flex-col justify-between pl-4 leading-normal w-2/3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Bay Cha</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  popular dish made by stir-frying cooked rice with vegetables and meat( beef, chicken) or seafood.
                </p>
                <p className="mb-3 font-bold text-gray-900">$3.00</p>
              </div>
              <img
                className="h-48 w-full object-cover md:h-48 md:w-52 md:rounded-none md:rounded-e-lg"
                src="https://grantourismotravels.com/wp-content/uploads/2020/06/Cambodian-Fried-Rice-Recipe-Bai-Char-Copyright-2022-Terence-Carter-Grantourismo-T.jpg"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>

      <div id="lunch" className="mx-10">
        <p className="font-bold text-gray-900 text-center text-2xl underline m-8">Lunch</p>
        <div className="flex flex-wrap justify-between mb-3">
          <div className="w-full md:w-1/2">
            <a
              href="#"
              className="flex flex-col items-start rounded-lg border border-gray-800 bg-white shadow hover:bg-gray-100 md:max-w-xl md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex flex-col justify-between pl-4 leading-normal w-2/3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Prohok Ktis</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  traditional Cambodian dish made with prahok, a fermented fish paste, combined with pork, coconut milk, and various spices.
                </p>
                <p className="mb-3 font-bold text-gray-900">$3.00</p>
              </div>
              <img
                className="h-48 w-full object-cover md:h-48 md:w-52 md:rounded-none md:rounded-e-lg"
                src="https://i.ytimg.com/vi/exvscYPkrKg/maxresdefault.jpg"
                alt=""
              />
            </a>
          </div>

          <div className="w-full md:w-1/2">
            <a
              href="#"
              className="flex flex-col items-start rounded-lg border border-gray-800 bg-white shadow hover:bg-gray-100 md:max-w-xl md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex flex-col justify-between pl-4 leading-normal w-2/3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Kaw Sach Chrouk</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  caramelized braised pork belly with boil eggs. Served with steamed rice.
                </p>
                <p className="mb-3 font-bold text-gray-900">$3.00</p>
              </div>
              <img
                className="h-48 w-full object-cover md:h-48 md:w-52 md:rounded-none md:rounded-e-lg"
                src="https://i.pinimg.com/564x/b2/1c/ee/b21ceef2c01fa6d1444a33d806d22228.jpg"
                alt=""
              />
            </a>
          </div>
        </div>

        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2">
            <a
              href="#"
              className="flex flex-col items-start rounded-lg border border-gray-800 bg-white shadow hover:bg-gray-100 md:max-w-xl md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex flex-col justify-between pl-4 leading-normal w-2/3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Samlor Machu</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Sour soup that is a combination of fish, water spinach, tamarind paste, fermented fish paste, and other ingredients.
                </p>
                <p className="mb-3 font-bold text-gray-900">$3.00</p>
              </div>
              <img
                className="h-48 w-full object-cover md:h-48 md:w-52 md:rounded-none md:rounded-e-lg"
                src="https://i.pinimg.com/564x/b5/1e/bd/b51ebd4b891142fb2a469be62507f5a8.jpg"
                alt=""
              />
            </a>
          </div>

          <div className="w-full md:w-1/2">
            <a
              href="#"
              className="flex flex-col items-start rounded-lg border border-gray-800 bg-white shadow hover:bg-gray-100 md:max-w-xl md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex flex-col justify-between pl-4 leading-normal w-2/3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Samlor Machu kroeung sach ko</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  soup dish that combines the flavors of lemongrass, galangal, and turmeric with a variety of vegetables and beef.
                </p>
                <p className="mb-3 font-bold text-gray-900">$3.00</p>
              </div>
              <img
                className="h-48 w-full object-cover md:h-48 md:w-52 md:rounded-none md:rounded-e-lg"
                src="https://soracambodia83273053.files.wordpress.com/2020/10/92.jpg?w=1024"
                alt=""
              />
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-between mb-3">
          <div className="w-full md:w-1/2">
            <a
              href="#"
              className="flex flex-col items-start rounded-lg border border-gray-800 bg-white shadow hover:bg-gray-100 md:max-w-xl md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex flex-col justify-between pl-4 leading-normal w-2/3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Chicken Sour Soup</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                </p>
                <p className="mb-3 font-bold text-gray-900">$3.00</p>
              </div>
              <img
                className="h-48 w-full object-cover md:h-48 md:w-52 md:rounded-none md:rounded-e-lg"
                src="https://jongphov.com/wp-content/uploads/2021/08/%E1%9E%9F%E1%9F%92%E1%9E%84%E1%9F%84%E1%9E%9A%E1%9E%87%E1%9F%92%E1%9E%9A%E1%9E%80%E1%9F%8B%E1%9E%9F%E1%9E%B6%E1%9E%85%E1%9F%8B%E1%9E%98%E1%9E%B6%E1%9E%93%E1%9F%8B.jpg"
                alt=""
              />
            </a>
          </div>

          <div className="w-full md:w-1/2">
            <a
              href="#"
              className="flex flex-col items-start rounded-lg border border-gray-800 bg-white shadow hover:bg-gray-100 md:max-w-xl md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex flex-col justify-between pl-4 leading-normal w-2/3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Cha Sach Ko</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  stir fried beef with vegetables, such as bell peppers, onions, carrots, baby corn with a flavorful sauce.
                </p>
                <p className="mb-3 font-bold text-gray-900">$3.00</p>
              </div>
              <img
                className="h-48 w-full object-cover md:h-48 md:w-52 md:rounded-none md:rounded-e-lg"
                src="https://i.pinimg.com/564x/94/a3/b8/94a3b8a92e195519e70f94c153cee1ae.jpg"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>

      <div id="dinner" className="mx-10">
        <p className="font-bold text-gray-900 text-center text-2xl underline m-8">Dinner</p>
        <div className="flex flex-wrap justify-between mb-3">
          <div className="w-full md:w-1/2">
            <a
              href="#"
              className="flex flex-col items-start rounded-lg border border-gray-800 bg-white shadow hover:bg-gray-100 md:max-w-xl md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex flex-col justify-between pl-4 leading-normal w-2/3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Sack Ko Ang</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Cambodian grilled beef dish. Thinly sliced beef is marinated in a mixture of ingredients.
                </p>
                <p className="mb-3 font-bold text-gray-900">$3.00</p>
              </div>
              <img
                className="h-48 w-full object-cover md:h-48 md:w-52 md:rounded-none md:rounded-e-lg"
                src="https://i.pinimg.com/564x/01/05/b0/0105b04aa1414a7e5ce0462f9ffc44bc.jpg"
                alt=""
              />
            </a>
          </div>

          <div className="w-full md:w-1/2">
            <a
              href="#"
              className="flex flex-col items-start rounded-lg border border-gray-800 bg-white shadow hover:bg-gray-100 md:max-w-xl md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex flex-col justify-between pl-4 leading-normal w-2/3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Lok Lak Sach Ko</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  stir-fried beef slices in a light brown sauce, and served with rice or green salad and pepper sauce.
                </p>
                <p className="mb-3 font-bold text-gray-900">$3.00</p>
              </div>
              <img
                className="h-48 w-full object-cover md:h-48 md:w-52 md:rounded-none md:rounded-e-lg"
                src="https://i.pinimg.com/564x/df/9c/c2/df9cc2df38720794db8d628a0c0a5d92.jpg"
                alt=""
              />
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-between mb-3">
          <div className="w-full md:w-1/2">
            <a
              href="#"
              className="flex flex-col items-start rounded-lg border border-gray-800 bg-white shadow hover:bg-gray-100 md:max-w-xl md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex flex-col justify-between pl-4 leading-normal w-2/3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Chicken Soup</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                </p>
                <p className="mb-3 font-bold text-gray-900">$3.00</p>
              </div>
              <img
                className="h-48 w-full object-cover md:h-48 md:w-52 md:rounded-none md:rounded-e-lg"
                src="https://i.pinimg.com/564x/6c/14/e4/6c14e4e2de8ccc4f24b0efec42018397.jpg"
                alt=""
              />
            </a>
          </div>

          <div className="w-full md:w-1/2">
            <a
              href="#"
              className="flex flex-col items-start rounded-lg border border-gray-800 bg-white shadow hover:bg-gray-100 md:max-w-xl md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex flex-col justify-between pl-4 leading-normal w-2/3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Trey Chean Chu Aem</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Fish fried with a sweet chili sauce and vegetables, including pineapple, tomato, bell pappers and onions.
                </p>
                <p className="mb-3 font-bold text-gray-900">$3.00</p>
              </div>
              <img
                className="h-48 w-full object-cover md:h-48 md:w-52 md:rounded-none md:rounded-e-lg"
                src="https://www.jongnhams.com/uploads/015%20224%20489/list4.jpg"
                alt=""
              />
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2">
            <a
              href="#"
              className="flex flex-col items-start rounded-lg border border-gray-800 bg-white shadow hover:bg-gray-100 md:max-w-xl md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex flex-col justify-between pl-4 leading-normal w-2/3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Plea Sach Ko</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                </p>
                <p className="mb-3 font-bold text-gray-900">$3.00</p>
              </div>
              <img
                className="h-48 w-full object-cover md:h-48 md:w-52 md:rounded-none md:rounded-e-lg"
                src="https://i.pinimg.com/564x/82/af/57/82af576437bbae93383c9ae62eab71f5.jpg"
                alt=""
              />
            </a>
          </div>

          <div className="w-full md:w-1/2">
            <a
              href="#"
              className="flex flex-col items-start rounded-lg border border-gray-800 bg-white shadow hover:bg-gray-100 md:max-w-xl md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex flex-col justify-between pl-4 leading-normal w-2/3">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Moan Dot</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                </p>
                <p className="mb-3 font-bold text-gray-900">$3.00</p>
              </div>
              <img
                className="h-48 w-full object-cover md:h-48 md:w-52 md:rounded-none md:rounded-e-lg"
                src="https://i.pinimg.com/564x/7a/cc/c1/7accc1e7e3c76131705c2864e16eb891.jpg"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuPage;
