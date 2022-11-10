import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import page components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Events from "./pages/Events";
import EditEvent from "./pages/EditEvent";
import NoMatch from "./pages/NoMatch";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import SingleEvent from "./pages/SingleEvent";

import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: "/graphql",
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="page">
          <div className="side">
            <Header />
            <main>
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/signup">
                  <Signup />
                </Route>
                <Route path="/profile">
                  <Profile />
                </Route>
                <Route path="/events/edit/:id">
                  <EditEvent />
                </Route>
                <Route path="/events">
                  <Events />
                </Route> 
                <Route path="/profile/:username">
                  <Profile />
                </Route>
                <Route path="/event/:id">
                  <SingleEvent />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
                <Route path="*">
                  <NoMatch />
                </Route>
              </Switch>
            </main>
          </div>
          <footer>
          <Footer></Footer>
          </footer>
        </div>
      </Router>
    </ApolloProvider>
  );
}
export default App;
