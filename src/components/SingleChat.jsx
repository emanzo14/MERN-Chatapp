import React from "react";
import { Box, Text } from "@chakra-ui/react";

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
          <Text>Name of Chat</Text>
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
