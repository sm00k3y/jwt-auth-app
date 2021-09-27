import { gql, useQuery } from "@apollo/client";
import React from "react";
import { AtomSpinner } from "../../components/Spinner/Spinner";
import "./Home.css";

const HomePage = () => {
  const { data, loading } = useQuery(USERS_QUERY);

  if (loading) return <AtomSpinner />;

  return (
    <div className="users-container">
      <div className="users-title">Users:</div>
      <ul className="users-list">
        {data.users.map((user) => {
          return (
            <li key={user._id} className="users-item">
              <div className="user-item-email">{user.email}</div>
              <div className="user-item-id">{user._id}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const USERS_QUERY = gql`
  query Users {
    users {
      _id
      email
    }
  }
`;

export default HomePage;
