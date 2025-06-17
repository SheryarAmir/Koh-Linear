import { queryOptions } from "@tanstack/react-query";

export default function createTodoQueryOptions() {
  return queryOptions({
    queryKey: ["todo"],
    queryFn: gettodo,
  });
}

const gettodo = async (): Promise<Todo[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
