import { baseApi } from "../../api/baseApi";

const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Cash in (initiated by agent for a user)
    cashIn: builder.mutation({
      query: (data) => ({
        url: "/transactions/cash-in",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction", "User"],
    }),

    // Request balance recharge from admin
    requestBalanceRecharge: builder.mutation({
      query: (data) => ({
        url: "/balance-requests/cerate-balanceRequest",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BalanceRequest"],
    }),

    // Get balance requests created by the agent
    getMyBalanceRequests: builder.query({
      query: () => ({
        url: "/balance-requests",
        method: "GET",
      }),
      providesTags: ["BalanceRequest"],
    }),
  }),
});

export const {
  useCashInMutation,
  useRequestBalanceRechargeMutation,
  useGetMyBalanceRequestsQuery,
} = agentApi;