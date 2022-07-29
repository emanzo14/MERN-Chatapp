import React, { useState, useEffect } from "react";
import { Box, FormControl, Input, Text, useToast } from "@chakra-ui/react";
import UpdateGroupChat from "./UpdateGroupChat";
import axios from "axios";
import Chat from "../components/Chat";

const SingleChat = ({
  fetchAgain,
  setFetchAgain,
  user,
  selectedChat,
  setSelectedChat,
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
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

  useEffect(() => {
    fetchMessages(); // eslint-disable-next-line
  }, [selectedChat]);

  return (
    <>
      {selectedChat ? (
        <>
          <Text display="flex" pb="3" px="2" justifyContent="space-between">
            {!selectedChat.isGroupChat ? (
              <Text>{selectedChat.chatName}</Text>
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
            bg="pink"
            borderRadius="lg"
          >
            <div>
              Messages will go here
              <Chat messages={messages} user={user} />
            </div>
            <FormControl onKeyDown={sendMessageHandler} isRequired>
              <Input
                bg="white"
                value={newMessage}
                placeholder="Enter message..."
                onChange={messageHandler}
              ></Input>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box>
          <Text>Select a chat to start chatting</Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
