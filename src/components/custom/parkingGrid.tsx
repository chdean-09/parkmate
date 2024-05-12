"use client";
import "gridstack/dist/gridstack.min.css";
import { GridStack, GridStackNode } from "gridstack";
import React, { useEffect } from "react";

export default function CustomParkingGrid({ num }: { num: number }) {
  useEffect(() => {
    let grid = GridStack.init({
      alwaysShowResizeHandle: "mobile",
    });

    // Clear existing grid items
    grid.removeAll();
    grid.enableResize(false);

    for (let i = 0; i < num; i++) {
      grid.addWidget({
        w: 2, // Width of each grid item
        h: 3, // Height of each grid item
        content: `<div class="grid-stack-item-content">Slot ${i + 1}</div>`,
      });
    }

    grid.on("change", function (event: Event, items: GridStackNode[]) {
      console.log(grid.save());
    });
  }, [num]);

  return (
    <div className="bg-slate-200 h-52">
      <div className="grid-stack">
        {/* Grid items will be dynamically added by GridStack */}
      </div>
    </div>
  );
}
