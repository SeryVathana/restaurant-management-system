const FoodCard = ({ food }: { food: any }) => {
  return (
    <div className="flex flex-col overflow-hidden h-48 items-start border bg-card md:flex-row">
      <div className="flex flex-col pt-4 justify-between pl-4 leading-normal w-2/3">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight  line-clamp-1">{food.title_kh}</h5>
        <h5 className="mb-2 text-xl font-semibold tracking-tight  line-clamp-1">{food.title}</h5>
        <p className="mb-3 font-normal pr-5 line-clamp-2">{food.description}</p>
        <p className="mb-3 font-bold">${Number(food.price).toPrecision(3)}</p>
      </div>
      <div className="w-1/3 h-full">
        <img className="object-cover w-full h-full" src={food.img_url} alt="" />
      </div>
    </div>
  );
};

export default FoodCard;
