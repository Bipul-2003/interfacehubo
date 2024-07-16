import dbConnect from "@/lib/dbConnection";
import Enrollment from "@/models/Enrollments";
import SessionModel from "@/models/Sessions";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { session, user } = await req.json();

    const existingSession = await SessionModel.findById(session);
    if (!existingSession) {
      return Response.json(
        { message: "Session does not exist" },
        { status: 400 }
      );
    }
    if (existingSession.bookedStudents.length > existingSession.maxCapacity) {
      return Response.json({ message: "Session is full" }, { status: 400 });
    }
    if (new Date(existingSession.bookingLastDate) < new Date(Date.now())) {
      return Response.json(
        { message: "Session booking date has passed" },
        { status: 400 }
      );
    }

    const existingEnrollment = await Enrollment.findOne({ user, session });
    if (existingEnrollment) {
      return Response.json(
        { message: "Enrollment already exists" },
        { status: 400 }
      );
    }

    if (existingSession.enrolledStudents.length < existingSession.maxCapacity) {
      const enrollment = new Enrollment({
        user: user,
        session: session,
        status: "enrolled",
        paymentStatus: "pending",
      });
      await enrollment.save();

      const updatedSession = await SessionModel.findByIdAndUpdate(session, {
        $addToSet: { enrolledStudents: user },
      }, { new: true });

      return Response.json(
        { message: "Enrolled Successfully", data: updatedSession },
        { status: 200 }
      );
    } else if (
      existingSession.waitingStudents.length <
      existingSession.maxWaitingCapacity
    ) {
      const enrollment = new Enrollment({
        user: user,
        session: session,
        status: "waiting",
        paymentStatus: "pending",
      });
      await enrollment.save();

      const updatedSession = await SessionModel.findByIdAndUpdate(session, {
        $addToSet: { waitingStudents: user },
      }, { new: true });

      return Response.json(
        { message: "You are in waitinglist", data: updatedSession },
        { status: 200 }
      );
    } else {
      return Response.json({ message: "Session is full" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error creating enrollment:", error);
    return Response.json(
      { message: "Error creating enrollment" },
      { status: 500 }
    );
  }
}
