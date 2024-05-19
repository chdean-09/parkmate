"use client";

import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
import {
  GridHTMLElement,
  GridStack,
  GridStackOptions,
  GridStackWidget,
} from "gridstack";
import React, { useState, useEffect, useRef, createRef } from "react";
import { Button } from "../ui/button";
import { getCellHeightForBreakpoint } from "@/utils/responsiveCellHeight";
import Image from "next/image";

type ParkingGridProps = {
  setLayout: (widgets: GridStackWidget[] | GridStackOptions) => void;
};

export default function CustomParkingGrid({ setLayout }: ParkingGridProps) {
  const [items, setItems] = useState<{ id: string; rotation: number }[]>([]);

  const refs = useRef<Record<string, React.RefObject<HTMLDivElement>>>({});
  const gridRef = useRef<GridStack>();

  if (Object.keys(refs.current).length !== items.length) {
    items.forEach(({ id }) => {
      refs.current[id] = refs.current[id] || createRef();
    });
  }

  const removeWidget = () => {
    setItems((currentItems) => {
      return currentItems.slice(0, -1);
    });
  };

  useEffect(() => {
    gridRef.current = GridStack.init(
      {
        float: true,
        minRow: 2,
        column: 8,
        cellHeight: getCellHeightForBreakpoint(window.innerWidth),
        disableResize: true,
      },
      ".controlled",
    );

    const grid: GridStack = gridRef.current;
    grid.batchUpdate();
    grid.removeAll(false);
    items.forEach(({ id }) => {
      grid.makeWidget(refs.current[id].current as GridHTMLElement);
    });
    grid.batchUpdate(false);

    // saves layout every time ga add ka or move a spot
    grid.on("added", (event, element) => {
      setLayout(grid.save());
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
  }, [items, setLayout]);

  return (
    <div>
      <Button
        className="mb-2 mr-2"
        onClick={() => {
          setItems([...items, { id: `${items.length + 1}`, rotation: 0 }]);
        }}
      >
        Add new spot
      </Button>
      <Button
        variant={"destructive"}
        className="mb-2"
        onClick={() => removeWidget()}
        disabled={items.length === 0}
      >
        Delete spot
      </Button>
      <div className={`grid-stack controlled border border-black`}>
        {items.map((item) => {
          return (
            <div
              ref={refs.current[item.id]}
              key={item.id}
              className={"grid-stack-item"}
              style={{ transform: `rotate(${item.rotation}deg)` }}
            >
              <div className="grid-stack-item-content">
                <div style={{ transform: `rotate(${-item.rotation}deg)` }}>
                  {item.id}
                </div>
                <Image
                  src={"/rotate.png"}
                  alt="Rotate"
                  width={25}
                  height={25}
                  className="cursor-pointer absolute top-0 right-0"
                  onClick={() => {
                    // rotate the item by 90 degrees
                    const newItems = items.map((it) =>
                      it.id === item.id
                        ? {
                            ...it,
                            rotation:
                              // if rotation is 270, set it back to 0
                              it.rotation === 270 ? 0 : it.rotation + 90,
                          }
                        : it,
                    );
                    setItems(newItems);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
