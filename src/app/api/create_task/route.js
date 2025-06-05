import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";

export async function POST(request) {
  await dbConnect();

  try {
    const { data, action } = await request.json();
    const { title, description, status, dueDate, assignedUsers, _id } = data;
    console.log(data);

    if (!data) {
      return new Response(
        JSON.stringify({ message: "Missing newTask in request body" }),
        {
          status: 400,
        }
      );
    }

    if (action === "create") {
      const newTask = new Task({
        title,
        description,
        status,
        dueDate,
        assignedUsers,
      });
      const updatedDoc = await newTask.save();

      if (!updatedDoc) {
        return new Response(
          JSON.stringify({ message: "No document found to update" }),
          {
            status: 404,
          }
        );
      }

      return new Response(
        JSON.stringify({
          message: "Task added successfully",
          data: updatedDoc,
        }),
        {
          status: 200,
        }
      );
    }

    if (action === "update") {
      const updatedTask = await Task.findByIdAndUpdate(
        _id,
        {
          title,
          description,
          status,
          dueDate,
          assignedUsers,
        },
        {
          new: true,
        }
      );

      if (!updatedTask) {
        return NextResponse.json({ error: "Task not found" }, { status: 404 });
      }

      return new Response(
        JSON.stringify({
          message: "Task updated successfully",
          data: updatedTask,
        }),
        {
          status: 200,
        }
      );
    }

    if (action === "completed") {
      const updatedTask = await Task.findByIdAndUpdate(
        _id,
        {
          status: "Completed",
        },
        {
          new: true,
        }
      );

      if (!updatedTask) {
        return NextResponse.json({ error: "Task not found" }, { status: 404 });
      }

      return new Response(
        JSON.stringify({
          message: "Task marked as completed",
          data: updatedTask,
        }),
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.error("Error appending task:", error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
