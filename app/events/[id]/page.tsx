import RSVPEventForm from "@/components/forms/RSVPEventForm";
import { GetAuthUserDetails } from "@/lib/auth/auth-handlers";
import { getEventUserInteractions } from "@/lib/data/events/check-user-interactions";
import { getEventDetails } from "@/lib/data/events/event-details";
import { EventDetails } from "@/lib/types/events";
import { formatToDateString } from "@/lib/utils/conversions";

import { Avatar, Box, Button, Flex, Group, Image, Stack, Text, Title } from "@mantine/core";
import { IconCalendar, IconLocation } from "@tabler/icons-react";
import Link from "next/link";

const imageUrls = [
  "http://chaitanyak3672.pythonanywhere.com/static/2-1_92.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/20240322_195156.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/31_SM_MARATHON.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/ANI-20240827115806.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/IMG_8003.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/IMG_9126.JPG",
  "http://chaitanyak3672.pythonanywhere.com/static/Wedding-Stage-Decor-1.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/istockphoto-517345964-612x612.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/2-1_92.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/20240322_195156.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/31_SM_MARATHON.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/ANI-20240827115806.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/IMG_8003.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/IMG_9126.JPG",
  "http://chaitanyak3672.pythonanywhere.com/static/Wedding-Stage-Decor-1.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/istockphoto-517345964-612x612.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/2-1_92.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/20240322_195156.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/31_SM_MARATHON.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/ANI-20240827115806.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/IMG_8003.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/IMG_9126.JPG",
  "http://chaitanyak3672.pythonanywhere.com/static/Wedding-Stage-Decor-1.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/istockphoto-517345964-612x612.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/2-1_92.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/20240322_195156.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/31_SM_MARATHON.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/ANI-20240827115806.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/IMG_8003.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/IMG_9126.JPG",
  "http://chaitanyak3672.pythonanywhere.com/static/Wedding-Stage-Decor-1.jpg",
  "http://chaitanyak3672.pythonanywhere.com/static/istockphoto-517345964-612x612.jpg",
];

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

  const userInteractions = authUserDetails ? await getEventUserInteractions(id) : null;

  if (authUserDetails) {
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
        {/* <Group align={"center"} justify="center"> */}
        <Stack gap={"xs"} px={"md"} justify="center" align="center">
          <Title order={1} p={"0"}>
            {eventDetails.details.name}
          </Title>
          <Group>
            By
            <Text size="lg" fw={600}>
              {eventDetails.details.organisation.name}
            </Text>
          </Group>
          <Group>
            <Text size="md" fw={600}>
              Interested in attending?
            </Text>
            {userInteractions?.has_rsvp ? (
              "You have RSVP'd"
            ) : authUserDetails ? (
              <RSVPEventForm eventID={eventDetails.details.id} />
            ) : (
              <Button color="rgba(91, 110, 253, 0.85)" radius="md" component={Link} href={`/login?next=/events/${eventDetails.details.id}`} style={{ cursor: "pointer" }}>
                Login to RSVP
              </Button>
            )}
          </Group>
        </Stack>
        {/* </Group> */}
      </Box>

      <Stack>
        <Group px={"md"} justify="center" gap={"1em"}>
          <Box h={"260px"} w={"300px"} p={"lg"} mb={"lg"} bg={"rgb(209, 215, 252)"} style={{ borderRadius: "10px", display: "flex", alignItems: "center" }}>
            <Stack gap={"xs"} m={"auto"} justify="center" align="center">
              <IconCalendar size={40} />
              <Text size="xl" fw={600}>
                {formatToDateString(eventDetails.details.start_datetime)}
              </Text>
              <Text size="md">To</Text>
              <Text size="xl" fw={600}>
                {formatToDateString(eventDetails.details.end_datetime)}
              </Text>
              <Button
                component="a"
                href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.details.name)}&dates=${formatToDateString(
                  eventDetails.details.start_datetime
                )}/${formatToDateString(eventDetails.details.end_datetime)}&details=${encodeURIComponent(eventDetails.details.description)}&location=${encodeURIComponent(
                  eventDetails.details.location
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                color="rgba(101, 118, 246, 0.85)"
                radius="md"
              >
                Add to Calendar
              </Button>
            </Stack>
          </Box>
          <Box h={"260px"} w={"300px"} p={"lg"} mb={"lg"} bg={"rgb(209, 215, 252)"} style={{ borderRadius: "10px", display: "flex", alignItems: "center" }}>
            <Stack my={"auto"} gap={"xs"} m={"auto"} justify="center" align="center">
              <IconLocation size={40} />
              <Text size="xl" fw={600}>
                {eventDetails.details.location}
              </Text>
            </Stack>
          </Box>
        </Group>
        <Box h={"250px"} w={"100%"} p={"xl"} mb={"xl"} bg={"rgb(209, 215, 252)"} style={{ borderRadius: "10px", display: "flex", alignItems: "center" }}>
          <Stack my={"auto"} gap={"xs"} m={"auto"} justify="center" align="center">
            <Text size="lg" c={"black"} ta={"center"} maw={"600px"}>
              {eventDetails.details.description} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure, repellendus in minima dolor laboriosam accusantium enim at laborum deserunt quae
              similique quibusdam error quisquam, iusto nam officia rem eaque necessitatibus?
            </Text>
          </Stack>
        </Box>
      </Stack>
      <Box w={"100%"} className="scrolling-images" mb={"3em"}>
        <Group wrap={"nowrap"} gap={"3em"} className="scrolling-images-animation">
          {imageUrls.map((url, i) => (
            <Image key={i} className="scrolling-image" maw={"400px"} radius="md" src={url} alt={"event"} style={{ aspectRatio: 16 / 9 }} />
          ))}
        </Group>
      </Box>
    </>
  );
}
