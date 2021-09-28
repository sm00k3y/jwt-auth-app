import React from "react";
import "../Auth.css";
import { gql, useMutation } from "@apollo/client";
import { AtomSpinner } from "../../components/Spinner/Spinner";

const LoginPage = ({ history }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [login, { loading }] = useMutation(LOGIN_QUERY);

  const submitForm = async (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      alert("Cannot leave empty fields!");
      return;
    }
    console.log("form submitted");
    console.log(email, password);
    let result;
    try {
      result = await login({
        variables: { loginEmail: email, loginPassword: password },
      });
    } catch (err) {
      console.log(err);
      alert("Error logging in, try again later");
      return;
    }
    if (!result) {
      alert("Error logging in, try again later");
      return;
    }
    console.log(result);
    if (result.data.login.accessToken === "") {
      alert("Wrong email and password");
      return;
    }
    // Successful login - get access token
    // history.push("/");
  };

  if (loading) return <AtomSpinner />;

  return (
    <div className="page-container">
      <form onSubmit={(e) => submitForm(e)} className="form-container">
        <div className="form-title">Log In</div>
        <input
          type="email"
          value={email}
          placeholder="Email"
          className="form-field"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          className="form-field"
          value={password}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit" className="form-button">
          Login
        </button>
      </form>
    </div>
  );
};

const LOGIN_QUERY = gql`
  mutation Mutation($loginEmail: String!, $loginPassword: String!) {
    login(email: $loginEmail, password: $loginPassword) {
      accessToken
    }
  }
`;

export default LoginPage;
