import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function TextInput(props) {
  const [command, setCommand] = useState('');
  const [mongoData, setMongoData] = useState([]);
  const [expressData, setExpressData] = useState([]);
  const [flaskData, setFlaskData] = useState([]);
  const [websocketData, setWebsocketData] = useState([]); // Add this line

  const utteranceToCommand = {
    forward: 'Forward',
    'move ahead': 'Forward',
    'straight ahead': 'Forward',
    'go back': 'Backward',
    'move backward': 'Backward',
    'reverse': 'Backward',
    'rivers': 'Backward',
    'turn left': 'Left',
    'go left': 'Left',
    'turn right': 'Right',
    'go right': 'Right',
    'proceed straight': 'Forward',
    // Add more variations as needed
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }, []);

  const sendPostRequest = async (command) => {
    try {
      const response = await axios.post('http://localhost:5000/example', {
        direction: command,
      });
      const { mongoData, websocketData } = response.data;

      const decoder = new TextDecoder('utf-8');
      const readableWebsocketData = JSON.parse(decoder.decode(new Uint8Array(websocketData.data)));

      console.log(response);
      console.log(readableWebsocketData);
      setMongoData(mongoData);
      // setExpressData(expressData);
      setWebsocketData(readableWebsocketData); // Add this line
      const carValue = readableWebsocketData.CAR;
      const utterance = new SpeechSynthesisUtterance(carValue);
      window.speechSynthesis.cancel(); // Clear the speech queue
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  const handleCommand = () => {
    const correctedCommand = command.toLowerCase().trim(); // Convert to lowercase and trim spaces

    const commandToSend = utteranceToCommand[correctedCommand];
    if (commandToSend) {
      sendPostRequest(commandToSend);
    } else {
      console.log(`Unrecognized command: ${command}`);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center bg-transparent">
      <div className="max-w-lg p-8 space-y-8 bg-white rounded-lg shadow-2xl transform transition-transform duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          {props.heading}
        </h1>
        <div className="flex items-center justify-center space-x-4">
          <textarea
            className="w-full p-4 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-200 ease-in-out transform hover:scale-105"
            id="myBox"
            rows="8"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
          />
          <button
            className="px-5 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-200 ease-in-out transform hover:scale-105"
            onClick={handleCommand}
          >
            Submit
          </button>
        </div>
        <div className="mt-8">
          {/* <h2 className="text-xl font-bold text-gray-800">Express Data</h2>
          <pre className="text-gray-700 bg-gray-100 rounded-lg p-4 mt-4">
            {JSON.stringify(expressData, null, 2)}
          </pre> */}
          <h2 className="text-xl font-bold text-gray-800 mt-8">Flask Data</h2>
          <pre className="text-gray-700 bg-gray-100 rounded-lg p-4 mt-4">
            {JSON.stringify(websocketData, null, 2)}
          </pre>
        </div>
      </div>
      <div className="max-w-lg p-8 space-y-8 bg-white rounded-lg shadow-lg ml-10">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          MongoDB Data
        </h2>
        <div className="overflow-auto h-[300px]">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Direction</th>
                <th className="px-4 py-2 text-left">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {mongoData.map((doc, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{doc._id}</td>
                  <td className="px-4 py-2">{doc.direction}</td>
                  <td className="px-4 py-2">{doc.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}