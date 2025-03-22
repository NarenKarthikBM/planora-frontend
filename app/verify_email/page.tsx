import VerifyEmailForm from "@/components/forms/users/VerifyEmailForm";
import { sendVerificationOTP } from "@/lib/actions/users/send-verification-otp";
import { GetAuthUserDetails } from "@/lib/auth/auth-handlers";
import { UserDetails } from "@/lib/types/users";
import { Box, Button, Card, Flex, Image, Stack, Text } from "@mantine/core";
import { redirect } from "next/navigation";

export default async function VerifyEmail() {
  const authUser: { details: UserDetails } | null = await GetAuthUserDetails();
  const authUserDetails = authUser ? authUser.details : null;

  if (!authUserDetails || authUserDetails.email_verified) {
    redirect("/");
  }

  const otp = await sendVerificationOTP();
  if (otp.status != 200) {
    console.log(otp.message);
    redirect("/login");
  }

  return (
    <>
      <Box pos={"absolute"} top={"2vh"} left={"10vw"} w={{ base: "100px", md: "400px" }} h={{ base: "100px", md: "400px" }}>
        <Image
          src="/bg-1.png"
          alt="Background Image"
          pos={"relative"}
          style={{
            width: "100%",
            height: "100%",
          }}
          fit="contain"
        />
      </Box>

      <Box pos={"absolute"} top={"60vh"} left={"70vw"} w={{ base: "100px", md: "400px" }} h={{ base: "100px", md: "400px" }}>
        <Image
          src="/bg-1.png"
          alt="Background Image"
          pos={"relative"}
          style={{
            width: "100%",
            height: "100%",
          }}
          fit="contain"
        />
      </Box>
      <Box mt={{ base: "10vh", md: "20vh" }}></Box>

      <Text size="48px" ta={"center"}>
        get started with planora.
      </Text>

      <Flex justify={"center"} align={"start"} mt={"3em"} gap={"2em"} mb={"3em"}>
        <Card shadow="lg" padding="lg" radius="md" w={{ base: "90%", md: "400px" }} mt={"3em"} style={{ backdropFilter: "blur(10px)" }}>
          <Stack>
            <Text size="md" ta={"center"}>
              Verify Email
            </Text>
            <VerifyEmailForm />
            {/* <Button type="submit" color="gray.7" radius={"md"}>
              Verify
            </Button> */}
          </Stack>
        </Card>
      </Flex>
    </>
  );
}
