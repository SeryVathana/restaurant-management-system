import FoodCard from "@/components/food-card-v1";
import { useEffect, useState } from "react";

const MenuPage = () => {
  const [foods, setFoods] = useState<any>(null);

  const URL = "https://restaurant-management-system-e4qi.onrender.com/food/getAllFoods?sorted=true";

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
      <h2 className="m-5 text-3xl font-bold text-gray-900 text-center">Fooddie's Menus</h2>

      <div className="space-y-20">
        <CategoryContainer foods={foods.breakfast} title={"breakfast"} />
        <CategoryContainer foods={foods.lunch} title={"lunch"} />
        <CategoryContainer foods={foods.breakfast} title={"dinner"} />
      </div>
    </>
  );
};

const CategoryContainer = ({ foods, title }: { foods: any; title: string }) => {
  return (
    <div id={title}>
      <p className="font-bold text-gray-900 text-center text-2xl underline m-8">{title?.split("")[0].toUpperCase() + title?.slice(1)}</p>
      <div className="grid grid-cols-2 gap-5">
        {foods?.map((food: any, index: number) => {
          return <FoodCard food={food} key={index} />;
        })}
      </div>
    </div>
  );
};

export default MenuPage;
