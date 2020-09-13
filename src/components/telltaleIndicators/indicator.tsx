import React from "react";

import "./telltale.css";

type IndicatorProps = {
  class: string;
};

export const Indicator = (props: IndicatorProps) => {
  return <div className={`telltale ${props.class}`} />;
};

export default Indicator;
