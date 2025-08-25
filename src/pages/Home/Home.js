import React from "react";
import Fetching from "../../components/Fetch/Fetch";
import Filter from "../../components/Filter/Filter";

const Home = () => {
  return (
    <div className="home-page">
      <Filter />
      <Fetching />
    </div>
  );
};

export default Home;
