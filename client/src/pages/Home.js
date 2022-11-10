import React from "react";
import logo from "../images/player-up-logo.png";
// import home from "../images/board-games.jpg";

const Home = () => {
  return (
    <section className="home-background">
      <div className="background-cork">
        <div className="logo-home">
          <img className="logo" src={logo} alt="player-up-logo"></img>
        </div>
      </div>
    </section>
  );
};

export default Home;
