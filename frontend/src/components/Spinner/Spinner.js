import React from "react";
import atom from "./atom.svg";
import "./Spinner.css";

export const AtomSpinner = () => {
  return (
    <div className="atom-spinner">
      <img src={atom} alt="atom spinner" />
    </div>
  );
};
