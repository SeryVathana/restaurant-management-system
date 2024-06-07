import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/redux/hooks";
import { fetchUserData } from "@/redux/slice/authThunk";
import { RootState } from "@/redux/store";
import { getToken } from "@/utils/HelperFunctions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { z } from "zod";

const passwordChangeSchema = z
  .object({
    old_password: z.string(),
    new_password: z.string().min(8, "Password must be at least 8 characters in length"),
    cf_new_password: z.string(),
  })
  .refine((data) => data.new_password === data.cf_new_password, {
    message: "Passwords don't match",
    path: ["cf_new_password"], // path of error
  });

const EditProfilePage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const [user, setUser] = useState<any | null>(null);
  const [errMsg, setErrMsg] = useState<string>("");
  const { toast } = useToast();
  const passwordForm = useForm<z.infer<typeof passwordChangeSchema>>({
    resolver: zodResolver(passwordChangeSchema),
  });

  function onSubmitPassword(values: z.infer<typeof passwordChangeSchema>) {
    setErrMsg("");
    if (values.new_password === values.old_password) {
      passwordForm.setError("new_password", { message: "New password can not be same as old password" });
      return;
    }
    if (values.new_password !== values.cf_new_password) {
      passwordForm.setError("cf_new_password", { message: "Password does not match" });
      return;
    }

    const reqBody = {
      old_password: values.old_password,
      new_password: values.new_password,
    };

    console.log(reqBody);

    fetch(`https://restaurant-management-system-e4qi.onrender.com/customer/updateCustomerPassword/${auth.userData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(reqBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message == "New Password can not be same as Old Password") {
          setErrMsg("New password can not be same as old password");
        }

        if (data.message == "Incorrect Old Password") {
          setErrMsg("Old password is incorrect");
        }

        if (data.code == 200) {
          toast({
            title: "Password Changed",
            description: "Password has been changed successfully",
            variant: "default",
          });

          passwordForm.reset();
          setErrMsg("");
          // dispatch(signOut());
          // window.location.href = "/login";
        } else {
          toast({
            title: "Error",
            description: "Wrong Password",
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error",
          description: "Wrong Password",
          variant: "destructive",
        });
      });
  }

  const [postParams] = useSearchParams("");

  const myParams = postParams.get("section");

  const handleFetchUser = async () => {
    console.log(auth);
    await fetch(`https://restaurant-management-system-e4qi.onrender.com/customer/getCustomerById/${auth.userData._id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
      });
  };

  useEffect(() => {
    handleFetchUser();
  }, [auth]);

  if (!user) {
    return <h1>Loading</h1>;
  }

  return (
    user && (
      <div className="flex w-full mb-10">
        <div className="w-1/5 hidden md:flex flex-col my-10">
          <Link to={"/edit-profile"} className={cn("font-semibold", myParams === "profile_setting" || !myParams ? "underline" : "")}>
            Profile Setting
          </Link>
        </div>

        {myParams === "profile_setting" || !myParams ? (
          <div className="md:w-4/5 lg:w-3/5  xl:w-2/5">
            <h1 className="text-xl font-bold mt-10">Profile Setting</h1>
            <Separator className="mt-3 mb-8 " />

            {user ? (
              <div className="space-y-16">
                <div>
                  <h1 className="my-5 text-lg font-semibold">General Information</h1>
                  <div className="space-y-6">
                    <div className="flex items-center gap-10">
                      <Label className="w-1/2">Email</Label>
                      <div className="w-full">
                        <p className="float-start">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-10">
                      <Label className="w-1/2">First Name</Label>
                      <div className="w-full">
                        <p className="float-start">{user.first_name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-10">
                      <Label className="w-1/2">Last Name</Label>
                      <div className="w-full">
                        <p className="float-start">{user.last_name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-10">
                      <Label className="w-1/2">Phone Number</Label>
                      <div className="w-full">
                        <p className="float-start">{user.phone_number}</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex justify-end mt-5">
                    <EditUserPfDialog user={user} handleFetchUserInfo={handleFetchUser} />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold mt-10">Credential Setting</h1>
                  <Separator className="mt-3 mb-8 " />

                  <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-2 ">
                      <FormField
                        control={passwordForm.control}
                        name="old_password"
                        render={({ field }) => (
                          <>
                            <FormItem className="flex items-center gap-10">
                              <FormLabel className="w-1/2">Old Password</FormLabel>
                              <FormControl>
                                <Input placeholder="*********" type="password" {...field} />
                              </FormControl>
                            </FormItem>
                            <div className="flex justify-end">
                              <FormMessage className="w-fit" />
                            </div>
                          </>
                        )}
                      />
                      <FormField
                        control={passwordForm.control}
                        name="new_password"
                        render={({ field }) => (
                          <>
                            <FormItem className="flex items-center gap-10">
                              <FormLabel className="w-1/2">New Password</FormLabel>
                              <FormControl>
                                <Input placeholder="*********" type="password" {...field} />
                              </FormControl>
                            </FormItem>
                            <div className="flex justify-end">
                              <FormMessage className="w-fit" />
                            </div>
                          </>
                        )}
                      />
                      <FormField
                        control={passwordForm.control}
                        name="cf_new_password"
                        render={({ field }) => (
                          <>
                            <FormItem className="flex items-center gap-10">
                              <FormLabel className="w-1/2">Confirm New Password</FormLabel>
                              <FormControl>
                                <Input placeholder="*********" type="password" {...field} />
                              </FormControl>
                            </FormItem>
                            <div className="flex justify-end">
                              <FormMessage className="w-fit" />
                            </div>
                          </>
                        )}
                      />

                      <div className="flex justify-center">{errMsg ? <p className="text-red-500">{errMsg}</p> : ""}</div>

                      <div className="w-full flex justify-end pt-5">
                        <Button type="submit">Change Password</Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    )
  );
};

const EditUserPfDialog = ({ user, handleFetchUserInfo }: { user: any; handleFetchUserInfo: Function }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const generalChangeSchema = z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    phone_number: z.string().optional(),
  });

  const generalForm = useForm<z.infer<typeof generalChangeSchema>>({
    resolver: zodResolver(generalChangeSchema),
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
    },
  });

  function onSubmitGeneral(values: z.infer<typeof generalChangeSchema>) {
    if (!values.first_name && !values.last_name && !values.phone_number) {
      return;
    }
    fetch(`https://restaurant-management-system-e4qi.onrender.com/customer/updateCustomerInfo/${auth.userData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then(() => {
        setOpen(false);
        handleFetchUserInfo();
        dispatch(fetchUserData());
      });
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button variant="default">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-screen-sm">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>

        <Form {...generalForm}>
          <form onSubmit={generalForm.handleSubmit(onSubmitGeneral)} className="space-y-4 ">
            <FormField
              control={generalForm.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="flex items-center gap-10">
                  <FormLabel className="w-1/3">First Name</FormLabel>
                  <div className="w-2/3 space-y-2">
                    <FormControl>
                      <Input placeholder="" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={generalForm.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="flex items-center gap-10">
                  <FormLabel className="w-1/3">Last Name</FormLabel>
                  <div className="w-2/3 space-y-2">
                    <FormControl>
                      <Input placeholder="" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={generalForm.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem className="flex items-center gap-10">
                  <FormLabel className="w-1/3">Phone Number</FormLabel>
                  <div className="w-2/3 space-y-2">
                    <FormControl>
                      <Input placeholder="" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <DialogTrigger asChild>
              <Button type="submit" className="float-end">
                Save Changes
              </Button>
            </DialogTrigger>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfilePage;
