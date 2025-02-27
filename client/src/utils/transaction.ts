export const calculateFee = (
  amount: number,
  type: "sendMoney" | "cashOut"
): number => {
  if (type === "sendMoney") {
    return amount > 100 ? 5 : 0;
  } else if (type === "cashOut") {
    return amount * 0.015; // 1.5% fee
  }
  return 0;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 2,
  }).format(amount);
};

export const getTransactionTypeDisplay = (type: string): string => {
  switch (type) {
    case "sendMoney":
      return "Send Money";
    case "cashOut":
      return "Cash Out";
    case "cashIn":
      return "Cash In";
    default:
      return type;
  }
};