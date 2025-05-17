import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getRequest } from "../../utils/api";
import { useRequireAuth } from "@/utils/useRequireAuth";

interface UserData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  sex: string;
  role: string;
  __v: number;
}

const LecturerProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const data = await getRequest("lecturer/me", token);
        setUserData(data);
      } catch (error: unknown) {
        console.error(
          "Error fetching user profile:",
          error instanceof Error ? error.message : error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  useRequireAuth();

  return (
    <div className=" min-h-screen bg-[#6c757d0d] p-4">
      <Card className="w-full max-w-5xl shadow-lg ml-[60%] mt-12">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800 text-center">
            User Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-6">
          {loading ? (
            <>
              {["ID", "Name", "Email", "Phone", "Sex", "Role"].map((label) => (
                <div className="flex items-center" key={label}>
                  <span className="font-medium text-gray-700 w-32">
                    {label}:
                  </span>
                  <Skeleton className="h-6 w-full" />
                </div>
              ))}
            </>
          ) : userData ? (
            <>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-32">ID:</span>
                <span className="text-gray-600">{userData._id}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-32">Name:</span>
                <span className="text-gray-600">{userData.name}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-32">Email:</span>
                <span className="text-gray-600">{userData.email}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-32">Phone:</span>
                <span className="text-gray-600">{userData.phone}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-32">Sex:</span>
                <span className="text-gray-600">{userData.sex}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-32">Role:</span>
                <span className="text-gray-600">{userData.role}</span>
              </div>
            </>
          ) : (
            <div className="text-red-500 text-center">
              Failed to load profile.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LecturerProfile;
