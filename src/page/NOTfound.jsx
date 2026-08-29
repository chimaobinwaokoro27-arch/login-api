import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#07101a] px-5 flex items-center justify-center text-white">
      <div className="text-center">

        <p className="text-8xl font-black text-white/10">
          404
        </p>

        <h1 className="mt-[-20px] text-3xl font-bold">
          Page not found
        </h1>

        <p className="mt-3 text-white/50">
          The page you're looking for doesn't exist.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-7 rounded-full bg-white px-7 py-3 font-bold text-[#07101a] transition hover:bg-white/90"
        >
          Back to Login
        </button>

      </div>
    </main>
  );
}

export default NotFound;