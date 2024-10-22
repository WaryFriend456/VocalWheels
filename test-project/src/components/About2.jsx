import { Avatar, Typography } from "@material-tailwind/react";

export default function About() {
    return (
        <div className="flex flex-col items-center gap-40 mt-40">
            <div className="flex justify-center gap-40">
                <div className="flex flex-col items-center gap-4">
                    <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
                    <Typography variant="h6">Tanish Dhariwal</Typography>
                    <Typography variant="small" color="amber" className="font-normal">
                        Project Manager
                    </Typography>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" variant="rounded" />
                    <Typography variant="h6">Tanay Bansal</Typography>
                    <Typography variant="small" color="light-green" className="font-normal">
                        Backend Developer
                    </Typography>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" variant="rounded" />
                    <Typography variant="h6">Keshav Bharadia</Typography>
                    <Typography variant="small" color="green" className="font-normal">
                        UI/UX Designer
                    </Typography>
                </div>
            </div>
            <div className="flex justify-center gap-40">
                <div className="flex flex-col items-center gap-4">
                    <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" variant="circular" />
                    <Typography variant="h6">Kushal Bang</Typography>
                    <Typography variant="small" color="indigo" className="font-normal">
                        Web Developer
                    </Typography>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" variant="rounded" />
                    <Typography variant="h6">Prajwal Joshi</Typography>
                    <Typography variant="small" color="cyan" className="font-normal">
                        Data Analyst
                    </Typography>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" variant="rounded" />
                    <Typography variant="h6">Gaurav Jain</Typography>
                    <Typography variant="small" color="teal" className="font-normal">
                        Data Analyst
                    </Typography>
                </div>
            </div>
        </div>
    );
}


