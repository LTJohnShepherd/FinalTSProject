import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  fieldOfInterest: string;
  role?: string;
  registrationDate: string;
  registrationTime: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    // Redirect to login if no valid token
    let token: string | null = null;
    try {
      token = localStorage.getItem("adminToken");
    } catch {}
    if (!token) {
      navigate("/admin/login");
      return;
    }
    // simple expiration check without extra dependency
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        // token expired
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }
    } catch {}

    // attach header for future requests
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    fetchStudents();
  }, [navigate]);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:3000/api/admin/students");
      setStudents(response.data.data || []);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch students");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      setIsExporting(true);
      const response = await axios.get(
        "http://localhost:3000/api/admin/export-csv",
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `students_${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(
        axios.isAxiosError(err)
          ? err.response?.data?.message || "Export failed"
          : "An error occurred during export"
      );
    } finally {
      setIsExporting(false);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("adminToken");
      delete axios.defaults.headers.common["Authorization"];
    } catch (e) {}
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <div className="relative backdrop-blur-sm bg-white/6 border-b border-white/6">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">
              Admin Dashboard
            </h1>
            <p className="text-xs text-blue-200">Manage registrations and export data</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="backdrop-blur-xl bg-white/6 border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider">
                  Total Registrations
                </p>
                <p className="text-3xl font-bold text-white mt-2">
                  {students.length}
                </p>
              </div>
              <div className="p-3 bg-blue-500/12 rounded-lg">
                <svg className="w-6 h-6 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="2" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="16" cy="8" r="2" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 20c2-3 6-4 10-4s8 1 10 4" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/6 border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-xs font-semibold uppercase tracking-wider">
                  Export Ready
                </p>
                <p className="text-3xl font-bold text-white mt-2">
                  {students.length > 0 ? "Ready" : "N/A"}
                </p>
              </div>
              <div className="p-3 bg-green-500/12 rounded-lg">
                <svg className="w-6 h-6 text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3v12" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 11l4 4 4-4" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 20h16" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/6 border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-xs font-semibold uppercase tracking-wider">
                  Last Updated
                </p>
                <p className="text-3xl text-white mt-2 font-bold">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              <div className="p-3 bg-purple-500/12 rounded-lg">
                <svg className="w-6 h-6 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 8v5l3 2" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border-2 border-red-500/50 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-red-400 shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-red-300 font-semibold">{error}</p>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="mb-6 flex justify-between items-center gap-3 flex-wrap">
          <button
            onClick={fetchStudents}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-lg transition duration-200 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Loading...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </>
            )}
          </button>

          <button
            onClick={handleExportCSV}
            disabled={isExporting || students.length === 0}
            className="px-4 py-2 bg-linear-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:opacity-50 text-white font-medium rounded-lg transition duration-200 flex items-center gap-2"
          >
            {isExporting ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Exporting...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2m0 0v-8m0 8l-6-4m6 4l6-4" />
                </svg>
                Export to CSV
              </>
            )}
          </button>
        </div>

        {/* Table */}
        <div className="backdrop-blur-xl bg-white/6 border border-white/10 rounded-lg overflow-hidden">
          {students.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-300 text-lg font-semibold">
                {isLoading ? "Loading registrations..." : "No registrations yet"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">
                      Field
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {students.map((student) => (
                    <tr
                      key={student._id}
                      className="hover:bg-white/5 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-white">
                        {student.firstName} {student.lastName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {student.phone}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold">
                          {student.fieldOfInterest}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {new Date(student.registrationDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {new Date(student.registrationTime).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
