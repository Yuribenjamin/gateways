import React from "react";

import { usePostCreateAGatewayMutation } from "../../store/service";

import { Loading } from "../Loading/Loading";

import {
	StyledGatewayContainer,
	StyledGatewayWrapper,
	StyledGatewayForm,
	StyledGateWayButton,
} from "./CreateGateway.styles";
import { createGateWayConstant } from "../../constants";

const CreateGateway: React.FC = () => {
	const [gatewaysSerial, setGatewaysSerial] = React.useState<string>();
	const [gatewaysName, setGatewaysName] = React.useState<string>();
	const [gatewaysIp, setGatewaysIp] = React.useState<string>();

	const [createAGateway, { isLoading: isCreateAGatewayLoading }] =
		usePostCreateAGatewayMutation();

	const handleCreateGateway = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();
		if (gatewaysSerial == null || gatewaysName == null || gatewaysIp == null)
			return;
		await createAGateway({
			serial: gatewaysSerial,
			name: gatewaysName,
			ip: gatewaysIp,
		});
		setGatewaysSerial("");
		setGatewaysName("");
		setGatewaysIp("");
	};

	return (
		<StyledGatewayContainer>
			<StyledGatewayWrapper>
				<h1>{createGateWayConstant.CREATE_A_GATEWAY}</h1>
				{isCreateAGatewayLoading ? (
					<Loading />
				) : (
					<StyledGatewayForm onSubmit={(event) => handleCreateGateway(event)}>
						<div>
							<label htmlFor="serial">{createGateWayConstant.SERIAL}</label>
							<input
								type="text"
								id="serial"
								required
								onChange={(event) => setGatewaysSerial(event.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="name">{createGateWayConstant.NAME}</label>
							<input
								type="text"
								id="name"
								required
								onChange={(event) => setGatewaysName(event.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="ip">{createGateWayConstant.IPV4}</label>
							<input
								type="text"
								id="ip"
								required
								onChange={(event) => setGatewaysIp(event.target.value)}
							/>
						</div>
						<StyledGateWayButton type="submit">
							{createGateWayConstant.CREATE_A_GATEWAY}
						</StyledGateWayButton>
					</StyledGatewayForm>
				)}
			</StyledGatewayWrapper>
		</StyledGatewayContainer>
	);
};

export default CreateGateway;
