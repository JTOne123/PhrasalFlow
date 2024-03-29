import { Button, Card } from "react-bootstrap";
import { Entity } from "../DTO/Entity";
import { useTranslation } from "react-i18next";

interface ListItemProps {
  item: Entity;
}

function ListItem({ item }: ListItemProps) {
  const { t } = useTranslation();

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={"/images/" + item.ImageUrls[0]} />
      <Card.Body>
        <Card.Title>{item.Name}</Card.Title>
        <Card.Text>
          {item.HeaderDescription ? item.FooterDescription : ""}
        </Card.Text>
        <Button variant="primary">{t("Open details")}</Button>
      </Card.Body>
    </Card>
  );
}

export default ListItem;