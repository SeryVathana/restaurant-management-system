import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { toCapitalize } from "@/utils/utils";
import axios from "axios";
import { format } from "date-fns";
import { AlertCircle, Calendar as CalendarIcon, DollarSign, ListFilterIcon, MoreHorizontalIcon, PlusCircleIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("newest");
  const [workShift, setWorkShift] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [isAlertDeletOpen, setIsAlertDeletOpen] = useState<boolean>(false);

  const handleFetchStaffs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/staff/getAllStaffs?" +
          new URLSearchParams({
            query: search ? search : "",
            sort: sort ? sort : "",
            work_shift: workShift ? workShift : "",
            job_title: jobTitle ? jobTitle : "",
          })
      );
      const data = await res.data;
      console.log(data.data);
      setStaffs(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteStaff = async (id: string) => {
    try {
      const res = await axios.delete("http://localhost:3000/staff/deleteStaffById/" + id);
      console.log(res.data);
      handleFetchStaffs();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFetchStaffs();
  }, [search, sort, workShift, jobTitle]);

  return (
    <main className="grid flex-1 items-start gap-4">
      <div className="flex items-center justify-between">
        <div className="w-auto flex gap-3 items-center">
          <div className="relative">
            <Search className="absolute -translate-y-1/2 top-1/2 right-2 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[500px] pr-8"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-1" variant="outline">
                <ListFilterIcon className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={sort == ""} onClick={() => setSort("")}>
                None
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={sort == "newest"} onClick={() => setSort("newest")}>
                Newest
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={sort == "oldest"} onClick={() => setSort("oldest")}>
                Oldest
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-1" variant="outline">
                <ListFilterIcon className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Work Shift</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={workShift == ""} onClick={() => setWorkShift("")}>
                None
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={workShift == "full-time"} onClick={() => setWorkShift("full-time")}>
                Full Time
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={workShift == "morning"} onClick={() => setWorkShift("morning")}>
                Morning
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={workShift == "afternoon"} onClick={() => setWorkShift("afternoon")}>
                Afternoon
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={workShift == "night"} onClick={() => setWorkShift("night")}>
                Night
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-1" variant="outline">
                <ListFilterIcon className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Job</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={jobTitle == ""} onClick={() => setJobTitle("")}>
                None
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={jobTitle == "manager"} onClick={() => setJobTitle("manager")}>
                Manager
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={jobTitle == "chef"} onClick={() => setJobTitle("chef")}>
                Chef
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={jobTitle == "waiter"} onClick={() => setJobTitle("waiter")}>
                Waiter
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={jobTitle == "bartender"} onClick={() => setJobTitle("bartender")}>
                Bartender
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={jobTitle == "host"} onClick={() => setJobTitle("host")}>
                Host
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={jobTitle == "busser"} onClick={() => setJobTitle("busser")}>
                Busser
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <AddStaffDialog handleFetchStaffs={handleFetchStaffs} />
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
                            {/* Edit */}
                            <EditStaffDialog staff={staff} handleFetchStaffs={handleFetchStaffs} />
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Dialog open={isAlertDeletOpen} onOpenChange={() => setIsAlertDeletOpen(!isAlertDeletOpen)}>
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
                                  <Button type="submit" variant="secondary" onClick={() => setIsAlertDeletOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button type="submit" variant="destructive" onClick={() => handleDeleteStaff(staff._id)}>
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

const EditStaffDialog = ({ staff, handleFetchStaffs }: { staff: any; handleFetchStaffs: Function }) => {
  const [firstName, setFirstName] = useState<string>(staff.first_name);
  const [lastName, setLastName] = useState<string>(staff.last_name);
  const [email, setEmail] = useState<string>(staff.email);
  const [phoneNumber, setPhoneNumber] = useState<string>(staff.phone_number);
  const [jobTitle, setJobTitle] = useState<string>(staff.job_title);
  const [workShift, setWorkShift] = useState<string>(staff.work_shift);
  const [salary, setSalary] = useState<number>(staff.salary);
  const [hireDate, setHireDate] = useState<Date>(staff.hire_date);
  const [isError, setIsError] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleEditStaff = (id: string) => {
    setIsError(false);
    setErrMsg("");

    if (!firstName || !lastName || !email || !phoneNumber || !jobTitle || !workShift || !salary || !hireDate) {
      setIsError(true);
      setErrMsg("Please fill in all fields");
      return;
    }

    try {
      fetch("http://localhost:3000/staff/updateStaffById/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: staff._id,
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_number: phoneNumber,
          job_title: jobTitle,
          work_shift: workShift,
          salary: salary,
          hire_date: hireDate,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code != 200) {
            setIsError(true);
            setErrMsg(data.message);
            return;
          }

          handleFetchStaffs();
          setIsOpen(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button className="text-sm w-full text-left justify-start p-2" variant="ghost" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit staff info</DialogTitle>
          <DialogDescription>Enter new information to change their info.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="first_name">First Name</Label>
            <Input id="first_name" className="col-span-3" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="last_name">Last Name</Label>
            <Input id="last_name" className="col-span-3" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email">Email</Label>
            <Input id="email" className="col-span-3" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input id="phone_number" className="col-span-3" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="job">Job</Label>
            <Select value={jobTitle} onValueChange={(val) => setJobTitle(val)}>
              <SelectTrigger id="job" className="col-span-3">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="chef">Chef</SelectItem>
                <SelectItem value="waiter">Waiter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="shift">Shift</Label>
            <Select value={workShift} onValueChange={(val) => setWorkShift(val)}>
              <SelectTrigger id="shift" className="col-span-3">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="morning">Morning</SelectItem>
                <SelectItem value="afternoon">Afternoon</SelectItem>
                <SelectItem value="night">Night</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="salary">Salary</Label>
            <div className="col-span-3 relative">
              <Input id="salary" className="pl-6" value={salary} onChange={(e) => setSalary(Number(e.target.value))} />
              <DollarSign className="absolute left-2 top-1/2 text-muted-foreground -translate-y-1/2 w-3.5 pt-0.5" />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hire_date">Hire Date</Label>
            <div className="col-span-3">
              <Popover>
                <PopoverTrigger asChild className="w-full">
                  <Button variant={"outline"} className={cn("justify-start text-left font-normal", !hireDate && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {hireDate ? format(hireDate, "PPP") : <span>Pick a hire date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={hireDate} onSelect={setHireDate} initialFocus />
                </PopoverContent>
              </Popover>
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
          <Button onClick={() => handleEditStaff(staff._id)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const AddStaffDialog = ({ handleFetchStaffs }: { handleFetchStaffs: Function }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [workShift, setWorkShift] = useState<string>("");
  const [salary, setSalary] = useState<number>(0);
  const [hireDate, setHireDate] = useState<Date>(new Date());
  const [isError, setIsError] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleAddNewStaff = () => {
    setIsError(false);
    setErrMsg("");

    if (!firstName || !lastName || !email || !phoneNumber || !jobTitle || !workShift || !salary) {
      setIsError(true);
      setErrMsg("Please fill in all fields");
      return;
    }

    try {
      fetch("http://localhost:3000/staff/addNewStaff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_number: phoneNumber,
          job_title: jobTitle,
          work_shift: workShift,
          salary: salary,
          hire_date: hireDate,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code != 201) {
            setIsError(true);
            setErrMsg(data.message);
            return;
          }

          handleFetchStaffs();
          setIsOpen(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
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
            <Input id="first_name" className="col-span-3" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="last_name">Last Name</Label>
            <Input id="last_name" className="col-span-3" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email">Email</Label>
            <Input id="email" className="col-span-3" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input id="phone_number" className="col-span-3" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="job">Job</Label>
            <Select value={jobTitle} onValueChange={(val) => setJobTitle(val)}>
              <SelectTrigger id="job" className="col-span-3">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="chef">Chef</SelectItem>
                <SelectItem value="waiter">Waiter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="shift">Shift</Label>
            <Select value={workShift} onValueChange={(val) => setWorkShift(val)}>
              <SelectTrigger id="shift" className="col-span-3">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="morning">Morning</SelectItem>
                <SelectItem value="afternoon">Afternoon</SelectItem>
                <SelectItem value="night">Night</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="salary">Salary</Label>
            <div className="col-span-3 relative">
              <Input id="salary" className="pl-6" value={salary} onChange={(e) => setSalary(Number(e.target.value))} />
              <DollarSign className="absolute left-2 top-1/2 text-muted-foreground -translate-y-1/2 w-3.5 pt-0.5" />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hire_date">Hire Date</Label>
            <div className="col-span-3">
              <Popover>
                <PopoverTrigger asChild className="w-full">
                  <Button variant={"outline"} className={cn("justify-start text-left font-normal", !hireDate && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {hireDate ? format(hireDate, "PPP") : <span>Pick a hire date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={hireDate} onSelect={setHireDate} initialFocus />
                </PopoverContent>
              </Popover>
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
          <Button onClick={() => handleAddNewStaff()}>Add New</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StaffPage;
