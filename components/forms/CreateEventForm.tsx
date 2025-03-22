"use client";

import { useFormStatus } from "react-dom";
import { Alert, Button, ComboboxItem, Select, Stack, Text, Textarea, TextInput } from "@mantine/core";
// @ts-expect-error: No types available for 'indian-states-cities-list'
import Indian_states_cities_list from "indian-states-cities-list";
import { useState, useActionState, useEffect } from "react";

import RedirectClient from "../RedirectClient";

import { DateTimePicker } from "@mantine/dates";
import { createEvent } from "@/lib/actions/events/create-event";
import dayjs from "dayjs";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} color="black" radius={"md"}>
      {pending ? "Loading.." : "Submit"}
    </Button>
  );
}

const CreateEventForm = (props: { organisationID: number }) => {
  const initialState = {
    message: "",
    organisationID: props.organisationID,
  };

  const [state, formAction] = useActionState(createEvent, initialState);
  const [stateLocation, setStateLocation] = useState<ComboboxItem | null>(null);
  const [startValue, setStartValue] = useState<Date | null>(new Date());
  const [endValue, setEndValue] = useState<Date | null>(new Date());

  const [stateCities, setStateCities] = useState<Array<ComboboxItem>>([]);

  useEffect(() => {
    if (stateLocation) {
      console.log(Indian_states_cities_list.STATE_WISE_CITIES, Indian_states_cities_list, stateLocation.value);
      setStateCities(Indian_states_cities_list.STATE_WISE_CITIES[stateLocation.value]);
    }
  }, [stateLocation]);

  // const [files, setFiles] = useState<FileWithPath[]>([]);

  // const previews = files.map((file, index) => {
  //   const imageUrl = URL.createObjectURL(file);
  //   return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
  // });

  if (state.message == "Successfully created") {
    return <RedirectClient redirect_to="/dashboard/organisations" />;
  }

  return (
    <form action={formAction}>
      <Stack>
        {state.message.length > 0 ? (
          <Alert color="red" title="Error">
            <Text>{state.message}</Text>
          </Alert>
        ) : null}
        <TextInput name="name" label="Name" placeholder="Event Name" required />

        <Select
          required
          searchable
          name="type"
          label="Type"
          placeholder="Select Type"
          data={[
            { value: "online", label: "Online" },
            { value: "offline", label: "Offline" },
            { value: "hybrid", label: "Hybrid" },
          ]}
        />
        <Select
          required
          searchable
          name="category"
          label="Category"
          placeholder="Select Category"
          data={[
            { value: "music", label: "Music" },
            { value: "nightlife", label: "Nightlife" },
            { value: "concert", label: "Concert" },
            { value: "holidays", label: "Holidays" },
            { value: "dating", label: "Dating" },
            { value: "hobbies", label: "Hobbies" },
            { value: "coding", label: "Coding" },
            { value: "others", label: "Others" },
            { value: "business", label: "Business" },
            { value: "food_drink", label: "Food & Drink" },
          ]}
        />
        <Select
          required
          value={stateLocation ? stateLocation.value : null}
          onChange={(_value, option) => setStateLocation(option)}
          name="state"
          label="State"
          placeholder="Select State"
          searchable
          data={Indian_states_cities_list.STATES_OBJECT.map((state: { name: string; label: string }) => ({ value: state.name, label: state.label }))}
        />
        <Select required searchable name="city" label="City" placeholder="Select City" disabled={!stateLocation} data={stateCities} />
        <DateTimePicker required label="Pick start date time" placeholder="Pick start date" value={startValue} onChange={setStartValue} />
        <DateTimePicker required label="Pick end date time" placeholder="Pick  end date" value={endValue} onChange={setEndValue} />
        <input type="hidden" name="start_datetime" value={startValue ? dayjs(startValue).format("YYYY-MM-DDTHH:mm:ss") : ""} />
        <input type="hidden" name="end_datetime" value={endValue ? dayjs(endValue).format("YYYY-MM-DDTHH:mm:ss") : ""} />
        {/* <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles} maxFiles={1} styles={{ root: { minHeight: 100 } }}>
          <Text ta="center">Drop images here</Text>
        </Dropzone>
        <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? "xl" : 0}>
          {previews}
        </SimpleGrid> */}
        <Textarea name="description" label="Description" placeholder="Description" autosize minRows={3} maxRows={5} />
        <SubmitButton />
      </Stack>
    </form>
  );
};

export default CreateEventForm;
