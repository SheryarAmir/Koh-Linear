// src/app/details/page.tsx
import React from "react";
import{ useUserDetails} from "@/hooks/AuthHook";

const Page = () => {
  const { data, isLoading, error } = useUserDetails();
  
  // console.log(data.verifyUser)
  if (isLoading) return <p>Loading user details...</p>;
  if (error) return <p>Error loading user details</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-2">User Details</h2>
      <p><strong>First Name:</strong> {data.verifyUser.firstName}</p>
      <p><strong>First Last:</strong> {data.verifyUser.lastName}</p>
      <p><strong>Email:</strong> {data.verifyUser.email}</p>
      <p><strong>User ID:</strong> {data.verifyUser._id}</p>
      {/* <p><strong>Password:</strong> {data.password}</p> ⚠️ Consider hiding this in real apps */}
    </div>
  );
};

export default Page;
