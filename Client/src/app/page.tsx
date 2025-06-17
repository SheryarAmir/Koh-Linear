"use client"

import HomePage from "@/app/(ui)/Home-page";
import { useQuery } from "@tanstack/react-query";

export default function Page() {

    const gettodo= async () => {
const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();


  }

  const { data ,}=useQuery({
queryKey:["todo"],
queryFn:gettodo
  })

  


  return (
    <div className="py-20">
<h1>{JSON.stringify(data)}</h1>

      <HomePage />


    </div>
  );


}
