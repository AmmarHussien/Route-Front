import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineUsers,
} from "react-icons/hi2";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-700);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/adminpanel/dashboard">
            <HiOutlineHome />
            <span>Dashboard</span>
          </StyledNavLink>
        </li>
        {/* <li>
          <StyledNavLink to="/car-services">
            <HiOutlineCalendarDays />
            <span>Car Services</span>
          </StyledNavLink>
        </li> */}
        <li>
          <StyledNavLink to="/adminpanel/users">
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/adminpanel/drivers">
            <HiOutlineUsers />
            <span>Drivers</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/adminpanel/rides">
            <HiOutlineCog6Tooth />
            <span>Rides</span>
          </StyledNavLink>
        </li>
        {/* <li>
          <StyledNavLink to="/vehicles">
            <HiOutlineCog6Tooth />
            <span>Vehicles</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/logistic">
            <HiOutlineCog6Tooth />
            <span>Logistic</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/profit">
            <HiOutlineCog6Tooth />
            <span>Profit</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/documents">
            <HiOutlineCog6Tooth />
            <span>Documents</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/push-notification">
            <HiOutlineCog6Tooth />
            <span>Push Notification</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/rating">
            <HiOutlineCog6Tooth />
            <span>Rating</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/promos">
            <HiOutlineCog6Tooth />
            <span>Promos</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/customisation">
            <HiOutlineCog6Tooth />
            <span>Customisation</span>
          </StyledNavLink>
        </li> */}
      </NavList>
    </nav>
  );
}

export default MainNav;
