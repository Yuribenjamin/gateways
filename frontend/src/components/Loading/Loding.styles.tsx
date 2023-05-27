import styled from "styled-components";

const SectionContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
`;

const Spinner = styled.div`
	border: 6px solid #f3f3f3;
	border-top: 6px solid #0f0f;
	border-radius: 50%;
	width: 100px;
	height: 100px;
	animation: spin 2s linear infinite;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
`;

export { SectionContent, Spinner };
