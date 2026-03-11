const Register = () => {
  return (
    <div className="flex items-center h-fit w-[200px] bg-white p-2">
      <form
        action="http://localhost:3000/api/register"
        method="post"
        className="flex flex-col gap-2"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="border"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="border"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="p-4 bg-green-500 border rounded-full"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
