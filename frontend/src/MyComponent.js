// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// // const socket = io.connect('https://chat.austtaa.com/'); 
// const socket = io.connect('http://localhost:4000/'); 

// const MyComponent = () => {
//   const [message, setMessage] = useState('');

//   const [receivedMessage, setReceivedMessage] = useState('');


//   console.log('status',socket)
// // 
//   useEffect(() => {


//     socket.on('connect', () => {
//       console.log('Connected to server');
//     });

//     socket.on('message', (data) => {
//       console.log('Received message:', data);
//       setReceivedMessage(data);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [socket]);

//   const sendMessage = () => {
//     socket.emit('message', message);
//     setMessage('');
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={sendMessage}>Send Message</button>
//       <p>Received Message: {receivedMessage}</p>
//     </div>
//   );
// };

// export default MyComponent;
