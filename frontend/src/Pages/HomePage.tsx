import { Button } from "@/components/ui/button";
import { EggFried } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="relative mx-auto">
        <div className="mx-4 py-20 lg:flex">
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-none">Main title of your landing page</h1>
            <p className="text-xl lg:text-2xl mt-6 font-light">
              Free landing page template to promote your business startup and generate leads for the offered services
            </p>
          </div>

          <div className="lg:w-1/2 ">
            <img src="https://cdn.pixabay.com/photo/2015/09/04/11/31/fish-amok-921926_1280.jpg" alt="" className="w-full h-max" />
          </div>
        </div>
      </section>

      <div className="mx-4 py-4 lg:flex">
        <div className="flex justify-start mx-4 lg:w-1/2">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2">
              <img src="https://i.pinimg.com/564x/81/8f/13/818f139c8adae48b010d9e5202348289.jpg" alt="Stand Image" className="w-full h-auto" />
            </div>
            <div className="col-span-2 grid grid-rows-2 gap-0">
              <div>
                <img
                  src="https://img.freepik.com/free-photo/spicy-fried-tubtim-fish-salad-spicy-thai-food_1150-26481.jpg?w=1060&t=st=1709894797~exp=1709895397~hmac=ab00c396cfb6a8ab14737393fa496c409f2e0bfacaa0dafd7b7b6dd8b82748c9"
                  alt="Image 2"
                  className="w-full h-auto"
                />
              </div>
              <div>
                <img src="https://cdn.pixabay.com/photo/2018/11/30/16/26/cambodia-3848087_1280.jpg" alt="Image 3" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center lg:text-right lg:w-1/2 lg:pl-8">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-none">Main title of your landing page</h1>
          <p className="text-xl lg:text-2xl mt-6 font-light">
            Free landing page template to promote your business startup and generate leads for the offered services
          </p>
        </div>
      </div>
      <section className="w-full mx-auto">
        <div className="py-20">
          <h3 className="text-center font-sans font-bold text-3xl">Our Services</h3>
        </div>
        <div className="flex justify-between items-center">
          <Button className="w-60 h-fit" variant={"ghost"} onClick={() => navigate("/menu#breakfast")}>
            <div className="flex flex-col items-center  my-5  gap-2">
              <EggFried />
              <p className="text-black font-sans font-bold text-2xl text-center">Breakfast</p>
            </div>
          </Button>
          <Button className="w-60 h-fit" variant={"ghost"} onClick={() => navigate("/menu#lunch")}>
            <div className="flex flex-col items-center  my-5  gap-2">
              <EggFried />
              <p className="text-black font-sans font-bold text-2xl text-center">Lunch</p>
            </div>
          </Button>
          <Button className="w-60 h-fit" variant={"ghost"} onClick={() => navigate("/menu#dinner")}>
            <div className="flex flex-col items-center  my-5  gap-2">
              <EggFried />
              <p className="text-black font-sans font-bold text-2xl text-center">Dinner</p>
            </div>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Homepage;
