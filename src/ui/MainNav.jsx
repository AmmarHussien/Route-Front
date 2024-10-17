import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

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

const DropdownContainer = styled.div`
  ${(props) =>
    props.lang === "ar-Eg" &&
    css`
      margin-right: 20px;
    `}

  ${(props) =>
    props.lang === "en-US" &&
    css`
      margin-left: 20px;
    `}
  
  /* margin-right: 20px; */
  display: flex;
  flex-direction: column;

  padding: 5px;

  &:hover > ul {
    display: block;
  }
`;

const DropdownItem = styled(StyledNavLink)`
  padding: 12px 16px;
  display: block;
  color: black;
  text-decoration: none;

  &:hover {
    background-color: #eff6ff;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 247px;
  gap: 0.8rem;
`;

function MainNav() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";

  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/adminPanel/dashboard">
            <img
              id="dashboard-img"
              src="/Dashboard.svg"
              alt="Dashboard"
              width="30"
              height="30"
            />
            <span>{t("NAVDashboard")}</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/adminPanel/users">
            <img
              id="users-img"
              src="/Users.svg"
              alt="Users"
              width="30"
              height="30"
            />
            <span>{t("NAVUsers")}</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/adminPanel/drivers">
            <img
              id="drivers-img"
              src="/Drivers.svg"
              alt="Drivers"
              width="30"
              height="30"
            />
            <span>{t("NAVDrivers")}</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/adminPanel/rides">
            <img
              id="rides-img"
              src="/Rides.svg"
              alt="Rides"
              width="30"
              height="30"
            />
            <span>{t("NAVRides")}</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/adminPanel/rating">
            <img
              id="rating-img"
              src="/Rating.svg"
              alt="Rating"
              width="30"
              height="30"
            />
            <span>{t("NAVRating")}</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/adminPanel/profit">
            <img
              id="Profit-img"
              src="/Profit.svg"
              alt="Profit"
              width="30"
              height="30"
            />
            <span>{t("NAVProfit")}</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/adminPanel/push-notification">
            <img
              id="Notification-img"
              src="/Notification.svg"
              alt="Notification"
              width="30"
              height="30"
            />
            <span>{t("NAVPushNotification")}</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/adminPanel/customization">
            <img
              id="Customization-img"
              src="/Customization.svg"
              alt="Customization"
              width="30"
              height="30"
            />
            <span>{t("NAVCustomization.Customization")}</span>
          </StyledNavLink>

          <DropdownContainer lang={isRTL ? "ar-Eg" : "en-US"}>
            <DropdownItem to="/adminPanel/customization/services">
              {t("NAVCustomization.Services")}
            </DropdownItem>
            <DropdownItem to="/adminPanel/customization/organization">
              {t("NAVCustomization.Organization")}
            </DropdownItem>
            <DropdownItem to="/adminPanel/customization/userCar">
              {t("NAVCustomization.UserCar")}
            </DropdownItem>
          </DropdownContainer>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
