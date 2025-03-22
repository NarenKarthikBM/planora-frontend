"use client";

import { createOrganisation } from "../../lib/actions/organisations/create-organisation";
import { useFormStatus } from "react-dom";
import { Alert, Button, ComboboxItem, Divider, Select, Stack, Text, Textarea, TextInput } from "@mantine/core";
// @ts-expect-error: No types available for 'indian-states-cities-list'
import Indian_states_cities_list from "indian-states-cities-list";
import { useState, useActionState, useEffect } from "react";
import RedirectClient from "../RedirectClient";
import Link from "next/link";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} color="black" radius={"md"}>
      {pending ? "Loading.." : "Submit"}
    </Button>
  );
}

const CreateOrganisationForm = () => {
  const [state, formAction] = useActionState(createOrganisation, initialState);
  const [stateLocation, setStateLocation] = useState<ComboboxItem | null>(null);

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
        <TextInput name="name" label="Name" placeholder="Organisation Name" required />
        <TextInput name="contact_email" label="Contact Email" placeholder="Contact Email" />
        <Select
          value={stateLocation ? stateLocation.value : null}
          onChange={(_value, option) => setStateLocation(option)}
          name="state"
          label="State"
          placeholder="Select State"
          searchable
          data={Indian_states_cities_list.STATES_OBJECT.map((state: { name: string; label: string }) => ({ value: state.name, label: state.label }))}
        />
        <Select searchable name="city" label="City" placeholder="Select City" disabled={!stateLocation} data={stateCities} />
        {/* <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles} maxFiles={1} styles={{ root: { minHeight: 100 } }}>
          <Text ta="center">Drop images here</Text>
        </Dropzone>
        <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? "xl" : 0}>
          {previews}
        </SimpleGrid> */}
        <Textarea name="description" label="Description" placeholder="Description" autosize minRows={3} maxRows={5} />
        <SubmitButton />
        <Divider />
        <Button type="button" color="gray.7" component={Link} href={"/dashboard/organisations"} radius={"md"}>
          Go to Dashboard
        </Button>
      </Stack>
    </form>
  );
};

export default CreateOrganisationForm;
