import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { toast } from "sonner";
import { verifyToken } from "../utils/verifyToken";
import { useState } from "react";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email or Mobile Number is required"),
  password: z.string().length(5, "PIN must be exactly 5 digits"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const [defaultValues, setDefaultValues] = useState({});

  const handleDemoLogin = (role: "user" | "admin") => {
    const credentials =
      role === "user"
        ? { email: "user@gmail.com", password: "12312" }
        : { email: "admin@gmail.com", password: "13579" };
    setDefaultValues(credentials);
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");
    try {
      const res = await login(data);

      if (res?.data?.error) {
        toast.error("Invalid credentials", { id: toastId });
      } else {
        const user = verifyToken(res?.data?.data?.accessToken);
        dispatch(setUser({ user: user, token: res?.data?.data?.accessToken }));
        toast.success("Welcome to Mobile Financial Service!", { id: toastId });
        navigate("/");
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8"
        >
          <motion.h1
            className="text-3xl font-bold text-center mb-6 text-red-600"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
          >
            Mobile Financial Service
            <span className="block text-lg text-gray-600">Secure Login</span>
          </motion.h1>

          <PHForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            resolver={zodResolver(loginSchema)}
          >
            <PHInput
              type="text"
              name="email"
              label="Email"
            />
            <PHInput name="password" type="password" label="PIN" />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
              type="submit"
            >
              Login
            </motion.button>
          </PHForm>

          <div className="mt-6 space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => handleDemoLogin("user")}
              className="w-full py-2 border-2 border-red-200 rounded-md text-red-500"
            >
              Try Demo User Account
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => handleDemoLogin("admin")}
              className="w-full py-2 border-2 border-red-200 rounded-md text-red-500"
            >
              Try Demo Admin Account
            </motion.button>
          </div>

          <motion.div
            className="mt-6 text-center text-gray-600"
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/register" className="text-red-500 hover:underline">
              Create New Account
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;