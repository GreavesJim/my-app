import React from "react";
import "../App.css";
const Header = (props) => {
  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <header className="App-header">
      <h2 onClick={refreshPage}>{props.text}</h2>
    </header>
  );
};

export default Header;
