import React from 'react';
import { gql, useQuery } from '@apollo/client';
import './index.css';

export default function App() {
  return (
    <div className="App">
      <h1>Inspiring Quote</h1>
      <RandomQuote />
      <RandomQuote />
      <RandomQuote />
    </div>
  );
};

const RANDOM_QUOTE_QUERY = gql`
  query getRandomQuote {
    randomQuote {
      text
      author
    }
  }
`;

function RandomQuote() {
  const { data, loading, error, refetch} = useQuery(RANDOM_QUOTE_QUERY, {
    fetchPolicy: "no-cache"
  },{
    onError: (error) => {
      console.log('error', error);
      window.lastError = error;
    },
    errorPolicy: "all"
  });
  if (loading) {
    return 'Quote is loading...';
  };
  if (error) {
    return 'Could not load quote!';
  };
  const { text, author } = data.randomQuote;
  return (
    <React.Fragment>
      <Quote text={text} author={author} />
      <button onClick={() => { refetch() }}>Get new quote</button>
    </React.Fragment>
  );
};

function Quote({text, author}) {
  return (
    <blockquote>
      {text}
      <footer>
        {author}
      </footer>
    </blockquote>
  );
};
