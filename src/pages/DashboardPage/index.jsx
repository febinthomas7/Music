import React from "react";
import DashboardComponent from "../../component/DashboardComponent";
import Title from "../../utils/Title";
const Dashboard = () => {
  Title("Ganabajao");
  return (
    <div className="bg-black text-white w-full  flex">
      <DashboardComponent />
    </div>
  );
};

export default Dashboard;
