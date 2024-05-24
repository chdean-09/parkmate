"use client";

import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
import {
  GridHTMLElement,
  GridStack,
  GridStackNode,
  GridStackOptions,
  GridStackWidget,
} from "gridstack";
import React, { useState, useEffect, useRef, createRef } from "react";
import { Button } from "../ui/button";
import { getCellHeightForBreakpoint } from "@/utils/responsiveCellHeight";
import Image from "next/image";
import { attachRotationListener } from "@/utils/rotateParkingSlot";

type ParkingGridProps = {
  alreadyCreated: boolean;
  layout: (GridStackWidget & { id: string })[];
  setLayout: (widgets: GridStackWidget[] | GridStackOptions) => void;
};

export default function CustomParkingGrid({
  alreadyCreated,
  layout,
  setLayout,
}: ParkingGridProps) {
  const gridRef = useRef<GridStack>();

  function addWidget(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    if (gridRef.current) {
      const id = (layout.length + 1).toString();

      const newWidget: GridStackWidget = {
        x: 0,
        y: 0,
        content: `<div class="widget-content">${id}</div>`,
        id: id,
      };

      // with rotation
      //   content: `
      //   <div class="widget-content">
      //     <p class="widget-text">${id}</p>
      //     <button class="rotate-button">Rotate</button>
      //   </div>
      // `,

      gridRef.current.addWidget(newWidget);
    }
  }

  function removeWidget(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    // remove widget with highest id
    const maxId = Math.max(...layout.map((widget) => parseInt(widget.id)));

    const updatedLayout = layout.filter(
      (widget) => parseInt(widget.id) !== maxId,
    );

    setLayout(updatedLayout);
  }

  useEffect(() => {
    gridRef.current = GridStack.init(
      {
        float: true,
        minRow: 2,
        column: 8,
        cellHeight: getCellHeightForBreakpoint(window.innerWidth),
        disableResize: true,
        disableDrag: alreadyCreated,
      },
      ".controlled",
    ).load(layout as GridStackWidget[]);

    const grid: GridStack = gridRef.current;

    // saves layout every time ga add ka or move a spot
    grid.on("added", (event, element) => {
      setLayout(grid.save());
      // attachRotationListener(element);
    });
    grid.on("dragstop", (event, element) => {
      setLayout(grid.save());
    });

    // kada resize na check ya ang window width.
    function resizeHandler() {
      const newCellHeight = getCellHeightForBreakpoint(window.innerWidth);
      grid.cellHeight(newCellHeight);
    }

    window.addEventListener("resize", resizeHandler);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", resizeHandler);
  }, [layout, setLayout]);

  return (
    <div>
      {!alreadyCreated && (
        <>
          <Button className="mb-2 mr-2" onClick={(event) => addWidget(event)}>
            Add new spot
          </Button>
          <Button
            variant={"destructive"}
            className="mb-2"
            onClick={(event) => removeWidget(event)}
            disabled={layout.length === 0}
          >
            Delete spot
          </Button>
          <p className="text-sm">
            Take note, you cannot edit grid layout once submitted
          </p>
        </>
      )}
      <div className={`grid-stack controlled border border-black`}>
        {/* new widgets are inserted here! */}
      </div>
    </div>
  );
}
