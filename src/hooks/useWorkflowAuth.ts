import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface WorkflowSession {
  id: string;
  name: string;
  loginAt: string;
}

export function useWorkflowAuth(redirectTo: string = "/login") {
  const [session, setSession] = useState<WorkflowSession | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("workflow_session");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as WorkflowSession;
        // Check if session is less than 24 hours old
        const loginTime = new Date(parsed.loginAt).getTime();
        const now = Date.now();
        const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
          setSession(parsed);
        } else {
          localStorage.removeItem("workflow_session");
          navigate(redirectTo);
        }
      } catch {
        localStorage.removeItem("workflow_session");
        navigate(redirectTo);
      }
    } else {
      navigate(redirectTo);
    }
    setLoading(false);
  }, [navigate, redirectTo]);

  const logout = () => {
    localStorage.removeItem("workflow_session");
    navigate(redirectTo);
  };

  return { session, loading, logout };
}
