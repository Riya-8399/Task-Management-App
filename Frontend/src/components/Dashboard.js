
import React, { useEffect, useState } from "react";
import api from "../api"; // Axios instance to fetch tasks

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks"); // fetch all tasks
        setTasks(res.data.tasks || []);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const pendingTasks = totalTasks - completedTasks;

  if (loading) return <p>Loading Dashboard...</p>;

  return (
    <div className="bg-[#FFF9F0] rounded-xl shadow-lg p-8 min-h-[80vh]">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-6 text-[#2c3e50]">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Total Tasks</h3>
          <p>{totalTasks} Tasks</p>
        </div>

        <div className="bg-gray-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Completed Tasks</h3>
          <p>{completedTasks} Tasks</p>
        </div>

        <div className="bg-gray-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Pending Tasks</h3>
          <p>{pendingTasks} Tasks</p>
        </div>
      </div>

      {/* Recent Tasks */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recent Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          <ul className="space-y-2">
            {tasks.slice(-5).reverse().map(task => (
              <li key={task._id} className="bg-gray-200 p-4 rounded shadow-sm flex justify-between">
                <span>{task.title}</span>
                <span className={task.status === "completed" ? "text-green-600" : "text-yellow-600"}>
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
