import React from "react";
import { useParams } from "react-router-dom";
import { pluralize, formatDate, formatTime } from "../utils/helpers";
import { Link, useHistory } from "react-router-dom";

// import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_EVENTS, QUERY_ME } from "../utils/queries";
import { ADD_PLAYER } from "../utils/mutations";

const SingleEvent = () => {
  const { id: eventId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_EVENTS, {
    variables: { id: eventId },
  });
  const event = data?.event || {};
  console.log("attending", event.attending);
  const { data: myData } = useQuery(QUERY_ME);
  const me = myData?.me || {};

  const [addPlayer] = useMutation(ADD_PLAYER);
  const handleAddPlayer = async (id) => {
    try {
      await addPlayer({
        variables: { eventID: id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditEvent = async (eventObj) => {
    history.push(`/events/edit/${eventObj._id}`, eventObj);
  };

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<section className="single-event-background">
			<div>
				<div className="single-event-head-background">
					<p className="single-event-subtitle">Event Details for:</p>
					<h1 className="single-event-header">{event.eventName}</h1>
				</div>
			</div>
			<div>
				<div className="singleEvent">
					<span>
						<p>
							Date: {event.date ? formatDate(event.date) : event.date} <br />
							Time: {event.time ? formatTime(event.time) : event.time} <br />
							<a
								className="mapLink"
								href="https://www.google.com/maps/dir/?api=1"
								target="_blank"
								rel="noreferrer">
								Location: {event.location}
							</a>
						</p>
						<p>Description: {event.description}</p>
						<p>
							Organizer:
							<Link
								to={`/profile/${event.organizerName}`}
								className="profile-link">
								{` ${event.organizerName}`}
							</Link>
							<br></br>
							Players needed: {event.numberPlayersNeeded}
							<br />
							{`Players attending: `}
							{!event.attending
								? "0"
								: pluralize("player", event.attending.length)}
						</p>
					</span>
					{event.organizerName === me.username ? (
						<button onClick={() => handleEditEvent(event)} className="add-player">Edit Game</button>
					) : (
						<button
							className="add-player"
							onClick={() => {
								handleAddPlayer(event._id);
							}}>
							I'm Game!
						</button>
					)}
					<div className="mapouter">
						<div className="gmap_canvas">
							<iframe
								title="google map"
								width="500"
								height="300"
								id="gmap_canvas"
								src="https://maps.google.com/maps?q=Raleigh,%20nc&t=&z=11&ie=UTF8&iwloc=&output=embed"
								frameBorder="0"
								scrolling="no"
								margin-height="0"
								margin-width="0"></iframe>
							{/* <a href="https://www.online-timer.net"></a> */}
							<br></br>
							{/* <style>.mapouter{position:relative;text-align:right;height:300px;width:500px;}</style>
      <a href="https://www.embedgooglemap.net">html google maps</a>
      <style>.gmap_canvas {overflow:hidden;background:none!important;height:300px;width:500px;}</style> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleEvent;
