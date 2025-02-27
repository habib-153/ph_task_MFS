import { TQueryParams, TResponseRedux } from "../../../types/global";
import { TUser } from "../../../types/userManagement.type";
import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args) => {
        // console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        // console.log(params)
        return {
          url: "/users",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TUser[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    blockUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/block-user/${userId}`,
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),

    // Approve an agent
    approveAgent: builder.mutation({
      query: (agentId) => ({
        url: `/admin/approve-agent/${agentId}`,
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),

    // Add money to agent account
    addMoneyToAgent: builder.mutation({
      query: (data) => ({
        url: "/admin/add-money-to-agent",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users", "BalanceRequest"],
    }),

    // Get total money in system
    getTotalMoneyInSystem: builder.query({
      query: () => ({
        url: "/admin/total-money",
        method: "GET",
      }),
    }),

    // Get all balance requests for admin
    getAllBalanceRequests: builder.query({
      query: () => ({
        url: "/balance-requests",
        method: "GET",
      }),
      providesTags: ["BalanceRequest"],
    }),

    // Update balance request status (approve/reject)
    updateBalanceRequest: builder.mutation({
      query: ({ id, data }) => ({
        url: `/balance-requests/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["BalanceRequest", "Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useBlockUserMutation,
  useApproveAgentMutation,
  useAddMoneyToAgentMutation,
  useGetTotalMoneyInSystemQuery,
  useGetAllBalanceRequestsQuery,
  useUpdateBalanceRequestMutation,
} = adminApi;
