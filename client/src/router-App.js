// import React from "react";
// import { setContext } from '@apollo/client/link/context';
// import {
//   ApolloProvider,
//   ApolloClient,
//   InMemoryCache,
//   createHttpLink,
// } from "@apollo/client";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// // import components
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// // import page components
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import NoMatch from "./pages/NoMatch";
// import SingleEvent from "./pages/SingleEvent";
// import Profile from "./pages/Profile";
// import Signup from "./pages/Signup";

// first, establish a new link to the GraphQL server at its /graphql endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
// second, instantiate the Apollo Client instance and create the connection to the API endpoint.
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // instantiate a new cache object
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="page">
          <Header />
          <div>
            <Switch>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile">
                <Route path=":username" element={<Profile />} />
                <Route path="" element={<Profile />} />
              </Route>
              <Route path="/event/:id" element={<SingleEvent />} />
              <Route path="*" element={<NoMatch />} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

// export default App;
