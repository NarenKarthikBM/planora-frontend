import EventCard from "@/components/events/EventCard";
import Search from "@/components/SearchInput";
import { GetAuthUserDetails } from "@/lib/auth/auth-handlers";
import { getEventDetails } from "@/lib/data/events/event-details";
import { getEventsPersonalisedFeed, getEventsPublicFeed } from "@/lib/data/events/events-feed";
import { EventDetails } from "@/lib/types/events";

import { Avatar, Box, Flex, Group, Image, SimpleGrid, Skeleton, Stack, Text, Title } from "@mantine/core";
import { IconCalendar, IconDeviceGamepad, IconDeviceLaptop, IconGlassFullFilled, IconMusic, IconPizza } from "@tabler/icons-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

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
          <Text component={Link} href={authUserDetails ? "/profile" : "/login"} size="md" style={{ cursor: "pointer" }}>
            {authUserDetails ? <Avatar src={`https://ui-avatars.com/api/?name=${authUserDetails.name}&background=DDE0F2`} /> : "Login"}
          </Text>
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
