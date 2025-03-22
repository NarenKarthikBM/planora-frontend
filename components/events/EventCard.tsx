"use client";

import { EventDetails } from "@/lib/types/events";
import { formatToDateString } from "@/lib/utils/conversions";
import { Card, Image, Text, Badge, Button, Group, Avatar } from "@mantine/core";

export default function EventCard(props: EventDetails) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section p={"sm"} component="a" href="https://mantine.dev/">
        <Group>
          <Avatar />
          <Text>{props.organisation.name}</Text>
        </Group>
      </Card.Section>
      <Card.Section component="a" href="https://mantine.dev/">
        <Image src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png" height={160} alt="Norway" />
      </Card.Section>

      <Group justify="space-between" mt="md">
        <Text fw={500} size="lg">
          {props.name}
        </Text>
      </Group>
      <Text fw={500} c={"dimmed"}>
        {formatToDateString(props.start_datetime)} - {formatToDateString(props.end_datetime)}
      </Text>
      <Text fw={500} c={"dimmed"} mb="xs">
        {props.location}
      </Text>
      <Group gap={"xs"} mb="xs">
        <Badge size="sm" color="cyan">
          {props.category}
        </Badge>
      </Group>

      {/* <Text c={"dimmed"}>With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway</Text> */}

      <Button color="violet" fullWidth mt="md" radius="md">
        View More
      </Button>
    </Card>
  );
}
