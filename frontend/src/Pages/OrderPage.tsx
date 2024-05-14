import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut } from "@/redux/slice/authThunk";
import { updateUserCart } from "@/redux/slice/cartThunk";
import { RootState } from "@/redux/store";
import { getCart } from "@/utils/HelperFunctions";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface food {
  _id: string;
  title: string;
  quantity: string;
  price: string;
  img_url?: string;
  comment?: string;
}

const OrderPage = () => {
  const auth = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [foods, setFoods] = useState<any>(null);
  const [comments, setComments] = useState<string>("");
  const [locationURL, setLocationURL] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchFoods, setSearchFoods] = useState<any>(null);
  const [selectedFood, setSelectedFood] = useState<food[]>([]);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [isErrorInputLocation, setIsErrorInputLocation] = useState<boolean>(false);

  const { toast } = useToast();

  const ALL_FOODS_URL = "http://localhost:3000/food/getAllFoods?sorted=true";
  const SEARCH_FOODS_URL = "http://localhost:3000/food/getFoodsByTitle";

  useEffect(() => {
    const cart = getCart();

    const food = JSON.parse(cart);

    if (food) {
      setSelectedFood(food);
    }
  }, []);

  useEffect(() => {}, [selectedFood]);

  const handleSelectedFood = ({ food, value }: { food: any; value: any }) => {
    const index = selectedFood.findIndex((x) => x._id == food._id);
    if (Number(value) > 0) {
      if (index != -1) {
        setSelectedFood((foodSelected) =>
          foodSelected.map((x) => {
            if (x._id == food._id) {
              x.quantity = value;
              return x;
            } else {
              return x;
            }
          })
        );
        const curCart = JSON.stringify(selectedFood);
        dispatch(updateUserCart(curCart));
      } else {
        setSelectedFood((foodSelected) => [
          ...foodSelected,
          { _id: food._id, title: food.title, price: food.price, img_url: food.img_url, quantity: value },
        ]);
        const curCart = JSON.stringify(selectedFood);
        dispatch(updateUserCart(curCart));
      }
    } else {
      setSelectedFood((foodSelected) => foodSelected.splice(index, 1));
      const curCart = JSON.stringify(selectedFood);
      dispatch(updateUserCart(curCart));
    }
  };

  const handleCreateOrder = (e: any) => {
    e.preventDefault();

    if (!locationURL) {
      setIsErrorInputLocation(true);
      return;
    }

    const orderedFood = [];
    for (let i = 0; i < selectedFood.length; i++) {
      orderedFood.push({
        food_id: selectedFood[i]._id,
        quantity: selectedFood[i].quantity,
      });
    }

    const order = {
      foods: orderedFood,
      comment: comments,
      location_url: locationURL,
    };

    console.log(order);

    setIsOpenDialog(false);

    fetch("http://localhost:3000/order/createOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.code == 200) {
          toast({
            title: "Success!",
            description: "Your order has been placed successfully.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
          setSelectedFood([]);
          setComments("");
          setLocationURL("");
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      });
  };

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
      const res = await fetch(SEARCH_FOODS_URL + `/${searchTerm.trim().toLowerCase()}`);
      const data = await res.json();

      setSearchFoods(data.data);
    };

    if (searchTerm.length > 2) {
      fetchData();
    }
  }, [searchTerm]);

  useEffect(() => {
    fetch("http://localhost:3000/auth/checkSession", {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.code != 200) {
          dispatch(signOut());
          navigate("/login");
        }
      });
  }, [selectedFood, handleCreateOrder]);

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
        <div className="container mx-auto flex py-10 px-0 md:flex-row flex-col items-center">
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

        <div className="grid grid-cols-4 gap-5">
          {searchFoods?.map((food: any, index: number) => {
            return <FoodCard food={food} key={index} selectedFood={selectedFood} handleSelectedFood={handleSelectedFood} />;
          })}
        </div>
      </section>

      <div className="mt-5">
        <div className=" space-y-5 my-10">
          <CategoryContainer foods={foods.breakfast} title={"Breakfast"} selectedFood={selectedFood} handleSelectedFood={handleSelectedFood} />
          <CategoryContainer foods={foods.lunch} title={"Lunch"} selectedFood={selectedFood} handleSelectedFood={handleSelectedFood} />
          <CategoryContainer foods={foods.dinner} title={"Dinner"} selectedFood={selectedFood} handleSelectedFood={handleSelectedFood} />
        </div>

        <div className="w-full mt-20 mb-10">
          <div className="space-y-5">
            <h3 className="text-2xl font-bold">Ordered</h3>

            <div className="pb-5">
              {selectedFood.map((food: food, index: number) => {
                return (
                  <div className="border-b-[1px] flex items-center bg-gray-50 pr-5" key={index}>
                    <p className="w-16 h-full  p-5 text-center">{index + 1}</p>
                    <p className="text-lg w-52 font-medium pl-5">{food.title}</p>
                    <p className="text-lg font-medium pl-5 ml-16">${food.price}</p>
                    <Input
                      type="number"
                      min={0}
                      className="max-w-[80px] rounded-none  text-lg ml-auto"
                      value={food.quantity}
                      onChange={(e) => handleSelectedFood({ food, value: e.target.value })}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-end">
            <p className="font-manrope mx-10 font-semibold text-2xl leading-9 text-gray-900">Total</p>
            <p className="font-manrope font-bold text-2xl leading-9 text-gray-900">$300.00</p>
          </div>
        </div>
        <Toaster />
        <div>
          <p className="font-bold text-2xl">More info</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 items-center">
            <div className="sm:col-span-3">
              <div className="mt-2 space-y-2">
                <label htmlFor="comment" className="block text-lg font-medium leading-6 text-gray-900">
                  Location <span className="text-destructive">(*required)</span>
                </label>
                <textarea
                  defaultValue={locationURL}
                  placeholder="Enter your location URL here"
                  onChange={(e) => setLocationURL(e.target.value)}
                  className="block w-full min-h-48 rounded-none border-0 p-1.5 focus:border-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                  name="bio"
                ></textarea>
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="mt-2 space-y-2">
                <label htmlFor="comment" className="block text-lg font-medium leading-6 text-gray-900">
                  Comment
                </label>
                <textarea
                  placeholder="Enter your comment here"
                  defaultValue={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="block w-full min-h-48 rounded-none border-0 p-1.5 focus:border-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                  name="bio"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <AlertDialog
              open={isOpenDialog}
              onOpenChange={() => {
                setIsOpenDialog(!isOpenDialog);
                return !isOpenDialog;
              }}
            >
              <AlertDialogTrigger asChild>
                <Button
                  variant={"default"}
                  className="rounded-none mt-20 w-1/5 text-lg py-7"
                  size={"lg"}
                  disabled={selectedFood.length == 0 || !locationURL}
                >
                  Check out
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Check out</AlertDialogTitle>
                  <AlertDialogDescription>This action cannot be undone. This will permanently add your order to the list.</AlertDialogDescription>

                  <div className="py-5">
                    <p className="text-sm font-semibold mb-2">Ordered food</p>
                    <div className="border-b-[1px] w-full grid grid-cols-5 items-center bg-gray-50 px-5 py-2">
                      <p className="text-sm font-medium col-span-3">Food</p>
                      <p className="text-sm font-medium col-span-1">Price</p>
                      <p className="text-sm font-medium col-span-1">Qty</p>
                    </div>
                    {selectedFood.map((food: food, index: number) => {
                      return (
                        <div className="border-b-[1px] w-full grid grid-cols-5 items-center bg-gray-50 px-5 py-2" key={index}>
                          <p className="text-sm font-medium col-span-3">{food.title}</p>
                          <p className="text-sm font-medium col-span-1">${food.price}</p>
                          <p className="text-sm font-medium col-span-1">{food.quantity}</p>
                        </div>
                      );
                    })}
                    <p className="text-sm font-medium mt-2 w-full text-end">Total: $300.00</p>
                  </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={(e) => handleCreateOrder(e)}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </>
  );
};

const CategoryContainer = ({
  foods,
  title,
  selectedFood,
  handleSelectedFood,
}: {
  foods: any;
  title: string;
  selectedFood: food[];
  handleSelectedFood: Function;
}) => {
  return (
    <Accordion type="single" collapsible className="">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-xl hover:bg-gray-50">{title}</AccordionTrigger>
        <AccordionContent className="grid grid-cols-5 gap-5">
          {foods.map((food: any, index: number) => {
            return <FoodCard food={food} key={index} selectedFood={selectedFood} handleSelectedFood={handleSelectedFood} />;
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const FoodCard = ({ food, selectedFood, handleSelectedFood }: { food: food; selectedFood: food[]; handleSelectedFood: Function }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [qty, setQty] = useState<number>(0);
  useEffect(() => {
    if (selectedFood.length > 0) {
      for (let i = 0; i < selectedFood.length; i++) {
        if (selectedFood[i]._id == food._id) {
          setIsSelected(true);
          setQty(Number(selectedFood[i].quantity));
          break;
        }
      }
    } else {
      setIsSelected(false);
    }
  }, [selectedFood]);

  return (
    <Card className="overflow-hidden rounded-none shadow-none bg-gray-50">
      <CardHeader className="p-0">
        <CardTitle className="w-full">
          <AspectRatio ratio={1 / 1}>
            <img src={food.img_url} className="h-full w-full object-cover" />
          </AspectRatio>
        </CardTitle>
        <CardDescription className="px-3 text-lg text-black pt-2">{food.title}</CardDescription>
      </CardHeader>
      <CardFooter className="p-3">
        <div className="flex justify-between w-full items-center">
          <p className="text-xl font-bold">$3</p>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min={0}
              className="max-w-[80px] text-lg rounded-none"
              value={isSelected ? qty : 0}
              onChange={(e) => handleSelectedFood({ food, value: e.target.valueAsNumber })}
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderPage;
