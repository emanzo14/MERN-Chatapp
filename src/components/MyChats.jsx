import React, { useEffect } from "react";
import { useState } from "react";
import { Box, useToast, Button, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import GroupChat from "../components/GroupChat";

const MyChats = ({
  user,
  chats,
  setChats,
  selectedChat,
  setSelectedChat,
  fetchAgain,
}) => {
  const [loggedInUser, setLoggedInUser] = useState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chats", config);
      console.log(data);
      setChats(data);
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

  const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
  };

  useEffect(() => {
    setLoggedInUser(JSON.parse(localStorage.getItem("userInfo")));

    const interval = setInterval(() => {
      fetchChats();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChat user={user} chats={chats} setChats={setChats}>
          <Button d="flex" fontSize={{ base: "17px", md: "10px", lg: "17px" }}>
            New Group Chat
          </Button>
        </GroupChat>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        width="100%"
        height="90%"
        borderRadius="lg"
        overflowY="hidden"
      >
        <Stack overflowY="scroll">
          {chats.map((chat) => (
            <Box
              onClick={() => setSelectedChat(chat)}
              cursor="pointer"
              bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
              color={selectedChat === chat ? "white" : "black"}
              px={3}
              py={2}
              borderRadius="lg"
              key={chat._id}
            >
              <Text>
                {!chat.isGroupChat
                  ? getSender(loggedInUser, chat.users)
                  : chat.chatName}
              </Text>
              {chat.latestMessage && (
                <Text fontSize="xs">
                  <b>{chat.latestMessage.sender.name} : </b>
                  {chat.latestMessage.content.length > 50
                    ? chat.latestMessage.content.substring(0, 51) + "..."
                    : chat.latestMessage.content}
                </Text>
              )}
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};
export default MyChats;
