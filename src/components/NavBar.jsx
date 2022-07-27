import React from "react";
import { useState } from "react";
import { Box, Tooltip, Button, Text, chakra } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="RGBA(0, 0, 0, 0.16)"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Button variant="ghost" bg="blue.200">
          <i class="fa-solid fa-magnifying-glass"></i>
          <Text px="4">Search User</Text>
        </Button>
        <Text fontFamily="" fontSize="3xl">
          Chat-App
        </Text>
        <div>
          <Menu>
            <MenuButton p="1px">
              <BellIcon />
            </MenuButton>
            <MenuList></MenuList>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                My Profile
              </MenuButton>
              <MenuList>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Menu>
        </div>
      </Box>
    </div>
  );
};

export default NavBar;
