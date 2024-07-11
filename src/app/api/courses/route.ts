import dbConnect from "@/lib/dbConnect";

import CourseModel from "@/models/Courses";

export async function GET(req: Request) {
  await dbConnect();

  try {
    const courses = await CourseModel.find();

    return Response.json({ courses }, { status: 200 });
  } catch (error) {
    console.error("Error on getting coursea:", error);
    return Response.json({ message: "Error getting course" }, { status: 500 });
  }
}
