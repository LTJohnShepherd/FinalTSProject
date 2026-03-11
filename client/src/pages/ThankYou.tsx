import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const ThankYou = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Success Container */}
      <div className="relative z-10 w-full max-w-7xl">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div
            className={`transform transition-all duration-1000 ${
              animate ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          >
            <div className="w-24 h-24 rounded-full bg-linear-to-r from-emerald-400 to-green-500 flex items-center justify-center shadow-2xl shadow-emerald-500/50">
              <svg
                className="w-12 h-12 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center space-y-6">
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <h1 className="text-5xl font-black text-white mb-2 leading-tight">
              Success!
            </h1>
            <p className="text-xl text-emerald-200 font-semibold">
              Your registration is complete
            </p>
          </div>

          <div
            className={`transform transition-all duration-1000 delay-500 ${
              animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <p className="text-gray-300 text-base leading-relaxed max-w-sm mx-auto">
              Thank you for your interest in our programs. We've received your
              information and will review it shortly.
            </p>
          </div>

          {/* Email Notification */}
          <div
            className={`transform transition-all duration-1000 delay-700 ${
              animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-3">
                <p className="text-emerald-300 font-semibold text-sm">
                  Confirmation email sent
                </p>
              </div>
              <p className="text-emerald-200 text-xs">
                Check your inbox for a confirmation message with next steps.
              </p>
            </div>
          </div>

          {/* Button */}
          <div
            className={`transform transition-all duration-1000 delay-1000 pt-4 ${
              animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <button
              onClick={() => navigate("/")}
              className="w-full py-4 px-6 bg-linear-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              Return to Home
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>

          {/* Additional Info */}
          <div
            className={`transform transition-all duration-1000 delay-1200 pt-4 ${
              animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <p className="text-gray-400 text-xs font-medium">
              Registration Reference: {Math.random().toString(36).substring(7).toUpperCase()}
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div
          className={`grid grid-cols-2 gap-4 mt-12 transform transition-all duration-1000 delay-1300 ${
            animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
            <div className="text-emerald-400 mb-2">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <p className="text-white font-semibold text-xs">Processing</p>
            <p className="text-gray-400 text-xs mt-1 text-[0.7rem]">
              We're reviewing your details
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
            <div className="text-emerald-400 mb-2">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 1 1 0 000-2A4 4 0 000 5v10a4 4 0 004 4h12a4 4 0 004-4V5a4 4 0 00-4-4 1 1 0 000 2 2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-white font-semibold text-xs">Next Steps</p>
            <p className="text-gray-400 text-xs mt-1 text-[0.7rem]">
              Check your email soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
