import React, { useEffect, useState } from 'react';

const Home = () => {
  const [internetStatus, setInternetStatus] = useState('Checking Internet...');
  const [domainStatus, setDomainStatus] = useState('Checking Domain...');
  const [azureStatus, setAzureStatus] = useState('Checking Azure...');

  // ... other useEffects (for Internet and Domain)

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/azure_connection/');

    ws.onopen = () => {
      console.log('WebSocket connection opened.');
    };

    ws.onmessage = event => {
      console.log('Received message:', event.data);
      const data = JSON.parse(event.data);
      console.log('data after paser:', data);
      setAzureStatus(JSON.stringify(data));
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
      <h1>Internet Connection Status</h1>
      <p>{internetStatus}</p>
      <h1>Domain Connection Status</h1>
      <p>{domainStatus}</p>
      <h1>Azure Connection Status</h1>
      <p>{azureStatus}</p>
    </>
  );
};

export default Home;
