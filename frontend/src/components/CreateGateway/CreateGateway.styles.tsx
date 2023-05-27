import styled from "styled-components";

const StyledGatewayContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const StyledGatewayWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-bottom: 1px solid #000;
	padding: 0 0 1rem 0;
	width: 100%;
`;

const StyledGatewayForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	div {
		margin: 0.5rem 0;
	}

	label {
		margin-right: 0.5rem;
	}

	input {
		padding: 0.5rem;
		border-radius: 8px;
		border: 1px solid #000;
		width: 100%;
	}
`;

const StyledGateWayButton = styled.button`
	padding: 0.5rem;
	border-radius: 8px;
	border: 1px solid #000;
	width: 100%;
`;

export {
	StyledGatewayContainer,
	StyledGatewayWrapper,
	StyledGatewayForm,
	StyledGateWayButton,
};
