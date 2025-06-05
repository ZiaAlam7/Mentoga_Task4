import React, { useState } from "react";

export default function TaskRow({
  task,
  currentUser,
  onEdit,
  onComplete,
  isMobile,
}) {
  const isAdmin = currentUser.role === "admin";
  const isCompleted = task.status === "Completed";

  const handleCompleteClick = () => {
    if (!isCompleted) onComplete(task);
  };

  if (isMobile) {
    return (
      <div className="border rounded-lg p-4 shadow-sm bg-white">
        <div className="text-lg font-semibold mb-1">{task.title}</div>
        <div className="text-sm mb-1">
          <strong>Status:</strong> {task.status}
        </div>
        <div className="text-sm mb-1">
          <strong>Priority:</strong> {task.priority}
        </div>
        <div className="text-sm mb-1">
          <strong>Due:</strong> {task.dueDate}
        </div>

        <div className="text-sm mb-1">
          <strong>Assigned:</strong>{" "}
          {task.assignedUsers.length > 0
            ? task.assignedUsers.map((user) => (
                <span
                  key={user.email}
                  className="inline-block mr-1 mb-1 px-2 py-0.5 bg-gray-200 rounded text-xs"
                >
                  {user.name}
                </span>
              ))
            : "Unassigned"}
        </div>

        <div className="mt-2">
          {isAdmin ? (
            <button
              onClick={() => onEdit(task)}
              className="text-blue-600 hover:underline text-sm"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleCompleteClick}
              disabled={isCompleted}
              className={`text-sm ${
                isCompleted
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-green-600 hover:underline"
              }`}
            >
              {isCompleted ? "Completed" : "Mark as Done"}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Desktop Table Row
  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="p-3">
        {task.title} || {task.description}
      </td>
      <td className="p-3">{task.status}</td>
      <td className="p-3">{task.priority}</td>
      <td className="p-3">{task.dueDate}</td>

      <td className="p-3">
        {task.assignedUsers.length > 0
          ? task.assignedUsers.map((user, index) => (
              <span
                key={user.email || index}
                className="inline-block mr-1 mb-1 px-2 py-0.5 text-xs bg-gray-200 rounded"
              >
                {user.name}
              </span>
            ))
          : "Unassigned"}
      </td>

      <td className="p-3 space-x-3 whitespace-nowrap">
        {isAdmin ? (
          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleCompleteClick}
            disabled={isCompleted}
            className={`${
              isCompleted
                ? "text-gray-400 cursor-not-allowed"
                : "text-green-600 hover:underline"
            }`}
          >
            {isCompleted ? "Completed" : "Mark as Done"}
          </button>
        )}
      </td>
    </tr>
  );
}
