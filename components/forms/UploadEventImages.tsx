"use client";

import { Image, SimpleGrid, Text } from "@mantine/core";
import { useState, useActionState } from "react";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import RedirectClient from "../RedirectClient";

import { createEvent } from "@/lib/actions/events/create-event";

const AddEventImages = (props: { organisationID: number }) => {
  const initialState = {
    message: "",
    organisationID: props.organisationID,
  };

  const [state, formAction] = useActionState(createEvent, initialState);

  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return <Image key={index} src={imageUrl} alt="Preview" onLoad={() => URL.revokeObjectURL(imageUrl)} />;
  });

  if (state.message == "Successfully created") {
    return <RedirectClient redirect_to="/dashboard/organisations" />;
  }

  return (
    <form action={formAction}>
      <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles} maxFiles={1} styles={{ root: { minHeight: 100 } }}>
        <Text ta="center">Drop images here</Text>
      </Dropzone>
      <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? "xl" : 0}>
        {previews}
      </SimpleGrid>
    </form>
  );
};

export default AddEventImages;
