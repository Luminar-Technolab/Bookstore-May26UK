import React from "react";
import AdminHeader from "../components/AdminHeader";
import Footer from "../../components/Footer";
import AdminSidebar from "../components/AdminSidebar";
import { FaBook, FaUsers } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Pie,
  PieChart,
} from "recharts";

function AdminDashboard() {
  // #region Sample data
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  // #region Sample data
  const data01 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  const data02 = [
    { name: "A1", value: 100 },
    { name: "A2", value: 300 },
    { name: "B1", value: 100 },
    { name: "B2", value: 80 },
    { name: "B3", value: 40 },
    { name: "B4", value: 30 },
    { name: "B5", value: 50 },
    { name: "C1", value: 100 },
    { name: "C2", value: 200 },
    { name: "D1", value: 150 },
    { name: "D2", value: 50 },
  ];
  return (
    <>
      <AdminHeader />
      <div className="md:grid grid-cols-5 gap-2">
        <div className="col-span-1">
          <AdminSidebar />
        </div>
        <div className="col-span-4 p-10">
          {/* grid cards */}
          <div className="md:grid grid-cols-3">
            {/* card 1 */}
            <div className="md:px-5 my-5 md:my-0">
              <div className="bg-orange-100 px-4 py-5 flex justify-center items-center text-5xl rounded">
                <FaBook />
                <div className="text-center ms-10 md:ms-5">
                  <h3 className="text-lg">Books</h3>
                  <h3 className="text-2xl">100+</h3>
                </div>
              </div>
            </div>
            {/* card 2 */}
            <div className="md:px-5 my-5 md:my-0">
              <div className="bg-red-100 px-4 py-5 flex justify-center items-center text-5xl rounded">
                <FaUsers />
                <div className="text-center ms-10 md:ms-5">
                  <h3 className="text-lg">Users</h3>
                  <h3 className="text-2xl">100+</h3>
                </div>
              </div>
            </div>
            {/* card 3 */}
            <div className="md:px-5 my-5 md:my-0">
              <div className="bg-yellow-100 px-4 py-5 flex justify-center items-center text-5xl rounded">
                <FaPeopleGroup />
                <div className="text-center ms-10 md:ms-5">
                  <h3 className="text-lg">Employees</h3>
                  <h3 className="text-2xl">100+</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="md:grid grid-cols-2 px-5 my-5">
            {/* bar charts */}
            <div>
              <h1 className="my-5 font-bold text-center">Book Purchase Ratio</h1>
              <ResponsiveContainer width={"100%"} height={"300"}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis width="auto" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="pv"
                    fill="#8884d8"
                    activeBar={{ fill: "pink", stroke: "blue" }}
                    radius={[10, 10, 0, 0]}
                  />
                  <Bar
                    dataKey="uv"
                    fill="#82ca9d"
                    activeBar={{ fill: "gold", stroke: "purple" }}
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
           
            {/* pie charts */}
           <div>
            <h1 className="my-5 font-bold text-center">Growth Ratio - (Yearly)</h1>
              <ResponsiveContainer width={"100%"} height={"300"}>
                <PieChart>
                  <Pie
                    data={data01}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius="50%"
                    fill="#8884d8"
                  />
                  <Pie
                    data={data02}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    fill="#82ca9d"
                    label
                  />
                </PieChart>
              </ResponsiveContainer>
           </div>
          
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminDashboard;
