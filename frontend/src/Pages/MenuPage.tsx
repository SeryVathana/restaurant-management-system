import { useEffect, useState } from "react";

const MenuPage = () => {
  const [foods, setFoods] = useState<any>(null);

  const URL = "http://localhost:3000/food/getAllFoods";

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(URL);
      const data = await res.json();

      setFoods(data.data);
    };

    fetchData();
  }, []);

  if (!foods) {
    return (
      <div className="flex items-center justify-center w-full h-80">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <h2 className="m-5 text-3xl font-bold text-gray-900 text-center">
        Fooddie's Menus
      </h2>

      <div id="breakfast">
        <p className="font-bold text-gray-900 text-center text-2xl underline m-8">
          Breakfast
        </p>

        <div className="grid grid-cols-2 gap-10">
          {foods.breakfast.map((food: any, index: number) => {
            return (
              <div
                className="flex flex-col overflow-hidden h-48 items-start rounded-lg border bg-white shadow hover:bg-gray-100 md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                key={index}
              >
                <div className="flex flex-col pt-4 justify-between pl-4 leading-normal w-2/3">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {food.title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 pr-5">
                    {food.description}
                  </p>
                  <p className="mb-3 font-bold text-gray-900">
                    ${Number(food.price).toPrecision(3)}
                  </p>
                </div>
                <div className="w-1/3 h-full">
                  <img
                    className="object-cover w-full h-full"
                    src={food.img_url}
                    alt=""
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div id="lunch">
        <p className="font-bold text-gray-900 text-center text-2xl underline m-8">
          Lunch
        </p>

        <div className="grid grid-cols-2 gap-10">
          {foods.lunch.map((food: any, index: number) => {
            return (
              <div
                className="flex flex-col overflow-hidden h-48 items-start rounded-lg border bg-white shadow hover:bg-gray-100 md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                key={index}
              >
                <div className="flex flex-col pt-4 justify-between pl-4 leading-normal w-2/3">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {food.title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 pr-5">
                    {food.description}
                  </p>
                  <p className="mb-3 font-bold text-gray-900">
                    ${Number(food.price).toPrecision(3)}
                  </p>
                </div>
                <div className="w-1/3 h-full">
                  <img
                    className="object-cover w-full h-full"
                    src={food.img_url}
                    alt=""
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div id="dinner">
        <p className="font-bold text-gray-900 text-center text-2xl underline m-8">
          Dinner
        </p>

        <div className="grid grid-cols-2 gap-10">
          {foods.dinner.map((food: any, index: number) => {
            return (
              <div
                className="flex flex-col overflow-hidden h-48 items-start rounded-lg border bg-white shadow hover:bg-gray-100 md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                key={index}
              >
                <div className="flex flex-col pt-4 justify-between pl-4 leading-normal w-2/3">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {food.title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 pr-5">
                    {food.description}
                  </p>
                  <p className="mb-3 font-bold text-gray-900">
                    ${Number(food.price).toPrecision(3)}
                  </p>
                </div>
                <div className="w-1/3 h-full">
                  <img
                    className="object-cover w-full h-full"
                    src={food.img_url}
                    alt=""
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MenuPage;
