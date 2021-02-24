import React from 'react';
import '../index.css';
import RandomQuote from './RandomQuote';

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