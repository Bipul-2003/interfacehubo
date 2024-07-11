import dbConnect from "@/lib/dbConnect";

import UserModel from "@/models/Users";
import { NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  await dbConnect();

  try {

    const id = req.nextUrl.searchParams.get("uid");
    
    const user = await UserModel.findById(id).select("-password");

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }
    return Response.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error on getting User:", error);
    return Response.json(
      { message: "Error getting user" },
      { status: 500 }
    );
  }
}
