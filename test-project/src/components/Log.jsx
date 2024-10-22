import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardBody } from '@material-tailwind/react';
import { ClipLoader } from 'react-spinners';
import { Typography } from '@material-tailwind/react';


export default function TextInput() {
    const [mongoData, setMongoData] = useState([]);
    const [loading, setLoading] = useState(false);
    const TABLE_HEAD = ["ID", "Direction", "Timestamp", "Anything Else"];


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/mongodb-data');
            setMongoData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setTimeout(() => setLoading(false), 1000); // Wait for 3 seconds before removing the loading animation
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center bg-transparent">
            {loading ? (
                <ClipLoader
                    type="CubeGrid"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />
                ) : (
            <Card className="h-full w-full">
            <CardBody>
                <div className='overflow-auto max-h-screen'>
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {mongoData.map(({ _id, direction, timestamp }, index) => {
                            const isLast = index === mongoData.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={_id}>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {_id}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} bg-blue-gray-50/50`}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {direction}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {timestamp}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} bg-blue-gray-50/50`}>
                                        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                            anything else
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="flex justify-center">
                    <Button
                        color="blue"
                        ripple={true}
                        onClick={fetchData}
                        className="flex items-center gap-3 justify-center mt-8 rounded-full "
                        variant='gradient'
                    >
                        Refresh
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                            />
                        </svg>
                    </Button>
                </div>
                </div>
            </CardBody>
        </Card>
        )}
        </div >
    );
}