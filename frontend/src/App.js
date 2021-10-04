import { gql, useQuery } from "@apollo/client";
import React from "react";
import { AtomSpinner } from "./components/Spinner/Spinner";
import Router from "./Router";
import { setAccessToken, getAccessToken } from "./context/accessToken";

function App() {
  const { data, loading, error } = useQuery(REFRESH_QUERY);

  React.useEffect(() => {
    if (data) {
      setAccessToken(data.refreshToken.accessToken);
      console.log("New access token:", getAccessToken());
    }
  }, [data]);

  if (loading) return <AtomSpinner />;

  if (error) {
    console.log(error);
    return <div>ERROR</div>;
  }

  return <Router />;
}

const REFRESH_QUERY = gql`
  query RefreshQuery {
    refreshToken {
      accessToken
    }
  }
`;

export default App;
