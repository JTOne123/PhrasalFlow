import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SearchBox from "../Components/SearchBox";
import List from "../Components/List";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVerbs,
  LoadingStatus,
  searchVerbsForGridResults,
  selectAllVerbs,
  VerbState,
} from "../Redux/verbSlice";

function Home() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");

  const handleSearch = (newQuery: any) => {
    setQuery(newQuery);

    dispatch(searchVerbsForGridResults(newQuery));
  };

  const dispatch = useDispatch();

  const verbs: VerbState = useSelector(selectAllVerbs);

  const verbStatus = useSelector((state: any) => {
    return state.verbs.status;
  });

  const error = useSelector((state: any) => state.verbs.error);

  useEffect(() => {
    if (verbStatus === LoadingStatus.Idle) {
      dispatch(fetchVerbs() as any);
    }
  }, [verbStatus, dispatch]);


  let content;
  if (verbStatus === LoadingStatus.Loading) {
    content = <div>Loading...</div>;
  } else if (verbStatus === LoadingStatus.Succeeded) {
    content = <List results={verbs.gridResults} />;
  } else if (verbStatus === LoadingStatus.Failed) {
    content = <div>{error}</div>;
  }

  return (
    <Stack direction="vertical" gap={2}>
      <h1>{t("Home")}</h1>
      <SearchBox onSearch={handleSearch} />
      {content}
    </Stack>
  );
}

export default Home;