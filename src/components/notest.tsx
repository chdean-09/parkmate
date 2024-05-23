import React from "react";

type Props = {};

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

async function Test({}: Props) {
  const data = await test();

  return (
    <h3>
      hello world, number is {data.number}{" "}
      <p id="selenium-test">haii selenium</p>
    </h3>
  );
}

export default Test;
