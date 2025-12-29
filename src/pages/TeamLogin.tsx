import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Lock, ArrowRight, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function TeamLogin() {
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("team_members")
        .select("id, name, is_active")
        .eq("access_code", code.trim())
        .single();

      if (error || !data) {
        toast({
          title: "Invalid Code",
          description: "The access code you entered is not valid.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (!data.is_active) {
        toast({
          title: "Access Disabled",
          description: "Your access has been disabled. Contact the admin.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Update last login
      await supabase
        .from("team_members")
        .update({ last_login_at: new Date().toISOString() })
        .eq("id", data.id);

      // Store session in localStorage
      localStorage.setItem("workflow_session", JSON.stringify({
        id: data.id,
        name: data.name,
        loginAt: new Date().toISOString(),
      }));

      toast({
        title: `Welcome, ${data.name}!`,
        description: "Redirecting to the workflow dashboard.",
      });

      navigate("/workflow");
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[hsl(0,0%,4%)] flex items-center justify-center px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[hsl(var(--workflow-purple)/0.15)] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[hsl(var(--workflow-violet)/0.15)] rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Back button */}
        <Link to="/" className="inline-flex items-center gap-2 text-[hsl(0,0%,55%)] hover:text-[hsl(0,0%,88%)] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Login Card */}
        <div className="bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,13%)] rounded-2xl p-8 shadow-2xl">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--workflow-purple))] to-[hsl(var(--workflow-violet))] rounded-2xl flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Header */}
          <h1 className="text-2xl font-bold text-center text-[hsl(0,0%,88%)] mb-2 font-display">
            Team Login
          </h1>
          <p className="text-center text-[hsl(0,0%,55%)] mb-8">
            Enter your access code to access<br />the workflow tool.
          </p>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[hsl(0,0%,88%)]">
                Access Code
              </label>
              <div className="relative">
                <Input
                  type={showCode ? "text" : "password"}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Your code..."
                  className="bg-[hsl(0,0%,10%)] border-[hsl(0,0%,18%)] text-[hsl(0,0%,88%)] placeholder:text-[hsl(0,0%,40%)] h-12 pr-12 focus:border-[hsl(var(--workflow-purple))] focus:ring-[hsl(var(--workflow-purple))]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(0,0%,40%)] hover:text-[hsl(0,0%,60%)] transition-colors"
                >
                  {showCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || !code.trim()}
              className="w-full h-12 bg-gradient-to-r from-[hsl(var(--workflow-purple))] to-[hsl(var(--workflow-violet))] hover:opacity-90 text-white font-medium"
            >
            {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Login
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-[hsl(0,0%,40%)] text-sm mt-6">
            No access? Apply{" "}
            <Link to="/apply" className="text-[hsl(var(--workflow-purple))] hover:underline">
              here
            </Link>
          </p>
        </div>

        {/* Info text */}
        <p className="text-center text-[hsl(0,0%,35%)] text-xs mt-6">
          StrichAbi Production Workflow Tool
        </p>
      </motion.div>
    </div>
  );
}
