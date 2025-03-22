"use client";

import { Button } from "@mantine/core";

const CopyURL = () => {
  return (
    <Button
      color="rgba(101, 118, 246, 0.85)"
      radius="md"
      onClick={() => {
        navigator.clipboard.writeText(window.location.href).then(() => {
          alert("URL copied to clipboard");
        });
      }}
    >
      Share Link URL
    </Button>
  );
};
export default CopyURL;
