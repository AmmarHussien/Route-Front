import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import styled from "styled-components";
import Spinner from "../../../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import Row from "../../../../ui/Row";
import Heading from "../../../../ui/Heading";
import AddBrand from "./AddBrand";
import useGetManufactures from "./useGetManufactures";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px; /* Space between cards */
  margin: 20px; /* Add margin around the grid */
`;

function CarBrandLayout() {
  const { isLoading, manufactures } = useGetManufactures();
  const navigation = useNavigate();
  const { t } = useTranslation();

  const handleCardClick = (id, name) => {
    navigation(`/adminPanel/customization/userCar/${name}/${id}`);
  };

  useEffect(() => {}, [isLoading]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Row type="vertical">
          <Heading $variant="h1">{t("CarBrands")}</Heading>
        </Row>
        <AddBrand />
      </Row>
      <CardGrid>
        {manufactures.map((manufacture, index) => (
          <Card key={index} sx={{ maxWidth: 345, marginBottom: 2 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="300"
                image={manufacture.logo}
                alt={manufacture.name}
                key={manufacture.name}
                id={manufacture.id}
                onClick={() =>
                  handleCardClick(manufacture.id, manufacture.name)
                }
              />
              <CardContent sx={{ padding: 1 }}>
                <Typography gutterBottom variant="h4">
                  {manufacture.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </CardGrid>
    </>
  );
}

export default CarBrandLayout;
