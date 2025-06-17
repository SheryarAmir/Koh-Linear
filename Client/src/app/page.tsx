"use client";

import HomePage from "@/app/(ui)/Home-page";
import { useQuery } from "@tanstack/react-query";
import createTodoQueryOptions from "@/queryOptions/createTodoQueryOptions";

export default function Page() {
  const { data, isLoading, error } = useQuery(createTodoQueryOptions());

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  if (error) return <p className="text-center text-red-500 py-10">Something went wrong</p>;

  return (
    <div className="py-20">
      <div className="px-4">
        <h1 className="text-xl font-semibold mb-4">Todo List</h1>
        <ul className="space-y-2">
          {data?.slice(0, 10).map((todo) => (
            <li key={todo.id} className="p-3 bg-gray-100 rounded shadow">
              {todo.title} {todo.completed ? "✅" : "❌"}
            </li>
          ))}
        </ul>
      </div>

      <HomePage />
    </div>
  );
}
