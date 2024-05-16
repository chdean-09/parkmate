"use client";
import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
// import './CustomStyles.css';
import { GridStack, GridStackNode } from "gridstack";
import React, { useState, useEffect, useRef } from "react";

export default function CustomParkingGrid({ num }: { num: number }) {
  const [count, setCount] = useState(0);
  // const [info, setInfo] = useState("");
  const [items, setItems] = useState([
    { x: 2, y: 1, h: 2 },
    { x: 2, y: 4, w: 3 },
    { x: 4, y: 2 },
    { x: 3, y: 1, h: 2 },
    { x: 0, y: 6, w: 2, h: 2 },
  ]);

  const gridRef = useRef<GridStack | null>(null);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    gridRef.current = GridStack.init({
      float: true,
      cellHeight: "70px",
      minRow: 1,
    });

    gridRef.current.on("dragstop", (event, element) => {
      const node = element.gridstackNode;
      // setInfo(`you just dragged node #${node.id} to ${node.x},${node.y} – good job`);

      // Clear the info text after a two second timeout.
      // Clears previous timeout first.
      // if (timerIdRef.current) {
      //   clearTimeout(timerIdRef.current);
      // }
      // timerIdRef.current = setTimeout(() => {
      //   setInfo("");
      // }, 2000);
    });

    // Cleanup function to remove event listener
    return () => {
      if (gridRef.current) {
        gridRef.current.off("dragstop");
      }
    };
  }, []);

  const addNewWidget = () => {
    const node = items[count] || {
      x: Math.round(12 * Math.random()),
      y: Math.round(5 * Math.random()),
      w: Math.round(1 + 3 * Math.random()),
      h: Math.round(1 + 3 * Math.random()),
    };
    node.id = node.content = String(count);
    setCount(count + 1);
    if (gridRef.current) {
      gridRef.current.addWidget(node);
    }
  };

  return (
    <div>
      <button type="button" onClick={addNewWidget}>
        Add Widget
      </button>
      <section className="grid-stack"></section>
    </div>
  );
}
