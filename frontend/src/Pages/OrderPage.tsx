import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const [foods, setFoods] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchFoods, setSearchFoods] = useState<any>(null);

  const ALL_FOODS_URL = "http://localhost:3000/food/getAllFoods";
  const SEARCH_FOODS_URL = "http://localhost:3000/food/getFoodsByTitle";

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(ALL_FOODS_URL);
      const data = await res.json();

      setFoods(data.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        SEARCH_FOODS_URL + `/${searchTerm.toLowerCase()}`
      );
      const data = await res.json();

      setSearchFoods(data.data);

      console.log(data);
    };

    if (searchTerm.length > 2) {
      fetchData();
    }
  }, [searchTerm]);

  if (!foods) {
    return (
      <div className="flex items-center justify-center w-full h-80">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <section className="text-gray-700 body-font">
        <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="text-6xl mb-4 font-medium text-gray-900">
              Start Your <br /> <span className="text-primary">Order</span> Now
            </h1>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-contain h-30 w-30 object-center float-right rounded"
              alt="hero"
              src="https://i.pinimg.com/564x/2c/d3/28/2cd3288a45254ca3f6a0251ce47b7bd4.jpg"
            />
          </div>
        </div>

        <div className="relative w-1/2 mx-auto my-10">
          <Input
            type="text"
            placeholder="search food"
            className="text-lg pr-8 h-14"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Search className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full w-5 h-5 text-muted-foreground" />
        </div>

        <div className="grid grid-cols-4 gap-5 px-5">
          {searchFoods?.map((food: any, index: number) => {
            return (
              <Card className="overflow-hidden" key={index}>
                <CardHeader className="p-0">
                  <CardTitle className="w-full">
                    <AspectRatio ratio={1 / 1}>
                      <img
                        src={food.img_url}
                        className="h-full w-full object-cover"
                      />
                    </AspectRatio>
                  </CardTitle>
                  <CardDescription className="px-3 text-lg text-black pt-2">
                    {food.title}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="p-3">
                  <div className="flex justify-between w-full items-center">
                    <p className="text-xl font-bold">$3</p>
                    <div className="flex items-center gap-2">
                      <p className="text-lg">Quality</p>
                      <Input
                        type="number"
                        min={0}
                        className="max-w-[80px] text-lg"
                        defaultValue={0}
                      />
                    </div>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      <div className="px-5 mt-5">
        <div className=" space-y-5 my-10">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl">Breakfast</AccordionTrigger>
              <AccordionContent className="grid grid-cols-4 gap-5">
                {foods.breakfast.map((food: any, index: number) => {
                  return (
                    <Card className="overflow-hidden" key={index}>
                      <CardHeader className="p-0">
                        <CardTitle className="w-full">
                          <AspectRatio ratio={1 / 1}>
                            <img
                              src={food.img_url}
                              className="h-full w-full object-cover"
                            />
                          </AspectRatio>
                        </CardTitle>
                        <CardDescription className="px-3 text-lg text-black pt-2">
                          {food.title}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="p-3">
                        <div className="flex justify-between w-full items-center">
                          <p className="text-xl font-bold">$3</p>
                          <div className="flex items-center gap-2">
                            <p className="text-lg">Quality</p>
                            <Input
                              type="number"
                              min={0}
                              className="max-w-[80px] text-lg"
                              defaultValue={0}
                            />
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl">Lunch</AccordionTrigger>
              <AccordionContent className="grid grid-cols-4 gap-5">
                {foods.lunch.map((food: any, index: number) => {
                  return (
                    <Card className="overflow-hidden" key={index}>
                      <CardHeader className="p-0">
                        <CardTitle className="w-full">
                          <AspectRatio ratio={1 / 1}>
                            <img
                              src={food.img_url}
                              className="h-full w-full object-cover"
                            />
                          </AspectRatio>
                        </CardTitle>
                        <CardDescription className="px-3 text-lg text-black pt-2">
                          {food.title}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="p-3">
                        <div className="flex justify-between w-full items-center">
                          <p className="text-xl font-bold">$3</p>
                          <div className="flex items-center gap-2">
                            <p className="text-lg">Quality</p>
                            <Input
                              type="number"
                              min={0}
                              className="max-w-[80px] text-lg"
                              defaultValue={0}
                            />
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl">Dinner</AccordionTrigger>
              <AccordionContent className="grid grid-cols-4 gap-5">
                {foods.dinner.map((food: any, index: number) => {
                  return (
                    <Card className="overflow-hidden" key={index}>
                      <CardHeader className="p-0">
                        <CardTitle className="w-full">
                          <AspectRatio ratio={1 / 1}>
                            <img
                              src={food.img_url}
                              className="h-full w-full object-cover"
                            />
                          </AspectRatio>
                        </CardTitle>
                        <CardDescription className="px-3 text-lg text-black pt-2">
                          {food.title}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="p-3">
                        <div className="flex justify-between w-full items-center">
                          <p className="text-xl font-bold">$3</p>
                          <div className="flex items-center gap-2">
                            <p className="text-lg">Quality</p>
                            <Input
                              type="number"
                              min={0}
                              className="max-w-[80px] text-lg"
                              defaultValue={0}
                            />
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="w-full mt-20 mb-10">
          <div className="space-y-5">
            <h3 className="text-2xl font-bold">Ordered</h3>

            <div className="pb-5">
              <div className="border-b-[1px] flex items-center">
                <p className="w-16 h-full  p-5 text-center">1</p>
                <p className="text-lg w-52 font-medium pl-5">Kuy teav</p>
                <p className="text-lg font-medium pl-5 ml-16">$3</p>
                <Input
                  type="number"
                  min={0}
                  className="max-w-[80px] text-lg ml-auto"
                  defaultValue={0}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <p className="font-manrope mx-10 font-semibold text-2xl leading-9 text-gray-900">
              Total
            </p>
            <p className="font-manrope font-bold text-2xl leading-9 text-gray-900">
              $300.00
            </p>
          </div>
        </div>
        <div>
          <p className="font-bold text-2xl">More info</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 items-center">
            <div className="sm:col-span-3">
              <div className="mt-2">
                <label
                  htmlFor="comment"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Location
                </label>
                <textarea
                  className="block w-full min-h-48 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                  name="bio"
                ></textarea>
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="mt-2">
                <label
                  htmlFor="comment"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Comment
                </label>
                <textarea
                  className="block w-full min-h-48 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                  name="bio"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <Button
              type="submit"
              className="rounded-full mt-10 w-1/4 text-lg py-7"
              size={"lg"}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
