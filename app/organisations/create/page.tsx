import CreateOrganisationForm from "@/components/forms/CreateOrganisationForm";
import { Box, Card, Flex, Image, Stack, Text } from "@mantine/core";

export default function CreateOrganisation() {
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
        host events with planora.
      </Text>

      <Flex justify={"center"} align={"start"} mt={"3em"} gap={"2em"}>
        <Card visibleFrom="md" shadow="lg" padding="lg" radius="md" w={{ base: "100%", md: "800px" }} mt={"3em"} style={{ backdropFilter: "blur(10px)", background: "rgba(221, 225, 253, 0.85)" }}>
          <Stack>
            <Text size="32px" fw={600} ta={"left"} mb={"1em"}>
              All-in-One Event Management
            </Text>
            <Text ta={"left"} mb={"1em"} size="lg">
              Plan your today, elevate your tomorrow! From seamless planning to effortless execution, Planora brings every event to life with smart, modern technology. Stay ahead, stay organized, and
              make every moment unforgettable!
            </Text>
            <Text ta={"center"} mb={"1em"} size="xl" fw={600}>
              Plan · Organize · Radiate 🚀
            </Text>
          </Stack>
        </Card>
        <Card shadow="lg" padding="lg" radius="md" w={{ base: "100%", md: "400px" }} mt={"3em"} style={{ backdropFilter: "blur(10px)" }}>
          <Stack>
            <Text size="sm" ta={"left"} mb={"0.5em"}>
              Register your Organisation
            </Text>
            <CreateOrganisationForm />
          </Stack>
        </Card>
      </Flex>
    </>
  );
}
