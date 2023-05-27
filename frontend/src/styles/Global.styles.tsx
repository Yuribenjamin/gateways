import { styled } from "styled-components";

const StyledButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: transparent;
	border: none;
	cursor: pointer;
`;

const StyledError = styled.span`
	color: red;
`;

export { StyledButton, StyledError };
