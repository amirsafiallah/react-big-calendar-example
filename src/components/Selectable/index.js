import React from "react";
import PropTypes from 'prop-types';

import { Calendar, Views, momentLocalizer } from "react-big-calendar";

import "./index.scss";

import moment from "moment";
import AutoYScroll from "../AutoYScroll";
import Header from "../Header";

const localizer = momentLocalizer(moment);

const Selectable = (props) => {
    const {longPress = 300 , onSelected , events} = props;

    return (
      <AutoYScroll
        style={{
          position: "absolute",
          width: "100%",
          height: "100%"
        }}
        longPressThreshold ={longPress}     
      >
        <Header />
        <div
          style={{
            padding: "0 16px"
          }}
        >
          <Calendar
            selectable
            longPressThreshold={longPress}
            localizer={localizer}
            events={events}
            defaultView={Views.DAY}
            onSelectSlot={onSelected}
            toolbar={false}
            step={15}
            timeslots={1}
            dayLayoutAlgorithm="no-overlap"
          />
        </div>
      </AutoYScroll>
    );
}

Selectable.propTypes = {
  longPress: PropTypes.number,
  onSelected: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Selectable;
