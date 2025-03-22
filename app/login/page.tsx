import LoginForm from "@/components/forms/auth/LoginForm";
import { GetAuthUserDetails } from "@/lib/auth/auth-handlers";
import { UserDetails } from "@/lib/types/users";
import { Box, Button, Card, Divider, Flex, Image, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login(props: {
  searchParams?: Promise<{
    next?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const next = searchParams?.next;
  const authUser: { details: UserDetails } | null = await GetAuthUserDetails();
  const authUserDetails = authUser ? authUser.details : null;

  if (authUserDetails) {
    redirect("/");
  }

  return (
    <>
      <Box pos={"absolute"} top={"2vh"} left={"10vw"} w={{ base: "100px", md: "400px" }} h={{ base: "100px", md: "400px" }}>
        <Image
          src="/bg-1.png"
          alt="Background Image"
          pos={"relative"}
          style={{
            width: "100%",
            height: "100%",
          }}
          fit="contain"
        />
      </Box>

      <Box pos={"absolute"} top={"60vh"} left={"70vw"} w={{ base: "100px", md: "400px" }} h={{ base: "100px", md: "400px" }}>
        <Image
          src="/bg-1.png"
          alt="Background Image"
          pos={"relative"}
          style={{
            width: "100%",
            height: "100%",
          }}
          fit="contain"
        />
      </Box>
      <Box mt={{ base: "10vh", md: "20vh" }}></Box>

      <Text size="48px" ta={"center"}>
        welcome to planora.
      </Text>

      <Flex justify={"center"} align={"start"} mt={"3em"} gap={"2em"}>
        <Card shadow="lg" padding="lg" radius="md" w={{ base: "90%", md: "400px" }} mt={"3em"} style={{ backdropFilter: "blur(10px)" }}>
          <Stack>
            <Text size="md" ta={"center"}>
              Login
            </Text>
            <LoginForm next={next != undefined ? next : null} />
            <Divider />
            <Button component={Link} href={"/register"} type="submit" color="gray.7" radius={"md"}>
              Sign Up
            </Button>
            <Text ta={"center"} component={Link} href={"/"} size="md" style={{ cursor: "pointer", textDecoration: "underline" }}>
              Back home
            </Text>
          </Stack>
        </Card>
      </Flex>
    </>
  );
}
