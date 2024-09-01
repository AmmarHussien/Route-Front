import { Button } from "@mui/material";
import { useMoveBack } from "../../hooks/useMoveBack";
import ButtonText from "../../ui/ButtonText";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import InformationItemTable from "./InformationItemTable";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      //gap: 1.6rem;
      align-items: start;
    `}
`;

const userData = {
  userName: "John Doe",
  carModel: "Toyota Camry",
  palletNumber: "ABC-1234",
  licenseExpiryDate: "2026-05-01",
  phoneNumber: "123-456-7890",
  requestDate: "2024-05-01",
};

const issueData = {
  issueDetails:
    "I have an issue that the car is not moving  and i tried to do all the check ups but nothing worked",
};

function ServiceInformation() {
  const moveBack = useMoveBack();
  const navigete = useNavigate();

  return (
    <>
      <Row type="horizontal">
        <Row type="vertical">
          <ButtonText onClick={moveBack}>&larr; Car Services</ButtonText>
          <h1>Service Information</h1>
        </Row>
        <Row type="horizontal">
          <Button
            onClick={() => {
              navigete("/adminpanel/edit-car-services");
            }}
            variant="contained"
            //startIcon={<AddIcon />}
            sx={{
              width: 155,
              height: 56,
              borderRadius: 5,
              fontSize: 12,
              fontWeight: 600,
              background: "#005379",
              shadow: "0 4 60 0 #0038FF26",
            }}
          >
            Edit Request
          </Button>
          <Button
            onClick={() => {
              //navigate("/add-car-services");
            }}
            variant="contained"
            //startIcon={<AddIcon />}
            sx={{
              width: 155,
              height: 56,
              borderRadius: 5,
              fontSize: 12,
              fontWeight: 600,
              color: "#005379",
              background: "#EFF6FF",
              shadow: "0 4 60 0 #0038FF26",
              "&:hover": {
                background: "#EFF6FF",
                boxShadow: "0 4px 60px 0 #0038FF26",
              },
            }}
          >
            Cancel Request
          </Button>
        </Row>
      </Row>

      <Row type="vertical">
        <InformationItemTable data={userData} title="Basic Info" />
      </Row>

      <Row type="vertical">
        <InformationItemTable data={issueData} title="Service Info" />
      </Row>
    </>
  );
}

export default ServiceInformation;
