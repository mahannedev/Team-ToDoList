"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  user_id: string;
  created_at: string;
};

export default function TodoClient() {
  const supabase = createClient();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      if (data) setTodos(data);
      setLoading(false);
      setHasFetchedOnce(true); // ✅ Prevent real-time duplication
    };

    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();
    fetchTodos();

    const channel = supabase
      .channel("realtime-todos")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "todos" },
        (payload) => {
          const newItem = payload.new as Todo;
          const oldItem = payload.old as Todo;

          setTodos((prev) => {
            if (payload.eventType === "INSERT") {
              if (!hasFetchedOnce) return prev; // ✅ Skip during initial load
              if (!prev.find((t) => t.id === newItem.id)) {
                return [newItem, ...prev];
              }
            }

            if (payload.eventType === "UPDATE") {
              return prev.map((t) => (t.id === newItem.id ? newItem : t));
            }

            if (payload.eventType === "DELETE") {
              return prev.filter((t) => t.id !== oldItem.id);
            }

            return prev;
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function addTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!newTodo.trim() || !user) return;

    const { data, error } = await supabase
      .from("todos")
      .insert({ title: newTodo, completed: false, user_id: user.id })
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      return;
    }

    if (data && !todos.find((t) => t.id === data.id)) {
      setTodos((prev) => [data, ...prev]);
    }

    setNewTodo("");
  }

  async function toggleComplete(todo: Todo) {
    await supabase
      .from("todos")
      .update({ completed: !todo.completed })
      .eq("id", todo.id);
  }

  async function deleteTodo(id: string) {
    await supabase.from("todos").delete().eq("id", id);
  }

  return (
    <div>
      <form onSubmit={addTodo} className="flex gap-2 mb-4">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New Todo"
          className="border p-2 flex-1 rounded"
        />
        <button
          type="submit"
          disabled={!newTodo.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Add
        </button>
      </form>
      {loading ? (
        <p>Loading todos...</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center p-2 rounded border ${
                todo.completed ? "bg-green-100 line-through" : "bg-neutral-100"
              }`}
            >
              <span
                onClick={() => toggleComplete(todo)}
                className="cursor-pointer"
              >
                {todo.title}
              </span>
              <button
                type="button"
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 text-sm"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
