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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut } from "@/redux/slice/authThunk";
import { updateUserCart } from "@/redux/slice/cartThunk";
import { RootState } from "@/redux/store";
import { getCart, setCart } from "@/utils/HelperFunctions";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { get } from "http";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface food {
  _id: string;
  title: string;
  title_kh: string;
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
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const { toast } = useToast();

  const ALL_FOODS_URL = "http://localhost:3000/food/getAllFoods?sorted=true";
  // const SEARCH_FOODS_URL = "http://localhost:3000/food/";

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
      if (index !== -1) {
        setSelectedFood((foodSelected) => foodSelected.map((x) => (x._id === food._id ? { ...x, quantity: value } : x)));
      } else {
        setSelectedFood((foodSelected) => [
          ...foodSelected,
          { _id: food._id, title: food.title, title_kh: food.title_kh, price: food.price, img_url: food.img_url, quantity: value },
        ]);
      }
    } else {
      setSelectedFood((foodSelected) => foodSelected.filter((x) => x._id !== food._id));
    }
  };

  useEffect(() => {
    if (selectedFood.length != 0) {
      const curCart = JSON.stringify(selectedFood);
      setCart(curCart);

      //get total price
      let total = 0;
      for (let i = 0; i < selectedFood.length; i++) {
        total += Number(selectedFood[i].price) * Number(selectedFood[i].quantity);
      }
      setTotalPrice(total);
    }
  }, [selectedFood]);

  const handleCreateOrder = (e: any) => {
    e.preventDefault();

    if (!locationURL) {
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
          setSelectedFood([]);
          setComments("");
          setLocationURL("");
          setIsOpenDialog(false);
          setTotalPrice(0);
          localStorage.removeItem("cart");
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
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
      const params = new URLSearchParams({
        sort: "true",
        search: searchTerm,
      });
      const res = await fetch(`http://localhost:3000/food/getAllFoods?${params.toString()}`);
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
        if (data.code != 200) {
          dispatch(signOut());
          navigate("/login");
        }
      });
  }, [selectedFood, handleCreateOrder]);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartData = JSON.parse(cart);
      setSelectedFood(cartData);
    }
  }, []);

  const getLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position: any = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const newLocationURL = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAgpJW3GHyLvXjpVdEL_pbjYlJCcvz5Q5g&q=${position.coords.latitude},${position.coords.longitude}`;
        setLocationURL(newLocationURL);
      } catch (error) {
        console.error("Error getting location:", error);
        // Handle geolocation errors gracefully (optional)

        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  };

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
        {/* <div className="container mx-auto flex py-10 px-0 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="text-6xl mb-4 font-medium">
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
        </div> */}

        <div className="relative w-1/2 mx-auto my-10">
          <Input
            type="text"
            placeholder="Search food"
            className="text-lg pr-8 h-14 bg-primary/5"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Search className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full w-5 h-5 text-muted-foreground" />
        </div>

        <div className="grid grid-cols-5 gap-5">
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
              <div className="border-b-[1px] grid grid-cols-12 items-center text-lg font-medium">
                <p className="col-span-1 h-full  p-5 text-center"></p>
                <p className="col-span-3">Name (KH)</p>
                <p className="col-span-3">Name (EN)</p>
                <p className="col-span-2">Price</p>
                <p className="col-span-2">Total Price</p>
                <p className="col-span-1">Qty</p>
              </div>
              {selectedFood.map((food: food, index: number) => {
                return (
                  <div className="border-b-[1px] grid grid-cols-12 items-center text-md font-medium pr-2" key={index}>
                    <img src={food.img_url} className="w-14 h-14 object-cover col-span-1 m-2" />

                    <p className="col-span-3">{food.title_kh || "..."}</p>
                    <p className="col-span-3">{food.title}</p>
                    <p className="col-span-2">${Number(food.price).toFixed(2)}</p>
                    <p className="col-span-2">${(Number(food.price) * Number(food.quantity)).toFixed(2)}</p>
                    <Input
                      type="number"
                      min={0}
                      className="rounded-none text-lg"
                      value={food.quantity}
                      onChange={(e) => handleSelectedFood({ food, value: e.target.value })}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-end">
            <p className="mx-10 font-semibold text-2xl leading-9">Total</p>
            <p className="font-bold text-2xl leading-9">${totalPrice.toFixed(2)}</p>
          </div>
        </div>

        <div>
          <p className="font-bold text-2xl">More info</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 items-center">
            <div className="sm:col-span-3">
              <div className="mt-2 space-y-2">
                <label htmlFor="comment" className="block text-lg font-medium leading-6">
                  Location <span className="text-destructive">(*required)</span>
                </label>
                <div className="min-h-64">
                  {locationURL ? (
                    <iframe className="w-full min-h-64" src={locationURL} allowFullScreen />
                  ) : (
                    <div className="w-full min-h-64 flex justify-center items-center border bg-primary/5">
                      <Button onClick={() => getLocation()} variant={"secondary"} className="rounded-none text-lg py-7 " size={"lg"}>
                        Get Current Location
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="mt-2 space-y-2">
                <label htmlFor="comment" className="block text-lg font-medium leading-6">
                  Comment
                </label>
                <Textarea
                  placeholder="Enter your comment here"
                  defaultValue={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="block w-full min-h-64 rounded-none p-2 bg-primary/5"
                  name="bio"
                ></Textarea>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <Dialog
              open={isOpenDialog}
              onOpenChange={() => {
                setIsOpenDialog(!isOpenDialog);
              }}
            >
              <DialogTrigger asChild>
                <Button
                  variant={"default"}
                  className="rounded-none mt-20 text-lg py-7"
                  size={"lg"}
                  disabled={selectedFood.length == 0 || !locationURL}
                >
                  Check out
                </Button>
              </DialogTrigger>
              <DialogContent className="">
                <DialogHeader>
                  <DialogTitle>Check out</DialogTitle>
                  <DialogDescription>This action cannot be undone. This will permanently add your order to the list.</DialogDescription>
                </DialogHeader>

                <div className="py-5">
                  <p className="text-sm font-semibold mb-2">Ordered food</p>
                  <div className="border-b-[1px] w-full grid grid-cols-9 items-center py-2">
                    <p className="text-sm font-medium col-span-1"></p>
                    <p className="text-sm font-medium col-span-5">Food</p>
                    <p className="text-sm font-medium col-span-2">Price</p>
                    <p className="text-sm font-medium col-span-1">Qty</p>
                  </div>
                  {selectedFood.map((food: food, index: number) => {
                    return (
                      <div className="border-b-[1px] w-full grid grid-cols-9 items-center py-2" key={index}>
                        <div className="col-span-1 px-2">
                          <img src={food.img_url} className="text-sm font-medium col-span-1 w-10 h-10" />
                        </div>
                        <p className="text-sm font-medium col-span-5 truncate">{food.title}</p>
                        <p className="text-sm font-medium col-span-2">${Number(food.price).toFixed(2)}</p>
                        <p className="text-sm font-medium col-span-1">{food.quantity}</p>
                      </div>
                    );
                  })}
                  <p className="text-sm font-medium mt-2 w-full text-end">Total: ${totalPrice.toFixed(2)}</p>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={(e) => handleCreateOrder(e)}>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
        <AccordionTrigger className="text-xl hover:bg-primary/20">{title}</AccordionTrigger>
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
    <Card className="overflow-hidden rounded-none shadow-none bg-card flex flex-col justify-between">
      <CardHeader className="p-0">
        <CardTitle className="w-full">
          <AspectRatio ratio={1 / 1}>
            <img src={food.img_url} className="h-full w-full object-cover" />
          </AspectRatio>
        </CardTitle>
        <CardDescription className="px-3 text-lg text-black pt-2">
          <h1 className="line-clamp-1">{food.title_kh}</h1>
          <h1 className="line-clamp-1 text-sm">{food.title}</h1>
        </CardDescription>
      </CardHeader>
      <CardFooter className=" p-2 mt-2">
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
