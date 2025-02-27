import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaMoneyBillWave } from "react-icons/fa";
import { Spin } from "antd";
import { useGetMyTransactionsQuery } from "../../redux/features/transaction/transactionApi";
import { TTransaction } from "../../types/userManagement.type";

const TransactionsHistory = () => {
  const { data: transactionsData, isLoading } =
    useGetMyTransactionsQuery(undefined);
  const [filter, setFilter] = useState("all");

  if (isLoading) {
    return <Spin size="default" />;
  }

  const transactions = transactionsData?.data || [];

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((tx : TTransaction) => tx.type === filter);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Transaction History
        </h2>

        {/* Filter Options */}
        <div className="mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md ${
                filter === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("sendMoney")}
              className={`px-4 py-2 rounded-md ${
                filter === "sendMoney"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              Send Money
            </button>
            <button
              onClick={() => setFilter("cashOut")}
              className={`px-4 py-2 rounded-md ${
                filter === "cashOut"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              Cash Out
            </button>
            <button
              onClick={() => setFilter("cashIn")}
              className={`px-4 py-2 rounded-md ${
                filter === "cashIn"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              Cash In
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        {filteredTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fee
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction : TTransaction) => (
                  <motion.tr
                    key={transaction._id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {transaction.transactionId}
                    </td>
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
                      ৳{transaction.fee || 0}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.createdAt).toLocaleString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No transactions found
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TransactionsHistory;