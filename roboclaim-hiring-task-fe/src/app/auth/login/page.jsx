"use client";
import React from "react";
import {
  Box,
  HStack,
  Text
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useMediaQuery } from '@chakra-ui/react'
import { credentialsLogin } from "@/api/auth";
import * as Yup from "yup";
import SolidButton from "@/components/solid-button/solid-button";
import InputField from "@/components/input-field/input-field";
import ThemeButton from "@/components/theme-button/theme-button";


export default function Login() {
  const [isNonMobile] = useMediaQuery('(min-width: 850px)')
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });


  const LoginForm = () => {
    
    return (
      <Box
        h={isNonMobile ? "100%" : 'fit-content'}
        w={isNonMobile ? "60%" : '80%'}
        bg="background.secondary"
        borderRadius={isNonMobile ? 0 : 10}
        px={isNonMobile ? 100 : 10}
        py={isNonMobile ? 35 : 5}
        display={"flex"}
        flexDirection={"column"}
        gap={5}
        alignItems={isNonMobile ? 'flex-start' : 'center'}
        justifyContent="center"
      >
        <Box gap={5} display={"flex"} alignItems={isNonMobile ? 'flex-start' : 'center'} flexDirection={"column"} w={"100%"}>
          <Text fontSize={36} lineHeight={1} fontWeight={"bold"} color={"text.primary"}>
            Sign In
          </Text>
          <Text fontSize={16} lineHeight={1} color={"text.secondary"}>
            Enter your email and password to sign in!
          </Text>
          
        </Box>
        <HStack
          gap={30}
          minWidth={300}
          justifyContent={"space-between"}
          w={"70%"}
          alignItems={"center"}
        >
          <Box h={1.6} w={"100%"} bg={"border.primaryColor"}></Box>
          <Text color={"text.secondary"}>or</Text>
          <Box h={1.6} w={"100%"} bg={"border.primaryColor"}></Box>
        </HStack>

        <Box width={"70%"} minWidth={300}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await credentialsLogin(values);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {(props) => (
              <Form>
                <Box
                  alignItems={"flex-start"}
                  display="flex"
                  flexDir="column"
                >
                  <InputField
                    id="email"
                    name="Email"
                    placeholder="Enter your email"
                    width="100%"
                    height={12}
                    value={props.values.email}
                    onChange={props.handleChange("email")}
                    error={props.errors.email}
                    onBlur={props.handleBlur("email")}
                    isInvalid={props.errors.email && props.touched.email}
                    secureText={false}
                  />
                  <InputField
                    id="password"
                    name="Password"
                    placeholder="Enter your password"
                    width="100%"
                    height={12}
                    value={props.values.password}
                    onChange={props.handleChange("password")}
                    error={props.errors.password}
                    onBlur={props.handleBlur("password")}
                    isInvalid={props.errors.password && props.touched.password}
                    secureText={true}
                  />
                  <Box width={"100%"} mt={25}>
                    <SolidButton
                      width={"100%"}
                      height={12}
                      onClick={props.handleSubmit}
                      isLoading={props.isSubmitting}
                    >
                      <Text
                        fontSize={16}
                        color={"button.primaryText"}
                        fontWeight={"semibold"}
                      >
                        Sign In
                      </Text>
                    </SolidButton>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      bg="background.secondary"
      display="flex"
      dir="row"
      h={"100vh"}
      w={"100%"}
      minH={isNonMobile ? 690 : 750}
    >

      {isNonMobile && LoginForm()}
      <Box
        backgroundImage={"/assets/login-background.jpg"}
        backgroundSize="cover"
        backgroundPosition="center"
        h={"100%"}
        w={isNonMobile ? "50%" : "100%"}
        borderBottomLeftRadius={isNonMobile ? 100 : 0}
        boxShadow={"primaryShadow"}
        overflow={'hidden'}
      >
         <Box
         w={'100%'}
         h={'100%'}
         py={isNonMobile ? 0 : 20}
         display="flex"
         alignItems="center"
         justifyContent="center"
        backgroundColor="rgba(0, 0, 0, 0.7)" 
  >
        {!isNonMobile && LoginForm()}
        <Box position="absolute" bottom={isNonMobile ? 5 : 'unset'} top={isNonMobile ? 'unset' : 5} right={5}>
          <ThemeButton />
        </Box>
        <Box position="absolute" bottom={5}>
          <Text color={'text.tertiary'} fontSize={12} >
            © 2024 RoboClaim. All Rights Reserved.
          </Text>
        </Box>
        </Box>
      </Box>
    </Box>
  );
}
