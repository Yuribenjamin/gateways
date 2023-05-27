import React from "react";

import GetGateway from "../GetGateway";
import { Loading } from "../Loading/Loading";

import {
	useGetAllGatewaysQuery,
	usePostCreateADeviceMutation,
	useDeleteAGatewayMutation,
	useDeleteADeviceMutation,
} from "../../store/service";

import { IDevice, IGateway } from "../../types";
import { DeleteIcon } from "../../icons";
import {
	ShowGatewaysContainer,
	ShowGatewaysWrapper,
	StyledShowGateway,
	StyledCreatedDevice,
	StyledDeviceForm,
} from "./ShowGateways.styles";
import { StyledButton } from "../../styles/Global.styles";
import { showGateWayConstant } from "../../constants";

const ShowGateways: React.FC = () => {
	const [deviceVendor, setDeviceVendor] = React.useState<string>();
	const [deviceStatus, setDeviceStatus] = React.useState<string>();
	const [isOpenGatewayModal, setIsOpenGatewayModal] = React.useState<boolean>();
	const [theGatewayId, setTheGatewayId] = React.useState<string>();

	const { data: getAllGetways, isLoading: isGetwaysLoading } =
		useGetAllGatewaysQuery();

	const [createADevice, { isLoading: isCreateADeviceLoading }] =
		usePostCreateADeviceMutation();

	const [deleteAGateway] = useDeleteAGatewayMutation();
	const [deleteADevice] = useDeleteADeviceMutation();

	const handleCreateDevice = async (
		event: React.FormEvent<HTMLFormElement>,
		gateWayId: IGateway["_id"]
	) => {
		event.preventDefault();
		if (deviceVendor == null || deviceStatus == null) return;

		await createADevice({
			gateWayId: gateWayId,
			device: {
				vendor: deviceVendor,
				status: deviceStatus,
			},
		});

		setDeviceVendor("");
		setDeviceStatus("");
	};

	const handleDeleteGateway = async (gateWayId: IGateway["_id"]) => {
		await deleteAGateway({ gateWayId });
	};

	const handleDeleteDevice = async (
		gateWayId: IGateway["_id"],
		deviceId: IDevice["_id"]
	) => {
		await deleteADevice({ gateWayId, deviceId });
	};

	const handleOpenGateWayModal = (gateWayId: IGateway["_id"]) => {
		setIsOpenGatewayModal(!isOpenGatewayModal);
		setTheGatewayId(gateWayId);
	};

	return (
		<ShowGatewaysContainer>
			{isGetwaysLoading ? (
				<Loading />
			) : (
				<ShowGatewaysWrapper>
					{getAllGetways?.map((gateway: IGateway) => (
						<StyledShowGateway key={gateway.serial}>
							<div>
								<p>{showGateWayConstant.SHOW_GATEWAY_DETAILS}</p>
								<button
									type="button"
									onClick={() => handleOpenGateWayModal(gateway._id)}
								>
									{showGateWayConstant.SHOW_DETALIS}
								</button>
							</div>
							<p>{`Gateway Serial: ${gateway.serial}`}</p>
							<p>{`Gateway Name: ${gateway.name}`}</p>
							<p>{`Gateway IPv4: ${gateway.ip}`}</p>
							<div>
								<StyledButton
									type="button"
									onClick={() => {
										handleDeleteGateway(gateway._id);
									}}
								>
									<p>{showGateWayConstant.DELETE_GATEWAY}</p>
									<DeleteIcon />
								</StyledButton>
							</div>
							<p>Devices: </p>
							{gateway.devices.map((device: IDevice) => (
								<div key={device._id}>
									<p>{`Device Vendor: ${device.vendor}`}</p>
									<p>{`Device Status: ${device.status}`}</p>
									<div>
										<StyledButton
											onClick={() => {
												handleDeleteDevice(gateway._id, device._id);
											}}
										>
											<p>{showGateWayConstant.DELETE_DEVICE}</p>
											<DeleteIcon />
										</StyledButton>
									</div>
								</div>
							))}
							<div>
								<h1>{showGateWayConstant.CREATE_A_DEVICE}</h1>
								{isCreateADeviceLoading ? (
									<Loading />
								) : (
									<StyledCreatedDevice>
										<StyledDeviceForm
											onSubmit={(event) =>
												handleCreateDevice(event, gateway._id)
											}
										>
											<label htmlFor="vendor">
												{showGateWayConstant.VENDOR}
											</label>
											<input
												type="text"
												id="vendor"
												required
												onChange={(event) =>
													setDeviceVendor(event.target.value)
												}
											/>
											<label htmlFor="status">
												{showGateWayConstant.STATUS}
											</label>
											<input
												type="text"
												id="status"
												required
												onChange={(event) =>
													setDeviceStatus(event.target.value)
												}
											/>
											<button type="submit">
												{showGateWayConstant.CREATE_A_DEVICE}
											</button>
										</StyledDeviceForm>
									</StyledCreatedDevice>
								)}
							</div>
						</StyledShowGateway>
					))}
				</ShowGatewaysWrapper>
			)}
			{isOpenGatewayModal ? (
				<GetGateway
					isOpenGatewayModal={isOpenGatewayModal}
					setIsOpenGatewayModal={setIsOpenGatewayModal}
					theGatewayId={String(theGatewayId)}
				/>
			) : null}
		</ShowGatewaysContainer>
	);
};

export default ShowGateways;
