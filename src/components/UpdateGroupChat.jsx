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
import { Input } from "@chakra-ui/react";
import UserItem from "../components/UserItem";

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

  const handleRemove = async () => {};
  const handleSearch = async (query) => {};
  const handleRename = async () => {};

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
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Button onClick={handleRename}>Update</Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to Group"
                value={groupChatName}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Button onClick={handleRename}>Add</Button>
            </FormControl>
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
