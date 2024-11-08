import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Spinner from "../../../ui/Spinner";
import useServices from "./useServices";
import styled from "styled-components";
import Row from "../../../ui/Row";
import Heading from "../../../ui/Heading";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px; /* Space between cards */
  margin: 20px; /* Add margin around the grid */
`;

const StyledCardMedia = styled(CardMedia)`
  filter: ${({ disabled }) => (disabled ? "grayscale(100%)" : "none")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

function ServicesLayout() {
  const { isLoading, services } = useServices();
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Row type="vertical">
          <Heading $variant="h1">{t("carService")}</Heading>
        </Row>
      </Row>

      <CardGrid>
        {services.map((services, index) => (
          <Card key={index} sx={{ maxWidth: 345, marginBottom: 2 }}>
            <CardActionArea>
              <StyledCardMedia
                component="img"
                height="300"
                disabled={!services.is_active}
                image={services.icon}
                alt={services.name}
                key={services.name}
                id={services.id}
                onClick={
                  services.is_active
                    ? () => {
                        navigate(
                          `/customization/services/viewServices/${services.id}`
                        );
                      }
                    : null
                }
              />
              <CardContent>
                <Typography gutterBottom variant="h4">
                  {services.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </CardGrid>
    </>
  );
}

export default ServicesLayout;
