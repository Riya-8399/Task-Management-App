
import React, { useEffect, useState } from "react";
import api from "../api"; // your axios instance

const TrashIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [expandedId, setExpandedId] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");

  const [editBuffer, setEditBuffer] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/tasks/get-user-tasks");
        const incoming = res.data?.tasks ?? res.data ?? [];
        setTasks(Array.isArray(incoming) ? incoming : []);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        setError("Failed to load tasks. Please try again later.");
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const updateTaskInState = (updatedTask) => {
    setTasks((prev) => prev.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
  };

  const removeTaskFromState = (id) => {
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const toggleExpand = (task) => {
    if (expandedId === task._id) {
      setExpandedId(null);
      setEditBuffer({});
    } else {
      setExpandedId(task._id);
      setEditBuffer({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
        priority: (task.priority || "medium").toLowerCase()

      });
    }
  };

  const toggleComplete = async (task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";

    console.log("Task ID being sent:", task._id);
    console.log("New status:", newStatus);

    updateTaskInState({ ...task, status: newStatus });

    try {
      const res = await api.put(`/tasks/update-task/${task._id}`, { status: newStatus });
      const updated = res.data?.task ?? res.data;
      if (updated && updated._id) updateTaskInState(updated);
    } catch (err) {
      console.error("Failed to toggle complete:", err);
      updateTaskInState({ ...task, status: task.status });
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    const old = tasks;
    removeTaskFromState(taskId);

    try {
      await api.delete(`/tasks/delete-task/${taskId}`);
    } catch (err) {
      console.error("Failed to delete task:", err);
      setTasks(old);
      alert("Delete failed. Please try again.");
    }
  };

  const handleSaveEdit = async (taskId) => {
    const payload = {
      title: editBuffer.title,
      description: editBuffer.description,
      dueDate: editBuffer.dueDate ? new Date(editBuffer.dueDate).toISOString() : null,
      priority: editBuffer.priority,
    };

    

    const oldTask = tasks.find((t) => t._id === taskId);
const optimistic = { ...oldTask, ...payload, status: oldTask.status }; // preserve status
updateTaskInState(optimistic);


    

    try {
      const res = await api.put(`/tasks/update-task/${taskId}`, payload);
      const updated = res.data?.task ?? res.data;
      if (updated && updated._id) updateTaskInState(updated);
      setExpandedId(null);
      setEditBuffer({});
    } catch (err) {
      console.error("Failed to update task:", err);
      updateTaskInState(oldTask);
      alert("Update failed. Please try again.");
    }
  };

  const filtered = tasks.filter((t) => {
    if (!t) return false;
    if (priorityFilter !== "all" && (t.priority || "medium").toLowerCase() !== priorityFilter) return false;
    if (statusFilter !== "all" && (t.status || "pending") !== statusFilter) return false;
    return true;
  });

  const sorted = filtered.slice().sort((a, b) => {
    const dateA = new Date(a.createdAt || a.dueDate || 0).getTime();
    const dateB = new Date(b.createdAt || b.dueDate || 0).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const visible = showAll ? sorted : sorted.slice(0, 5);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const pendingTasks = totalTasks - completedTasks;

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="bg-[#FFF9F0] rounded-xl shadow-lg p-8 min-h-[80vh]">
      <h1 className="text-4xl font-bold mb-4 text-[#2c3e50]">My Tasks</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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

      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center mb-6">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Priority:</label>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="px-3 py-2 rounded bg-gray-200">
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Sort:</label>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="px-3 py-2 rounded bg-gray-200">
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Status:</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 rounded bg-gray-200">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="ml-auto">
          {tasks.length > 5 && (
            <button onClick={() => setShowAll(!showAll)} className="px-4 py-2 bg-blue-600 text-white rounded">
              {showAll ? "Show Less" : "View All"}
            </button>
          )}
        </div>
      </div>

      {/* Task list */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">List of Tasks</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {visible.length === 0 ? <p>No tasks available.</p> : (
          <ul className="space-y-3">
            {visible.map((task) => {
              const isExpanded = expandedId === task._id;
              return (
                <li key={task._id} className="bg-gray-200 p-4 rounded shadow-sm">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-4">
                      <button onClick={() => toggleExpand(task)} className="text-left w-full">
                        <div className="flex items-center gap-3">
                          <div>
                            <h3 className="text-lg font-semibold underline">{task.title}</h3>
                            <div className="text-sm text-gray-600">
                              {task.createdAt ? new Date(task.createdAt).toLocaleString() : ""}
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Show "Mark Complete" button only if pending */}
                      {task.status !== "completed" && (
                        <button
                          onClick={() => toggleComplete(task)}
                          className="px-3 py-1 rounded bg-green-600 text-white"
                          title="Mark complete"
                        >
                          Mark Complete
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="p-2 rounded hover:bg-red-100"
                        title="Delete task"
                        aria-label="Delete task"
                      >
                        <TrashIcon className="w-5 h-5 text-red-600" />
                      </button>

                      {/* Status text */}
                      <span className={task.status === "completed" ? "text-green-600 font-semibold" : "text-yellow-600 font-semibold"}>
                        {task.status === "completed" ? "Completed" : "Pending"}
                      </span>
                    </div>
                  </div>

                  {/* Expanded edit area */}
                  {isExpanded && (
                    <div className="mt-4 border-t pt-4">
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <textarea
                        value={editBuffer.description ?? ""}
                        onChange={(e) => setEditBuffer((s) => ({ ...s, description: e.target.value }))}
                        rows={3}
                        className="w-full p-2 border rounded mb-3"
                      />

                      <div className="flex gap-3 items-center mb-3">
                        <div>
                          <label className="text-sm block mb-1">Due date</label>
                          <input
                            type="date"
                            value={editBuffer.dueDate ?? ""}
                            onChange={(e) => setEditBuffer((s) => ({ ...s, dueDate: e.target.value }))}
                            className="p-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm block mb-1">Priority</label>
                          <select
                            value={editBuffer.priority ?? "medium"}
                            onChange={(e) => setEditBuffer((s) => ({ ...s, priority: e.target.value }))}
                            className="p-2 border rounded"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button onClick={() => handleSaveEdit(task._id)} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
                        <button onClick={() => { setExpandedId(null); setEditBuffer({}); }} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyTasks;









