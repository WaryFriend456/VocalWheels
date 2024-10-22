import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for POST requests

const directions = {
    'forward': 'Forward',
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
};

const SpeechRecognitionComponent = () => {
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [direction, setDirection] = useState('');
    const [error, setError] = useState(null);
    const [expressData, setExpressData] = useState(null);
    const [flaskData, setFlaskData] = useState(null);
    const [mongoData, setMongoData] = useState([]);

    const sendPostRequest = async (direction) => {
        try {
            const response = await axios.post('http://localhost:5000/example', { direction });
            setExpressData(response.data.expressData);
            setFlaskData(response.data.flaskData);
            setMongoData(response.data.mongoData);
            console.log('Direction sent successfully:', direction);
        } catch (error) {
            console.error('Error sending POST request:', error);
            setError('Failed to send direction command.');
        }
    };

    const startRecognition = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setListening(true);
            setError(null); // Clear any previous errors
        };

        recognition.onresult = (event) => {
            const newTranscript = event.results[0][0].transcript;
            setTranscript(newTranscript);

            const matchedDirection = Object.keys(directions).find((phrase) => newTranscript.includes(phrase));
            if (matchedDirection) {
                setDirection(directions[matchedDirection]);
                sendPostRequest(directions[matchedDirection]); // Send POST request when direction is matched
            } else {
                setError('Unrecognized command. Please try again.');
            }
        };

        recognition.onerror = (event) => {
            setError('Speech recognition error occurred.');
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognition.start();
    };

    return (
        <div className="container mx-auto p-4">
            <div className="container mx-auto p-4 bg-blue-100 border-2 border-blue-500 rounded-lg">
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-4">Your Voice Input</h2>
                    <p className="text-lg mb-2">{transcript}</p>
                    <p className="text-lg">{direction}</p>
                    {error && <div className="bg-red-100 p-4 rounded-lg text-red-600 mb-4">Error: {error}</div>}

                    <div className="flex justify-between mt-4">
                        <p className="text-lg">Express Data: {expressData}</p>
                        <p className="text-lg">Flask Data: {flaskData}</p>
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${listening ? 'cursor-wait' : ''
                            }`}
                        onClick={startRecognition}
                        disabled={listening}
                    >
                        {listening ? 'Listening...' : 'Start Voice Input'}
                    </button>
                </div>
            </div>



            <div className="mt-6">
                <h3 className="text-xl mb-4">MongoDB Data</h3>
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">_id</th>
                            <th className="px-4 py-2">Direction</th>
                            <th className="px-4 py-2">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mongoData.map((doc) => (
                            <tr key={doc._id} className="border-b">
                                <td className="px-4 py-2">{doc._id}</td>
                                <td className="px-4 py-2">{doc.direction}</td>
                                <td className="px-4 py-2">{doc.timestamp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SpeechRecognitionComponent;
