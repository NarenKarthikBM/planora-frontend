"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  redirect_to: string;
};
const RedirectClient = (props: Props) => {
  const router = useRouter();
  useEffect(() => {
    router.push(props.redirect_to);
    router.refresh();
  });
  return <div></div>;
};
export default RedirectClient;
