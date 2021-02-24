import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import {ApolloClient, InMemoryCache, HttpLink, ApolloProvider} from "@apollo/client";

const URL = "https://tranquil-thicket-34015.herokuapp.com/";
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: URL
  })
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client} >
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  rootElement
);

