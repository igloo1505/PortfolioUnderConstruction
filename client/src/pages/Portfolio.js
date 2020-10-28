import React, { useEffect } from "react";
import PortItem from "../components/PortItem";
import portArray from "../components/portArray.json";
import ReactGa from 'react-ga';


const Portfolio = (props) => {
  useEffect(() => {
    props.setPath("/portfolio");
    ReactGa.pageview(window.location.pathname + window.location.search)
  });
  return (
    <div className="container">
      <div className="portfolioLayout">
        {portArray != null
          ? portArray.map((piece) => <PortItem piece={piece} key={piece.id} />)
          : "Oh no. That didn't work"}
      </div>
    </div>
  );
};

export default Portfolio;
