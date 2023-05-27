import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGateway, IDevice } from "../../types";

export const GATEWAYS_API_KEY = "gatewaysApi";
export const gateWaysApi = createApi({
	reducerPath: GATEWAYS_API_KEY,
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
	refetchOnFocus: true,
	tagTypes: ["Gateways"],
	endpoints: (builder) => ({
		getAllGateways: builder.query<IGateway[], void>({
			query: () => ({
				url: "/gateways",
				method: "GET",
			}),
			providesTags: ["Gateways"],
		}),
		getGatewayById: builder.query<IGateway, { gateWayId: IGateway["_id"] }>({
			query: ({ gateWayId }) => ({
				url: `/gateways/${gateWayId}`,
				method: "GET",
			}),
		}),
		postCreateAGateway: builder.mutation<IGateway, Partial<IGateway>>({
			query: ({ serial, name, ip }) => ({
				url: "/gateways",
				method: "POST",
				accept: "application/json",
				body: {
					serial,
					name,
					ip,
				},
			}),
			invalidatesTags: ["Gateways"],
		}),
		postCreateADevice: builder.mutation<
			IDevice,
			{ gateWayId: IGateway["_id"]; device: Partial<IDevice> }
		>({
			query: ({ gateWayId, device }) => ({
				url: `/gateways/devices/${gateWayId}/devices`,
				method: "POST",
				accept: "application/json",
				body: device,
			}),
			invalidatesTags: ["Gateways"],
		}),
		deleteAGateway: builder.mutation<IGateway, { gateWayId: IGateway["_id"] }>({
			query: ({ gateWayId }) => ({
				url: `/gateways/${gateWayId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Gateways"],
		}),
		deleteADevice: builder.mutation<
			IDevice,
			{ gateWayId: IGateway["_id"]; deviceId: IDevice["_id"] }
		>({
			query: ({ gateWayId, deviceId }) => ({
				url: `/gateways/devices/${gateWayId}/devices/${deviceId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Gateways"],
		}),
	}),
});

export const {
	useGetAllGatewaysQuery,
	useGetGatewayByIdQuery,
	usePostCreateAGatewayMutation,
	usePostCreateADeviceMutation,
	useDeleteAGatewayMutation,
	useDeleteADeviceMutation,
} = gateWaysApi;
