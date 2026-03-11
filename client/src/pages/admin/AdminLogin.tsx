import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { validateAdminLogin } from "../../utils/validation";
import type { ValidationError } from "../../utils/validation";

interface AdminLoginForm {
  username: string;
  password: string;
}

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AdminLoginForm>({
    username: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState<
    Map<string, string>
  >(new Map());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (validationErrors.has(name)) {
      const newErrors = new Map(validationErrors);
      newErrors.delete(name);
      setValidationErrors(newErrors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const validation = validateAdminLogin(formData);
    if (!validation.valid) {
      const errorMap = new Map<string, string>();
      validation.errors.forEach((error: ValidationError) => {
        errorMap.set(error.field, error.message);
      });
      setValidationErrors(errorMap);
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post("http://localhost:3000/api/admin/login", formData);
      // mark admin as authenticated in localStorage (temporary client-side flag)
      try {
        localStorage.setItem("adminAuthenticated", "true");
      } catch (e) {
        // ignore storage errors
      }
      navigate("/admin/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setSubmitError(
          error.response?.data?.message || "Login failed. Please try again."
        );
      } else {
        setSubmitError("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return validationErrors.get(fieldName);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Form Container */}
      <div className="relative w-full max-w-md">
        {submitError && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border-2 border-red-500/50 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-red-600 shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-red-700 font-semibold text-sm">{submitError}</p>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-xl bg-white/95 rounded-2xl shadow-2xl overflow-hidden border border-white/20"
        >
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-8 py-10 text-white">
            <h1 className="text-4xl font-bold mb-2">Admin Access</h1>
            <p className="text-blue-100 text-lg">
              Manage registrations and export data
            </p>
          </div>

          {/* Form Fields */}
          <div className="px-8 py-10 space-y-6">
            {/* Username Field */}
            <div className="relative">
              <label
                htmlFor="username"
                className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2.5"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("username")}
                onBlur={() => setFocusedField(null)}
                placeholder="admin"
                className={`w-full px-4 py-3 rounded-xl font-medium text-gray-900 placeholder-gray-400 transition-all duration-300 border-2 outline-none ${
                  getFieldError("username")
                    ? "border-red-500 bg-red-50/50 focus:border-red-600 focus:ring-2 focus:ring-red-200"
                    : focusedField === "username"
                      ? "border-blue-500 bg-blue-50/30 focus:ring-2 focus:ring-blue-200"
                      : "border-gray-200 hover:border-gray-300"
                }`}
              />
              {getFieldError("username") && (
                <p className="mt-2 text-xs font-semibold text-red-600 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.101 12.93a1 1 0 00-1.414-1.414L10 14.586l-6.687-6.687a1 1 0 00-1.414 1.414l8.1 8.1a1 1 0 001.414 0l10.1-10.1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {getFieldError("username")}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-xl font-medium text-gray-900 placeholder-gray-400 transition-all duration-300 border-2 outline-none ${
                  getFieldError("password")
                    ? "border-red-500 bg-red-50/50 focus:border-red-600 focus:ring-2 focus:ring-red-200"
                    : focusedField === "password"
                      ? "border-blue-500 bg-blue-50/30 focus:ring-2 focus:ring-blue-200"
                      : "border-gray-200 hover:border-gray-300"
                }`}
              />
              {getFieldError("password") && (
                <p className="mt-2 text-xs font-semibold text-red-600 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.101 12.93a1 1 0 00-1.414-1.414L10 14.586l-6.687-6.687a1 1 0 00-1.414 1.414l8.1 8.1a1 1 0 001.414 0l10.1-10.1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {getFieldError("password")}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-lg uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                isSubmitting
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95"
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Accessing...
                </>
              ) : (
                <>
                  <span>Login to Dashboard</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer text */}
        <p className="text-center text-gray-400 text-xs mt-6 font-medium">
          Admin access only - Secure login required
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
