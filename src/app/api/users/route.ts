import { prisma } from "@/lib/prisma";

// GET all users for a company
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId");

    if (!companyId) {
      return Response.json(
        { error: "Company ID required" },
        { status: 400 }
      );
    }

    const users = await prisma.user.findMany({
      where: { companyId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    return Response.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Get users error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ASSIGN role to user
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, roleId } = body;

    if (!userId || !roleId) {
      return Response.json(
        { error: "User ID and Role ID required" },
        { status: 400 }
      );
    }

    // Check if user-role relationship already exists
    const existingUserRole = await prisma.userRole.findUnique({
      where: {
        userId_roleId: { userId, roleId },
      },
    });

    if (existingUserRole) {
      return Response.json(
        { error: "User already has this role" },
        { status: 409 }
      );
    }

    const userRole = await prisma.userRole.create({
      data: {
        userId,
        roleId,
      },
    });

    return Response.json(
      { message: "Role assigned successfully", userRole },
      { status: 201 }
    );
  } catch (error) {
    console.error("Assign role error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// REMOVE role from user
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const roleId = searchParams.get("roleId");

    if (!userId || !roleId) {
      return Response.json(
        { error: "User ID and Role ID required" },
        { status: 400 }
      );
    }

    await prisma.userRole.delete({
      where: {
        userId_roleId: { userId, roleId },
      },
    });

    return Response.json(
      { message: "Role removed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Remove role error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
