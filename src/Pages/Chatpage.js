import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Chatbox from "../components/Chatbox";
import NavBar from "../components/NavBar";
import MyChats from "../components/MyChats";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const [user, setUser] = useState();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) navigate("/");
  }, [navigate]);

  return (
    <div style={{ width: "100%" }}>
      {user && <NavBar user={user} />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && (
          <MyChats
            user={user}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            chats={chats}
            setChats={setChats}
          />
        )}
        {user && <Chatbox user={user} selectedChat={selectedChat} />}
      </Box>
    </div>
  );
};

export default Chatpage;
