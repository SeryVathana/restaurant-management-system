import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { ListFilterIcon, MoreHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";

const CustomerPage = () => {
  const [openRemoveAlert, setOpenRemoveAlert] = useState<boolean>(false);
  const [customers, setCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  const fetchCustomers = async () => {
    try {
      fetch("http://localhost:3000/customer/getallcustomers?" + new URLSearchParams({ search: search ? search : "", sort: sort ? sort : "" }))
        .then((res) => res.json())
        .then((data) => setCustomers(data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCustomer = async (id: string) => {
    try {
      fetch("http://localhost:3000/customer/deletecustomerbyid/" + id, {
        method: "DELETE",
      }).then(() => {
        fetchCustomers();
        setOpenRemoveAlert(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [search, sort]);

  return (
    <main className="grid flex-1 items-start gap-4">
      <div className="flex items-center justify-between">
        <div className="w-auto flex gap-3 items-center">
          <Input type="text" placeholder="Search by name or email" className="w-[500px]" value={search} onChange={(e) => setSearch(e.target.value)} />
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
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader className="py-4">
          <CardTitle>Customers</CardTitle>
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
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell text-center">Orders</TableHead>
                <TableHead className="hidden md:table-cell">Created at</TableHead>
                <TableHead>
                  <span>Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer, index) => {
                return (
                  <TableRow className="" key={index}>
                    <TableCell className="max-w-fit">{index + 1}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <img
                        alt="Product image"
                        className="aspect-square object-cover border"
                        height="48"
                        src={"https://i.pinimg.com/564x/9f/9c/97/9f9c97b0c48c4a03270da070c7fe0bde.jpg"}
                        width="48"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{customer.first_name + " " + customer.last_name}</TableCell>
                    <TableCell className="font-medium">{customer.email}</TableCell>
                    <TableCell className="hidden md:table-cell text-center">50</TableCell>
                    <TableCell className="hidden md:table-cell">{format(new Date(customer.createdAt), "Pp")}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost" className="p-0">
                            <MoreHorizontalIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Dialog open={openRemoveAlert} onOpenChange={setOpenRemoveAlert}>
                            <DialogTrigger asChild>
                              <Button className="text-sm w-full text-left justify-start p-2" variant="ghost" size="sm">
                                Remove
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[525px]">
                              <DialogHeader>
                                <DialogTitle>Confirm</DialogTitle>
                                <>Are you sure you want to remove customer with:</>
                                <div className="space-y-2">
                                  <p className="text-sm">
                                    Name: <span className="font-semibold">{customer.first_name + " " + customer.last_name}</span>
                                  </p>
                                  <p className="text-sm">
                                    Email: <span className="font-semibold">{customer.email}</span>
                                  </p>
                                </div>
                              </DialogHeader>
                              <DialogFooter>
                                <Button type="submit" variant="secondary" onClick={() => setOpenRemoveAlert(false)}>
                                  Cancel
                                </Button>
                                <Button variant="destructive" onClick={() => deleteCustomer(customer._id)}>
                                  Confirm
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
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
            <strong> 1-10</strong> of <strong>32</strong> users
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

export default CustomerPage;
