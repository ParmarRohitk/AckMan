"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userRoles: Array<{ role: { id: string; name: string } }>;
}

interface Role {
  id: string;
  name: string;
  description: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    const userData = JSON.parse(storedUser);
    setUser(userData);

    // Fetch users and roles
    fetchData(userData.company.id);
  }, [router]);

  const fetchData = async (companyId: string) => {
    try {
      const token = localStorage.getItem("token");

      const [usersRes, rolesRes] = await Promise.all([
        fetch(`/api/users?companyId=${companyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`/api/roles?companyId=${companyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (usersRes.ok) {
        const data = await usersRes.json();
        setUsers(data.users);
      }

      if (rolesRes.ok) {
        const data = await rolesRes.json();
        setRoles(data.roles);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-purple-50">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-2">
            {user.company.name}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4 mb-6 border-b"
        >
          {[
            { id: "overview", label: "Overview" },
            { id: "users", label: "Users" },
            { id: "roles", label: "Roles & Permissions" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium transition ${
                activeTab === tab.id
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{users.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Total Roles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{roles.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Your Role
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold">
                  {user.roles.join(", ") || "User"}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Manage Users</CardTitle>
                <CardDescription>
                  View and manage all company users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left py-2">Name</th>
                        <th className="text-left py-2">Email</th>
                        <th className="text-left py-2">Roles</th>
                        <th className="text-left py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id} className="border-b hover:bg-gray-50">
                          <td className="py-3">
                            {u.firstName} {u.lastName}
                          </td>
                          <td className="py-3">{u.email}</td>
                          <td className="py-3">
                            {u.userRoles
                              .map((ur) => ur.role.name)
                              .join(", ") || "—"}
                          </td>
                          <td className="py-3">
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Roles Tab */}
        {activeTab === "roles" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {roles.map((role) => (
              <Card key={role.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{role.name}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Edit Role
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
