import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { AlertCircle, MoreHorizontalIcon, PlusCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";

function AdminPage() {
  const [isAlertDeletOpen, setIsAlertDeletOpen] = useState<boolean>(false);
  const [admins, setAdmins] = useState<any[]>([]);

  function handleFetchAdmins() {
    fetch("https://restaurant-management-system-e4qi.onrender.com/auth/admin/getalladmins")
      .then((res) => res.json())
      .then((data) => setAdmins(data.data));
  }

  function handleDeleteAdmin(id: string) {
    fetch(`https://restaurant-management-system-e4qi.onrender.com/auth/admin/deleteadmin/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        handleFetchAdmins();
      });
  }

  useEffect(() => {
    handleFetchAdmins();
  }, []);
  return (
    <main className="grid flex-1 items-start gap-4">
      <div className="flex items-center justify-end">
        <AddAdminDialog handleFetchAdmins={handleFetchAdmins} />
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader className="py-4">
          <CardTitle>Admins</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Created at</TableHead>
                <TableHead>
                  <span>Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin, index) => {
                return (
                  <TableRow className="" key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      {admin.first_name} {admin.last_name}
                    </TableCell>
                    <TableCell className="font-medium">{admin.email}</TableCell>
                    <TableCell className="hidden md:table-cell">{format(new Date(admin?.createdAt), "Pp")}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost" className="p-0">
                            <MoreHorizontalIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <EditAdminDialog admin={admin} handleFetchAdmins={handleFetchAdmins} />
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
                                      Name:{" "}
                                      <span className="font-semibold">
                                        {admin.first_name} {admin.last_name}
                                      </span>
                                    </p>
                                    <p className="text-sm">
                                      Email: <span className="font-semibold">{admin.email}</span>
                                    </p>
                                  </div>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button type="submit" variant="secondary" onClick={() => setIsAlertDeletOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button type="submit" variant="destructive" onClick={() => handleDeleteAdmin(admin._id)}>
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

const EditAdminDialog = ({ admin, handleFetchAdmins }: { admin: any; handleFetchAdmins: Function }) => {
  const [firstName, setFirstName] = useState<string>(admin.first_name);
  const [lastName, setLastName] = useState<string>(admin.last_name);
  const [email, setEmail] = useState<string>(admin.email);
  const [password, setPassword] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  const handleEditAdmin = (e) => {
    e.preventDefault();

    setIsError(false);
    setErrMsg("");

    if (!firstName || !lastName || !email) {
      setIsError(true);
      setErrMsg("All fields are required, except password");
      return;
    }

    const data = { first_name: firstName, last_name: lastName, email };
    if (password) {
      data["password"] = password;
    }

    fetch(`https://restaurant-management-system-e4qi.onrender.com/auth/admin/editadmin/${admin._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.code === 200) {
          setIsOpen(false);
          handleFetchAdmins();
        } else {
          setIsError(true);
          setErrMsg(data.message);
        }
      });
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
          <DialogTitle>Edit admin</DialogTitle>
          <DialogDescription>Enter information about new admin to add to list.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="first_name">First Name</Label>
            <Input id="first_name" className="col-span-3" defaultValue={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="last_name">Last Name</Label>
            <Input id="last_name" className="col-span-3" defaultValue={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email">Email</Label>
            <Input id="email" className="col-span-3" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password">New Password</Label>
            <Input id="password" className="col-span-3" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
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
          <Button type="submit" onClick={(e) => handleEditAdmin(e)}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AddAdminDialog = ({ handleFetchAdmins }: { handleFetchAdmins: Function }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  const handleRegisterAdmin = (e) => {
    e.preventDefault();

    setIsError(false);
    setErrMsg("");

    if (!firstName || !lastName || !email || !password) {
      setIsError(true);
      setErrMsg("All fields are required");
      return;
    }

    fetch("https://restaurant-management-system-e4qi.onrender.com/auth/admin/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.code === 200) {
          setIsOpen(false);
          handleFetchAdmins();
        } else {
          setIsError(true);
          setErrMsg(data.message);
        }
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button className="gap-1">
          <PlusCircleIcon className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add New Admin </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add new admin</DialogTitle>
          <DialogDescription>Enter information about new admin to add to list.</DialogDescription>
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
            <Label htmlFor="password">Password</Label>
            <Input id="password" className="col-span-3" value={password} onChange={(e) => setPassword(e.target.value)} />
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
          <Button type="submit" onClick={(e) => handleRegisterAdmin(e)}>
            Add New
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPage;
