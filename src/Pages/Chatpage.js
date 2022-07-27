import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/layout";
import { useState, useEffect } from "react";
import Chatbox from "../components/Chatbox";
import NavBar from "../components/NavBar";
import MyChats from "../components/MyChats";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) navigate("/");
  }, [navigate]);

  return (
    <div style={{ width: "100%" }}>
      {user && <NavBar user={user} />}
      <Box>
        {user && <MyChats user={user} />}
        {user && <Chatbox user={user} />}
      </Box>
    </div>
  );
};

export default Chatpage;
