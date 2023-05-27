import styled from "styled-components";

const ShowGatewaysContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem;
`;

const ShowGatewaysWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: start;
	flex-wrap: wrap;
	flex: 1 1 auto;
`;

const StyledShowGateway = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid black;
	border-radius: 5px;
	padding: 1rem;
	margin: 1rem;
`;

const StyledCreatedDevice = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid black;
	border-radius: 5px;
	padding: 1rem;
	margin: 1rem;
`;

const StyledDeviceForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	input {
		padding: 0.5rem;
		border-radius: 8px;
		border: 1px solid #000;
		width: 100%;
	}
`;

export {
	ShowGatewaysContainer,
	ShowGatewaysWrapper,
	StyledShowGateway,
	StyledCreatedDevice,
	StyledDeviceForm,
};
