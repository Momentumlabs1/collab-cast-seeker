import { Outlet } from "react-router-dom";
import WorkflowSidebar from "./WorkflowSidebar";
import { useWorkflowAuth } from "@/hooks/useWorkflowAuth";

export default function WorkflowLayout() {
  const { session, loading, logout } = useWorkflowAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(0,0%,4%)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[hsl(var(--workflow-purple)/0.3)] border-t-[hsl(var(--workflow-purple))] rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[hsl(0,0%,4%)] flex">
      <WorkflowSidebar userName={session.name} onLogout={logout} />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
