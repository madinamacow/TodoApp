"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";

interface Invoice {
  id: number;
  completed: boolean;
  text: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Invoice[]>([]);
  const [input, setInput] = useState("");

  const addTodos = () => {
    if (input.trim() === '') return;
    const newTodos = {
      id: Date.now(),
      text: input,	
      completed: false
    }
    setTodos([...todos, newTodos]);
    setInput('')
  }

  const RemoveTodos = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completeTodos = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Responsive Input Section */}
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-12 sm:mt-20 lg:mt-32">
        <Input
          placeholder="Enter task"
          type="text"
          className="w-full sm:w-64 lg:w-96"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodos()}
        />
        <Button 
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700" 
          onClick={() => addTodos()}
        >
          Add Task
        </Button>
      </div>

      {/* Responsive Table Section */}
      <div className="w-full max-w-xl mx-auto mt-6">
        <div className="bg-gray-100 rounded-lg shadow-md overflow-x-auto">
          <Table className="w-full">
            <TableBody>
              {todos.map((todo) => (
                <TableRow 
                  key={todo.id} 
                  className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <TableCell 
                    className={`w-1/2 ${
                      todo.completed ? "line-through text-gray-500" : "text-gray-800"
                    }`}
                  >
                    {todo.text}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      className={`
                        ${todo.completed 
                          ? "bg-gray-200 text-gray-600 hover:bg-gray-300" 
                          : "bg-green-500 text-white hover:bg-green-600"
                        }
                      `}
                      onClick={() => completeTodos(todo.id)}
                    >
                      Done
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="bg-pink-600 hover:bg-pink-700"
                      onClick={() => RemoveTodos(todo.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Empty State */}
        {todos.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No tasks yet. Add a task to get started!
          </div>
        )}
      </div>
    </div>
  );
}