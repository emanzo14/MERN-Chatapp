import React, { useState } from "react";
import {
  Box,
  FormControl,
  Input,
  Text,
  useToast,
  Button,
} from "@chakra-ui/react";
import UpdateGroupChat from "./UpdateGroupChat";
import axios from "axios";

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
            chatId: selectedChat._id,
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
            <div>Messages will go here</div>
            <FormControl onKeyDown={sendMessageHandler} isRequired>
              <Input
                bg="white"
                value={newMessage}
                placeholder="Enter message..."
                onChange={messageHandler}
              ></Input>
              {/* <Button onClick={sendMessageHandler}>Send!</Button> */}
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
