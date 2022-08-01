import React from "react";
import { useState, useEffect } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
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

const NavBar = ({ user, setSelectedChat, chats, setChats }) => {
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  //   const [selectedChat, setSelectedChat] = useState();
  // const [chats, setChats] = useState([]);

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
      //   console.log(data);
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

  const createChat = async (userId) => {
    console.log(userId);
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(`/api/chats`, { userId }, config);

      if (!chats.find((c) => c.id === data._id)) setChats([...chats, data]);
      console.log(data);
      // setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
    onClose();
  };

  useEffect(() => {}, [createChat]);

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        p="5px 10px 5px 10px"
        borderWidth="5px"
        m="0px 10px 0px 10px"
        borderRadius="lg"
      >
        <Button variant="ghost" bg="blue.200" onClick={onOpen}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <Text px="4">Search User</Text>
        </Button>
        <Text fontFamily="" fontSize="4xl">
          Chattastic
        </Text>
        <div>
          <Menu>
            <MenuButton p="1px">
              <BellIcon />
            </MenuButton>
            <MenuList></MenuList>
            <Menu>
              <MenuButton
                p="20px"
                m="5px"
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                {user.name}
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
                {searchResults?.map((user) => (
                  <UserListItem
                    user={user}
                    key={user._id}
                    handleFunction={() => createChat(user._id)}
                  />
                ))}
              </Box>
            )}
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default NavBar;
