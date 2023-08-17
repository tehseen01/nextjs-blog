import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import Icon from "./Icon";

const SideNav = () => {
  return (
    <nav>
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <Button
              href="/"
              className="justify-start text-black hover:underline hover:text-primary"
              as={Link}
              variant="light"
              color="primary"
              fullWidth
              // startContent={link.icon}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Button>
          </li>
        ))}
      </ul>
      <ul className="flex justify-between items-center">
        <li>
          <Button isIconOnly variant="light">
            <Icon name="github" strokeWidth={1.25} />
          </Button>
        </li>
        <li>
          <Button isIconOnly variant="light">
            <Icon name="twitter" strokeWidth={1.25} />
          </Button>
        </li>
        <li>
          <Button isIconOnly variant="light">
            <Icon name="linkedin" strokeWidth={1.25} />
          </Button>
        </li>
        <li>
          <Button isIconOnly variant="light">
            <Icon name="instagram" strokeWidth={1.25} />
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;

const links = [
  { id: 1, label: "Home", icon: <Icon name="home" strokeWidth={1.25} /> },
  {
    id: 2,
    label: "Reading List",
    icon: <Icon name="bookmark" strokeWidth={1.25} />,
  },
  {
    id: 3,
    label: "Listings",
    icon: <Icon name="scroll-text" strokeWidth={1.25} />,
  },
  { id: 4, label: "Podcasts", icon: <Icon name="mic" strokeWidth={1.25} /> },
  { id: 5, label: "Videos", icon: <Icon name="youtube" strokeWidth={1.25} /> },
  { id: 6, label: "Tags", icon: <Icon name="tag" strokeWidth={1.25} /> },
  { id: 7, label: "FAQ", icon: <Icon name="lightbulb" strokeWidth={1.25} /> },
  { id: 8, label: "Forem Shop", icon: <Icon name="home" strokeWidth={1.25} /> },
  { id: 9, label: "About", icon: <Icon name="user" strokeWidth={1.25} /> },
  { id: 10, label: "Contact", icon: <Icon name="user-2" strokeWidth={1.25} /> },
  { id: 11, label: "Guides", icon: <Icon name="home" strokeWidth={1.25} /> },
  {
    id: 12,
    label: "Advertise on DEV",
    icon: <Icon name="home" strokeWidth={1.25} />,
  },
];
