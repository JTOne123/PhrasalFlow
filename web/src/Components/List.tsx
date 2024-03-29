import { Entity } from "../DTO/Entity";
import { useTranslation } from "react-i18next";
import ListItem from "./ListItem";

interface ListProps {
  results: Entity[] | null;
}

function List({ results }: ListProps) {
  const { t } = useTranslation();

  return (
    <div>
      {results ? (
        results.map((entity, index) => (
          <ListItem key={index} item={entity} />
        ))
      ) : (
        <p>{t("No results available.")}</p>
      )}
    </div>
  );
}

export default List;