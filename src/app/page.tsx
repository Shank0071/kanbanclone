
import KanbanBoard from "@/components/KanbanBoard";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { LoginButton, LogoutButton } from "./auth";
import Link from "next/link";
import Header from "@/components/header.component";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);


  return (
    <div>
      <Header />
    </div>
  );
}
