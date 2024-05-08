import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";
import { DollarSign, MoreHorizontalIcon, PlusCircleIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { toCapitalize } from "@/utils/utils";

type Staff = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  job_title: string;
  salary: number;
  work_shift: string;
  hire_date: string;
  createdAt: string;
  updatedAt: string;
};

function StaffPage() {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [date, setDate] = useState<Date>();

  const getAllStaffs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/staff/getAllStaffs");
      const data = await res.data;
      console.log(data.data);
      setStaffs(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async () => {
    const res = await axios.get(`http://localhost:3000/staff/searchStaffs?query=${searchInput}`);
    const data = await res.data.data;
    setStaffs(data);
  };

  useEffect(() => {
    setTimeout(() => {
      handleSearch();
    }, 1000);
  }, [searchInput]);

  useEffect(() => {
    getAllStaffs();
  }, []);

  return (
    <main className="grid flex-1 items-start gap-4">
      <div className="flex items-center justify-between">
        <div className="w-auto flex gap-3 items-center relative">
          <Search className="absolute -translate-y-1/2 top-1/2 right-2 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name or email"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-[500px] pr-8"
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <PlusCircleIcon className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add New Staff </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Add new staff</DialogTitle>
              <DialogDescription>Enter information about new staff to add to list.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="first_name">First Name</Label>
                <Input id="first_name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email">Email</Label>
                <Input id="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input id="phone_number" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="job">Job</Label>
                <Select>
                  <SelectTrigger id="job" className="col-span-3">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="shift">Shift</Label>
                <Select>
                  <SelectTrigger id="shift" className="col-span-3">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="salary">Salary</Label>
                <div className="col-span-3 relative">
                  <Input id="salary" className="pl-6" defaultValue="0" />
                  <DollarSign className="absolute left-2 top-1/2 text-muted-foreground -translate-y-1/2 w-3.5 pt-0.5" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hire_date">Hire Date</Label>
                <div className="col-span-3">
                  <Popover>
                    <PopoverTrigger asChild className="w-full">
                      <Button variant={"outline"} className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add New</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader className="py-4">
          <CardTitle>Staffs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="max-w-fit">No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contacts</TableHead>
                <TableHead>Job</TableHead>
                <TableHead className="hidden md:table-cell">Shift</TableHead>
                <TableHead className="hidden md:table-cell">Salary</TableHead>
                <TableHead className="hidden md:table-cell">Hired Date</TableHead>
                <TableHead>
                  <span className="">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staffs.map((staff, index) => {
                return (
                  <TableRow className="" key={staff._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-semibold">{toCapitalize(staff.first_name) + " " + toCapitalize(staff.last_name)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <p>{staff.email}</p>
                        <p>{staff.phone_number}</p>
                      </div>
                    </TableCell>
                    <TableCell>{staff.job_title}</TableCell>
                    <TableCell className="hidden md:table-cell">{staff.work_shift}</TableCell>
                    <TableCell className="hidden md:table-cell">${staff.salary}</TableCell>
                    <TableCell className="hidden md:table-cell">{format(staff.hire_date, "PPPP")}</TableCell>
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
                                  <DialogTitle>Add new staff</DialogTitle>
                                  <DialogDescription>Enter information about new staff to add to list.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="first_name">First Name</Label>
                                    <Input id="first_name" className="col-span-3" />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="last_name">Last Name</Label>
                                    <Input id="last_name" className="col-span-3" />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" className="col-span-3" />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="phone_number">Phone Number</Label>
                                    <Input id="phone_number" className="col-span-3" />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="job">Job</Label>
                                    <Select>
                                      <SelectTrigger id="job" className="col-span-3">
                                        <SelectValue placeholder="Select" />
                                      </SelectTrigger>
                                      <SelectContent position="popper">
                                        <SelectItem value="next">Next.js</SelectItem>
                                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                                        <SelectItem value="astro">Astro</SelectItem>
                                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="shift">Shift</Label>
                                    <Select>
                                      <SelectTrigger id="shift" className="col-span-3">
                                        <SelectValue placeholder="Select" />
                                      </SelectTrigger>
                                      <SelectContent position="popper">
                                        <SelectItem value="next">Next.js</SelectItem>
                                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                                        <SelectItem value="astro">Astro</SelectItem>
                                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="salary">Salary</Label>
                                    <div className="col-span-3 relative">
                                      <Input id="salary" className="pl-6" defaultValue="0" />
                                      <DollarSign className="absolute left-2 top-1/2 text-muted-foreground -translate-y-1/2 w-3.5 pt-0.5" />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="hire_date">Hire Date</Label>
                                    <div className="col-span-3">
                                      <Popover>
                                        <PopoverTrigger asChild className="w-full">
                                          <Button
                                            variant={"outline"}
                                            className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
                                          >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                          </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                        </PopoverContent>
                                      </Popover>
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit">Add New</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button className="text-sm w-full text-left justify-start p-2" variant="ghost" size="sm">
                                  Delete
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[525px]">
                                <DialogHeader>
                                  <DialogTitle>Confirm</DialogTitle>
                                  <DialogDescription>Are you sure you want to remove staff with:</DialogDescription>
                                  <div className="space-y-2">
                                    <p className="text-sm">
                                      Name: <span className="font-semibold">{toCapitalize(staff.first_name)}</span>
                                    </p>
                                    <p className="text-sm">
                                      Email: <span className="font-semibold">{staff.email}</span>
                                    </p>
                                  </div>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button type="submit" variant="destructive">
                                    Cancel
                                  </Button>
                                  <Button type="submit">Confirm</Button>
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
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing
            <strong>1-10</strong> of <strong>32</strong>
            products
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}

export default StaffPage;
