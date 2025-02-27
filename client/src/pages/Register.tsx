import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import PHSelect from "../components/form/PHSelect";
import { useRegisterMutation } from "../redux/features/auth/authApi";

const registerSchema = z
  .object({
    name: z.object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
    }),
    email: z.string().email("Invalid email address"),
    password: z.string().length(5, "PIN must be exactly 5 digits"),
    confirmPassword: z.string(),
    phoneNumber: z.string().min(10, "Mobile number is required"),
    accountType: z.enum(["Agent", "User"]).refine((val) => val !== undefined, {
      message: "Account type is required",
    }),
    nid: z.string().min(10, "NID is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating account...");
    try {
      const formData = new FormData();
      if (imageFile) {
        formData.append("image", imageFile);
      }
      formData.append("data", JSON.stringify(data));
      const res = await register(formData);
      if ("error" in res) {
        toast.error("Registration failed", { id: toastId });
      } else {
        toast.success("Registration successful!", { id: toastId });
        navigate("/login");
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
            className="text-3xl font-bold text-center mb-4 text-red-600"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
          >
            Create Account
            <span className="block text-lg text-gray-600">
              Join Our Mobile Financial Service
            </span>
          </motion.h1>

          <PHForm onSubmit={onSubmit} resolver={zodResolver(registerSchema)}>
            <div className="grid grid-cols-2 gap-4">
              <PHInput name="name.firstName" label="First Name" type="text" />
              <PHInput name="name.lastName" label="Last Name" type="text" />
            </div>
            <PHInput name="email" label="Email Address" type="email" />
            <PHInput name="password" label="PIN" type="password" />
            <PHInput
              name="confirmPassword"
              label="Confirm PIN"
              type="password"
            />
            <PHInput name="phoneNumber" label="Mobile Number" type="text" />
            <PHInput name="nid" label="NID" type="text" />
            <PHSelect
              name="accountType"
              label="Account Type"
              options={[
                { value: "Agent", label: "Agent" },
                { value: "User", label: "User" },
              ]}
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <input
                type="file"
                name="profileImg"
                accept="image/*"
                onChange={handleImageChange}
                title="Choose a profile image"
                placeholder="Choose a profile image"
                className="mt-1 block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-red-50 file:text-red-600
                          hover:file:bg-red-100"
              />
              {imagePreview && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2"
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-full mx-auto"
                  />
                </motion.div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
            >
              Register
            </motion.button>
          </PHForm>

          <motion.div
            className="mt-6 text-center text-gray-600"
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/login" className="text-red-500 hover:underline">
              Already have an account? Login
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;