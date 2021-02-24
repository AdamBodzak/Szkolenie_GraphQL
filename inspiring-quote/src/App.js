import React from 'react';
import { gql, useQuery } from '@apollo/client';
import './index.css';

export default function App() {
  return (
    <div className="App">
      <h1>Inspiring Quote</h1>
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
  const { data, loading} = useQuery(RANDOM_QUOTE_QUERY);
  if (loading) {
    return 'Quote is loading...';
  }
  const { text, author } = data.randomQuote;
  return <Quote text={text} author={author} />
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
