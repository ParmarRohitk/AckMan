import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName, companyName, isAdmin } = body;

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create or get company
    let company = await prisma.company.findFirst({
      where: { email: companyName || email },
    });

    if (!company) {
      company = await prisma.company.create({
        data: {
          name: companyName || `${firstName} ${lastName}'s Company`,
          email: companyName || email,
        },
      });
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        companyId: company.id,
      },
    });

    // Create default roles if it's the first admin/company
    let adminRole = await prisma.role.findFirst({
      where: {
        name: "Admin",
        companyId: company.id,
      },
    });

    if (!adminRole) {
      adminRole = await prisma.role.create({
        data: {
          name: "Admin",
          description: "Administrator with full access",
          companyId: company.id,
        },
      });

      // Create default roles
      const roles = [
        { name: "Manager", description: "Manager role" },
        { name: "Employee", description: "Employee role" },
        { name: "Accountant", description: "Accountant role" },
        { name: "Auditor", description: "Auditor role" },
      ];

      for (const roleData of roles) {
        await prisma.role.create({
          data: {
            name: roleData.name,
            description: roleData.description,
            companyId: company.id,
          },
        });
      }

      // Create default permissions
      const permissions = [
        { name: "create_audit", description: "Create audit records" },
        { name: "edit_audit", description: "Edit audit records" },
        { name: "delete_audit", description: "Delete audit records" },
        { name: "view_reports", description: "View reports" },
        { name: "export_data", description: "Export data" },
        { name: "manage_users", description: "Manage users" },
        { name: "manage_roles", description: "Manage roles" },
        { name: "manage_permissions", description: "Manage permissions" },
      ];

      for (const permData of permissions) {
        await prisma.permission.create({
          data: {
            name: permData.name,
            description: permData.description,
          },
        });
      }
    }

    // Assign admin role to first user
    if (isAdmin) {
      await prisma.userRole.create({
        data: {
          userId: user.id,
          roleId: adminRole.id,
        },
      });
    }

    return Response.json(
      {
        message: "User created successfully",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
