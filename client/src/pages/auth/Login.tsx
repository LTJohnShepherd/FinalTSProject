import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { validateUserLogin } from "../../utils/validation";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState<Map<string, string>>(new Map());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors.has(name)) {
      const newErrors = new Map(validationErrors);
      newErrors.delete(name);
      setValidationErrors(newErrors);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validate form first
    const errors = new Map<string, string>();
    const validation = validateUserLogin(formData);
    if (!validation.valid) {
      validation.errors.forEach((err) => errors.set(err.field, err.message));
      setValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const resp = await axios.post("http://localhost:3000/api/login", formData);
      const token = resp.data.token;
      localStorage.setItem("userToken", token);
      navigate("/dashboard");
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setSubmitError(err.response?.data?.message || "Login failed");
      } else {
        setSubmitError("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (name: string) => validationErrors.get(name);

  const renderField = (
    name: string,
    label: string,
    type: string = "text",
    placeholder: string = ""
  ) => {
    const hasError = !!getFieldError(name);
    const isFocused = focusedField === name;
    return (
      <div key={name} className="relative">
        <label
          htmlFor={name}
          className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2.5"
        >
          {label}
        </label>
        {type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            value={formData[name as keyof typeof formData] as string}
            onChange={handleInputChange}
            onFocus={() => setFocusedField(name)}
            onBlur={() => setFocusedField(null)}
            placeholder={placeholder}
            className={`w-full px-4 py-3 rounded-xl font-medium text-gray-900 placeholder-gray-400 transition-all duration-300 border-2 outline-none ${
              hasError
                ? "border-red-500 bg-red-50/50 focus:border-red-600 focus:ring-2 focus:ring-red-200"
                : isFocused
                ? "border-blue-500 bg-blue-50/30 focus:ring-2 focus:ring-blue-200"
                : "border-gray-200 hover:border-gray-300"
            }`}
          />
        ) : (
          <input
            id={name}
            type={type}
            name={name}
            value={formData[name as keyof typeof formData] as string}
            onChange={handleInputChange}
            onFocus={() => setFocusedField(name)}
            onBlur={() => setFocusedField(null)}
            placeholder={placeholder}
            className={`w-full px-4 py-3 rounded-xl font-medium text-gray-900 placeholder-gray-400 transition-all duration-300 border-2 outline-none ${
              hasError
                ? "border-red-500 bg-red-50/50 focus:border-red-600 focus:ring-2 focus:ring-red-200"
                : isFocused
                ? "border-blue-500 bg-blue-50/30 focus:ring-2 focus:ring-blue-200"
                : "border-gray-200 hover:border-gray-300"
            }`}
          />
        )}
        {hasError && (
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
            {getFieldError(name)}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
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
          <div className="bg-linear-to-r from-blue-600 to-purple-600 px-8 py-10 text-white">
            <h1 className="text-4xl font-bold mb-2">User Login</h1>
            <p className="text-blue-100 text-lg">
              Access your dashboard
            </p>
          </div>

          {/* Form Fields */}
          <div className="px-8 py-10 space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {renderField("email", "Email Address", "email", "john@example.com")}
              {renderField("password", "Password", "password", "••••••••")}
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
                  : "bg-linear-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95"
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
                  Logging in...
                </>
              ) : (
                <>
                  <span>Login</span>
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
          Your information is secure and confidential
        </p>
      </div>
    </div>
  );
};

export default Login;
