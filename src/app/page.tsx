"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [longPress, setLongPress] = useState(false);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);

  type Task = {
    text: string;
    done: boolean;
  };

  type Tasks = {
    do: Task[];
    decide: Task[];
    delegate: Task[];
    delete: Task[];
  };

  const [tasks, setTasks] = useState<Tasks>({
    do: [],
    decide: [],
    delegate: [],
    delete: [],
  });

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks are updated
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (category: keyof Tasks) => {
    const newTask = prompt("Enter your task:");
    if (newTask) {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [category]: [...prevTasks[category], { text: newTask, done: false }],
      }));
    }
  };

  const handleTouchStart = (category: any, e: any) => {
    setLongPress(false);
    const timer = setTimeout(() => {
      setLongPress(true);
      addTask(category);
    }, 500); // 500ms for long press duration
    setPressTimer(timer);
  };

  const handleTouchEnd = () => {
    clearTimeout(pressTimer as unknown as number);
    if (!longPress) {
      // Handle single tap action if needed
    }
  };

  const toggleTaskDone = (category: keyof Tasks, index: number) => {
    const updatedTasks = [...tasks[category]];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: updatedTasks,
    }));
  };

  return (
    <div className="h-screen w-screen  flex justify-center items-center text-black">
      <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4 max-w-6xl  border-2">
        {/* Left titles */}

        {/* Do Section */}
        <div className="flex flex-row">
          <div className="flex items-center justify-center text-xl font-semibold w-[200px] text-black hidden md:flex">
            Important
          </div>

          <div>
            <div className="text-center text-xl font-semibold text-black  ">
              Urgent
            </div>
            <div
              className="bg-green-300 p-4 rounded-lg flex flex-col max-h-80 md:max-h-64 overflow-y-auto border-black"
              onTouchStart={(e) => handleTouchStart("do", e)}
              onTouchEnd={handleTouchEnd}
              onDoubleClick={() => addTask("do")}
            >
              <h2 className="text-2xl font-bold mb-2">Do</h2>
              <p className="text-sm mb-4">
                Fixing a critical bug in your software before a presentation.
              </p>
              <ul className="flex-grow">
                {tasks.do.map((task, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer ${
                      task.done ? "line-through" : ""
                    }`}
                    onClick={() => toggleTaskDone("do", index)}
                  >
                    {"⮞" + task.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Decide Section */}
        <div>
          <div className="text-center text-xl font-semibold text-black">
            Not Urgent
          </div>
          <div
            className="bg-blue-300 p-4 rounded-lg flex flex-col max-h-80 md:max-h-96 overflow-y-auto"
            onTouchStart={(e) => handleTouchStart("decide", e)}
            onTouchEnd={handleTouchEnd}
            onDoubleClick={() => addTask("decide")}
          >
            <h2 className="text-2xl font-bold mb-2">Decide</h2>
            <p className="text-sm mb-4">
              Planning your marketing strategy for the next quarter.
            </p>
            <ul className="flex-grow">
              {tasks.decide.map((task, index) => (
                <li
                  key={index}
                  className={`cursor-pointer ${
                    task.done ? "line-through" : ""
                  }`}
                  onClick={() => toggleTaskDone("decide", index)}
                >
                  {"⮞" + task.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Delegate Section */}
        <div className="flex flex-row ">
          <div className="flex items-center justify-center text-xl font-semibold w-[200px]  text-black  hidden md:flex">
            Not Important
          </div>
          <div
            className="bg-red-300 p-4 rounded-lg flex flex-col max-h-80 md:max-h-96 overflow-y-auto"
            onTouchStart={(e) => handleTouchStart("delegate", e)}
            onTouchEnd={handleTouchEnd}
            onDoubleClick={() => addTask("delegate")}
          >
            <h2 className="text-2xl font-bold mb-2">Delegate</h2>
            <p className="text-sm mb-4">
              Forwarding a request that does not fall within your expertise.
            </p>
            <ul className="flex-grow">
              {tasks.delegate.map((task, index) => (
                <li
                  key={index}
                  className={`cursor-pointer ${
                    task.done ? "line-thro claugh" : ""
                  }`}
                  onClick={() => toggleTaskDone("delegate", index)}
                >
                  {"⮞" + task.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Delete Section */}
        <div
          className="bg-gray-300 p-4 rounded-lg flex flex-col max-h-80 md:max-h-96 overflow-y-auto"
          onTouchStart={(e) => handleTouchStart("delete", e)}
          onTouchEnd={handleTouchEnd}
          onDoubleClick={() => addTask("delete")}
        >
          <h2 className="text-2xl font-bold mb-2">Delete</h2>
          <p className="text-sm mb-4">Unsubscribing from irrelevant emails.</p>
          <ul className="flex-grow">
            {tasks.delete.map((task, index) => (
              <li
                key={index}
                className={`cursor-pointer ${task.done ? "line-through" : ""}`}
                onClick={() => toggleTaskDone("delete", index)}
              >
                {"⮞" + task.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
