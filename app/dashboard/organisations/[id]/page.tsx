import { Table, TableTd, TableTh, TableThead, TableTr, TableTbody, Text, Title, Group, Badge, Stack, SimpleGrid, Box, Avatar, ActionIcon, Menu, MenuTarget, MenuDropdown, Button } from "@mantine/core";
import { getUserOrganisations } from "@/lib/data/users/user-organisations";
import { OrganisationDetails, UserDetails } from "@/lib/types/users";
import Link from "next/link";
import { IconChevronLeft, IconPlus } from "@tabler/icons-react";
import { getOrganisationCommitteeMembers } from "@/lib/data/users/organisation-committee-members";
import { getOrganisationEvents } from "@/lib/data/events/organisation-events";
import { EventDetails } from "@/lib/types/events";
import { formatToDateString } from "@/lib/utils/conversions";

export default async function OrganisationDetailPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const organisationList: { organisations: Array<{ details: OrganisationDetails; designation: string }> } = await getUserOrganisations();
  const organisationMembers = await getOrganisationCommitteeMembers(Number(id));
  const organisationEvents: { events: { details: EventDetails }[] } = await getOrganisationEvents(Number(id));
  console.log(organisationEvents.events[0]);
  const organisation = organisationList.organisations.find((org) => org.details.id === Number(id));

  if (!organisation) {
    return <Text>No organisation found</Text>;
  }

  return (
    <>
      <Link href="/dashboard/organisations">
        <Group mb={"1em"} style={{ cursor: "pointer" }}>
          <IconChevronLeft style={{ cursor: "pointer" }} />
          <Text size="md">Back</Text>
        </Group>
      </Link>
      <Box w={"100%"} p={"xl"} mb={"xl"} bg={"rgb(209, 215, 252)"} style={{ borderRadius: "10px" }}>
        <Group align={"center"}>
          <Avatar size={100} />
          <Stack gap={"xs"} px={"md"}>
            <Title order={1} p={"0"}>
              {organisation.details.name}
            </Title>
            <Group>
              <Text size="lg">{organisation.details.email}</Text>
              <Group gap={"xs"}>
                {organisation.details.tags.map((tag, index) => (
                  <Badge key={index} color="blue" variant="light">
                    {tag}
                  </Badge>
                ))}
              </Group>
            </Group>
            <Text size="md">{organisation.details.description}</Text>
          </Stack>
        </Group>
      </Box>
      <SimpleGrid cols={2} px={"md"}>
        <Stack>
          <Group justify="space-between" align="center" mb={"1em"}>
            <Title order={2} p={"md"}>
              Events
            </Title>
            <Menu shadow="md" width={200}>
              <MenuTarget>
                <Button size="md" color="rgba(155, 166, 255, 0.85)" style={{ cursor: "pointer" }}>
                  <IconPlus />
                  Add Event
                </Button>
              </MenuTarget>
              <MenuDropdown>
                <Button mb={"4px"} component={Link} href={`/dashboard/organisations/${id}/create_event/`} color="rgba(155, 166, 255, 0.85)" w={"100%"}>
                  Form
                </Button>
                <Button color="rgba(155, 166, 255, 0.85)" w={"100%"}>
                  CSV
                </Button>
              </MenuDropdown>
            </Menu>
          </Group>
          <Table highlightOnHover highlightOnHoverColor="rgba(221, 225, 253, 0.85)" style={{ width: "100%" }}>
            <TableThead>
              <TableTr>
                <TableTh>
                  <Text size="lg" fw={600}>
                    Name
                  </Text>
                </TableTh>
                <TableTh>
                  <Text size="lg" fw={600}>
                    Date
                  </Text>
                </TableTh>
                <TableTh>
                  <Text size="lg" fw={600}>
                    Location
                  </Text>
                </TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>
              {organisationEvents.events.map((event: { details: EventDetails }, index: number) => (
                <TableTr key={index}>
                  <TableTd>
                    <Text component={Link} style={{ cursor: "pointer", textDecoration: "underline" }} href={`/dashboard/events/${event.details.id}/edit`} size="md">
                      {event.details.name}
                    </Text>
                  </TableTd>
                  <TableTd>
                    <Text size="md">
                      {formatToDateString(event.details.start_datetime)} <br />- {formatToDateString(event.details.end_datetime)}
                    </Text>
                  </TableTd>
                  <TableTd>
                    <Text size="md">{event.details.location}</Text>
                  </TableTd>
                </TableTr>
              ))}
            </TableTbody>
          </Table>
        </Stack>

        <Stack>
          <Title order={2} p={"md"}>
            Members
          </Title>
          <Table highlightOnHover highlightOnHoverColor="rgba(221, 225, 253, 0.85)" style={{ width: "100%" }}>
            <TableThead>
              <TableTr>
                <TableTh>
                  <Text size="lg" fw={600}>
                    Name
                  </Text>
                </TableTh>
                <TableTh>
                  <Text size="lg" fw={600}>
                    Email
                  </Text>
                </TableTh>
                <TableTh>
                  <Text size="lg" fw={600}>
                    Designation
                  </Text>
                </TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>
              {organisationMembers.committee_members.map((member: { user: UserDetails; designation: string }, index: number) => (
                <TableTr key={index}>
                  <TableTd>
                    <Text component={Link} style={{ cursor: "pointer" }} href={`/dashboard/organisations/${organisation.details.id}`} size="md">
                      {member.user.name}
                    </Text>
                  </TableTd>
                  <TableTd>
                    <Text size="md">{member.user.email}</Text>
                  </TableTd>
                  <TableTd>
                    <Text size="md">{member.designation}</Text>
                  </TableTd>
                </TableTr>
              ))}
            </TableTbody>
          </Table>
        </Stack>
      </SimpleGrid>
    </>
  );
}
