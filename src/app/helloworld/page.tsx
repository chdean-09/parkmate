"use client";

import React from "react";
import { useState, useEffect } from "react";

export default function usePage() {
  const [test, setTest] = useState("");
  useEffect(() => {
    fetch("/api/test/35345353 ", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((results) => setTest(results.number));
  }, []);

  return <div>hello world, number is {test}</div>;
}
