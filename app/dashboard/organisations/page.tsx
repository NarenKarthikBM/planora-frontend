import { Table, TableTd, TableTh, TableThead, TableTr, TableTbody, Text, Title, Button, Group } from "@mantine/core";
import { getUserOrganisations } from "@/lib/data/users/user-organisations";
import { OrganisationDetails } from "@/lib/types/users";
import Link from "next/link";

export default async function MyOrganisationsPage() {
  const organisationList: { organisations: Array<{ details: OrganisationDetails; designation: string }> } = await getUserOrganisations();

  return (
    <>
      <Group justify="space-between" align="center" mb={"1em"}>
        <Title order={2}>My Organisations</Title>

        <Button component={Link} href="/organisations/create" color="blue" variant="filled">
          Create Organisation
        </Button>
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
                Contact Email
              </Text>
            </TableTh>
            <TableTh>
              <Text size="lg" fw={600}>
                Location
              </Text>
            </TableTh>
            <TableTh>
              <Text size="lg" fw={600}>
                Designation
              </Text>
            </TableTh>
            <TableTh></TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {organisationList.organisations.map((org, index) => (
            <TableTr key={index}>
              <TableTd>
                <Text component={Link} style={{ cursor: "pointer", textDecoration: "underline" }} href={`/dashboard/organisations/${org.details.id}`} size="md">
                  {org.details.name}
                </Text>
              </TableTd>
              <TableTd>
                <Text size="md">{org.details.email}</Text>
              </TableTd>
              <TableTd>
                <Text size="md">{org.details.location}</Text>
              </TableTd>
              <TableTd>
                <Text size="md">{org.designation}</Text>
              </TableTd>
            </TableTr>
          ))}
        </TableTbody>
      </Table>
    </>
  );
}
