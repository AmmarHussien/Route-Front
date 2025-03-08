import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import Permission from "./permission";

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
          <StyledNavLink to="/dashboard">
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

        <Permission requiredPermissions="users">
          <li>
            <StyledNavLink to="/users">
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
        </Permission>

        <Permission requiredPermissions="drivers">
          <li>
            <StyledNavLink to="/drivers">
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
        </Permission>

        <Permission requiredPermissions="rides">
          <li>
            <StyledNavLink to="/rides">
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
        </Permission>

        <Permission requiredPermissions="rating">
          <li>
            <StyledNavLink to="/rating">
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
        </Permission>

        <Permission requiredPermissions="profit">
          <li>
            <StyledNavLink to="/profit">
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
        </Permission>

        <Permission requiredPermissions="notification">
          <li>
            <StyledNavLink to="/push-notification">
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
        </Permission>

        <Permission
          requiredPermissions={["organizations", "services", "manufactures"]}
        >
          <li>
            <StyledNavLink to="/customization">
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
              <Permission requiredPermissions="services">
                <DropdownItem key="services" to="/customization/services">
                  <img
                    id="services-img"
                    src="/services.svg"
                    alt="services"
                    width="30"
                    height="30"
                  />
                  {t("NAVCustomization.Services")}
                </DropdownItem>
              </Permission>
              <Permission requiredPermissions="organizations">
                <DropdownItem
                  key="organizations"
                  to="/customization/organization"
                >
                  <img
                    id="organization-img"
                    src="/organizational.svg"
                    alt="organizational"
                    width="30"
                    height="30"
                  />
                  {t("NAVCustomization.Organization")}
                </DropdownItem>
              </Permission>
              <Permission requiredPermissions="manufactures">
                <DropdownItem key="userCar" to="/customization/userCar">
                  <img
                    id="userCar-img"
                    src="/users_cars.svg"
                    alt="userCar"
                    width="30"
                    height="30"
                  />
                  {t("NAVCustomization.UserCar")}
                </DropdownItem>
              </Permission>
            </DropdownContainer>
          </li>
        </Permission>

        <Permission requiredPermissions={["admins", "roles"]}>
          <li>
            <StyledNavLink to="/setting">
              <img
                id="Setting-img"
                src="/Setting.svg"
                alt="Setting"
                width="30"
                height="30"
              />
              <span>{t("NAVSetting.Setting")}</span>
            </StyledNavLink>

            <DropdownContainer lang={isRTL ? "ar-Eg" : "en-US"}>
              <Permission requiredPermissions="admins">
                <DropdownItem key="admin" to="/setting/admin">
                  <img
                    id="services-img"
                    src="/services.svg"
                    alt="services"
                    width="30"
                    height="30"
                  />
                  {t("NAVSetting.Admin")}
                </DropdownItem>
              </Permission>
              <Permission requiredPermissions="roles">
                <DropdownItem key="role" to="/setting/role">
                  <img
                    id="organization-img"
                    src="/organizational.svg"
                    alt="organizational"
                    width="30"
                    height="30"
                  />
                  {t("NAVSetting.Role")}
                </DropdownItem>
              </Permission>
            </DropdownContainer>
          </li>
        </Permission>
      </NavList>
    </nav>
  );
}

export default MainNav;
