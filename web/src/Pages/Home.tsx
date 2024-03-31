import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SearchBox from "../Components/SearchBox";
import List from "../Components/List";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLanguageVerbs,
  fetchVerbs,
  LoadingStatus,
  searchVerbsForGridResults,
  selectAllVerbs,
  VerbState,
} from "../Redux/verbSlice";

function Home() {
  const { t, i18n } = useTranslation();
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
      dispatch(fetchVerbs(i18n.resolvedLanguage ?? "") as any);
    }
  }, [verbStatus]);

  useEffect(() => {
    if (verbStatus === LoadingStatus.Succeeded) {
      dispatch(changeLanguageVerbs(i18n.resolvedLanguage ?? "") as any);
    }
  }, [i18n.resolvedLanguage]);

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