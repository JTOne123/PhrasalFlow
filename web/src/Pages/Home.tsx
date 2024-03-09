// Home.js
import React, { useState } from "react";
import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SearchBox from "../Components/SearchBox";
import List from "../Components/List";
import DataFetcher from "../Components/DataFetcher";
import { useDispatch, useSelector } from "react-redux";
import { Entity } from "../DTO/Entity";
import { setError, setResults } from "../Redux/actions";

type RootState = {
    searchResults: Entity[] | null; // Replace YourEntityType with the actual type
    error: string | null;
    // Add other properties if present in your actual state
  };

function Home() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { searchResults, error } = useSelector((state: RootState) => state);
  const [query, setQuery] = useState("");

  const handleSearch = (newQuery: any) => {
    setQuery(newQuery);
  };

  const handleSuccess = (data: any) => {
    const mappedResults = data.map((item: any) => ({
      id: item.id,
      name: item.name,
      // Map other properties as needed
    }));
    dispatch(setResults(mappedResults));
  };

  const handleError = () => {
    dispatch(setError());
  };

  return (
    <Stack direction="vertical" gap={2}>
      <h1>{t("Home")}</h1>
      <SearchBox onSearch={handleSearch} />
      <DataFetcher query={query} onSuccess={handleSuccess} onError={handleError} />
      <List results={searchResults} />
      {error && <p>{error}</p>}
    </Stack>
  );
}

export default Home;
