"use client";
import { useEffect, useState } from "react";

export default function UsersList() {
   const [users, setUsers] = useState<unknown[]>([]);
   const [error, setError] = useState("");

   useEffect(() => {
      async function fetchUsers() {
         const res = await fetch("/api/supabase/me");
         const json = await res.json();

         if (res.ok) setUsers(json.data);
         else setError(json.error);
      }

      fetchUsers();
   }, []);

   if (error) return <pre>Error: {error}</pre>;

   return <pre>{JSON.stringify(users, null, 2)}</pre>;
}
