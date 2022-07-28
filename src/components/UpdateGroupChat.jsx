import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
} from "@chakra-ui/react";
import { Button, useDisclosure, useToast, Text, Box } from "@chakra-ui/react";
import { Input, Toast } from "@chakra-ui/react";
import UserItem from "../components/UserItem";
import axios from "axios";
import UserListItem from "../components/UserListItem";

const UpdateGroupChat = ({
  fetchAgain,
  setFetchAgain,
  selectedChat,
  setSelectedChat,
  user,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const toast = useToast();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get(`/api/users?search=${search}`, config);

    // console.log(data);
    setSearchResults(data);
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chats/remove_user`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User Already in group!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-center",
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(user1._id);
    console.log(selectedChat._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chats/add_user`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );
      console.log(data);
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-center",
      });
    }
    setGroupChatName("");
  };

  const handleRename = async () => {
    // console.log(groupChatName);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/chats/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      onClose();
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    setGroupChatName("");
  };

  return (
    <>
      <Button onClick={onOpen}>Members</Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              {selectedChat.users.map((user) => (
                <UserItem
                  user={user}
                  key={user.id}
                  handleFunction={() => handleRemove(user)}
                />
              ))}
            </Box>
            <FormControl>
              <Input
                placeholder="Chat Name"
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button onClick={handleRename}>Update</Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Search Users..."
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {/* <Box>
              {selectedUsers.map((user) => (
                <UserItem
                  key={user._id}
                  user={user}
                  //   handleFunction={() => handleDelete(user)}
                />
              ))}
            </Box> */}

            {searchResults.slice(0, 5).map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => {
                  handleAddUser(user);
                }}
              />
            ))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChat;
