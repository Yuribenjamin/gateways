import { useGetGatewayByIdQuery } from "../../store/service";
import { Loading } from "../Loading/Loading";

import Portal from "../Portal";

import { IGetGateWayProps } from "./GetGateWay.types";
import { getGateWayConstant } from "../../constants";
import { StyledGetGatewayWrapper } from "./GetGateway.styles";

const GetGateway: React.FC<IGetGateWayProps> = ({
	isOpenGatewayModal,
	setIsOpenGatewayModal,
	theGatewayId,
}) => {
	const { data: getGatewayById, isLoading: isGatewayByIdLoading } =
		useGetGatewayByIdQuery(
			{ gateWayId: theGatewayId ?? "" },
			{ skip: theGatewayId == null }
		);
	return isOpenGatewayModal ? (
		<Portal onClose={() => setIsOpenGatewayModal(!isOpenGatewayModal)}>
			<StyledGetGatewayWrapper>
				<h1>{getGateWayConstant.GETWAY_BY_ID}</h1>
				{isGatewayByIdLoading ? (
					<Loading />
				) : (
					<div>
						<p>{`${getGateWayConstant.GATEWAY_SERIAL}: ${getGatewayById?.serial}`}</p>
						<p>{`${getGateWayConstant.GATEWAY_NAME}: ${getGatewayById?.name}`}</p>
						<p>{`${getGateWayConstant.GETWAY_BY_ID}: ${getGatewayById?._id}`}</p>
						<p>{`${getGateWayConstant.GATEWAY_IPV4}: ${getGatewayById?.ip}`}</p>
					</div>
				)}
			</StyledGetGatewayWrapper>
		</Portal>
	) : null;
};

export default GetGateway;
