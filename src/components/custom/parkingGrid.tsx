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

type ParkingGridProps = {
  layout: GridStackWidget[] | GridStackOptions;
  setLayout: (widgets: GridStackWidget[] | GridStackOptions) => void;
};

// export default function CustomParkingGrid({
//   parkingSlotNum,
//   setSlotNumChange,
// }: ParkingGridProps) {
//   const gridRef = useRef<GridStack | null>(null);

//   useEffect(() => {
//     gridRef.current = GridStack.init({
//       float: true,
//       cellHeight: 'auto',
//       cellHeightThrottle: 100,
//       minRow: 2,
//     });

//     gridRef.current.on("dragstop", (event, element) => {
//       const node = element.gridstackNode;
//       // setInfo(`you just dragged node #${node.id} to ${node.x},${node.y} – good job`);

//       // Clear the info text after a two second timeout.
//       // Clears previous timeout first.
//       // if (timerIdRef.current) {
//       //   clearTimeout(timerIdRef.current);
//       // }
//       // timerIdRef.current = setTimeout(() => {
//       //   setInfo("");
//       // }, 2000);
//       console.log(gridRef.current?.save());
//     });

//     // Cleanup function to remove event listener
//     return () => {
//       if (gridRef.current) {
//         gridRef.current.off("dragstop");
//       }
//     };
//   }, []);

//   const addNewWidget = () => {
//     const node: GridStackNode = { x: 0, y: 0, h: 1 };
//     node.id = node.content = String(parkingSlotNum + 1);
//     setSlotNumChange(parkingSlotNum + 1);
//     if (gridRef.current) {
//       gridRef.current.addWidget(node);
//     }
//   };

//   return (
//     <div>
//       <button type="button" onClick={addNewWidget}>
//         Add Widget
//       </button>
//       <section className="grid-stack"></section>
//     </div>
//   );
// }

// Controlled example

// const ControlledStack = ({ items, addItem }) => {

//   return (

//   )
// }

export default function CustomParkingGrid({
  layout,
  setLayout,
}: ParkingGridProps) {
  const [items, setItems] = useState<{ id: string }[]>([]);

  const refs = useRef<Record<string, React.RefObject<HTMLDivElement>>>({});
  const gridRef = useRef<GridStack | null>(null);

  if (Object.keys(refs.current).length !== items.length) {
    items.forEach(({ id }) => {
      refs.current[id] = refs.current[id] || createRef();
    });
  }

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
        className="mb-2"
        onClick={() => {
          setItems([...items, { id: `${items.length + 1}` }]);
        }}
      >
        Add new spot
      </Button>
      <div className={`grid-stack controlled border border-black`}>
        {items.map((item, i) => {
          return (
            <div
              ref={refs.current[item.id]}
              key={item.id}
              className={"grid-stack-item"}
            >
              <div className="grid-stack-item-content">
                <div>{item.id}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
