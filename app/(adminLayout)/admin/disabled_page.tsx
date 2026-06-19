import { AdminSalesBarChart } from "@/components/AdminSalesBarChart";
// import { OrdersTable } from "@/components/AdminTable";
import AdminTopNotification from "@/components/AdminTopNotification";

const demoData = [
  { month: "January", amount: 32450 },
  { month: "February", amount: 27890 },
  { month: "March", amount: 41230 },
  { month: "April", amount: 38760 },
  { month: "May", amount: 45100 },
  { month: "June", amount: 49850 },
  { month: "July", amount: 47320 },
  { month: "August", amount: 43670 },
  { month: "September", amount: 36540 },
  { month: "October", amount: 39980 },
  { month: "November", amount: 48210 },
  { month: "December", amount: 49990 },
];

const demoTableData = [
  {
    orderId: "ORD-10003",
    productId: "P4002",
    userName: "Ratchanee Yodrak",
    date: "2023-12-31",
    paymentMethod: "AirPay",
    payment: 10610,
    status: "Shipped",
  },
  {
    orderId: "ORD-10048",
    productId: "P1004",
    userName: "Arthit Rattanakorn",
    date: "2024-01-01",
    paymentMethod: "TrueMoney Wallet",
    payment: 39720,
    status: "Pending",
  },
  {
    orderId: "ORD-10055",
    productId: "P2002",
    userName: "Mongkol Nakkaew",
    date: "2024-01-01",
    paymentMethod: "Rabbit LINE Pay",
    payment: 90800,
    status: "Cancelled",
  },
  {
    orderId: "ORD-10025",
    productId: "P1007",
    userName: "Wanida Kanjana",
    date: "2024-01-06",
    paymentMethod: "TrueMoney Wallet",
    payment: 22800,
    status: "Delivered",
  },
  {
    orderId: "ORD-10005",
    productId: "P2004",
    userName: "Sombat Wangsuwan",
    date: "2024-01-09",
    paymentMethod: "TrueMoney Wallet",
    payment: 34650,
    status: "Delivered",
  },
  {
    orderId: "ORD-10049",
    productId: "P1003",
    userName: "Patcharee Srithong",
    date: "2024-01-14",
    paymentMethod: "KBank Mobile Banking",
    payment: 10640,
    status: "Processing",
  },
  {
    orderId: "ORD-10024",
    productId: "P3002",
    userName: "Ratchanee Rattanakorn",
    date: "2024-01-18",
    paymentMethod: "AirPay",
    payment: 72010,
    status: "Delivered",
  },
  {
    orderId: "ORD-10045",
    productId: "P1003",
    userName: "Prasit Rattanakorn",
    date: "2024-01-19",
    paymentMethod: "KBank Mobile Banking",
    payment: 98650,
    status: "Processing",
  },
  {
    orderId: "ORD-10011",
    productId: "P1002",
    userName: "Ladawan Boontam",
    date: "2024-01-23",
    paymentMethod: "TrueMoney Wallet",
    payment: 81560,
    status: "Cancelled",
  },
];

export default function ShopIndexPage() {
  return (
    <div className="flex flex-col gap-5">
      <AdminTopNotification />
      <AdminSalesBarChart data={demoData} />
      {/* <OrdersTable
        tableTitle={"Recent Orders"}
        itemsPerPage={10}
        data={demoTableData}
      /> */}
    </div>
  );
}
