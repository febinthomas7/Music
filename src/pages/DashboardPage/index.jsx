import React, { Suspense } from "react";
import DashboardComponent from "../../component/DashboardComponent";
import Title from "../../utils/Title";
const Dashboard = () => {
  Title("Ganabajao");
  return (
    <div className="bg-black text-white w-full  flex">
      <Suspense fallback={<div>..loading</div>}>
        <DashboardComponent />
      </Suspense>
    </div>
  );
};

export default Dashboard;
