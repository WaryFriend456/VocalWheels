import { useState } from 'react';
import { Avatar, Typography } from "@material-tailwind/react";
import { useSpring, animated } from 'react-spring';
import Modal from 'react-modal';


export default function About() {

    const [selectedProfile, setSelectedProfile] = useState(null);

    const animation = useSpring({
        from: { opacity: 0, marginTop: -500 },
        to: { opacity: 1, marginTop: 200 },
    });

    const handleProfileClick = (profile) => {
        setSelectedProfile(profile);
    };

    const closeModal = () => {
        setSelectedProfile(null);
    };

    return (
        <animated.div style={animation} className="flex flex-col items-center gap-40 mt-40">
            <div className="flex flex-col items-center gap-40">
                <div className="flex justify-center gap-40">
                    <div className="flex flex-col items-center gap-4 cursor-pointer transform transition duration-500 hover:scale-110" onClick={() => handleProfileClick('Tanish Dhariwal')}>
                        <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
                        <Typography variant="h6">Tanish Dhariwal</Typography>
                        <Typography variant="small" color="amber" className="font-normal">
                            Project Manager
                        </Typography>
                    </div>
                    <div className="flex flex-col items-center gap-4 cursor-pointer transform transition duration-500 hover:scale-110" onClick={() => handleProfileClick('John Doe')}>
                        <Avatar src="https://docs.material-tailwind.com/img/face-3.jpg" alt="avatar" />
                        <Typography variant="h6">John Doe</Typography>
                        <Typography variant="small" color="amber" className="font-normal">
                            Software Engineer
                        </Typography>
                    </div>
                    <div className="flex flex-col items-center gap-4 cursor-pointer transform transition duration-500 hover:scale-110" onClick={() => handleProfileClick('Jane Smith')}>
                        <Avatar src="https://docs.material-tailwind.com/img/face-4.jpg" alt="avatar" />
                        <Typography variant="h6">Jane Smith</Typography>
                        <Typography variant="small" color="amber" className="font-normal">
                            UI/UX Designer
                        </Typography>
                    </div>
                </div>
                <div className="flex justify-center gap-40">
                    <div className="flex flex-col items-center gap-4 cursor-pointer transform transition duration-500 hover:scale-110" onClick={() => handleProfileClick('Alice Johnson')}>
                        <Avatar src="https://docs.material-tailwind.com/img/face-5.jpg" alt="avatar" />
                        <Typography variant="h6">Alice Johnson</Typography>
                        <Typography variant="small" color="amber" className="font-normal">
                            Data Scientist
                        </Typography>
                    </div>
                    <div className="flex flex-col items-center gap-4 cursor-pointer transform transition duration-500 hover:scale-110" onClick={() => handleProfileClick('Bob Williams')}>
                        <Avatar src="https://docs.material-tailwind.com/img/face-4.jpg" alt="avatar" />
                        <Typography variant="h6">Bob Williams</Typography>
                        <Typography variant="small" color="amber" className="font-normal">
                            Backend Developer
                        </Typography>
                    </div>
                    <div className="flex flex-col items-center gap-4 cursor-pointer transform transition duration-500 hover:scale-110" onClick={() => handleProfileClick('Charlie Brown')}>
                        <Avatar src="https://docs.material-tailwind.com/img/face-3.jpg" alt="avatar" />
                        <Typography variant="h6">Charlie Brown</Typography>
                        <Typography variant="small" color="amber" className="font-normal">
                            Frontend Developer
                        </Typography>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={selectedProfile !== null}
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50%', // Adjust as needed
                        border: '1px solid #ccc',
                        background: '#fff',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '4px',
                        outline: 'none',
                        padding: '20px'
                    }
                }}
            >
                <h2>{selectedProfile}</h2>
                <p>Some text</p>
            </Modal>
        </animated.div>
    );
}