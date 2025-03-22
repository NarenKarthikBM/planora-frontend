import EditEventForm from "@/components/forms/EditEventForm";
import PublishEventForm from "@/components/forms/PublishEventForm";
import AddEventImages from "@/components/forms/UploadEventImages";
import { getEventDetails } from "@/lib/data/events/event-details";
import { EventDetails } from "@/lib/types/events";
import { Card, Divider, Flex, Stack, Text, Title } from "@mantine/core";

export default async function EditEvent({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const eventDetails: { details: EventDetails } = await getEventDetails(id);

  if (!eventDetails) {
    return <Text>No event found</Text>;
  }

  return (
    <>
      <Flex justify={"center"} align={"start"} gap={"2em"}>
        <Card visibleFrom="md" shadow="lg" padding="lg" radius="md" w={{ base: "100%", md: "800px" }} mt={"3em"} style={{ backdropFilter: "blur(10px)", background: "rgba(221, 225, 253, 0.85)" }}>
          <Stack>
            <Title order={1} size="xl">
              Event Details
            </Title>
            <Divider color={"gray"} />
            {/* <TextInput label="Event Name" placeholder="Event Name" defaultValue={eventDetails.details.name} />
            <Textarea label="Description" placeholder="Description" defaultValue={eventDetails.details.description} autosize minRows={3} maxRows={5} /> */}
            <EditEventForm eventDetails={eventDetails.details} />
            <PublishEventForm eventID={eventDetails.details.id} />
          </Stack>
        </Card>
        <Card visibleFrom="md" shadow="lg" padding="lg" radius="md" w={{ base: "100%", md: "400px" }} mt={"3em"} style={{ backdropFilter: "blur(10px)", background: "rgba(221, 225, 253, 0.85)" }}>
          {/* <Card shadow="lg" padding="lg" radius="md" w={{ base: "100%", md: "400px" }} mt={"3em"} style={{ backdropFilter: "blur(10px)" }}> */}
          <Stack>
            <Text size="sm" ta={"left"} mb={"0.5em"}>
              Add Pictures
            </Text>
            <Divider color={"gray"} />
            <AddEventImages organisationID={eventDetails.details.organisation.id} />
          </Stack>
        </Card>
      </Flex>
    </>
  );
}
