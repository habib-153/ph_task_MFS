import { baseApi } from "../../api/baseApi";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get user's balance and profile info
    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Send money to another user
    sendMoney: builder.mutation({
      query: (data) => ({
        url: "/transactions/send-money",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction", "User"],
    }),

    // Cash out to an agent
    cashOut: builder.mutation({
      query: (data) => ({
        url: "/transactions/cash-out",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction", "User"],
    }),

    // Get all transactions of current user
    getMyTransactions: builder.query({
      query: () => ({
        url: "/transactions/my-transactions",
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useSendMoneyMutation,
  useCashOutMutation,
  useGetMyTransactionsQuery,
} = transactionApi;