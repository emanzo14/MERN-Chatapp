import { Box } from "@chakra-ui/react";
import React from "react";

const Chatbox = ({ selectedChat }) => {
  return (
    <Box display={{ base: selectedChat ? "flex" : "none", md: "flex" }}>
      Selected Chat
    </Box>
  );
};

export default Chatbox;
