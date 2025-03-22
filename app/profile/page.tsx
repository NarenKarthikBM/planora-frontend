import LogoutForm from "@/components/forms/auth/LogoutForm";

import { GetAuthUserDetails } from "@/lib/auth/auth-handlers";
import { UserDetails } from "@/lib/types/users";
import { Avatar, Box, Card, Divider, Flex, Group, Image, Menu, MenuDropdown, MenuTarget, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Profile() {
  const authUser: { details: UserDetails } | null = await GetAuthUserDetails();
  const authUserDetails = authUser ? authUser.details : null;

  if (!authUserDetails) {
    redirect("/login");
  }

  return (
    <>
      <Flex top={0} left={0} w={"100%"} h={"4em"} align={"center"} px={"1em"}>
        <Image src="/logo.png" alt="Planora Logo" width={50} height={50} />
        <Text component={Link} href={"/"} size="xl">
          planora.
        </Text>
        <Group ml={"auto"} gap={"1em"}>
          <Text component={Link} size="md" href={"/organisations/create"}>
            Host an event
          </Text>
          {authUserDetails ? (
            <Menu trigger="click-hover" loop={false} withinPortal={false} trapFocus={false} menuItemTabIndex={0}>
              <MenuTarget>
                <Avatar src={`https://ui-avatars.com/api/?name=${authUserDetails.name}&background=DDE0F2`} />
              </MenuTarget>
              <MenuDropdown>
                <Stack gap={"xs"} p={"md"}>
                  <Text style={{ textDecoration: "underline" }} component={Link} href={"/profile"} size="md">
                    Profile
                  </Text>
                  <Text style={{ textDecoration: "underline" }} component={Link} href={"/dashboard/organisations"} size="md">
                    Dashboard
                  </Text>
                </Stack>
              </MenuDropdown>
            </Menu>
          ) : (
            <Text component={Link} href={authUserDetails ? "/profile" : "/login"} size="md" style={{ cursor: "pointer" }}>
              Login
            </Text>
          )}
        </Group>
      </Flex>
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
        what we know about you.
      </Text>

      <Flex justify={"center"} align={"start"} mt={"3em"} gap={"2em"} mb={"3em"}>
        <Card shadow="lg" padding="lg" radius="md" w={{ base: "90%", md: "400px" }} mt={"3em"} style={{ backdropFilter: "blur(10px)" }}>
          <Stack>
            <Text size="md" ta={"center"}>
              Your Profile
            </Text>
            <Stack align="center">
              <Avatar src={`https://ui-avatars.com/api/?name=${authUserDetails.name}&background=DDE0F2`} />
              <Text size="xl" fw={600} ta={"center"}>
                {authUserDetails.name}
              </Text>
              <Text size="lg" ta={"center"}>
                {authUserDetails.email}
              </Text>
              <Text size="md" fw={600} ta={"center"}>
                {authUserDetails.mobile_no}
              </Text>
              {authUserDetails.location ? (
                <Text size="md" fw={600} ta={"center"}>
                  {authUserDetails.location}
                </Text>
              ) : null}
            </Stack>
            <Divider />
            <LogoutForm />
          </Stack>
        </Card>
      </Flex>
    </>
  );
}
