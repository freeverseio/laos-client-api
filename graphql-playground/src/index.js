import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { explorerPlugin } from '@graphiql/plugin-explorer';
import 'graphiql/graphiql.css';
import '@graphiql/plugin-explorer/dist/style.css';
import './index.css';

const fetcher = createGraphiQLFetcher({ url: process.env.REACT_APP_GQL_URL });
const explorer = explorerPlugin();

const PlaygroundComponent = () => (
  <GraphiQL fetcher={fetcher} plugins={[explorer]} />
);

const root = createRoot(document.getElementById('root'));
root.render(<PlaygroundComponent />);