import { MantineProvider } from "@mantine/core";

export default function MantineLayout({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider
      theme={{
        colors: {
          primaryColor: ["#f7f8fe", "#eef0fd", "#e4e7fc", "#dce0fc", "#d4d8fc", "#ccd0fb", "#c4c8fb", "#bcc0fa", "#b4b8fa", "#acb0f9"],
        },
      }}
    >
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100vw",
          height: "100%",
          minHeight: "100vh",
          zIndex: -4,
          overflow: "hidden",
          background: "radial-gradient(circle, rgba(221, 225, 253, 0.85) 40%, #fff 100%)",
        }}
      />
      {children}
    </MantineProvider>
  );
}
