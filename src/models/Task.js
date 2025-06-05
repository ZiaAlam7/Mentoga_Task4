import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  priority: { type: String, enum: ['Low', 'High', 'Medium'], default: 'Medium' },
  dueDate: { type: String, match: /^\d{4}-\d{2}-\d{2}$/ }, 
  assignedUsers: [
    {
      email: { type: String, required: true },
      name: { type: String, required: true }
    }
  ]
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
