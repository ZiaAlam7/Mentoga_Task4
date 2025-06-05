"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import DashboardStats from "@/components/DashboardStats";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import Navbar from "@/components/Navbar";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";

export default function DashboardPage() {

  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/tasks")
      .then((res) => {
        setTasks(res.data.tasks);
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const task_creation = async (data, action) => {
    try {
      console.log(data, action);
      const response = await axios.post("/api/create_task", { data, action });
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error(
        "Error sending data:",
        error.response?.data || error.message
      );
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      await fetch("/api/logout", { method: "POST" });
      window.location.href = "/login";
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  const logged_email = Cookies.get("__logged_email");


  if (loading)
    return (
      <p className="w-full h-[100vh] flex justify-center items-center">
        Loading tasks...
      </p>
    );

  const currentUser = users.find((u) => u.email === logged_email); 
  const isAdmin = currentUser.role === "admin";

  return (
    <div className="py-8 md:px-15 px-5">
      <Navbar user={currentUser} onLogout={handleSignOut} />
      <h1 className="text-2xl font-bold mb-4">Welcome, {currentUser.name}</h1>
      <DashboardStats tasks={tasks} currentUser={currentUser} />
      {isAdmin && (
        <TaskForm
          key={editingTask?.id || "new"}
          task={editingTask}
          users={users}
          onSave={(updatedTask, action) => {
            task_creation(updatedTask, action);
          }}
          onCancel={() => setEditingTask(null)}
        />
      )}
      <TaskList
        tasks={tasks}
        currentUser={currentUser}
        users={users}
        onEdit={(task) => {
          setEditingTask(task);
        }}
        onComplete={(data) => {
          const action = "completed";
          task_creation(data, action);
        }}
      />
    </div>
  );
}
