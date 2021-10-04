import { gql, useQuery } from "@apollo/client";
import React from "react";
import { AtomSpinner } from "./components/Spinner/Spinner";
import { useAccessTokenContext } from "./context/authContext";
import Router from "./Router";

function App() {
  const { accessToken, setAccessToken } = useAccessTokenContext();
  const { data, loading, error } = useQuery(REFRESH_QUERY);

  React.useEffect(() => {
    console.log(data);
    if (data) {
      setAccessToken(data.refreshToken.accessToken);
      console.log(accessToken);
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
