import React from "react";
import { gql, useQuery } from "@apollo/client";
import { AtomSpinner } from "../../components/Spinner/Spinner";
import { useAccessTokenContext } from "../../context/authContext";

const Bye = () => {
  const { accessToken } = useAccessTokenContext();
  const { data, loading, error, refetch } = useQuery(BYE_QUERY, {
    context: { headers: { Authorization: `bearer ${accessToken}` } },
  });
  React.useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <AtomSpinner />;
  if (error) return <div>Error</div>;
  if (!data) return <div>No Data</div>;
  return (
    <div>
      <div>{data.bye}</div>
      <div>{accessToken}</div>
      {/* <div>
        <button onClick={() => setAccessToken("Yo")}>Click me</button>
        <button onClick={() => refetch()}>Refetch!</button>
      </div> */}
    </div>
  );
};

const BYE_QUERY = gql`
  query Bye {
    bye
  }
`;

export default Bye;
