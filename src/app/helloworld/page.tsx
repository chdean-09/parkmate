async function test() {
  const res = await fetch("http://localhost:3000/api/test/35345353", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}

export default async function UsePage() {
  const data = await test();

  return <h1>hello world, number is {data.number}</h1>;
}
