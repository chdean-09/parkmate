"use client";
import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
import { GridStack, GridStackNode } from "gridstack";
import React, { useState, useEffect, useRef } from "react";

type ParkingGridProps = {
  parkingSlotNum: number;
  setSlotNumChange: (number: number) => void;
};

export default function CustomParkingGrid({
  parkingSlotNum,
  setSlotNumChange,
}: ParkingGridProps) {
  const gridRef = useRef<GridStack | null>(null);

  useEffect(() => {
    gridRef.current = GridStack.init({
      float: true,
      cellHeight: "150px",
      minRow: 2,
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
      console.log(gridRef.current?.save());
    });

    // Cleanup function to remove event listener
    return () => {
      if (gridRef.current) {
        gridRef.current.off("dragstop");
      }
    };
  }, []);

  const addNewWidget = () => {
    const node: GridStackNode = { x: 0, y: 0, h: 1 };
    node.id = node.content = String(parkingSlotNum + 1);
    setSlotNumChange(parkingSlotNum + 1);
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
