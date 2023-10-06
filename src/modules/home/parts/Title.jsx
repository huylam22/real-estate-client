import React from "react";
import "./title.css";
const Title = () => {
  return (
    <button data-text="Awesome" className="button">
      <span className="actual-text">&nbsp;Home&nbsp;</span>
      <span className="hover-text" aria-hidden="true">
        &nbsp;Home&nbsp;
      </span>
    </button>
  );
};

export default Title;
