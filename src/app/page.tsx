'use client';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [internetStatus, setInternetStatus] = useState('Checking Internet...');
  const [domainStatus, setDomainStatus] = useState('Checking Domain...');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/internet_connection/');

    ws.onopen = () => {
      console.log('WebSocket connection opened.');
    };

    ws.onmessage = event => {
      console.log('Received message:', event.data);
      const data = JSON.parse(event.data);
      console.log('data after paser:', data.connection.is_connected_to_internet);
      setInternetStatus(JSON.stringify(data.connection.is_connected_to_internet));
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/domain_connection/');

    ws.onopen = () => {
      console.log('WebSocket connection opened.');
    };

    ws.onmessage = event => {
      console.log('Received message:', event.data);
      const data = JSON.parse(event.data);
      console.log('data after paser:', data.connection.connection_type);
      setDomainStatus(JSON.stringify(data.connection.connection_type));
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
    </>
  );
};

export default Home;
