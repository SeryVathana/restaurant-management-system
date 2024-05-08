import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { DollarSign, MoreHorizontalIcon, PlusCircleIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";

type Food = {
  _id: string;
  title: string;
  description: string;
  price: number;
  img_url: string;
  categories: string[];
  createdAt: string;
  updatedAt: string;
};

function FoodPage() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [openRemoveAlert, setOpenRemoveAlert] = useState<boolean>(false);

  const getAllStaffs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/food/getAllFoods?sorted=false");
      const data = await res.data;
      console.log(data.data);
      setFoods(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleSearch = async () => {
  //   const res = await axios.get(`http://localhost:3000/food/getFoodsByTerm/${searchInput}`);
  //   const data = await res.data.data;
  //   setFoods(data);
  // };

  const handleRemoveFood = async (inputId: string) => {
    setOpenRemoveAlert(false);
    const newFoods = [...foods];
    var index = newFoods.findIndex((food) => food._id == inputId);
    newFoods.filter((food) => food._id == inputId);
    if (index !== -1) {
      newFoods.splice(index, 1);
      setFoods(newFoods);
    }
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     handleSearch();
  //   }, 1000);
  // }, [searchInput]);

  useEffect(() => {
    getAllStaffs();
  }, []);
  return (
    <main className="grid flex-1 items-start gap-4">
      <div className="flex items-center justify-between">
        <div className="w-auto flex gap-3 items-center">
          <Input type="text" placeholder="Search by name or email" className="w-[500px]" />
          <Button type="button" variant={"secondary"}>
            <Search className="w-4 mr-2" />
            Search
          </Button>
        </div>
        <Button className="gap-1">
          <PlusCircleIcon className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Food</span>
        </Button>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader className="py-4">
          <CardTitle>Foods</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">
                  <span className="sr-only">No</span>
                </TableHead>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Created at</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {foods.map((food, index) => {
                return (
                  <TableRow className="" key={food._id}>
                    <TableCell className="max-w-fit">{index + 1}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <img alt="Product image" className="aspect-square  object-cover" height="48" src={food.img_url} width="48" />
                    </TableCell>
                    <TableCell className="font-medium">{food.title}</TableCell>
                    <TableCell>{food.categories.join(", ")}</TableCell>
                    <TableCell className="hidden md:table-cell">$ {food.price.toPrecision(3)}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">Draft</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">2023-07-12 10:42 AM</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost" className="p-0">
                            <MoreHorizontalIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button className="text-sm w-full text-left justify-start p-2" variant="ghost" size="sm">
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[625px]">
                                <DialogHeader>
                                  <DialogTitle>Edit food details</DialogTitle>
                                  <DialogDescription>Enter new information about food to change it.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="img_url">Image URL</Label>
                                    <Input id="img_url" defaultValue={food.img_url} className="col-span-3" />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" defaultValue={food.title} className="col-span-3" />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea id="description" defaultValue={food.description} className="col-span-3" />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="price">Price</Label>
                                    <div className="col-span-3 relative">
                                      <Input id="price" className="pl-6" defaultValue={food.price} />
                                      <DollarSign className="absolute left-2 top-1/2 text-muted-foreground -translate-y-1/2 w-3.5 pt-0.5" />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label>Categories</Label>
                                    <div className="space-y-4">
                                      <div className="flex gap-1 items-center">
                                        <Checkbox id="breakfast" checked={food.categories.includes("breakfast")} />
                                        <Label htmlFor="breakfast">Breakfast</Label>
                                      </div>
                                      <div className="flex gap-1 items-center">
                                        <Checkbox id="lunch" checked={food.categories.includes("lunch")} />
                                        <Label htmlFor="lunch">Lunch</Label>
                                      </div>
                                      <div className="flex gap-1 items-center">
                                        <Checkbox id="dinner" checked={food.categories.includes("dinner")} />
                                        <Label htmlFor="dinner">Dinner</Label>
                                      </div>
                                      <div className="flex gap-1 items-center">
                                        <Checkbox id="sweet" checked={food.categories.includes("sweet")} />
                                        <Label htmlFor="sweet">Sweet</Label>
                                      </div>
                                      <div className="flex gap-1 items-center">
                                        <Checkbox id="drink" checked={food.categories.includes("drink")} />
                                        <Label htmlFor="drink">Drink</Label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="shift">Status</Label>
                                    <Select defaultValue="available">
                                      <SelectTrigger id="shift" className="col-span-3">
                                        <SelectValue placeholder="Select" />
                                      </SelectTrigger>
                                      <SelectContent position="popper">
                                        <SelectItem value="available">Available</SelectItem>
                                        <SelectItem value="out_of_stock">Out of stock</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit">Save Changes</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Dialog open={openRemoveAlert} onOpenChange={setOpenRemoveAlert}>
                              <DialogTrigger asChild>
                                <Button className="text-sm w-full text-left justify-start p-2" variant="ghost" size="sm">
                                  Remove
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[525px]">
                                <DialogHeader>
                                  <DialogTitle>Confirm</DialogTitle>
                                  <DialogDescription>Are you sure you want to remove food with:</DialogDescription>
                                  <div className="space-y-2">
                                    <p className="text-sm">
                                      Name: <span className="font-semibold">food name</span>
                                    </p>
                                  </div>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button type="submit" variant="secondary" onClick={() => setOpenRemoveAlert(false)}>
                                    Cancel
                                  </Button>
                                  <Button variant="destructive" onClick={() => handleRemoveFood(food._id)}>
                                    Confirm
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}

export default FoodPage;
