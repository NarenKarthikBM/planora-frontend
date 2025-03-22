export async function getEventDetails(eventID: number) {
  const response = await fetch(`${process.env.API_URL}/v1/events/details/${eventID}/`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
    next: { revalidate: 0, tags: ["events-full-cache", "event-details-cache"] },
  });
  const resData = await response.json();

  return resData;
}
