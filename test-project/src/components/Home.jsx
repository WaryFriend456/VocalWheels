import {
    Typography,
    Card,
} from "@material-tailwind/react";
import './Home.css'; // Import your CSS file
import { Carousel, IconButton } from "@material-tailwind/react";

export default function Home() {
    return (
        <div className="mx-auto py-12 w-1/2 h-1/2">
            <Carousel
                className="rounded-xl flex items-center animate-fade-in"
                prevArrow={({ handlePrev }) => (
                    <IconButton
                        variant="text"
                        color="white"
                        size="lg"
                        onClick={handlePrev}
                        className="!absolute top-2/4 left-4 -translate-y-2/4"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                            />
                        </svg>
                    </IconButton>
                )}
                nextArrow={({ handleNext }) => (
                    <IconButton
                        variant="text"
                        color="white"
                        size="lg"
                        onClick={handleNext}
                        className="!absolute top-2/4 !right-4 -translate-y-2/4"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                        </svg>
                    </IconButton>
                )}
            >
                <img
                    src="src\components\Picture2.jpg"
                    alt="image 1"
                    className="h-full w-full shadow-xl object-cover"
                />
                <img
                    src="src\components\Picture3.png"
                    alt="image 2"
                    className="h-full w-full shadow-xl object-cover"
                />
                <img
                    src="src\components\Picture4.jpg"
                    alt="image 3"
                    className="h-full w-full shadow-xl object-cover"
                    id="image3"
                />
            </Carousel>
            <Typography variant="h2" color="blue-gray" className="mb-2 animate-fade-in">
                Welcome To VocalWheels
            </Typography>
            <Typography variant="h5" color="gray" className="font-normal animate-fade-in">
                Control the car using your voice
            </Typography>
        </div>
    );
}