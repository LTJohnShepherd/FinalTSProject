import { Link } from "react-router";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-900 to-cyan-900 text-white flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl mx-auto rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-sky-500/20 to-fuchsia-500/20 pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 lg:p-12 text-left">
            <span className="inline-flex items-center rounded-full bg-indigo-100/30 px-3 py-1 text-xs uppercase tracking-[0.2em] text-indigo-100 font-bold mb-4">
              University Portal
            </span>
            <h1 className="text-4xl sm:text-5xl font-black leading-tight">
              Empower Your Campus Journey
            </h1>
            <p className="mt-4 text-slate-200 max-w-xl leading-relaxed">
              Apply, track your schedule, and stay connected with faculty and peers through our secure student platform. Manage everything from one dashboard designed for modern university life.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to="/auth/login"
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-sm sm:text-base font-semibold text-white transition hover:from-blue-400 hover:to-indigo-500 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <span className="inline-flex h-2 w-2 rounded-full bg-cyan-200" />
                Student Login
              </Link>
              <Link
                to="/admin/login"
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-slate-800/70 px-4 py-3 text-sm sm:text-base font-semibold text-white transition hover:bg-slate-700 hover:border-cyan-300 hover:text-cyan-100 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span className="inline-flex h-2 w-2 rounded-full bg-amber-300" />
                Admin Login
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
              <div className="rounded-xl border border-white/15 bg-white/5 p-3">
                <p className="font-semibold text-white">Fully Verified Data</p>
                <p className="mt-1 text-slate-300">Secure identity & application tracking for every student.</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/5 p-3">
                <p className="font-semibold text-white">One-Stop Campus Hub</p>
                <p className="mt-1 text-slate-300">From course registration to announcements and admin workflows.</p>
              </div>
            </div>
          </div>

          <div className="relative p-8 lg:p-12 flex items-center justify-center bg-gradient-to-br from-slate-900/50 via-indigo-900/40 to-cyan-900/50">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <div className="text-left">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200 font-semibold">Next Cohort</p>
                <h2 className="mt-2 text-2xl font-bold text-white">Fall 2026 Admission</h2>
                <p className="mt-2 text-slate-300 text-sm">Start your journey with expert mentorship, multidisciplinary majors, and modern campus tools.</p>

                <div className="mt-4 space-y-2 text-sm text-slate-100">
                  <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400"/> Live virtual orientation</div>
                  <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400"/> Smart scheduling + notifications</div>
                  <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400"/> Dedicated student support team</div>
                </div>

                <div className="mt-6">
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-white bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-xl hover:scale-[1.02] transition"
                  >
                    Start Application
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
