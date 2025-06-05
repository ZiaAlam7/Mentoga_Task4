import dbConnect from '@/lib/dbConnect';
import Task from '@/models/Task';
import User from '@/models/User';

export async function GET() {
  await dbConnect();

  try {
    const tasks = await Task.find({});
    const users = await User.find({});

    return new Response(
      JSON.stringify({ tasks, users }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch data' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
