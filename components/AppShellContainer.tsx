"use client";

import { NAVBAR_LINKS } from "@/lib/constants";
import { UserDetails } from "@/lib/types/users";
import { AppShell, Avatar, Flex, Group, NavLink, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function AppShellContainer({ children, authUserDetails }: { children: ReactNode; authUserDetails: UserDetails | null }) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();

  console.log(toggle);

  return (
    <AppShell header={{ height: 60 }} navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }} padding="md">
      <AppShell.Header bg={"rgb(220, 225, 255)"} px="md" withBorder={false}>
        <Flex top={0} left={0} w={"100%"} h={"4em"} align={"center"} px={"1em"}>
          <Text component={Link} href={"/"} size="xl">
            planora.
          </Text>
          <Group ml={"auto"} gap={"1em"}>
            <Text component={Link} href={authUserDetails ? "/profile" : "/login"} size="md" style={{ cursor: "pointer" }}>
              {authUserDetails ? <Avatar src={`https://ui-avatars.com/api/?name=${authUserDetails.name}&background=DDE0F2`} /> : "Login"}
            </Text>
          </Group>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar p="md" withBorder bg={"rgb(209, 215, 252)"} style={{ overflow: "auto" }}>
        {NAVBAR_LINKS.map((link, index) => (
          <NavLink
            color="white"
            key={index}
            label={
              <Text size="md" c={"black"} fw={600}>
                {link.label}
              </Text>
            }
            style={{ borderRadius: pathname == link.href ? "5px" : "0" }}
            href={link.href}
            mt={link.bottomDivider ? "auto" : 0}
            active={pathname == link.href}
            mb={"md"}
          />
        ))}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
