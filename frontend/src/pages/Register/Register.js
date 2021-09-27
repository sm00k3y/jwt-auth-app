import React from "react";
import "./Register.css";
import { gql, useMutation } from "@apollo/client";
import { AtomSpinner } from "../../components/Spinner/Spinner";

const RegisterPage = ({ history }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [registerUser, { data, loading }] = useMutation(REGISTER_QUERY);

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
      result = await registerUser({
        variables: { registerEmail: email, registerPassword: password },
      });
    } catch (err) {
      console.log(err);
      alert("Error adding New User, try again later");
      return;
    }
    if (!result) {
      alert("Error adding New User, try again later");
      return;
    }
    if (result.data.register.userExists === true) {
      alert("User with this email already exists");
      return;
    }
    history.push("/");
  };

  if (loading) return <AtomSpinner />;

  return (
    <div className="page-container">
      <form onSubmit={(e) => submitForm(e)} className="form-container">
        <div className="form-title">Register new User</div>
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
          Register
        </button>
      </form>
    </div>
  );
};

const REGISTER_QUERY = gql`
  mutation Mutation($registerEmail: String!, $registerPassword: String!) {
    register(email: $registerEmail, password: $registerPassword) {
      userExists
    }
  }
`;

export default RegisterPage;
