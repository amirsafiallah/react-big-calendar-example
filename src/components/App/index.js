import React from "react";
import "normalize.css";
import "./index.scss";
import Selectable from "../Selectable";

//Just for PoC
export default ()=>{
  const [events , setEvents] = React.useState([]);

  const handleSelect = selected => {
    const { start, end } = selected;
    const title = "Title here!";
    const newEvent = {
      start,
      end,
      title
    }
    setEvents([...events , newEvent])
  };

  return <Selectable onSelected={handleSelect} events={events} />;
}
