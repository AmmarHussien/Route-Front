import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 247px;
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
    background-color: #eff6ff;
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: #005379;
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
            <img
              id="dashboard-img"
              src="/Dashboard.svg"
              alt="Dashboard"
              width="30"
              height="30"
            />
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
            <img
              id="users-img"
              src="/Users.svg"
              alt="Users"
              width="30"
              height="30"
            />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/adminpanel/drivers">
            <img
              id="drivers-img"
              src="/Drivers.svg"
              alt="Drivers"
              width="30"
              height="30"
            />
            <span>Drivers</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/adminpanel/rides">
            <img
              id="rides-img"
              src="/Rides.svg"
              alt="Rides"
              width="30"
              height="30"
            />
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
          <StyledNavLink to="/documents">
            <HiOutlineCog6Tooth />
            <span>Documents</span>
          </StyledNavLink>
        </li> */}

        <li>
          <StyledNavLink to="/adminpanel/rating">
            <img
              id="rating-img"
              src="/Rating.svg"
              alt="Rating"
              width="30"
              height="30"
            />
            <span>Rating</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/adminpanel/profit">
            <img
              id="Profit-img"
              src="/Profit.svg"
              alt="Profit"
              width="30"
              height="30"
            />
            <span>Profit</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/adminpanel/push-notification">
            <img
              id="Notification-img"
              src="/Notification.svg"
              alt="Notification"
              width="30"
              height="30"
            />
            <span>Push Notification</span>
          </StyledNavLink>
        </li>
        {/* <li>
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
