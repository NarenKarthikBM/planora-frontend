import { ScrollArea } from "@mantine/core";
import AppShellContainer from "@/components/AppShellContainer";
import { GetAuthUserDetails } from "@/lib/auth/auth-handlers";

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const authUser = await GetAuthUserDetails();
  const authUserDetails = authUser ? authUser.details : null;

  return (
    <AppShellContainer authUserDetails={authUserDetails}>
      <ScrollArea
        style={{
          height: "calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))", // viewport height - height of header - height of footer
        }}
      >
        {children}
      </ScrollArea>
    </AppShellContainer>
  );
}
