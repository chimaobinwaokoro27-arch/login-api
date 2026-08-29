import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#07101a] flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#07101a] px-5 py-10 text-white">

      {/* Background */}
      <div className="fixed inset-0 -z-0 bg-gradient-to-br from-[#062b69] via-[#07101a] to-[#02060a]" />

      <div className="relative z-10 mx-auto max-w-4xl">

        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-white/50">ACCOUNT</p>
            <h1 className="text-3xl font-bold">
              My Profile
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/20"
          >
            Sign out
          </button>
        </header>

        {/* Profile card */}
        <section className="overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur-xl">

          <div className="h-32 bg-gradient-to-r from-blue-950 to-blue-700" />

          <div className="px-6 pb-8 sm:px-10">

            {/* Avatar */}
            <div className="-mt-16 mb-6">
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="h-32 w-32 rounded-full border-4 border-[#07101a] object-cover shadow-xl"
              />
            </div>

            {/* Name */}
            <h2 className="text-3xl font-bold">
              {user.firstName} {user.lastName}
            </h2>

            <p className="mt-1 text-white/50">
              @{user.username}
            </p>

            {/* Details */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-wider text-white/40">
                  Full Name
                </p>

                <p className="mt-2 font-semibold">
                  {user.firstName} {user.lastName}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-wider text-white/40">
                  Username
                </p>

                <p className="mt-2 font-semibold">
                  {user.username}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 sm:col-span-2">
                <p className="text-xs uppercase tracking-wider text-white/40">
                  Email
                </p>

                <p className="mt-2 font-semibold break-all">
                  {user.email}
                </p>
              </div>

            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Profile;