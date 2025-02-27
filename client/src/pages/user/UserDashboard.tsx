import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaEye,
  FaEyeSlash,
  FaPaperPlane,
  FaMoneyBillWave,
  FaHistory,
  FaUser,
} from "react-icons/fa";
import { useGetMeQuery } from "../redux/features/user/userApi";
import { useGetMyTransactionsQuery } from "../redux/features/transaction/transactionApi";
import Loading from "../components/ui/Loading";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  const { data: userData, isLoading: userLoading } = useGetMeQuery(undefined);
  const { data: transactionsData, isLoading: transactionsLoading } =
    useGetMyTransactionsQuery(undefined);

  if (userLoading || transactionsLoading) {
    return <Loading />;
  }

  const recentTransactions = transactionsData?.data?.slice(0, 5) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <motion.div
          className="bg-white rounded-lg shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Your Balance
            </h2>
            <button
              onClick={() => setIsBalanceVisible(!isBalanceVisible)}
              className="text-blue-500 focus:outline-none"
            >
              {isBalanceVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="flex items-center">
            <span className="text-3xl font-bold text-blue-600">
              {isBalanceVisible
                ? `৳ ${userData?.data?.balance || 0}`
                : "••••••"}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {isBalanceVisible ? "Tap to hide" : "Tap to view"}
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="bg-white rounded-lg shadow-md p-6 col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/send-money")}
              className="flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 p-4 rounded-lg"
            >
              <FaPaperPlane className="text-blue-500 text-2xl mb-2" />
              <span className="text-gray-700">Send Money</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/cash-out")}
              className="flex flex-col items-center justify-center bg-green-50 hover:bg-green-100 p-4 rounded-lg"
            >
              <FaMoneyBillWave className="text-green-500 text-2xl mb-2" />
              <span className="text-gray-700">Cash Out</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/transactions")}
              className="flex flex-col items-center justify-center bg-purple-50 hover:bg-purple-100 p-4 rounded-lg"
            >
              <FaHistory className="text-purple-500 text-2xl mb-2" />
              <span className="text-gray-700">History</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/profile")}
              className="flex flex-col items-center justify-center bg-yellow-50 hover:bg-yellow-100 p-4 rounded-lg"
            >
              <FaUser className="text-yellow-500 text-2xl mb-2" />
              <span className="text-gray-700">Profile</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        className="mt-8 bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Recent Transactions
          </h2>
          <button
            onClick={() => navigate("/transactions")}
            className="text-sm text-blue-500 hover:underline"
          >
            View All
          </button>
        </div>

        {recentTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr
                    key={transaction._id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center 
                          ${
                            transaction.type === "sendMoney"
                              ? "bg-blue-100 text-blue-500"
                              : transaction.type === "cashOut"
                              ? "bg-red-100 text-red-500"
                              : "bg-green-100 text-green-500"
                          }`}
                        >
                          {transaction.type === "sendMoney" ? (
                            <FaPaperPlane />
                          ) : transaction.type === "cashOut" ? (
                            <FaMoneyBillWave />
                          ) : (
                            <FaPaperPlane className="transform rotate-180" />
                          )}
                        </div>
                        <div className="ml-3">
                          <span className="text-sm font-medium text-gray-900">
                            {transaction.type === "sendMoney"
                              ? "Send Money"
                              : transaction.type === "cashOut"
                              ? "Cash Out"
                              : "Cash In"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`text-sm font-semibold ${
                          transaction.type === "cashIn"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "cashIn" ? "+ " : "- "}৳
                        {transaction.amount}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No recent transactions found
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;