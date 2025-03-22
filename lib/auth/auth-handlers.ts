import { cookies } from "next/headers";
import { UserDetails } from "../types/users";

const userDetailsKey = "user_details";
const userAuthTokenKey = "user_auth_token";
// const userRefreshTokenKey = "user_refresh_token";

export async function GetAuthUserDetails(): Promise<{ details: UserDetails } | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(userDetailsKey)?.value;
  if (value == undefined) {
    return null;
  } else {
    return {
      details: JSON.parse(value),
    };
  }
}

export async function GetAuthUserTokens() {
  const cookieStore = await cookies();
  if (!cookieStore.has(userAuthTokenKey)) {
    // if (!cookieStore.has(userAuthTokenKey) || !cookieStore.has(userRefreshTokenKey)) {
    return null;
  }
  return {
    authToken: cookieStore.get(userAuthTokenKey)?.value,
    // refreshToken: cookieStore.get(userRefreshTokenKey)?.value,
  };
}

export async function SetAuthUserDetails(details: object) {
  const cookieStore = await cookies();
  cookieStore.set(userDetailsKey, JSON.stringify(details), { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/" });
  return;
}

export async function SetAuthUserTokens(authToken: string) {
  const cookieStore = await cookies();
  cookieStore.set(userAuthTokenKey, authToken, { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/" });
  //   cookieStore.set(userRefreshTokenKey, refreshToken, { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/" });
  return;
}

export async function DeleteAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(userDetailsKey);
  cookieStore.delete(userAuthTokenKey);
  //   cookieStore.delete(userRefreshTokenKey);
}
