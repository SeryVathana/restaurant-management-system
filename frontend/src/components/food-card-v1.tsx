const FoodCard = ({ food }: { food: any }) => {
  return (
    <div className="flex flex-col overflow-hidden h-48 items-start border bg-gray-50 hover:bg-gray-100 md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div className="flex flex-col pt-4 justify-between pl-4 leading-normal w-2/3">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{food.title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 pr-5">{food.description}</p>
        <p className="mb-3 font-bold text-gray-900">${Number(food.price).toPrecision(3)}</p>
      </div>
      <div className="w-1/3 h-full">
        <img className="object-cover w-full h-full" src={food.img_url} alt="" />
      </div>
    </div>
  );
};

export default FoodCard;
