import { Box } from "@chakra-ui/react";
import React from "react";
import SingleChat from "./SingleChat";

const Chatbox = ({ selectedChat }) => {
  return (
    <Box display={{ base: selectedChat ? "flex" : "none", md: "flex" }}>
      <SingleChat selectedChat={selectedChat} />
    </Box>
  );
};

export default Chatbox;
