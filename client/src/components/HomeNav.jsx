import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import LogoutButton from "./LogoutButoon";
import Logo from "../images/tmg-logo.jpg";

function HomeNav({ token, username }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="w-full">
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        isBordered
        isBlurred={false}
        maxWidth="full"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand className="flex items-center">
            <div className="flex items-center gap-2">
              <img src={Logo} alt="Logo" className="w-8 h-8" />
              <h2 className="flex items-center text-lg font-bold">
                <span id="dot" className="text-primary">
                  DOT
                </span>
                <span id="mmnl">-MTL</span>
              </h2>
            </div>
            <div className="mx-4 border-l border-black h-8"></div>
            <div className="hidden sm:block">
              <h4>
                Hello, <span className="user">{username}</span>
              </h4>
            </div>
          </NavbarBrand>
        </NavbarContent>
        {!isMenuOpen && (
          <NavbarContent className="hidden sm:flex" justify="end">
            <NavbarItem>
              <LogoutButton islarge={true} />
            </NavbarItem>
          </NavbarContent>
        )}
        <NavbarMenu>
          <NavbarMenuItem>
            <Button
              variant="light"
              color="primary"
              className="text-black text-lg"
            >
              Hello, <span className="user">{username}</span>
            </Button>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <LogoutButton islarge={false} />
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </div>
  );
}

export default HomeNav;
