import React, { useState, useEffect } from "react";
import Select from "react-select";

export default function TaskForm({ task = null, onSave, onCancel, users }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [_id, setID] = useState("");
  const [action, setAction] = useState("create");
  const [assignedUsers, setAssignedUsers] = useState([{}]);

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status || "Pending");
      setPriority(task.priority || "Low");
      setDueDate(task.dueDate || "");
      setID(task._id || "");
      setAssignedUsers(task.assignedUsers || [{}]);
      setAction("update");
    } else {
      setTitle("");
      setDescription("");
      setStatus("Pending");
      setPriority("Low");
      setDueDate("");
      setID("");
      setAssignedUsers([]);
      setAction("create");
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      _id,
      title,
      description,
      status,
      priority,
      dueDate,
      assignedUsers,
    };
    onSave(taskData, action);
  };

  const options_filtered = users.filter((user) => user.role === "user");

  const options = options_filtered.map((user) => ({
    value: user.email,
    label: user.name,
  }));
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md p-4 mb-6 space-y-4 text-gray-800"
    >
      <h2 className="text-lg font-semibold text-black">
        {task ? "Edit Task" : "Create New Task"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          className="border p-2 rounded outline-blue-600 border-gray-300"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          className="border p-2 rounded outline-blue-600 border-gray-300"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>

      <textarea
        className="w-full border p-2 rounded outline-blue-600 border-gray-300"
        placeholder="Description"
        rows="3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <select
          className="border p-2 rounded outline-blue-600 border-gray-300"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>Completed</option>
        </select>

        <select
          className="border p-2 rounded outline-blue-600 border-gray-300"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <Select
          isMulti
          options={options}
          value={options.filter((opt) =>
            assignedUsers.some((user) => user.email === opt.value)
          )}
          onChange={(selectedOptions) => {
            const selectedUsers = selectedOptions
              ? options
                  .filter((opt) =>
                    selectedOptions.some((sel) => sel.value === opt.value)
                  )
                  .map((opt) => ({ name: opt.label, email: opt.value }))
              : [];
            setAssignedUsers(selectedUsers);
          }}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          {task ? "Update Task" : "Create Task"}
        </button>
        {task && (
          <button
            type="button"
            onClick={onCancel}
            className="border px-4 py-2 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
