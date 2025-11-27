import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase
      .from("Users")
      .select("Email, Password")
      .eq("Email", email)
      .single();

    setLoading(false);

    if (error || !data) {
      setErrorMsg("Invalid email or password.");
      return;
    }

    const isPasswordValid = password === data.Password;

    if (!isPasswordValid) {
      setErrorMsg("Invalid email or password.");
      return;
    }

    localStorage.setItem("email", JSON.stringify(email));
    localStorage.setItem("password", JSON.stringify(password));

    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      
      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24 py-12">
        
        {/* LOGO */}
        <div className="mb-10">
          <img
            src="/logo.svg"
            className="w-[180px] md:w-[220px]"
            alt="Logo"
          />
          <p className="text-[#572E91] text-xl font-semibold mt-3">
            We are excited to have you here!
          </p>
          <p className="text-gray-600 mt-1">Login with shared credentials</p>
        </div>

        {/* FORM */}
        <div className="max-w-sm space-y-6">
          {errorMsg && (
            <p className="text-red-600 text-sm font-medium">{errorMsg}</p>
          )}

          {/* EMAIL */}
          <div className="space-y-1">
            <Label className="text-base text-gray-800">Enter Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[46px] bg-[#F7EFE6] border border-[#EFE4D9] focus:ring-2 focus:ring-[#A11D8C]"
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-1">
            <Label className="text-base text-gray-800">Enter password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-[46px] bg-[#F7EFE6] border border-[#EFE4D9] focus:ring-2 focus:ring-[#A11D8C]"
            />
          </div>

          {/* BUTTON */}
          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#FF8C42] hover:bg-[#ff9c60] text-white text-base font-medium h-[48px] rounded-md flex items-center justify-center"
          >
            {loading ? "Logging in..." : "Login"}
            <ChevronRight className="ml-1 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="w-full md:w-1/2 bg-[#F8F1E7] flex justify-center items-center px-4 md:px-8 py-10">
        <img
          src="/login.png"
          alt="Illustration"
          className="w-full max-w-lg object-contain"
        />
      </div>
    </div>
  );
};

export default Login;
