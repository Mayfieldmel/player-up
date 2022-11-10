import React from "react";
import EventList from "../components/EventList";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_EVENTS } from "../utils/queries";


const Events = () => {
  const { loading, data } = useQuery(QUERY_ALL_EVENTS);
  const events = data?.events || [];
  return (
    <section className="cork-board">
      <h1 className="event-header">Are You Game?</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <EventList events={events} ></EventList>
      )}
    </section>
  );
};

export default Events;
