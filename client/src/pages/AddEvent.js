// see SignupForm.js for comments
import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { QUERY_ME } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_EVENT } from "../utils/mutations";
import { useHistory } from 'react-router-dom';

const AddEvent = ({refetch}) => {
	const history = useHistory();

	const [eventFormData, setEventFormData] = useState({
		eventName: "",
		description: "",
		date: "",
		time: "",
		location: "",
		numberPlayersNeeded: "",
		organizerName: "",
	});
	const [validated] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [eventAdd, { error }] = useMutation(ADD_EVENT);
	const { data } = useQuery(QUERY_ME);
	const me = data?.me || {};

	useEffect(() => {
		if (error) {
			setShowAlert(true);
		} else {
			setShowAlert(false);
		}
	}, [error]);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setEventFormData({ ...eventFormData, [name]: value });
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		// check if form has everything (as per react-bootstrap docs)
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		try {
			const { data } = await eventAdd({ variables: { ...eventFormData } });
			if (data) {
				refetch();
				history.push("/events")
			}
		} catch (err) {
			console.error(err);
			setShowAlert(true);
		}

		setEventFormData({
			eventName: "",
			description: "",
			date: "",
			time: "",
			location: "",
			numberPlayersNeeded: "",
			organizerName: "",
		});
	};

	return (
		<section className="cork-board loginForm">
			<div className="formGroupBackground">
				<>
					<Form
						className="formGroup"
						noValidate
						validated={validated}
						onSubmit={handleFormSubmit}>
						<Alert
							dismissible
							onClose={() => setShowAlert(false)}
							show={showAlert}
							variant="danger">
							Something went wrong!
						</Alert>
						<Form.Group>
							<h2 className="addEventHeader">The Game Plan!</h2>
							<Form.Label className="label" htmlFor="eventName">
								Event Name
							</Form.Label>
							<Form.Control
								className="input"
								type="text"
								placeholder="Name your event"
								name="eventName"
								onChange={handleInputChange}
								value={eventFormData.eventName}
								required
							/>
							<Form.Control.Feedback className="feedback" type="invalid">
								An event name is required!
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group>
							<Form.Label className="label" htmlFor="description">
								Description
							</Form.Label>
							<Form.Control
								className="inputDescription"
								as="textarea"
								rows={5}
								placeholder="What we'll be doing..."
								name="description"
								onChange={handleInputChange}
								value={eventFormData.description}
								required
							/>
							<Form.Control.Feedback className="feedback" type="invalid">
								A description of your event is required!
							</Form.Control.Feedback>
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
								onChange={handleInputChange}
								value={eventFormData.date}
								required
							/>
							<Form.Control.Feedback className="feedback" type="invalid">
								A date is required!
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group>
							<Form.Label className="label" htmlFor="time">
								Event Time
							</Form.Label>
							<Form.Control
								className="input"
								type="time"
								placeholder="ex. 4:00 PM, 5-8 PM"
								name="time"
								onChange={handleInputChange}
								value={eventFormData.time}
								required
							/>
							<Form.Control.Feedback className="feedback" type="invalid">
								A time for your event is required!
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group>
							<Form.Label className="label" htmlFor="location">
								Location
							</Form.Label>
							<Form.Control
								className="input"
								type="text"
								placeholder="ex. address, Ting Park"
								name="location"
								onChange={handleInputChange}
								value={eventFormData.location}
								required
							/>
							<Form.Control.Feedback className="feedback" type="invalid">
								A location is required!
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group>
							<Form.Label className="label" htmlFor="numberPlayersNeeded">
								How many players?
							</Form.Label>
							<Form.Control
								className="input"
								type="text"
								placeholder="ex. 4+ players, 5-10 players"
								name="numberPlayersNeeded"
								onChange={handleInputChange}
								value={eventFormData.numberPlayersNeeded}
								required
							/>
							<Form.Control.Feedback className="feedback" type="invalid">
								Number of players is required!
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group>
							<Form.Label className="label" htmlFor="organizerName">
								Organizer's name
							</Form.Label>
							<Form.Control
								className="input"
								type="text"
								placeholder={me.username}
								name="organizerName"
								onChange={handleInputChange}
								value={me?.username || ""}
								disabled={true}
							/>
							<Form.Control.Feedback className="feedback" type="invalid">
								This field is predetermined
							</Form.Control.Feedback>
						</Form.Group>

						<Button
							className="loginBtn button:hover "
							disabled={
								!(
									eventFormData.eventName &&
									eventFormData.date &&
									eventFormData.time &&
									eventFormData.location
								)
							}
							type="submit"
							variant="success"
								>
							Post your game!
						</Button>
					</Form>
				</>
			</div>
		</section>
	);
};

export default AddEvent;
