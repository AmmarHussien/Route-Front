import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === "ar-EG" ? "rtl" : "ltr";
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        {i18n.language === "en-US" ? `🇬🇧 English` : `🇪🇬 العربية`}
      </DropdownButton>
      {isOpen && (
        <DropdownMenu>
          <DropdownItem onClick={() => changeLanguage("en-US")}>
            🇬🇧 English
          </DropdownItem>
          <DropdownItem onClick={() => changeLanguage("ar-EG")}>
            🇪🇬 العربية
          </DropdownItem>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

// Styled Components
const DropdownContainer = styled.div`
  display: flex;
  position: relative;
  display: inline-block;
  width: 100px;
  cursor: pointer;
`;

const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  /* font-size: 18px; */
  display: flex;
  align-items: center;
  color: black;
`;

const DropdownMenu = styled.div`
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  background-color: #20232a;
  cursor: pointer;
  border: 1px solid #ccc;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1;
  border-radius: 4px;
`;

const DropdownItem = styled.button`
  background-color: transparent;
  border: none;
  padding: 10px 10px;
  text-align: left;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  color: white;
`;

export default LanguageToggle;
