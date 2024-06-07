import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { storage } from "@/lib/firebase";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { AlertCircle, DollarSign, MoreHorizontalIcon, PlusCircleIcon, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";

type Food = {
  _id: string;
  title: string;
  title_kh: string;
  description: string;
  price: number;
  img_url: string;
  categories: string[];
  createdAt: string;
  updatedAt: string;
};

function FoodPage() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [search, setSearch] = useState<string>("");
  const [openRemoveAlert, setOpenRemoveAlert] = useState<boolean>(false);

  const handleFetchFoods = async () => {
    try {
      const res = await axios.get("http://localhost:3000/food/getAllFoods?sorted=false" + (search ? "&search=" + search : ""));
      const data = await res.data;
      console.log(data.data);
      setFoods(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveFood = (inputId: string) => {
    try {
      fetch("http://localhost:3000/food/deleteFoodById/" + inputId, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          handleFetchFoods();
          setOpenRemoveAlert(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFetchFoods();
  }, [search]);
  return (
    <main className="grid flex-1 items-start gap-4">
      <div className="flex items-center justify-between">
        <div className="w-auto flex gap-3 items-center">
          <Input type="text" placeholder="Search by name of food" className="w-[500px]" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <AddFoodDialog handleFetchFoods={handleFetchFoods} />
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
                <TableHead>Name (KH)</TableHead>
                <TableHead className="w-fit">Name (EN)</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
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
                    <TableCell className="font-medium">{food.title_kh || "..."}</TableCell>
                    <TableCell className="font-medium">{food.title || "..."}</TableCell>
                    <TableCell>{food.categories.join(", ")}</TableCell>
                    <TableCell className="hidden md:table-cell">$ {food.price.toFixed(2)}</TableCell>
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
                            <EditFoodDialog food={food} handleFetchFoods={handleFetchFoods} />
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
                                      Name: <span className="font-semibold">{food.title}</span>
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

function EditFoodDialog({ food, handleFetchFoods }: { food: Food; handleFetchFoods: Function }) {
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [tempImgURL, setTempImgURL] = useState<string>(food.img_url);
  const [title, setTitle] = useState<string>(food.title);
  const [titleKh, setTitleKh] = useState<string>(food.title_kh);
  const [description, setDescription] = useState<string>(food.description);
  const [price, setPrice] = useState<number>(food.price);
  const [categories, setCategories] = useState<string[]>(food.categories);
  const [open, setOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTitleKhChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleKh(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  const handleCategoryChange = (category: string) => {
    if (categories.includes(category)) {
      setCategories(categories.filter((c) => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  const handleEditFood = async () => {
    setErrMsg("");
    setIsError(false);

    if (!tempImgURL || !title || !description || !price || categories.length === 0) {
      setIsError(true);
      setErrMsg("Please fill in all fields.");
      return;
    }

    let imgDownloadURL = tempImgURL;

    if (uploadFile) {
      const fileName = `user-uploaded/${uploadFile} - ${new Date().getTime()}`;
      const imgs = ref(storage, fileName);
      const uploadDisplay = await uploadBytes(imgs, uploadFile);
      imgDownloadURL = await getDownloadURL(uploadDisplay.ref);
    }

    try {
      fetch("http://localhost:3000/food/updateFoodById/" + food._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          img_url: imgDownloadURL,
          title,
          title_kh: titleKh,
          description,
          price,
          categories,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (data.code != 200) {
            setIsError(true);
            setErrMsg(data.message);
            return;
          } else {
            handleFetchFoods();
            setOpen(false);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  function handleTempFileUpload(e: any) {
    setUploadFile(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setTempImgURL(url);
  }

  function handleRemoveTempImg() {
    setUploadFile(null);
    setTempImgURL("");
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
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
            <Label htmlFor="img_url">Image</Label>
            <div className=" col-span-3 h-full flex justify-center relative">
              {tempImgURL ? (
                <div className="h-64 overflow-hidden w-full border">
                  <img src={tempImgURL} alt={tempImgURL} className="w-full h-full object-contain" />
                  <Button size="icon" variant="outline" className="absolute top-2 right-2 p-0" onClick={() => handleRemoveTempImg()}>
                    <X className="w-5 text-red-500" />
                  </Button>
                </div>
              ) : (
                <div className="w-full h-64 relative bg-gray-100 flex flex-col items-center justify-center border border-dashed border-gray-200">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
                    onChange={(e) => handleTempFileUpload(e)}
                  />
                  <Upload className="my-5" />
                  <h3 className="font-medium text-xl">
                    <label htmlFor="file-upload" className="relative cursor-pointer ">
                      <span>Drag and drop</span>
                      <span className="text-indigo-600"> or browse </span>
                      <span>to upload</span>
                    </label>
                  </h3>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title">Title (EN)</Label>
            <Input id="title" value={title} onChange={handleTitleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="titleKh">Title (KH)</Label>
            <Input id="titleKh" value={titleKh} onChange={handleTitleKhChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={handleDescriptionChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price">Price</Label>
            <div className="col-span-3 relative">
              <Input id="price" className="pl-6" value={price} onChange={handlePriceChange} />
              <DollarSign className="absolute left-2 top-1/2 text-muted-foreground -translate-y-1/2 w-3.5 pt-0.5" />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Categories</Label>
            <div className="flex items-center gap-2">
              <div className="flex gap-1 items-center">
                <Checkbox id="breakfast" checked={categories.includes("breakfast")} onChange={() => handleCategoryChange("breakfast")} />
                <Label htmlFor="breakfast">Breakfast</Label>
              </div>
              <div className="flex gap-1 items-center">
                <Checkbox id="lunch" checked={categories.includes("lunch")} onChange={() => handleCategoryChange("lunch")} />
                <Label htmlFor="lunch">Lunch</Label>
              </div>
              <div className="flex gap-1 items-center">
                <Checkbox id="dinner" checked={categories.includes("dinner")} onChange={() => handleCategoryChange("dinner")} />
                <Label htmlFor="dinner">Dinner</Label>
              </div>
              <div className="flex gap-1 items-center">
                <Checkbox id="sweet" checked={categories.includes("sweet")} onChange={() => handleCategoryChange("sweet")} />
                <Label htmlFor="sweet">Sweet</Label>
              </div>
              <div className="flex gap-1 items-center">
                <Checkbox id="drink" checked={categories.includes("drink")} onChange={() => handleCategoryChange("drink")} />
                <Label htmlFor="drink">Drink</Label>
              </div>
            </div>
          </div>

          {isError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errMsg}</AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => handleEditFood()}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddFoodDialog({ handleFetchFoods }: { handleFetchFoods: Function }) {
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [tempImgURL, setTempImgURL] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [titleKh, setTitleKh] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleTitleKhChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleKh(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  const handleCategoryChange = (category: string) => {
    if (categories.includes(category)) {
      setCategories(categories.filter((c) => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  const handleAddFood = async () => {
    setErrMsg("");
    setIsError(false);

    if (!tempImgURL || !title || !description || !price || categories.length === 0) {
      setIsError(true);
      setErrMsg("Please fill in all fields.");
      return;
    }

    const fileName = `user-uploaded/${uploadFile} - ${new Date().getTime()}`;
    const imgs = ref(storage, fileName);
    const uploadDisplay = await uploadBytes(imgs, uploadFile);
    const imgDownloadURL = await getDownloadURL(uploadDisplay.ref);

    try {
      fetch("http://localhost:3000/food/createFood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          img_url: imgDownloadURL,
          title,
          title_kh: titleKh,
          description,
          price,
          categories,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code != 201) {
            setIsError(true);
            setErrMsg(data.message);
          }

          setOpen(false);
          handleFetchFoods();
        });
    } catch (err) {
      console.log(err);
    }
  };

  function handleTempFileUpload(e: any) {
    setUploadFile(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setTempImgURL(url);
  }

  function handleRemoveTempImg() {
    setUploadFile(null);
    setTempImgURL("");
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button className="gap-1">
          <PlusCircleIcon className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Food</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add food details</DialogTitle>
          <DialogDescription>Enter information about new food.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="img_url">Image</Label>
            <div className=" col-span-3 h-full flex justify-center relative">
              {tempImgURL ? (
                <div className="h-64 overflow-hidden w-full border">
                  <img src={tempImgURL} alt={tempImgURL} className="w-full h-full object-contain" />
                  <Button size="icon" variant="outline" className="absolute top-2 right-2 p-0" onClick={() => handleRemoveTempImg()}>
                    <X className="w-5 text-red-500" />
                  </Button>
                </div>
              ) : (
                <div className="w-full h-64 relative bg-gray-100 flex flex-col items-center justify-center border border-dashed border-gray-200">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
                    onChange={(e) => handleTempFileUpload(e)}
                  />
                  <Upload className="my-5" />
                  <h3 className="font-medium text-xl">
                    <label htmlFor="file-upload" className="relative cursor-pointer ">
                      <span>Drag and drop</span>
                      <span className="text-indigo-600"> or browse </span>
                      <span>to upload</span>
                    </label>
                  </h3>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={handleTitleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="titleKh">Title</Label>
            <Input id="titleKh" value={titleKh} onChange={handleTitleKhChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={handleDescriptionChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price">Price</Label>
            <div className="col-span-3 relative">
              <Input id="price" className="pl-6" value={price} onChange={handlePriceChange} />
              <DollarSign className="absolute left-2 top-1/2 text-muted-foreground -translate-y-1/2 w-3.5 pt-0.5" />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Categories</Label>
            <div className="flex gap-2">
              <div className="flex gap-1 items-center">
                <Checkbox id="breakfast" checked={categories.includes("breakfast")} onCheckedChange={() => handleCategoryChange("breakfast")} />
                <Label htmlFor="breakfast">Breakfast</Label>
              </div>
              <div className="flex gap-1 items-center">
                <Checkbox id="lunch" checked={categories.includes("lunch")} onCheckedChange={() => handleCategoryChange("lunch")} />
                <Label htmlFor="lunch">Lunch</Label>
              </div>
              <div className="flex gap-1 items-center">
                <Checkbox id="dinner" checked={categories.includes("dinner")} onCheckedChange={() => handleCategoryChange("dinner")} />
                <Label htmlFor="dinner">Dinner</Label>
              </div>
              <div className="flex gap-1 items-center">
                <Checkbox id="sweet" checked={categories.includes("sweet")} onCheckedChange={() => handleCategoryChange("sweet")} />
                <Label htmlFor="sweet">Sweet</Label>
              </div>
              <div className="flex gap-1 items-center">
                <Checkbox id="drink" checked={categories.includes("drink")} onCheckedChange={() => handleCategoryChange("drink")} />
                <Label htmlFor="drink">Drink</Label>
              </div>
            </div>
          </div>

          {isError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errMsg}</AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => handleAddFood()}>Add Food</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
