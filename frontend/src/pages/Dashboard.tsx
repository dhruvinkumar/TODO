import Appbar from "@/components/Appbar";
import Todos from "@/components/Todos";
import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  name: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/user/userinfo", {
      headers: {
        Authorization: localStorage.getItem("token") || '',
      },
    }).then((response) => {
      setUser(response.data);
    }).catch((error) => {
      console.error("Error fetching user info:", error);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Appbar user={user} /> */}

      <main className="p-5 md:p-10 lg:p-20 xl:p-10">
        <div className="container mx-auto">
          <section className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h1 className="text-2xl font-semibold mb-4">Welcome, {user?.name}</h1>
            <Todos />
          </section> 
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
