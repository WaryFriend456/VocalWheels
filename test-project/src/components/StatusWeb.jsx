import React, { useState, useEffect } from 'react';
import { Chip } from '@material-tailwind/react';
import { SignalSlashIcon } from "@heroicons/react/24/outline";
import { SignalIcon } from "@heroicons/react/24/outline";

export function ChipWithStatus() {
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8081'); // Replace with your WebSocket server URL

        ws.onopen = () => {
            ws.send(JSON.stringify({ source: 'front' }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('WebSocket response:', data); // Print the response from the WebSocket server
            if (data.status) {
                setStatus(data.status);
            }
        };

        ws.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
        };

        // Send a { status: 'on' } message every 5 to 10 seconds
        const intervalId = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ status: 'on' }));
            }
        }, Math.random() * (10000 - 5000) + 5000);

        // Close the WebSocket connection and clear the interval when the component unmounts
        return () => {
            ws.close();
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className="flex gap-2">
            {status === 'Online' ? (
                <Chip
                    variant="ghost"
                    color="green"
                    size="lg"
                    value="Online"
                    icon={<SignalIcon className="h-6 w-6 text-green-500" />} // Use the SignalIcon for "Online" status
                />
            ) : (
                <Chip
                    variant="ghost"
                    color="red"
                    size="lg"
                    value="Offline"
                    icon={<SignalSlashIcon className="h-6 w-6 text-red-500" />} // Use the SignalSlashIcon for "Offline" status
                />
            )}
        </div>
    );
};