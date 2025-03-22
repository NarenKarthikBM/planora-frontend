import CreateEventForm from "@/components/forms/CreateEventForm";

import { getUserOrganisations } from "@/lib/data/users/user-organisations";
import { OrganisationDetails } from "@/lib/types/users";
import { Card, Flex, Stack, Text } from "@mantine/core";

export default async function CreateEvent({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const organisationList: { organisations: Array<{ details: OrganisationDetails; designation: string }> } = await getUserOrganisations();
  const organisation = organisationList.organisations.find((org) => org.details.id === Number(id));

  if (!organisation) {
    return <Text>No organisation found</Text>;
  }

  return (
    <>
      <Flex justify={"center"} align={"start"} mt={"3em"} gap={"2em"}>
        <Card visibleFrom="md" shadow="lg" padding="lg" radius="md" w={{ base: "100%", md: "800px" }} mt={"3em"} style={{ backdropFilter: "blur(10px)", background: "rgba(221, 225, 253, 0.85)" }}>
          <Stack>
            <Text size="32px" fw={600} ta={"left"} mb={"1em"}>
              Create An Event under {organisation.details.name}
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
              Create an Event
            </Text>
            <CreateEventForm organisationID={Number(id)} />
          </Stack>
        </Card>
      </Flex>
    </>
  );
}
