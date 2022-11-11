import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import { UPDATE_EVENT, DELETE_EVENT } from '../utils/mutations';
import { useHistory, useLocation } from 'react-router-dom';
// import { QUERY_SINGLE_EVENTS } from '../utils/queries';
// import Auth from '../utils/auth';

const EditEvent = () => {
	const history = useHistory();
	const { state } = useLocation();

  const [eventID, setEventUpdate] = useState({
			eventId: state._id,
			eventName: state.eventName,
			description: state.description,
			date: state.date,
			time: state.time,
			location: state.location,
			numberPlayersNeeded: state.numberPlayersNeeded,
			organizerName: state.organizerName,
		
		});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setEventUpdate({ ...eventID, [name]: value });
	};

	const [ updateEvent ] = useMutation(UPDATE_EVENT);
	const [ deleteEvent ] = useMutation(DELETE_EVENT);

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			const { data } = await updateEvent({ variables: { ...eventID } });
			if (data) {
				setEventUpdate({
					eventId: data.updateEvent._id,
					eventName: data.updateEvent.eventName,
					description: data.updateEvent.description,
					date: data.updateEvent.date,
					time: data.updateEvent.time,
					location: data.updateEvent.location,
					numberPlayersNeeded: data.updateEvent.numberPlayersNeeded,
					organizerName: data.updateEvent.organizerName,
				});		
				
				history.push('/profile')

			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleRemoveEvent = async (event, eventId) => {
		event.preventDefault();
		event.stopPropagation();

		try {
			const { data } = await deleteEvent({ variables: { eventId } });
	  
			history.push('/events')
			return data;
		  } catch (err) {
			console.error(err);
		  }
	};

	return (
		<section className="cork-board loginForm">
			<div className="login-background">
				<h1 className="event-header">Update your Event here!</h1>
			</div>
			<div className="formGroupBackground">
				<>
					<Form
						className="formGroup" 
						onSubmit={handleFormSubmit}
            		>
						<Form.Group>
							<h2 className="addEventHeader">Update The Game Plan!</h2>
							<Form.Label className="label" htmlFor="eventName">
								Event Name
							</Form.Label>
							<Form.Control
								className="input"
								type="text"
								placeholder="Name your event"
								name="eventName"
								value={eventID.eventName}
								onChange={handleInputChange}
								required
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label className="label" htmlFor="description">
								Description
							</Form.Label>
							<Form.Control
								className="input"
								type="text"
								placeholder="Describe your event!"
								name="description"
								value={eventID.description}
								onChange={handleInputChange}
								required
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label className="label" htmlFor="date">
								Event Date
							</Form.Label>
							<Form.Control
								className="input"
								type="date"
								placeholder="MM/DD/YYYY"
								name="date"
								value={eventID.date}
								onChange={handleInputChange}
								required
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label className="label" htmlFor="time">
								Event Time
							</Form.Label>
							<Form.Control
								className="input"
								type="time"
								placeholder="What time does the game begin?"
								name="time"
								value={eventID.time}
								onChange={handleInputChange}
								required
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label className="label" htmlFor="location">
								Location
							</Form.Label>
							<Form.Control
								className="input"
								type="text"
								placeholder="Where is your event?"
								name="location"
								value={eventID.location}
								onChange={handleInputChange}
								required
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label className="label" htmlFor="numberPlayersNeeded">
								How many players?
							</Form.Label>
							<Form.Control
								className="input"
								type="text"
								placeholder="examples: 4 players, 5-10 players"
								name="numberPlayersNeeded"
								value={eventID.numberPlayersNeeded}
								onChange={handleInputChange}
								required
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label className="label" htmlFor="organizerName">
								Organizer's name
							</Form.Label>
							<Form.Control
								className="input"
								type="text"
								placeholder={eventID.organizerName}
								name="organizerName"
								value={eventID.organizerName}
								disabled={true}
							/>
						</Form.Group>

						<Button
							className="editBtn button:hover "
							type="submit"
							variant="success">
							Submit The Edits!
						</Button>
						<Button
							className="deleteBtn button:hover"
							onClick={(event) => 
							handleRemoveEvent(event, eventID.eventId)}>
							Delete Event?
						</Button>
					</Form>						

				</>
			</div>
		</section>
	);
};


export default EditEvent;