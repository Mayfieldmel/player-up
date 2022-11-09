import React, { useState, useEffect } from "react";
import EventList from "../components/EventList";
import AddEvent from "./AddEvent";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../utils/queries";

// import Auth from "../utils/auth";

const Profile = () => {
  //   const { username: userParam } = useParams();
  //   console.log(userParam);

  // collect params
  const location = useLocation().pathname;
  const param = location.split("/")[2];

  //   Query user or me
  const { loading, data, refetch } = useQuery(param ? QUERY_USER : QUERY_ME, {
    variables: { username: param },
  });
  const userData = data?.me || data?.user || {};
  console.log("userData", userData);
  const events = userData?.events || [];
  console.log("my events", events);
  const commitments = userData?.commitments || [];
  console.log("my commitments", commitments);

  //   use state
  const [commitmentList, setCommitmentList] = useState(false);
  const [eventList, setEventList] = useState(true);
  const [addEventPage, setAddEventPage] = useState(false);
  

  const displayCommitments = () => {
	// refetch();
    setCommitmentList(true);
    setAddEventPage(false);
    setEventList(false);
    // getCommitments();
  };
  const displayEvents = () => {
    setEventList(true);
    setCommitmentList(false);
    setAddEventPage(false);
  };

  const displayAddEvent = () => {
    setAddEventPage(true);
    setCommitmentList(false);
    setEventList(false);
  };

  const closeForm = () => {
    setAddEventPage(false);
    setEventList(true);
    refetch();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

//   function noEvents() {
//     if (!events.length) {
//       return (
		// <div className="center">
        // <div className="card">
        //   <div className="text-box">
        //     <h2>No Events Yet. Post a Game to the Board!</h2>
        //   </div>
        // </div>
		// </div>
//       );
//     } else {
// 		return (<EventList events={events}></EventList>
// 	}
//   }
  
//   function noCommitments() {
// 	if (!commitments.length) {
// 		return (
// 			<div className="center">
// 			<div className="card">
// 			  <div className="text-box">
// 				<h2>No Commitments Yet. Go sign up for an Event!</h2>
// 			  </div>
// 			</div>
// 			</div>
// 		  );
// 	}
//   }

  return (
    <section className="cork-board">
      <div className="profile-background">
        <h1 className="event-header">{userData.username}</h1>
        <div className="button-box">
          <button
            onClick={displayEvents}
            className={`list-btn selectEvents ${eventList && "green-yellow"}`}
          >
            {!param ? "My Events" : `${param}'s Events`}
          </button>
          {!param ? (
            <button
              onClick={displayAddEvent}
              className={`list-btn ${addEventPage && "green-yellow"}`}
            >
              Post a Game
            </button>
          ) : null}
          <button
            onClick={displayCommitments}
            className={`list-btn selectCommitments ${
              commitmentList && "green-yellow"
            }`}
          >
            {!param ? "My Game Plans" : `${param}'s Game Plans`}
          </button>
        </div>
      </div>
      {!addEventPage ? (
        <>
          {commitmentList ? (
            <EventList events={commitments}></EventList>
          ) : (
			<>
			{events.length ?  
			(
            <EventList events={events}></EventList>
			) : (
			<div className="center">
			<div className="card">
			  <div className="text-box">
				<h2>No Events Yet. Post a Game to the Board!</h2>
			  </div>
			</div>
			</div>
			) 
			}
		  </>
          )}
        </>
      ) : (
        <AddEvent closeForm={closeForm}></AddEvent>
      )}
    </section>
  );
};

export default Profile;
