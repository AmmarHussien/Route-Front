import styled from "styled-components";
import Logout from "../features/authentication/Logout";

import { IoMdNotificationsOutline } from "react-icons/io";

import ButtonIcon from "./ButtonIcon";
import LanguageToggle from "./LanguageToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  return (
    <StyledHeaderMenu>
      {/* <li>
        <ButtonIcon onClick={() => navigate("")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li> */}

      <li>
        <LanguageToggle />
      </li>

      <li>
        <ButtonIcon>
          <IoMdNotificationsOutline />
        </ButtonIcon>
      </li>

      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
