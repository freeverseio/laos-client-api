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
const query = `
  
mutation MyMutation {
  batchMint(
    input: {
      chainId: "137"
      contractAddress: "0xaaf54526c508d573d402bf05a9a5e54f09302adf"
      tokens: [
        {
          mintTo: ["0x8e4dfC6D56e84913FA6a901a3dF21De6e9285de8"]
          name: "Celestial Phoenix"
          description: "A mythical bird reborn from its ashes, representing eternal life."
          attributes: "[{\\"trait_type\\":\\"mythical creature\\",\\"value\\":\\"phoenix\\"}]",
          image: "ipfs://QmPbxeGcXhYQQNgsC6a36dDyYUcHgMLnGKnF8pVFmGsvqi"
        }
      ]
    }
  ) {
    tokenIds
    success
  }
}

query MyQuery {
  __typename ## Placeholder value
} 
       `

const querySimple = `query MyQuery {
        __typename ## Placeholder value
      }
        
      mutation MyMutation {
        __typename ## Placeholder value
      }`
const PlaygroundComponent = () => (
  <GraphiQL fetcher={fetcher} 
  plugins={[explorer]} 
  visiblePlugin={explorer} 
  defaultHeaders={'{"x-api-key": "my-secret-api-key"}'}
  query={query} 
  />
);

const root = createRoot(document.getElementById('root'));
root.render(<PlaygroundComponent />);