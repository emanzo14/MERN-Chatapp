import React, { useState, useEffect } from "react";
import { Box, FormControl, Input, Text, useToast } from "@chakra-ui/react";
import UpdateGroupChat from "./UpdateGroupChat";
import axios from "axios";
import Chat from "../components/Chat";
import io from "socket.io-client";

const ENDPOINT = io.connect("http://localhost:3001");
let socket, selectedChatCompare;

const SingleChat = ({
  fetchAgain,
  setFetchAgain,
  user,
  selectedChat,
  setSelectedChat,
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const toast = useToast();

  const fetchMessages = async () => {
    if (!selectedChat) return;
    console.log(selectedChat._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/messages/${selectedChat._id}`,
        config
      );
      console.log(data);
      setMessages(data);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    socket = io.connect("http://localhost:3001");
    socket.emit("setup", user);
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (message) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== message.chat._id
      ) {
        //give notification if message is not from selected chat
      } else {
        setMessages([...messages, message]);
      }
    });
  });

  const sendMessageHandler = async (event) => {
    if (event.key === "Enter" && newMessage) {
      console.log(newMessage);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/messages",
          {
            content: newMessage,
            chat: selectedChat,
          },
          config
        );

        console.log(data);
        socket.emit("send message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const messageHandler = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            display="flex"
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            {!selectedChat.isGroupChat ? (
              <Text>{selectedChat.chatName.toUpperCase()}</Text>
            ) : (
              <>
                {selectedChat.chatName}
                <UpdateGroupChat
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  selectedChat={selectedChat}
                  setSelectedChat={setSelectedChat}
                  user={user}
                />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={2}
            height="100%"
            width="100%"
            bg="white"
            borderRadius="lg"
          >
            <div>
              <Chat messages={messages} user={user} />
            </div>
            <FormControl onKeyDown={sendMessageHandler} isRequired>
              <Input
                mt={3}
                bg="white"
                value={newMessage}
                placeholder="Enter message..."
                onChange={messageHandler}
              ></Input>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box justifyContent="center">
          <Text fontSize="3xl" pb={3}>
            Select a chat to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
