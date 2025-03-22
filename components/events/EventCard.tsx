"use client";

import { EventDetails } from "@/lib/types/events";
import { formatToDateString } from "@/lib/utils/conversions";
import { Card, Image, Text, Badge, Button, Group, Avatar } from "@mantine/core";
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

export default function EventCard(props: EventDetails) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section p={"sm"}>
        <Group>
          <Avatar />
          <Text>{props.organisation.name}</Text>
        </Group>
      </Card.Section>
      <Card.Section>
        <Image src={imageUrls[props.id % imageUrls.length]} height={160} alt="Norway" />
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

      <Button component={Link} href={`/events/${props.id}/`} color="violet" fullWidth mt="md" radius="md">
        View More
      </Button>
    </Card>
  );
}
