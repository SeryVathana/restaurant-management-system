import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Newspaper, Sparkles, User, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

type ITotal = {
  total: number;
  new: number;
};

const DashboardOverviewPage = () => {
  const [totalUsers, setTotalUsers] = useState<ITotal>({ total: 0, new: 0 });
  const [totalOrders, setTotalOrders] = useState<ITotal>({ total: 0, new: 0 });
  const [totalFoods, setTotalFoods] = useState<ITotal>({ total: 0, new: 0 });
  const [totalStaffs, setTotalStaffs] = useState<ITotal>({ total: 0, new: 0 });
  const [data, setData] = useState<any>({ labels: [], datasets: [] });
  const [newestUsers, setNewestUsers] = useState<any[]>([]);

  // Get total customers, orders, foods, staffs
  useEffect(() => {
    // Fetch total users
    fetch("http://localhost:3000/dashboard/gettotalcustomers")
      .then((res) => res.json())
      .then((data) => setTotalUsers(data.data));
    // Fetch total orders
    fetch("http://localhost:3000/dashboard/gettotalorders")
      .then((res) => res.json())
      .then((data) => setTotalOrders(data.data));
    // Fetch total foods
    fetch("http://localhost:3000/dashboard/gettotalfood")
      .then((res) => res.json())
      .then((data) => setTotalFoods(data.data));
    // Fetch total staffs
    fetch("http://localhost:3000/dashboard/gettotalstaffs")
      .then((res) => res.json())
      .then((data) => setTotalStaffs(data.data));
  }, []);

  // Get total orders for last 6 months
  useEffect(() => {
    fetch("http://localhost:3000/dashboard/gettotalorderlast6month")
      .then((res) => res.json())
      .then((data) => {
        const labels = getLastFiveMonths();
        const datasets = [
          {
            label: "Orders",
            data: labels.map((month) => data.data.find((d: any) => d.month === month.toLowerCase())?.total_orders || 0),
            backgroundColor: "rgba(64, 192, 87, 0.8)",
          },
        ];

        console.log(data.data, labels, datasets);

        setData({ labels, datasets });
      });
  }, []);

  // Get 10 newest users
  useEffect(() => {
    fetch("http://localhost:3000/dashboard/getnewestusers")
      .then((res) => res.json())
      .then((data) => setNewestUsers(data.data));
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers.total}</div>
            <p className="text-xs text-muted-foreground">+{totalUsers.new} from last month</p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders.total}</div>
            <p className="text-xs text-muted-foreground">+{totalOrders.new} from last month</p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Foods</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFoods.total}</div>
            <p className="text-xs text-muted-foreground">+{totalFoods.new} from last month</p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staffs</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStaffs.total}</div>
            <p className="text-xs text-muted-foreground">+{totalStaffs.new} since last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="xl:col-span-3" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Customer's orders</CardTitle>
              <CardDescription>Total customer's orders of last 6 months</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Bar options={options} data={data} />
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader>
            <CardTitle>New customers</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            {newestUsers.map((user, index) => (
              <div key={index} className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="https://i.pinimg.com/736x/f1/39/dc/f139dc89e5b1ad0818f612c7f33200a5.jpg" alt="Avatar" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

function getLastFiveMonths() {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const today = new Date();
  let currentMonth = today.getMonth();

  const lastFiveMonths: string[] = [];
  for (let i = 0; i < 6; i++) {
    // Handle going back to December from January
    const monthIndex = (currentMonth - i + 12) % 12;
    lastFiveMonths.push(months[monthIndex]);
  }

  return lastFiveMonths.reverse(); // Reverse to get most recent month first
}

export default DashboardOverviewPage;
