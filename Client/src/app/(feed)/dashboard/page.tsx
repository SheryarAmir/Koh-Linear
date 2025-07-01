"use client";

import React from "react";
import KanbanBoard from "../KanbanBoard/KanbanBoard";
// import Sidebar from "../sideBar/page";
// import Topbar from "../topBar/page";

const Dashboard = () => {
  return (
    <main className="p-6">
      {/* <Sidebar/> */}
      <KanbanBoard />
      {/* <Topbar/> */}
      
      

    </main>
  );
};

export default Dashboard;