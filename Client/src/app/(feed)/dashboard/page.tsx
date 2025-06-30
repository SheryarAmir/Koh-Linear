"use client";

import React from "react";
import KanbanBoard from "../KanbanBoard/KanbanBoard";

const Dashboard = () => {
  return (
    <main className="p-6">
      <KanbanBoard />

      <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">How to use:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <strong>🖱️ Drag & Drop:</strong> Click and drag tickets between
            columns to change status
          </div>
          <div>
            <strong>🗑️ Delete:</strong> Click the × button to remove a ticket
          </div>
          <div>
            <strong>🎨 Priority Colors:</strong> Red (High), Yellow (Medium),
            Green (Low)
          </div>
          <div>
            <strong>🔄 Refresh:</strong> Click refresh to sync with latest data
          </div>
        </div>
      </div>
    
    </main>
  );
};

export default Dashboard;