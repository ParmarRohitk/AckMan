import { prisma } from "@/lib/prisma";

// GET all permissions
export async function GET() {
  try {
    const permissions = await prisma.permission.findMany({
      include: {
        roles: true,
      },
    });

    return Response.json({ permissions }, { status: 200 });
  } catch (error) {
    console.error("Get permissions error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// CREATE new permission (admin only)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description } = body;

    if (!name) {
      return Response.json(
        { error: "Permission name required" },
        { status: 400 }
      );
    }

    // Check if permission already exists
    const existingPerm = await prisma.permission.findUnique({
      where: { name },
    });

    if (existingPerm) {
      return Response.json(
        { error: "Permission already exists" },
        { status: 409 }
      );
    }

    const permission = await prisma.permission.create({
      data: {
        name,
        description,
      },
    });

    return Response.json(
      { message: "Permission created successfully", permission },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create permission error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
