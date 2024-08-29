import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { explorerPlugin } from '@graphiql/plugin-explorer';
import 'graphiql/graphiql.css';
import '@graphiql/plugin-explorer/dist/style.css';
import './index.css';

const fetcher = createGraphiQLFetcher({ url: process.env.REACT_APP_GQL_URL });
const explorer = explorerPlugin();

const PlaygroundComponent = () => (
  <GraphiQL fetcher={fetcher} plugins={[explorer]} />
);

const App = () => (
  <Router>
    <Routes>
      <Route path="/playground" element={<PlaygroundComponent />} />
      <Route path="*" element={<Navigate to="/playground" replace />} />
    </Routes>
  </Router>
);

const root = createRoot(document.getElementById('root'));
root.render(<App />);