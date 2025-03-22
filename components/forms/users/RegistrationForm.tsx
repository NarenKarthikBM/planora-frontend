"use client";

import { useFormStatus } from "react-dom";
import { Alert, Button, ComboboxItem, PasswordInput, Select, Stack, TextInput } from "@mantine/core";
import { useState, useEffect, useActionState } from "react";
// @ts-expect-error: No types available for 'indian-states-cities-list'
import Indian_states_cities_list from "indian-states-cities-list";
import { registration } from "@/lib/actions/users/registration";
import RedirectClient from "@/components/RedirectClient";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} color="black" radius={"md"}>
      {pending ? "Loading.." : "Sign Up"}
    </Button>
  );
}

const RegistrationForm = () => {
  const [state, formAction] = useActionState(registration, initialState);
  const [stateLocation, setStateLocation] = useState<ComboboxItem | null>(null);
  const [stateCities, setStateCities] = useState<Array<ComboboxItem>>([]);

  useEffect(() => {
    if (stateLocation) {
      console.log(Indian_states_cities_list.STATE_WISE_CITIES, Indian_states_cities_list, stateLocation.value);
      setStateCities(Indian_states_cities_list.STATE_WISE_CITIES[stateLocation.value]);
    }
  }, [stateLocation]);

  if (state.message == "Successfully registered") {
    return <RedirectClient redirect_to="/verify_email" />;
  }

  return (
    <form action={formAction}>
      <Stack>
        {state.message.length > 0 ? <Alert color="red" title={state.message}></Alert> : null}
        <TextInput name="email" label="Email" placeholder="Email ID" required />
        <TextInput name="mobile_no" label="Mobile No" placeholder="Mobile No." required />
        <TextInput name="name" label="Name" placeholder="Name" required />
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
        <PasswordInput name="password" label="Password" placeholder="Password" required />
        <SubmitButton />
      </Stack>
    </form>
  );
};

export default RegistrationForm;
