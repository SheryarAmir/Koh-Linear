// components/StatusPage.tsx (or /status/StatusPage.tsx)
import React from "react"

type StatusPageProps = {
  id: string;
};

const StatusPage = ({ id }: StatusPageProps) => {
  console.log("Ticket ID:", id);

  return (
    <div>
      <p className="text-sm text-gray-600">Status component loaded for ticket ID: {id}</p>
    </div>
  )
}

export default StatusPage;
