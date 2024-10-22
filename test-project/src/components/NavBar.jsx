import React from "react";
import {
    Navbar,
    MobileNav,
    Collapse,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    IconButton,
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
    Bars2Icon,
    MicrophoneIcon,
} from "@heroicons/react/24/solid";
import { Link } from 'react-router-dom';
// import { ChipWithStatus } from './Status.jsx';
import { ChipStatus } from './StatusWeb.jsx';

const commandCenterMenuItems = [
    {
        label: "Voice Input",
        icon: MicrophoneIcon,
        route: "/voice-input"
    },
    {
        label: "Text Input",
        icon: MicrophoneIcon, // Replace with the actual icon for TextInput
        route: "/text-input"
    },
];

function CommandCenterMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <Typography variant="h6" color="blue-gray" className="mb-1">
                        CommandCenter
                    </Typography>
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${
                            isMenuOpen ? "rotate-180" : ""
                        }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {commandCenterMenuItems.map(({ label, icon, route }, key) => {
                    return (
                        <Link to={route} key={label}>
                            <MenuItem
                                onClick={closeMenu}
                                className={`flex items-center gap-2 rounded`}
                            >
                                {React.createElement(icon, {
                                    className: `h-4 w-4`,
                                    strokeWidth: 2,
                                })}
                                <Typography
                                    as="span"
                                    variant="small"
                                    className="font-normal"
                                    color="inherit"
                                >
                                    {label}
                                </Typography>
                            </MenuItem>
                        </Link>
                    );
                })}
            </MenuList>
        </Menu>
    );
}

export default function ComplexNavbar() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);

    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setIsNavOpen(false),
        );
    }, []);

    return (
        <Navbar className="mx-auto max-w-screen-3xl p-2 lg:rounded-full lg:pl-6 sticky top-0 z-50 bg-light-blue-200 text-white shadow">
            <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
                <Link to="/" className="mr-4 ml-2 cursor-pointer py-1.5 text-2xl font-bold">
                    VocalWheels
                </Link>
                <div className="hidden lg:flex">
                    <CommandCenterMenu />
                    <Link to="/log">
                        <Button size="sm" variant="text">
                            <span>Log</span>
                        </Button>
                    </Link>
                    <Link to="/feed">
                        <Button size="sm" variant="text">
                            <span>Feed</span>
                        </Button>
                    </Link>
                    <Link to="/demo">
                        <Button size="sm" variant="text">
                            <span>Demo</span>
                        </Button>
                    </Link>
                    <Link to="/about">
                        <Button size="sm" variant="text">
                            <span>About</span>
                        </Button>
                    </Link>
                    {/* <ChipWithStatus /> */}
                    <ChipStatus/>
                </div>
                <IconButton
                    size="sm"
                    color="blue-gray"
                    variant="text"
                    onClick={toggleIsNavOpen}
                    className="ml-auto mr-2 lg:hidden"
                >
                    <Bars2Icon className="h-6 w-6" />
                </IconButton>
            </div>
            <Collapse open={isNavOpen} className="overflow-scroll">
                <CommandCenterMenu />
            </Collapse>
        </Navbar>
    );
}