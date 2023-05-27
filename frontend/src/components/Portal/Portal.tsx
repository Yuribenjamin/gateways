import { createPortal } from "react-dom";

import { StyledPortalContent, StyledPortalWrapper } from "./Portal.styles";
import { IPortalProps } from "./Portal.types";
import { StyledButton } from "../../styles/Global.styles";
import { CloseIcon } from "../../icons";

const Portal: React.FC<IPortalProps> = ({ children, onClose }) => {
	return createPortal(
		<StyledPortalWrapper>
			<StyledPortalContent>
				<StyledButton type="button" onClick={onClose}>
					<CloseIcon />
				</StyledButton>
				{children}
			</StyledPortalContent>
		</StyledPortalWrapper>,
		document.body
	);
};

export default Portal;
