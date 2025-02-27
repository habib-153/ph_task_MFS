import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useSendMoneyMutation } from "../redux/features/transaction/transactionApi";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const sendMoneySchema = z.object({
  receiverPhone: z.string().min(11, "Valid phone number is required"),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 50, {
    message: "Amount must be at least 50 taka",
  }),
  pin: z.string().length(5, "PIN must be exactly 5 digits"),
});

const SendMoney = () => {
  const navigate = useNavigate();
  const [sendMoney, { isLoading }] = useSendMoneyMutation();
  const [fee, setFee] = useState(0);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = Number(e.target.value);
    setFee(amount > 100 ? 5 : 0);
  };

  const onSubmit = async (data: any) => {
    const payload = {
      receiverPhone: data.receiverPhone,
      amount: Number(data.amount),
      pin: data.pin,
    };

    const toastId = toast.loading("Processing transaction...");
    try {
      const result = await sendMoney(payload).unwrap();
      toast.success("Money sent successfully!", { id: toastId });
      navigate("/dashboard", {
        state: { transactionSuccess: true, details: result.data },
      });
    } catch (error) {
      toast.error("Failed to send money. Please check your details.", {
        id: toastId,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          Send Money
        </h2>

        <PHForm onSubmit={onSubmit} resolver={zodResolver(sendMoneySchema)}>
          <PHInput
            name="receiverPhone"
            label="Recipient's Phone Number"
            placeholder="e.g. 01712345678"
          />

          <PHInput
            name="amount"
            label="Amount (Taka)"
            type="number"
            min={50}
            placeholder="Minimum 50 taka"
            onChange={handleAmountChange}
          />

          {fee > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-gray-600">
                Transaction Fee: <span className="font-semibold">৳{fee}</span>
              </p>
              <p className="text-sm text-gray-600">
                Total Amount:{" "}
                <span className="font-semibold">
                  ৳
                  {Number(
                    document.querySelector('input[name="amount"]')?.value || 0
                  ) + fee}
                </span>
              </p>
            </div>
          )}

          <PHInput
            name="pin"
            label="PIN"
            type="password"
            placeholder="Enter your 5-digit PIN"
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isLoading ? "Processing..." : "Send Money"}
          </motion.button>
        </PHForm>

        <div className="mt-6">
          <h3 className="text-md font-semibold text-gray-700 mb-2">
            Please Note:
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-600">
            <li>Minimum amount to send is 50 taka</li>
            <li>
              A fee of 5 taka will be charged for transactions over 100 taka
            </li>
            <li>Please verify recipient's phone number before sending</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default SendMoney;