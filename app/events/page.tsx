import { GetAuthUserDetails } from "@/lib/auth/auth-handlers";
import { getEventDetails } from "@/lib/data/events/event-details";
import { EventDetails } from "@/lib/types/events";

import { Avatar, Box, Flex, Group, Image, Menu, MenuDropdown, MenuTarget, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";

export default async function Home(props: {
  params?: Promise<{
    id?: number;
  }>;
}) {
  const params = await props.params;
  const id = params?.id;

  if (id === undefined) {
    return;
  }

  const eventDetails: { details: EventDetails } = await getEventDetails(id);

  const authUser = await GetAuthUserDetails();
  const authUserDetails = authUser ? authUser.details : null;

  console.log(authUserDetails);
  if (authUserDetails?.email_verified == false) {
    // Send View Interaction data
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
      <Box w={"100%"} p={"xl"} mb={"xl"} bg={"rgb(209, 215, 252)"} style={{ borderRadius: "10px" }}>
        <Group align={"center"}>
          <Avatar size={100} />
          <Stack gap={"xs"} px={"md"}>
            <Title order={1} p={"0"}>
              {eventDetails.details.name}
            </Title>
            <Group>
              <Text size="lg">{eventDetails.details.organisation.name}</Text>
            </Group>
          </Stack>
        </Group>
      </Box>
    </>
  );
}
