import React from "react";
import Sidebar from "../../component/Sidebar";
import DashboardComponent from "../../component/DashboardComponent";
const Dashboard = () => {
  return (
    <div className="bg-black text-white w-full h-full flex">
      {/* <Sidebar /> */}
      <DashboardComponent />
    </div>
  );
};

export default Dashboard;
