import React from "react";
import GetTicket from "../getTicket/page"

const statuses = [
    { title: "Todo", bg: "bg-blue-100" },
    { title: "In Progress", bg: "bg-yellow-100" },
    { title: "Review", bg: "bg-purple-100" },
    { title: "Blocked", bg: "bg-red-100" },
    { title: "Done", bg: "bg-green-100" },
];

export default function StatusPage() {
    return (
        <div className="flex gap-4 p-8 mx-auto container">
            
            <div className="flex-1 rounded-lg shadow p-6 bg-blue-100">
                <h2 className="text-xl font-bold mb-2">Todo</h2>
                <GetTicket/>
            </div>

            <div className="flex-1 rounded-lg shadow p-6 bg-yellow-100">
                <h2 className="text-xl font-bold mb-2">In Progress</h2>
            </div>
            <div className="flex-1 rounded-lg shadow p-6 bg-purple-100">
                <h2 className="text-xl font-bold mb-2">Review</h2>
            </div>
            <div className="flex-1 rounded-lg shadow p-6 bg-red-100">
                <h2 className="text-xl font-bold mb-2">Blocked</h2>
            </div>
            <div className="flex-1 rounded-lg shadow p-6 bg-green-100">
                <h2 className="text-xl font-bold mb-2">Done</h2>
            </div>
        </div>
    );
}