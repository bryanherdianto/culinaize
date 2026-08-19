'use client';

import React, { useState, useEffect } from 'react';
import { Navbar as MTNavbar, Collapse, IconButton, Typography, Button, Menu, MenuHandler, MenuList, MenuItem, Avatar } from "@material-tailwind/react";
import { XMarkIcon, Bars3Icon, PowerIcon } from "@heroicons/react/24/solid";
import { useUser, useClerk } from '@clerk/nextjs';

interface NavItemProps {
  children: React.ReactNode;
  href: string;
  isScrolling?: boolean;
}

function NavItem({ children, href, isScrolling }: NavItemProps) {
  return (
    <li className={`relative after:block after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] ${isScrolling ? "after:bg-gray-900" : "after:bg-white"} after:w-full after:scale-x-0 after:transform after:transition-transform after:duration-300 after:origin-right hover:after:scale-x-100`}>
      <Typography as="a" href={href} variant="paragraph" className="font-medium">
        {children}
      </Typography>
    </li>
  );
}

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Contact Us", href: "/contact" },
  { label: "Chat", href: "/chat" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  // Clerk keeps the user in sync for us — no manual session listener needed
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const handleOpen = () => setOpen((cur) => !cur);

  const handleLogout = async () => {
    await signOut({ redirectUrl: '/' });
  };

  const displayName =
    user?.username ??
    user?.fullName ??
    user?.primaryEmailAddress?.emailAddress ??
    'Account';

  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpen(false));
  }, []);

  useEffect(() => {
    function handleScroll() {
      setIsScrolling(window.scrollY > 0);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MTNavbar
      fullWidth
      shadow={false}
      blurred={false}
      color={isScrolling ? "white" : "transparent"}
      className="fixed top-0 z-50 border-0 drop-shadow-md"
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <Typography variant="h5" color={isScrolling ? "blue-gray" : "white"}>
            CulinAIze
          </Typography>
        </a>
        <ul className={`ml-10 hidden items-center gap-6 lg:flex w-fit ${isScrolling ? "text-gray-900" : "text-white"}`}>
          {NAV_ITEMS.map(({ label, href }) => (
            <NavItem key={href} href={href} isScrolling={isScrolling}>
              {label}
            </NavItem>
          ))}
        </ul>
        <div className="hidden gap-2 lg:flex items-center">
          {/* Conditional rendering for Login button or User Menu.
              While Clerk is still resolving we render nothing, so the Login
              button never flashes for an already-signed-in user. */}
          {!isLoaded ? null : isSignedIn ? (
            <Menu>
              <MenuHandler>
                <button className="flex items-center gap-2 cursor-pointer">
                   <Avatar src={user.imageUrl} alt="avatar" size="sm" variant="circular" />
                   <Typography variant="small" className={`font-medium ${isScrolling ? "text-gray-900" : "text-white"}`}>
                      {displayName}
                   </Typography>
                </button>
              </MenuHandler>
              <MenuList>
                <MenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-500">
                  <PowerIcon className="size-4" />
                  Sign Out
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <a href="/login">
              <Button color={isScrolling ? "gray" : "white"} size="sm">
                Login
              </Button>
            </a>
          )}
        </div>
        <IconButton
          variant="text"
          color={isScrolling ? "gray" : "white"}
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
        >
          {open ? <XMarkIcon strokeWidth={2} className="size-6" /> : <Bars3Icon strokeWidth={2} className="size-6" />}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="container mx-auto mt-4 rounded-lg bg-white px-6 py-5">
          <ul className="flex flex-col gap-4 text-blue-gray-900">
            {NAV_ITEMS.map(({ label, href }) => (
              <NavItem key={href} href={href}>
                {label}
              </NavItem>
            ))}
          </ul>

          {/* Same auth control as the desktop bar — previously mobile had none at all. */}
          {isLoaded && (
            <div className="mt-4 border-t border-blue-gray-50 pt-4">
              {isSignedIn ? (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <Avatar src={user.imageUrl} alt="avatar" size="sm" variant="circular" />
                    <Typography variant="small" className="truncate font-medium text-gray-900">
                      {displayName}
                    </Typography>
                  </div>
                  <Button
                    color="red"
                    variant="text"
                    size="sm"
                    onClick={handleLogout}
                    className="flex shrink-0 items-center gap-2"
                  >
                    <PowerIcon className="size-4" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <a href="/login" className="block">
                  <Button color="gray" size="sm" fullWidth>
                    Login
                  </Button>
                </a>
              )}
            </div>
          )}
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar;
