import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return Response.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        company: true,
        userRoles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      return Response.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return Response.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = sign(
      {
        userId: user.id,
        email: user.email,
        companyId: user.companyId,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    // Get user roles and permissions
    const roles = user.userRoles.map((ur: any) => ur.role.name);
    const permissions = user.userRoles.flatMap((ur: any) =>
      ur.role.permissions.map((rp: any) => rp.permission.name)
    );

    return Response.json(
      {
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          company: user.company,
          roles,
          permissions: [...new Set(permissions)], // Remove duplicates
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
