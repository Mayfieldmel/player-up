import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


export const ADD_PLAYER = gql`
  mutation addPlayer($eventId: ID!) {
    addPlayer(eventId: $eventId) {
      _id
      eventName
      attending {
        _id
        username
      }
    }
  }
`;

export const ADD_COMMITMENT = gql`
  mutation addCommitment($eventId: ID!) {
    addCommitment(eventId: $eventId) {
      _id
      username
      commitments {
        _id
        eventName
        description
        date
        time
        location
        numberPlayersNeeded
        organizerName
        attending {
          _id
          username
        }
      }
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent(
	$eventName: String!, 
	$description: String!, 
	$date: String!, 
	$time: String!, 
	$location: String!, 
	$numberPlayersNeeded: String!, 
	$organizerName: String) {
    addEvent(   
		eventName: $eventName,
		description: $description, 
		date: $date, 
		time: $time, 
		location: $location, 
		numberPlayersNeeded: $numberPlayersNeeded, 
		organizerName: $organizerName) {
      _id
      eventName
      description
      date
      time
      location
      numberPlayersNeeded
      organizerName
      attending {
        _id
        username
      }
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation updateEvent($eventId: ID!,    
		$eventName: String!, 
		$description: String!, 
		$date: String!, 
		$time: String!, 
		$location: String!, 
		$numberPlayersNeeded: String!, 
		$organizerName: String) {
    updateEvent(eventId: $eventId,   
		eventName: $eventName,
		description: $description, 
		date: $date, 
		time: $time, 
		location: $location, 
		numberPlayersNeeded: $numberPlayersNeeded, 
		organizerName: $organizerName) {
			_id
		eventName
		description
		date
		time
		location
		numberPlayersNeeded
		organizerName
		attending {
			_id
			username
		}
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation deleteEvent($eventId: ID!) {
    deleteEvent(eventId: $eventId) {
      _id
      eventName
      description
      date
      time
      location
      numberPlayersNeeded
      organizerName
      attending {
        _id
        username
      }
    }
  }
`;
