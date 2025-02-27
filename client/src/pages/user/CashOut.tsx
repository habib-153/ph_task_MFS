import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCashOutMutation } from "../../redux/features/transaction/transactionApi";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";


const cashOutSchema = z.object({
  agentPhone: z.string().min(11, "Valid agent phone number is required"),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be greater than 0",
  }),
  pin: z.string().length(5, "PIN must be exactly 5 digits"),
});

const CashOut = () => {
  const navigate = useNavigate();
  const [cashOut, { isLoading }] = useCashOutMutation();
  const [amount, setAmount] = useState(0);
  const fee = amount * 0.015;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const onSubmit = async (data: any) => {
    const payload = {
      agentPhone: data.agentPhone,
      amount: Number(data.amount),
      pin: data.pin,
    };

    const toastId = toast.loading("Processing transaction...");
    try {
      const result = await cashOut(payload).unwrap();
      toast.success("Cash out successful!", { id: toastId });
      navigate("/dashboard", {
        state: { transactionSuccess: true, details: result.data },
      });
    } catch (error) {
      toast.error("Failed to cash out. Please check your details.", {
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
        <h2 className="text-2xl font-semibold text-center text-green-600 mb-6">
          Cash Out
        </h2>

        <PHForm onSubmit={onSubmit} resolver={zodResolver(cashOutSchema)}>
          <PHInput
            type="text"
            name="agentPhone"
            label="Agent's Phone Number"
            placeholder="e.g. 01712345678"
          />

          <PHInput
            name="amount"
            label="Amount (Taka)"
            type="number"
            placeholder="Enter amount"
            onChangeFn={handleAmountChange}
          />

          {amount > 0 && (
            <div className="mb-4 p-3 bg-green-50 rounded-md">
              <p className="text-sm text-gray-600">
                Cash Out Fee (1.5%):{" "}
                <span className="font-semibold">৳{fee.toFixed(2)}</span>
              </p>
              <p className="text-sm text-gray-600">
                Total Amount:{" "}
                <span className="font-semibold">
                  ৳{(amount + fee).toFixed(2)}
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
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 disabled:bg-green-300"
          >
            {isLoading ? "Processing..." : "Cash Out"}
          </motion.button>
        </PHForm>

        <div className="mt-6">
          <h3 className="text-md font-semibold text-gray-700 mb-2">
            Please Note:
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-600">
            <li>A fee of 1.5% will be charged for cash-out transactions</li>
            <li>Please verify agent's phone number before proceeding</li>
            <li>Only approved agents can process cash-out transactions</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default CashOut;