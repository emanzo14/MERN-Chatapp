import React from "react";
import { useState } from "react";
import {
  VStack,
  Box,
  StackDivider,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const SignupForm = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Username"
          onChange={(e) => setName(e.target.value)}
        ></Input>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <FormLabel>Password</FormLabel>
        <Input
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          placeholder="Confirm Your Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></Input>
        <FormLabel>Upload Profile Pic</FormLabel>
        <Input
          placeholder="Paste a .png file"
          onChange={(e) => setPic(e.target.value)}
        ></Input>
      </FormControl>
    </VStack>
  );
};

export default SignupForm;
