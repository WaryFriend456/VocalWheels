import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chip } from '@material-tailwind/react';
import { SignalSlashIcon } from "@heroicons/react/24/outline";
import { SignalIcon } from "@heroicons/react/24/outline";

export function ChipWithStatus() {
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const response = await axios.get('http://localhost:5000/checkStatus'); // Replace with your Express server URL
                console.log(response);
                setStatus(response.data.status);
            } catch (error) {
                setStatus('Offline');
            }
        };

        checkStatus();
        const intervalId = setInterval(checkStatus, 1500);

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);


    return (
        <div className="flex gap-2">
            {status === 'Online' ? (
                <Chip
                    variant="ghost"
                    color="green"
                    size="lg"
                    value="Online"
                    // icon={
                    //     <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
                    // }
                    icon={<SignalIcon className="h-6 w-6 text-green-500" />} // Use the SignalIcon for "Online" status
                />
            ) : (
                <Chip
                    variant="ghost"
                    color="red"
                    size="lg"
                    value="Offline"
                    // icon={
                    //     <span className="mx-auto mt-2 block h-2 w-2 rounded-full bg-red-900 content-['']" />
                    // }
                    icon={<SignalSlashIcon className="h-6 w-6 text-red-500" />} // Use the SignalSlashIcon for "Offline" status

                />
            )}
        </div>
    );
};