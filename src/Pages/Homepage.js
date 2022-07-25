import { Container, Box, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import React from "react";
import LoginForm from "../components/authentication/LoginForm";
import SignupForm from "../components/authentication/SignupForm";

const Homepage = () => {
  return (
    <div>
      <Container maxW="xl" centerContent>
        <Box
          d="Flex"
          justifyContent="center"
          p={3}
          bg={"#81E6D9"}
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text fontSize="4xl">Chatty-Kathy</Text>
        </Box>
        <Box bg={"#81E6D9"} p={4} w="100%" borderRadius="lg" borderWidth="1px">
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList>
              <Tab>Login</Tab>
              <Tab>Sign up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <LoginForm />
              </TabPanel>
              <TabPanel>
                <SignupForm />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
};

export default Homepage;
