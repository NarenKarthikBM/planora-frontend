"use server";
import { redirect } from "next/navigation";
import { DeleteAuthCookies } from "@/lib/auth/auth-handlers";

export async function logout() {
  // let data = {
  //   email: formData.get("email"),
  //   password: formData.get("password"),
  // };

  await DeleteAuthCookies();
  redirect("/");

  return {
    message: "Logged Out",
  };
  // const response = await fetch(`${process.env.API_URL}/v1/users/obtain-auth-token/`, {
  //   cache: "no-store",
  //   method: "POST",
  //   body: JSON.stringify(data),
  //   headers: { "Content-Type": "application/json" },
  // });

  // if (response.ok) {
  //   const resData = await response.json();

  //   if (response.status == 200) {
  //     console.log(resData);
  //     SetAuthUserDetails(resData["user_details"]);
  //     SetAuthUserTokens(resData["tokens"]["auth_token"]);
  //     redirect("/");
  //   } else {
  //     if (resData.field == "email") {
  //       return {
  //         message: "User Not Found",
  //       };
  //     }
  //     return {
  //       message: "Invalid Credentials!!",
  //     };
  //   }
  // } else {
  //   console.error("HTTP-Error: " + (await response.text()));
  //   return {
  //     message: "Invalid Credentials!!",
  //   };
  // }
}
