import { Box } from "@chakra-ui/react";
import React from "react";
import SingleChat from "./SingleChat";

const Chatbox = ({ selectedChat }) => {
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      flexDir="column"
      width={{ base: "100%", md: "68%" }}
    >
      <SingleChat selectedChat={selectedChat} />
    </Box>
  );
};

export default Chatbox;
