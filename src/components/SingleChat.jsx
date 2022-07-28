import React from "react";
import { Box, Text } from "@chakra-ui/react";
import UpdateGroupChat from "./UpdateGroupChat";

const SingleChat = ({
  fetchAgain,
  setFetchAgain,
  user,
  selectedChat,
  setSelectedChat,
}) => {
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
            Messages will go here
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
