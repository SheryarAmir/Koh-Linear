// src/app/details/page.tsx
import React from "react";
import{ useUserDetails} from "@/Hooks/AuthHook";

const Page = () => {
  const { data, isLoading, error } = useUserDetails();

  if (isLoading) return <p>Loading user details...</p>;
  if (error) return <p>Error loading user details</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-2">User Details</h2>
      <p><strong>First Name:</strong> {data.firstName}</p>
      <p><strong>First Name:</strong> {data.lastName}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>User ID:</strong> {data._id}</p>
      {/* <p><strong>Password:</strong> {data.password}</p> ⚠️ Consider hiding this in real apps */}
    </div>
  );
};

export default Page;
