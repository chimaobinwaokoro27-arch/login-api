import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setChecking(false);
        return;
      }

      try {
        const response = await fetch("https://dummyjson.com/auth/me", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (!response.ok) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          setChecking(false);
          return;
        }

        const user = await response.json();

        localStorage.setItem("user", JSON.stringify(user));

        navigate("/profile", { replace: true });
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      } finally {
        setChecking(false);
      }
    };

    checkSession();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30,
        }),
      });

      if (!response.ok) {
        setError("Username or password is incorrect.");
        setLoading(false);
        return;
      }

      const data = await response.json();

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data));

      navigate("/profile", { replace: true });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[#07101a] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
          <p className="text-white/70">Checking your session...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07101a] flex items-center justify-center px-5 py-10">

      {/* Blue brick wall */}
      <div className="absolute inset-x-0 bottom-0 h-[72%] overflow-hidden">
        <div className="absolute inset-0 bg-[#062b69]" />

        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(#0d4b91 2px, transparent 2px),
              linear-gradient(90deg, #0d4b91 2px, transparent 2px)
            `,
            backgroundSize: "95px 48px",
          }}
        />

        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 49%, #001b45 50%, transparent 51%),
              linear-gradient(transparent 49%, #001b45 50%, transparent 51%)
            `,
            backgroundSize: "190px 96px",
          }}
        />
      </div>

      {/* Warm light */}
      <div className="absolute bottom-[43%] left-1/2 -translate-x-1/2">
        <div className="h-28 w-[430px] rounded-full bg-yellow-100/40 blur-3xl" />
      </div>

      <div className="absolute bottom-[48%] left-1/2 -translate-x-1/2 h-4 w-48 rounded-full bg-yellow-100 shadow-[0_0_60px_35px_rgba(255,225,160,0.45)]" />

      {/* Login card */}
      <section className="relative z-10 w-full max-w-[500px]">

        <div className="rounded-3xl border border-white/20 bg-white/15 p-7 shadow-2xl backdrop-blur-xl sm:p-10">

          {/* Heading */}
          <div className="mb-9 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Login
            </h1>

            <p className="mt-2 text-sm text-white/60">
              Welcome back
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full rounded-full border border-white/20 bg-white/10 py-4 pl-6 pr-14 text-white outline-none placeholder:text-white/70 transition focus:border-white/50 focus:bg-white/15"
              />

              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white">
                <UserIcon />
              </span>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-full border border-white/20 bg-white/10 py-4 pl-6 pr-14 text-white outline-none placeholder:text-white/70 transition focus:border-white/50 focus:bg-white/15"
              />

              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white">
                <LockIcon />
              </span>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-300/20 bg-red-500/15 px-4 py-3 text-center text-sm text-red-100">
                {error}
              </div>
            )}

            {/* Remember */}
            <div className="flex items-center justify-between gap-3 px-2 text-sm text-white/90">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-white"
                />
                <span>Remember me</span>
              </label>

              <span className="cursor-default text-white/80">
                Forgot password?
              </span>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-white py-4 text-base font-bold text-[#0b1b35] transition hover:bg-white/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Assignment doesn't require registration */}
          <p className="mt-7 text-center text-xs text-white/50">
            Secure access to your profile
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;