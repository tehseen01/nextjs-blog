import Image from "next/image";
import Link from "next/link";
import React from "react";
import Icon from "./Icon";

const Footer = () => {
  return (
    <footer className="bg-default mt-8 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-800 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <Link
            href="https://tehseen-site.vercel.app/"
            className="hover:underline"
          >
            Tehseen
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap gap-4 items-center mt-3 text-sm font-medium text-gray-800 dark:text-gray-400 sm:mt-0">
          <li>
            <Link href="https://github.com/tehseen01" target="_blank">
              <Icon name="github" />
            </Link>
          </li>
          <li>
            <Link href="https://twitter.com/tehseen_type" target="_blank">
              <Icon name="twitter" />
            </Link>
          </li>
          <li>
            <Link
              href="https://www.linkedin.com/in/mohd-tehseen-962635271"
              target="_blank"
            >
              <Icon name="linkedin" />
            </Link>
          </li>
          <li>
            <Link href="https://instagram.com/tehseen.01" target="_blank">
              <Icon name="instagram" />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
