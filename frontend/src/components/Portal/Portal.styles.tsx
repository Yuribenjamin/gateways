import { styled } from "styled-components";

const StyledPortalWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99999;
	background: rgba(0, 0, 0, 0.2);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledPortalContent = styled.div`
	display: flex;
	flex-direction: column;
	background: #fff;
	border-radius: 16px;
	box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
	padding: 1rem;

	button {
		align-self: end;
	}
`;

export { StyledPortalWrapper, StyledPortalContent };
