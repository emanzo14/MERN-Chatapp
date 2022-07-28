import { Box } from "@chakra-ui/react";
import React from "react";
import SingleChat from "./SingleChat";

const Chatbox = ({
  selectedChat,
  setSelectedChat,
  user,
  fetchAgain,
  setFetchAgain,
}) => {
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      flexDir="column"
      width={{ base: "100%", md: "68%" }}
    >
      <SingleChat
        user={user}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
      />
    </Box>
  );
};

export default Chatbox;
