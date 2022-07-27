import React from "react";
import { useState } from "react";
import { Box, Tooltip, Button, Text, chakra, useToast } from "@chakra-ui/react";
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
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserListItem from "./UserListItem";

const NavBar = ({ user }) => {
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [selectedChat, setSelectedChat] = useState();

  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const searchHandler = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/users?search=${search}`, config);

      setLoading(false);
      console.log(data);
      setSearchResults(data);
    } catch (error) {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  const handleFunction = async () => {};

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(`/api/chat`, { userId }, config);

      setLoadingChat(false);
      console.log(data);

      setSelectedChat(data);
    } catch (error) {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
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
        <Button variant="ghost" bg="blue.200" onClick={onOpen}>
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

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search Users</DrawerHeader>

          <DrawerBody>
            <Box display="flex" pb="2">
              <Input
                placeholder="Type here..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={searchHandler}>Go!</Button>
            </Box>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <Text>Loading...</Text>
              </Box>
            ) : (
              <Box>
                {searchResults.map((user) => (
                  <UserListItem
                    user={user}
                    key={user.id}
                    handleFunction={() => accessChat(user.id)}
                  />
                ))}
              </Box>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default NavBar;
