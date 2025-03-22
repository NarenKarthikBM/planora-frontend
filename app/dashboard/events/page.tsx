import { Table, TableTd, TableTh, TableThead, TableTr, TableTbody, Text, Title, Button, Group, Accordion, AccordionItem, AccordionControl, AccordionPanel, Stack } from "@mantine/core";
import { getUserOrganisations } from "@/lib/data/users/user-organisations";
import { EventDetails } from "@/lib/types/events";
import Link from "next/link";
import { getUserEvents } from "@/lib/data/events/events-list-by-user";

export default async function MyEventsPage() {
  const eventsList: { events: Array<{ details: EventDetails; attended: number; rsvped: number }> } = await getUserEvents();
  console.log(eventsList);

  const items = eventsList.events.map((item: { details: EventDetails; attended: number; rsvped: number }) => (
    <AccordionItem key={item.details.id} value={item.details.id.toString()}>
      <AccordionControl>
        <Text fw={600}>{item.details.name}</Text>
      </AccordionControl>
      <AccordionPanel>
        <Stack>
          <Text>{item.details.description}</Text>
          <Text size="md">Attended: {item.attended}</Text>
          <Text size="md">RSVPed: {item.rsvped}</Text>
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  ));

  return (
    <>
      <Title order={2}>My Events</Title>
      <Accordion mt={"2em"}>{items}</Accordion>
    </>
  );
}
