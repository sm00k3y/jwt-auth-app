import React from "react";
import { gql, useQuery } from "@apollo/client";
import { AtomSpinner } from "../../components/Spinner/Spinner";
import { getAccessToken } from "../../context/accessToken";

const Bye = () => {
  const { data, loading, error } = useQuery(BYE_QUERY, {
    fetchPolicy: "network-only",
  });

  if (loading) return <AtomSpinner />;
  if (error) return <div>Error</div>;
  if (!data) return <div>No Data</div>;
  return (
    <div>
      <div>{data.bye}</div>
      <br />
      <div>{getAccessToken()}</div>
    </div>
  );
};

const BYE_QUERY = gql`
  query Bye {
    bye
  }
`;

export default Bye;
