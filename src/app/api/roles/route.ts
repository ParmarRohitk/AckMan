import { prisma } from "@/lib/prisma";

// GET all roles for a company
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

    const roles = await prisma.role.findMany({
      where: { companyId },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    return Response.json({ roles }, { status: 200 });
  } catch (error) {
    console.error("Get roles error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// CREATE new role
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, companyId, permissionIds } = body;

    if (!name || !companyId) {
      return Response.json(
        { error: "Name and company ID required" },
        { status: 400 }
      );
    }

    // Check if role already exists
    const existingRole = await prisma.role.findFirst({
      where: { name, companyId },
    });

    if (existingRole) {
      return Response.json(
        { error: "Role already exists for this company" },
        { status: 409 }
      );
    }

    // Create role
    const role = await prisma.role.create({
      data: {
        name,
        description,
        companyId,
      },
    });

    // Add permissions if provided
    if (permissionIds && Array.isArray(permissionIds)) {
      for (const permissionId of permissionIds) {
        await prisma.rolePermission.create({
          data: {
            roleId: role.id,
            permissionId,
          },
        });
      }
    }

    return Response.json(
      { message: "Role created successfully", role },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create role error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// UPDATE role
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { roleId, name, description, permissionIds } = body;

    if (!roleId) {
      return Response.json(
        { error: "Role ID required" },
        { status: 400 }
      );
    }

    // Update role
    const role = await prisma.role.update({
      where: { id: roleId },
      data: {
        ...(name && { name }),
        ...(description && { description }),
      },
    });

    // Update permissions if provided
    if (permissionIds && Array.isArray(permissionIds)) {
      // Delete existing permissions
      await prisma.rolePermission.deleteMany({
        where: { roleId },
      });

      // Add new permissions
      for (const permissionId of permissionIds) {
        await prisma.rolePermission.create({
          data: {
            roleId,
            permissionId,
          },
        });
      }
    }

    return Response.json(
      { message: "Role updated successfully", role },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update role error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE role
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const roleId = searchParams.get("roleId");

    if (!roleId) {
      return Response.json(
        { error: "Role ID required" },
        { status: 400 }
      );
    }

    await prisma.role.delete({
      where: { id: roleId },
    });

    return Response.json(
      { message: "Role deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete role error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
