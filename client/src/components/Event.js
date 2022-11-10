import React from "react";
import { pluralize, formatDate, formatTime } from "../utils/helpers";

function Event({ event }) {
	return (
		<article className="text-box">
			{/* <span className="event-note">Click for more details!</span> */}
			<h2 className="eventName hovertext" data-hover="Click for more details!">
				{event.eventName}
			</h2>
			<span>
				{event.time ? formatTime(event.time) : event.tine} | {event.time ? formatDate(event.date) : event.date} <br />
				{event.location}
			</span>
			{/* <p>Description: {event.description}</p> */}
			<span>
				{/* {event.organizerName} | Players needed: {event.numberPlayersNeeded} */}
				<br />
				{`Players attending: `}
				{!event.attending ? "0" : pluralize("player", event.attending.length)}
			</span>
		</article>
	);
}

export default Event;
