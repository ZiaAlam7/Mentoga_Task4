import React from "react";
import TaskRow from "./TaskRow";

export default function TaskList({
  tasks,
  currentUser,
  onEdit,
  onComplete,
  users,
}) {
  const isAdmin = currentUser.role === "admin";

  const visibleTasks = isAdmin
    ? tasks
    : tasks.filter((task) =>
        task.assignedUsers.some((user) => user.email === currentUser.email)
      );

  if (visibleTasks.length === 0) {
    return <p className="text-gray-500 mt-4">No tasks to display.</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-xl text-gray-700 ">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-300 text-black">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Due Date</th>
              <th className="p-3 text-left">Assigned To</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleTasks.map((task) => (
              <TaskRow
                key={task._id}
                task={task}
                currentUser={currentUser}
                onEdit={onEdit}
                users={users}
                onComplete={onComplete}
                isMobile={false}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4 p-2">
        {visibleTasks.map((task) => (
          <TaskRow
            key={task._id}
            task={task}
            currentUser={currentUser}
            onEdit={onEdit}
            onComplete={onComplete}
            isMobile={true}
          />
        ))}
      </div>
    </div>
  );
}
