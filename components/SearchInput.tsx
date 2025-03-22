"use client";

import { Flex, Select, Stack, TextInput } from "@mantine/core";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export const EVENT_CATEGORIES = ["music", "nightlife", "concert", "holidays", "dating", "gaming", "business", "coding", "food_drink"];

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 300);

  const handleFilter = (term: string | null) => {
    console.log(`Filtering... ${term}`);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("category", term);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Stack>
      <Flex w={"100%"} p={"2em"} gap={"1em"} wrap={"wrap"} style={{ backdropFilter: "blur(10px)" }} justify={"center"} align={"center"}>
        <TextInput
          size="lg"
          w={"100%"}
          maw={"600px"}
          placeholder="Search events..."
          radius={"xl"}
          style={{ backdropFilter: "blur(5px)" }}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />
        {/* <Select size="lg" w={"100px"} placeholder="Filter by category" data={["React", "Angular", "Vue", "Svelte"]} /> */}
        <Select
          size="lg"
          w={"100%"}
          maw={"200px"}
          placeholder="Filter "
          data={EVENT_CATEGORIES}
          style={{ backdropFilter: "blur(5px)" }}
          onChange={(val) => {
            handleFilter(val);
          }}
          radius={"xl"}
          defaultValue={searchParams.get("category")?.toString()}
        />
      </Flex>
      {/* <Flex w={"100%"} p={"2em"} style={{ backdropFilter: "blur(10px)" }} justify={"center"} align={"center"}></Flex> */}
    </Stack>
  );
}
