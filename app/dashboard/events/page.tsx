import { Table, TableTd, TableTh, TableThead, TableTr, TableTbody, Text, Title, Button, Group, Accordion, AccordionItem, AccordionControl, AccordionPanel, Stack, Badge, Center } from "@mantine/core";
import { getUserOrganisations } from "@/lib/data/users/user-organisations";
import { EventDetails } from "@/lib/types/events";
import Link from "next/link";
import { getUserEvents } from "@/lib/data/events/events-list-by-user";
import { DonutChart } from "@mantine/charts";

export default async function MyEventsPage() {
  const eventsList: { events: Array<{ details: EventDetails; attended: number; rsvped: number }> } = await getUserEvents();
  console.log(eventsList);

  const items = eventsList.events.map((item: { details: EventDetails; attended: number; rsvped: number }) => (
    <AccordionItem key={item.details.id} value={item.details.id.toString()}>
      <AccordionControl>
        <Group>
          <Text fw={600}>{item.details.name}</Text>
          <Badge color={item.details.status == "draft" ? "blue" : "green"} variant="light">
            {item.details.status}
          </Badge>
        </Group>
      </AccordionControl>
      <AccordionPanel>
        <Stack>
          <Text>{item.details.description}</Text>
          <Table>
            <TableThead>
              <TableTr>
                <TableTh>Attended</TableTh>
                <TableTh>RSVPed</TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>
              <TableTr>
                <TableTd>{item.attended}</TableTd>
                <TableTd>{item.rsvped}</TableTd>
              </TableTr>
            </TableTbody>
          </Table>
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
