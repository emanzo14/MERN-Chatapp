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
  Box,
} from "@chakra-ui/react";
import { Button, useDisclosure, useToast, Input } from "@chakra-ui/react";
import axios from "axios";
import UserListItem from "../components/UserListItem";
import UserItem from "../components/UserItem";

const GroupChat = ({ children, user, chats, setChats }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState([]);
  // const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    // setLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get(`/api/users?search=${search}`, config);
    // setLoading(false);
    // console.log(data);
    setSearchResults(data);
  };

  const handleSubmit = async () => {
    if (!groupChatName) {
      toast({
        title: "Please Enter a group chat name",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.post(
      "/api/chats/group",
      {
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((user) => user._id)),
      },
      config
    );
    console.log(data);
    setChats([data, ...chats]);

    onClose();
    toast({
      title: "New Group Chat Created!",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  };

  const handleGroup = async (userAdd) => {
    if (selectedUsers.includes(userAdd)) {
      return;
    }
    setSelectedUsers([...selectedUsers, userAdd]);
  };

  const handleDelete = (userDelete) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== userDelete._id));
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                borderWidth="2px"
                borderColor="#A0AEC0"
                mb={4}
                placeholder="Chat Name"
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                borderWidth="2px"
                borderColor="#A0AEC0"
                placeholder="Search Users..."
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box>
              {selectedUsers.map((user) => (
                <UserItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleDelete(user)}
                />
              ))}
            </Box>

            {searchResults.slice(0, 5).map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => {
                  handleGroup(user);
                }}
              />
            ))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Create!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChat;
