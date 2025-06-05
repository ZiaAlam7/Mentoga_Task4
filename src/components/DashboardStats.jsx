import React from 'react';

export default function DashboardStats({ tasks, currentUser }) {
  const isAdmin = currentUser.role === 'admin';
console.log(currentUser)

  const visibleTasks = isAdmin
    ? tasks
    : tasks.filter(task => task.assignedUsers.some(user => user.email === currentUser.email));
  const totalTasks = visibleTasks.length;
  const completedTasks = visibleTasks.filter(task => task.status === 'Completed').length;
  const pendingTasks = visibleTasks.filter(task => task.status === 'Pending').length;


  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <StatCard label="Total Tasks" count={totalTasks} color="bg-blue-500" />
      <StatCard label="Completed" count={completedTasks} color="bg-green-500" />
      <StatCard label="Pending" count={pendingTasks} color="bg-yellow-500" />
    </div>
  );
}

function StatCard({ label, count, color }) {
  return (
    <div className={`rounded-xl p-4 shadow-md text-white ${color}`}>
      <h2 className="text-sm uppercase font-semibold">{label}</h2>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
}
