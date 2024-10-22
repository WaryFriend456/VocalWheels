import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import AOS from 'aos';
import { Card, CardBody, Textarea, Button } from '@material-tailwind/react';
import './Voice.css';

const utteranceToCommand = {
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
    'stop':'EmergencyStop',
};

const 
SpeechToTextComponent = () => {
    const [transcript, setTranscript] = useState('');
    const [responseText, setResponseText] = useState('');
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);
    const [mongoData, setMongoData] = useState([]);
    const [expressData, setExpressData] = useState([]);
    const [flaskData, setFlaskData] = useState([]);
    const [websocketData, setWebsocketData] = useState([]); // Add this line

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    const startRecognition = () => {
        if (recognitionRef.current && !isListening) {
            setLoading(true);
            setIsListening(true);
            recognitionRef.current.start();
            setTimeout(stopRecognition, 3000); // Automatically stop after 3 seconds
        } else {
            setResponseText('Speech recognition is already running');
        }
    };

    const stopRecognition = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    const toggleRecognition = () => {
        if (isListening) {
            stopRecognition();
        } else {
            startRecognition();
        }
    };

    const sendPostRequest = useCallback(async (command) => {
        try {
            setLoading(false);
            const response = await axios.post('http://localhost:5000/example', { direction: command });
            const { mongoData, websocketData } = response.data;

            const decoder = new TextDecoder('utf-8');
            const readableWebsocketData = JSON.parse(decoder.decode(new Uint8Array(websocketData.data)));

            console.log(readableWebsocketData);
            console.log(readableWebsocketData);
            console.log(readableWebsocketData);
            setMongoData(mongoData);
            // setExpressData(expressData);
            setWebsocketData(readableWebsocketData); // Update this line
            if (!readableWebsocketData.CAR) {
                console.log('The CAR key does not exist in the received data.');
                return;
            }

            // Text to speech
            const carValue = readableWebsocketData.CAR;
            const utterance = new SpeechSynthesisUtterance(carValue);
            window.speechSynthesis.cancel(); // Clear the speech queue
            window.speechSynthesis.speak(utterance);
        } catch (error) {
            console.error('Error sending POST request:', error);
        }
    }, []);

    const handleFinalResult = useCallback((utterance) => {
        console.log(`Received utterance: ${utterance}`);

        const correctedUtterance = utterance.toLowerCase().trim();
        const command = utteranceToCommand[correctedUtterance];

        if (command) {
            console.log(`Sending command: ${command}`);
            sendPostRequest(command);
        } else {
            setResponseText(`Unrecognized command: ${utterance}`);
        }
    }, [sendPostRequest, setResponseText]);

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            setResponseText('Speech recognition not supported in this browser');
            return;
        }

        const createRecognitionInstance = () => {
            const recognition = new window.webkitSpeechRecognition();
            recognition.interimResults = true;
            recognition.continuous = true;

            recognition.onresult = (event) => {
                const lastResult = event.results[event.results.length - 1];
                const utterance = lastResult[0].transcript;
                const confidence = lastResult[0].confidence;
                console.log(utterance)

                if (confidence > 0.7) {
                    setTranscript(utterance);

                    if (lastResult.isFinal) {
                        handleFinalResult(utterance);
                    }
                } else {
                    setResponseText(`Low confidence: ${utterance}`);
                }
            };

            recognition.onerror = (event) => {
                setResponseText(`Speech recognition error: ${event.error}`);
            };

            recognition.onnomatch = () => {
                setResponseText('No match for speech input');
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current = recognition;
        };

        createRecognitionInstance();

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
        };
    }, [handleFinalResult, setResponseText]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-transparent">
            <Card className="w-full max-w-xl mx-auto mt-10 transform transition duration-500 ease-in-out hover:scale-105">
                <CardBody>
                    <h2 className="mb-4 text-2xl font-bold text-gray-700 animate-pulse">Speech to Text</h2>
                    <p className="mb-4 text-base text-gray-500">Transcript:</p>
                    <Textarea color="blue" size="md" outline={"true"} placeholder="Transcript" value={transcript} readOnly />
                    {/* <p className="mt-4 mb-4 text-base text-gray-500">Express Data:</p>
                    <Textarea color="blue" size="md" outline={"true"} placeholder="Express Data" value={JSON.stringify(expressData)} readOnly /> */}
                    <p className="mt-4 mb-4 text-base text-gray-500">WebSocket Data:</p>
                    <Textarea color="blue" size="md" outline={"true"} placeholder="WebSocket Data" value={JSON.stringify(websocketData)} readOnly />
                    {loading && (
                        <div className="mt-4 flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 bg-gray-200 opacity-75"></div>
                        </div>
                    )}
                    <div className="mt-4 flex justify-center space-x-4">
                        <Button
                            color={isListening ? "red" : "blue"}
                            variant='gradient'
                            size="md"
                            rounded={"false"}
                            block={"false"}
                            icononly={"false"}
                            ripple={true}
                            onClick={toggleRecognition}
                        >
                            {isListening ? 'Stop' : 'Start'}
                        </Button>
                    </div>
                </CardBody>
            </Card>
            <Card className="w-full max-w-md mx-auto mt-10">
                <CardBody>
                    <h2 className="mb-4 text-xl font-bold text-gray-700">MongoDB Data</h2>
                    <div className="max-h-80 overflow-auto">
                        <table className="w-full table-auto rounded-lg">
                            <thead className="text-xs font-semibold text-gray-700 border-b">
                                <tr>
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">Direction</th>
                                    <th className="px-4 py-2">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-gray-600">
                                {mongoData.map((doc, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="px-4 py-2">{doc._id}</td>
                                        <td className="px-4 py-2">{doc.direction}</td>
                                        <td className="px-4 py-2">{doc.timestamp}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </div>
    );

};

export default SpeechToTextComponent;
