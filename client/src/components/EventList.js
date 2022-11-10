import React from "react";
import Event from "./Event";
import EditEvent from "../pages/EditEvent";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { ADD_PLAYER, ADD_COMMITMENT } from "../utils/mutations";
import { Link, useHistory } from "react-router-dom";

function EventList({ events }) {
  // query me
  const history = useHistory();
  const { data } = useQuery(QUERY_ME);
  const me = data?.me || {};

  // mutations
  const [addPlayer] = useMutation(ADD_PLAYER);
  const [addCommitment] = useMutation(ADD_COMMITMENT);

  // handle mutations
  const handleAddPlayer = async (id) => {
    try {
      await addPlayer({
        variables: { eventId: id },
      });
      // console.log(me)
      console.log(events);
    } catch (e) {
      console.error(e);
    }
  };
  
  const handleAddCommitment = async (id) => {
    try {
      await addCommitment({
        variables: { eventId: id },
      });
      console.log("post-commitment", me)
    } catch (e) {
      console.error(e);
    }
  };
  console.log(events);

  const handleEditEvent = async (eventObj) => {
    history.push(`/events/edit/${eventObj._id}`, eventObj);
  };

  function noEvents(events) {
    if (!events.length) {
  return (
    			<div className="center">
    			<div className="card">
    			  <div className="text-box">
    				<h2>No Events Yet!</h2>
    			  </div>
    			</div>
    			</div>
    		  );
  }}

  return (
    <ul className="event-list">
      {noEvents(events)}
      {events.map((eventObj) => (
        <li key={eventObj._id} className="card">
          <Link className="event-link" to={`/event/${eventObj._id}`}>
          <Event event={eventObj}></Event>
          </Link>
          {eventObj.organizerName === me.username ? (
            <button onClick={() => handleEditEvent(eventObj)} className="play-btn">Edit Game</button>
          ) : (
            <button
              className="play-btn"
              onClick={() => {
                handleAddPlayer(eventObj._id);
                handleAddCommitment(eventObj._id);
              }}
            >
              I'm Game!
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

export default EventList;
