import React, { Suspense, useEffect } from "react";
import DashboardComponent from "../../component/DashboardComponent";
import Title from "../../utils/Title";
const Dashboard = () => {
  Title("Ganabajao");
  // useEffect(() => {
  //   async function testApi() {
  //     const res = await fetch("http://localhost:5500/api/video");
  //     console.log(res.status);
  //     console.log(res);
  //     const data = await res.json();
  //     console.log(data);
  //   }
  //   testApi();
  // }, []);

  return (
    <div className="bg-black text-white w-full  flex">
      <Suspense fallback={<div>..loading</div>}>
        <DashboardComponent />
      </Suspense>
    </div>
  );
};

export default Dashboard;
