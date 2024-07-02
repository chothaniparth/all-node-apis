// src/App.js

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import io from 'socket.io-client';
import axios from 'axios';
import * as Yup from 'yup';

const SOCKET_SERVER_URL = 'http://localhost:9000';

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const socket = io(SOCKET_SERVER_URL);

  useEffect(() => {
    if (isLoggedIn) {
      socket.on('message', (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [socket, isLoggedIn]);

  const sendMessage = async (values, { resetForm }) => {
    const message = values.message.trim();
    if (message) {
      socket.emit('message', message);
      try {
        await axios.post(`${SOCKET_SERVER_URL}/messages`, { message });
      } catch (error) {
        console.error('Error sending message to server:', error);
      }
      resetForm();
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    socket.disconnect();
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    socket.connect();
  };

  const validationSchema = Yup.object().shape({
    message: Yup.string().required('Message is required'),
  });

  return (
    <div className="container">
      {isLoggedIn ? (
        <>
          <h1 className="mt-5">Socket.IO Chat</h1>
          <button className="btn btn-danger my-3" onClick={handleLogout}>
            Logout
          </button>
          <div className="mb-3">
            {messages.map((msg, index) => (
              <div key={index} className="alert alert-secondary">
                {msg}
              </div>
            ))}
          </div>
          <Formik
            initialValues={{ message: '' }}
            validationSchema={validationSchema}
            onSubmit={sendMessage}
          >
            {() => (
              <Form>
                <div className="form-group">
                  <Field
                    name="message"
                    className="form-control"
                    placeholder="Type a message..."
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Send
                </button>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        <>
          <h1 className="mt-5">Logged out</h1>
          <button className="btn btn-primary mt-3" onClick={handleLogin}>
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
