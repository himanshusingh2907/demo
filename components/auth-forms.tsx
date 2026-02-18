"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
} from "lucide-react";

export function LoginForm({ onSwitchToRegister }: { onSwitchToRegister: () => void }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await login(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-balance">
          Welcome back
        </h1>
        <p className="mt-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
          Sign in to access your notes
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="login-email"
            className="text-sm font-medium"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Email
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "hsl(var(--muted-foreground))" }}
            />
            <input
              id="login-email"
              type="email"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                "w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm outline-none transition-colors",
                "placeholder:text-[hsl(var(--muted-foreground))]",
                "focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent",
                errors.email
                  ? "border-[hsl(var(--destructive))]"
                  : "border-[hsl(var(--border))]"
              )}
              style={{
                backgroundColor: "hsl(var(--card))",
                color: "hsl(var(--foreground))",
              }}
            />
          </div>
          {errors.email && (
            <p className="text-xs" style={{ color: "hsl(var(--destructive))" }}>
              {errors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="login-password"
            className="text-sm font-medium"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "hsl(var(--muted-foreground))" }}
            />
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                "w-full rounded-lg border py-2.5 pl-10 pr-10 text-sm outline-none transition-colors",
                "placeholder:text-[hsl(var(--muted-foreground))]",
                "focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent",
                errors.password
                  ? "border-[hsl(var(--destructive))]"
                  : "border-[hsl(var(--border))]"
              )}
              style={{
                backgroundColor: "hsl(var(--card))",
                color: "hsl(var(--foreground))",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: "hsl(var(--muted-foreground))" }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs" style={{ color: "hsl(var(--destructive))" }}>
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{
            backgroundColor: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
          }}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Sign In
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <p
        className="mt-6 text-center text-sm"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        {"Don't have an account? "}
        <button
          onClick={onSwitchToRegister}
          className="font-semibold underline-offset-2 hover:underline"
          style={{ color: "hsl(var(--primary))" }}
        >
          Create one
        </button>
      </p>
    </div>
  );
}

export function RegisterForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
  }>({});

  const validate = () => {
    const newErrors: { username?: string; email?: string; password?: string } = {};
    if (!username.trim()) newErrors.username = "Username is required";
    else if (username.trim().length < 2)
      newErrors.username = "Username is too short";
    else if (username.trim().length > 50)
      newErrors.username = "Username is too long";

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Must be at least 8 characters";
    else if (!/[A-Z]/.test(password))
      newErrors.password = "Must contain an uppercase letter";
    else if (!/[a-z]/.test(password))
      newErrors.password = "Must contain a lowercase letter";
    else if (!/[0-9]/.test(password))
      newErrors.password = "Must contain a number";
    else if (!/[^A-Za-z0-9]/.test(password))
      newErrors.password = "Must contain a special character";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await register(username, email, password);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-balance">
          Create your account
        </h1>
        <p className="mt-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
          Start organizing your notes today
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="reg-username"
            className="text-sm font-medium"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Username
          </label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "hsl(var(--muted-foreground))" }}
            />
            <input
              id="reg-username"
              type="text"
              placeholder="JaneDoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={cn(
                "w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm outline-none transition-colors",
                "placeholder:text-[hsl(var(--muted-foreground))]",
                "focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent",
                errors.username
                  ? "border-[hsl(var(--destructive))]"
                  : "border-[hsl(var(--border))]"
              )}
              style={{
                backgroundColor: "hsl(var(--card))",
                color: "hsl(var(--foreground))",
              }}
            />
          </div>
          {errors.username && (
            <p className="text-xs" style={{ color: "hsl(var(--destructive))" }}>
              {errors.username}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="reg-email"
            className="text-sm font-medium"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Email
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "hsl(var(--muted-foreground))" }}
            />
            <input
              id="reg-email"
              type="email"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                "w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm outline-none transition-colors",
                "placeholder:text-[hsl(var(--muted-foreground))]",
                "focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent",
                errors.email
                  ? "border-[hsl(var(--destructive))]"
                  : "border-[hsl(var(--border))]"
              )}
              style={{
                backgroundColor: "hsl(var(--card))",
                color: "hsl(var(--foreground))",
              }}
            />
          </div>
          {errors.email && (
            <p className="text-xs" style={{ color: "hsl(var(--destructive))" }}>
              {errors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="reg-password"
            className="text-sm font-medium"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "hsl(var(--muted-foreground))" }}
            />
            <input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                "w-full rounded-lg border py-2.5 pl-10 pr-10 text-sm outline-none transition-colors",
                "placeholder:text-[hsl(var(--muted-foreground))]",
                "focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent",
                errors.password
                  ? "border-[hsl(var(--destructive))]"
                  : "border-[hsl(var(--border))]"
              )}
              style={{
                backgroundColor: "hsl(var(--card))",
                color: "hsl(var(--foreground))",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: "hsl(var(--muted-foreground))" }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs" style={{ color: "hsl(var(--destructive))" }}>
              {errors.password}
            </p>
          )}
          <ul
            className="mt-1 flex flex-col gap-0.5 text-xs"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            <li className={password.length >= 8 ? "text-emerald-600" : ""}>
              At least 8 characters
            </li>
            <li className={/[A-Z]/.test(password) ? "text-emerald-600" : ""}>
              One uppercase letter
            </li>
            <li className={/[0-9]/.test(password) ? "text-emerald-600" : ""}>
              One number
            </li>
            <li className={/[^A-Za-z0-9]/.test(password) ? "text-emerald-600" : ""}>
              One special character
            </li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{
            backgroundColor: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
          }}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Create Account
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <p
        className="mt-6 text-center text-sm"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        Already have an account?{" "}
        <button
          onClick={onSwitchToLogin}
          className="font-semibold underline-offset-2 hover:underline"
          style={{ color: "hsl(var(--primary))" }}
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
