import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      align-items: start;
    `}
`;

const TableContainer = styled.div`
  width: 100%;
  margin: 10px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  height: fit-content;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5em;
  color: #333;
`;

const Table = styled.div`
  width: 100%;
  border-collapse: collapse;
`;
const RowItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;

  background-color: ${(props) => (props.$even ? "#f1f1f1" : "#f9f9f9")};
`;
const Label = styled.div`
  flex: 1;
  font-weight: 700px;
  text-transform: capitalize;
  color: #72788e;
`;

const Value = styled.div`
  flex: 1;

  ${(props) =>
    props.lang === "ar-Eg" &&
    css`
      text-align: right;
    `}

  ${(props) =>
    props.lang === "en-US" &&
    css`
      text-align: left;
    `}

  font-weight: 600px;
  color: #272424;
`;

const Missing = styled.p`
  flex: 1;

  ${(props) =>
    props.lang === "ar-Eg" &&
    css`
      text-align: right;
    `}

  ${(props) =>
    props.lang === "en-US" &&
    css`
      text-align: left;
    `}

font-weight: 600px;

  color: #f50606;
`;

const View = styled.div`
  flex: 1;
  ${(props) =>
    props.lang === "ar-Eg" &&
    css`
      text-align: right;
    `}

  ${(props) =>
    props.lang === "en-US" &&
    css`
      text-align: left;
    `}
 
  font-weight: 600px;
  color: #1447d4;
`;
const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  ${(props) =>
    props.lang === "ar-Eg" &&
    css`
      margin-left: 20px;
    `}

  ${(props) =>
    props.lang === "en-US" &&
    css`
      margin-right: 20px;
    `}
  
  background: #6366f1;
  color: white;
`;

const Text = styled.p`
  color: #72788e;
  font-size: 12px;
  font-weight: 400;
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;
function DriverInformationWithImage({ data, title }) {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  if (!data === null) return <Empty>{t("NoData")}</Empty>;

  return (
    <TableContainer>
      <Title>{title}</Title>
      <Table>
        {Object.entries(data).map(([key, value], index, array) => {
          if (key === "Email" || key === "البريد الإلكتروني") return null;
          return (
            <RowItem key={key} $even={index % 2 === 1}>
              {(key === "User Name" || key === "اسم المستخدم") &&
              key !== "nationalId" &&
              key !== "driverLicense" &&
              key !== "profileImage" &&
              key !== "carLicenseExpiry" &&
              key !== "towTruckRegistration" &&
              key !== "criminalRecord" &&
              key !== "carImage" ? (
                <Row type="horizontal">
                  <Avatar lang={isRTL ? "ar-Eg" : "en-US"}>
                    <p>
                      {
                        value
                          .split(" ") // Split the string into words
                          .slice(0, 2) // Take the first two words
                          .map((word) => word[0].toUpperCase()) // Get the first letter of each word and make it uppercase
                          .join(" ") // Join the letters with a space
                      }
                    </p>
                  </Avatar>
                  <Row type="vertical">
                    {value}
                    {index < array.length - 1 && (
                      <Text> {array[index + 1][1]}</Text>
                    )}
                  </Row>
                </Row>
              ) : key === "National Id" ||
                key === "الرقم الوطني" ||
                key === "profile Image" ||
                key === "الصورة الشخصية" ||
                key === "Driver License" ||
                key === "رخصة القيادة" ||
                key === "Criminal Record" ||
                key === "السجل الجنائي" ||
                key === "Vehicle Image" ||
                key === "صورة السيارة" ||
                key === "Vehicle License" ||
                key === "رخصة السيارة" ||
                key === "Tow Truck Registration" ||
                key === "تسجيل شاحنة السحب" ? (
                <>
                  <Label>{key.replace(/([A-Z])/g, " $1")}</Label>
                  <View>
                    {value === "" ? (
                      <Missing>Missing</Missing>
                    ) : (
                      <Link to={value} target="_blank">
                        {t("View")}
                      </Link>
                    )}
                  </View>
                </>
              ) : (
                <>
                  <Label>{key.replace(/([A-Z])/g, " $1")}</Label>
                  {value === "" ? (
                    <Missing>Missing</Missing>
                  ) : (
                    <Value>{value}</Value>
                  )}
                </>
              )}
            </RowItem>
          );
        })}
      </Table>
    </TableContainer>
  );
}

export default DriverInformationWithImage;
