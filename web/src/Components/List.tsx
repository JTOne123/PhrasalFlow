import { Button, Card } from "react-bootstrap";
import { Entity } from "../DTO/Entity";
import { useTranslation } from "react-i18next";

interface ListProps {
  results: Entity[] | null;
}

function List({ results }: ListProps) {
  const { t } = useTranslation();

  return (
    <div>
      {results ? (
        results.map((entity, index) => (
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>{entity.Name}</Card.Title>
              <Card.Text>
                {entity.HeaderDescription ? entity.FooterDescription : ""}
              </Card.Text>
              <Button variant="primary">{t("Open details")}</Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>{t("No results available.")}</p>
      )}
    </div>
  );
}

export default List;
