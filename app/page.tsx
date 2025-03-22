import EventCard from "@/components/events/EventCard";
import Search from "@/components/SearchInput";
import { GetAuthUserDetails } from "@/lib/auth/auth-handlers";
import { getEventsPersonalisedFeed, getEventsPublicFeed } from "@/lib/data/events/events-feed";
import { EventDetails } from "@/lib/types/events";

import { Avatar, Box, Flex, Group, Image, Menu, MenuDropdown, MenuTarget, SimpleGrid, Skeleton, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

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
  searchParams?: Promise<{
    query?: string;
    category?: string;
    page?: string;
  }>;
}) {
  const authUser = await GetAuthUserDetails();
  const authUserDetails = authUser ? authUser.details : null;

  console.log(authUserDetails);
  if (authUserDetails?.email_verified == false) {
    redirect("/verify_email");
  }

  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const category = searchParams?.category || "";
  const currentPage = Number(searchParams?.page) || 1;

  const eventsFeed = authUserDetails ? await getEventsPersonalisedFeed(currentPage, query, category) : await getEventsPublicFeed(currentPage, query, category);
  // console.log(eventsFeed.events[0].details);

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
                  <Text style={{ textDecoration: "underline" }} component={Link} href={"/logout"} size="md">
                    Logout
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
      <Group visibleFrom="md" w={"100%"} h={"80px"} justify="center" align="center" mt={"3em"}>
        <Text size="48px">plan.</Text>
        <Text size="48px">organise.</Text>
        <Text size="48px">radiate.</Text>
      </Group>
      <Group hiddenFrom="md" w={"100%"} h={"80px"} justify="center" align="center" mt={"3em"}>
        <Text size="24px">plan.</Text>
        <Text size="24px">organise.</Text>
        <Text size="24px">radiate.</Text>
      </Group>

      <Box mt={"2em"}>
        <Search />
      </Box>

      <Box w={"100%"} className="scrolling-images" mb={"3em"}>
        <Group wrap={"nowrap"} gap={"3em"} className="scrolling-images-animation">
          {imageUrls.map((url, i) => (
            <Image key={i} className="scrolling-image" maw={"400px"} radius="md" src={url} alt={"event"} style={{ aspectRatio: 16 / 9 }} />
          ))}
          {/* <Image className="scrolling-image" maw={"400px"} radius="md" src="http://chaitanyak3672.pythonanywhere.com/static/2-1_92.jpg" alt="dsfds" />
          <Image className="scrolling-image" maw={"400px"} radius="md" src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png" alt="dsfds" />
          <Image className="scrolling-image" maw={"400px"} radius="md" src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png" alt="dsfds" />
          <Image className="scrolling-image" maw={"400px"} radius="md" src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png" alt="dsfds" />
          <Image className="scrolling-image" maw={"400px"} radius="md" src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png" alt="dsfds" />
          <Image className="scrolling-image" maw={"400px"} radius="md" src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png" alt="dsfds" />
          <Image className="scrolling-image" maw={"400px"} radius="md" src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png" alt="dsfds" />
          <Image className="scrolling-image" maw={"400px"} radius="md" src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png" alt="dsfds" />
          <Image className="scrolling-image" maw={"400px"} radius="md" src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png" alt="dsfds" />
          <Image className="scrolling-image" maw={"400px"} radius="md" src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png" alt="dsfds" />
          <Image className="scrolling-image" maw={"400px"} radius="md" src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png" alt="dsfds" />
          <Image className="scrolling-image" maw={"400px"} radius="md" src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png" alt="dsfds" /> */}
        </Group>
      </Box>
      {/* <Flex align="center" justify="space-evenly" my={"3em"} wrap={"wrap"} gap={"lg"}>
        <Stack component={Link} hre w={{ base: "100px", md: "120px" }} align="center" p={"md"} className="glassmorphic-card">
          <IconMusic size={"32px"} />
          <Text size="xs">Music</Text>
        </Stack>
        <Stack w={{ base: "100px", md: "120px" }} align="center" p={"md"} className="glassmorphic-card">
          <IconGlassFullFilled size={"32px"} />
          <Text size="xs">Night Life</Text>
        </Stack>
        <Stack w={{ base: "100px", md: "120px" }} align="center" p={"md"} className="glassmorphic-card">
          <IconCalendar size={"32px"} />
          <Text size="xs">Holidays</Text>
        </Stack>
        <Stack w={{ base: "100px", md: "120px" }} align="center" p={"md"} className="glassmorphic-card">
          <IconDeviceGamepad size={"32px"} />
          <Text size="xs">Gaming</Text>
        </Stack>
        <Stack w={{ base: "100px", md: "120px" }} align="center" p={"md"} className="glassmorphic-card">
          <IconDeviceLaptop size={"32px"} />
          <Text size="xs">Coding</Text>
        </Stack>
        <Stack w={{ base: "100px", md: "120px" }} align="center" p={"md"} className="glassmorphic-card">
          <IconPizza size={"32px"} />
          <Text size="xs">Food</Text>
        </Stack>
      </Flex> */}

      {/* <Flex w={"100%"} p={"2em"} style={{ backdropFilter: "blur(10px)" }} justify={"center"} align={"center"}>
        <TextInput size="lg" w={"100%"} maw={"600px"} placeholder="Search events..." radius={"xl"} style={{ backdropFilter: "blur(5px)" }} />
      </Flex> */}

      <Suspense key={query + currentPage} fallback={<Skeleton />}>
        <SimpleGrid cols={{ base: 1, md: 3 }}>
          {eventsFeed.events.map((event: { details: EventDetails }) => (
            <Flex p={"1em"} key={event.details.id}>
              <EventCard {...event.details} />
            </Flex>
          ))}
        </SimpleGrid>
      </Suspense>
    </>
  );
}
