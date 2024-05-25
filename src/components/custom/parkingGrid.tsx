"use client";

import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
import {
  GridStack,
  GridStackNode,
  GridStackOptions,
  GridStackWidget,
} from "gridstack";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState, useEffect, useRef, forwardRef } from "react";
import { Button } from "../ui/button";
import { getCellHeightForBreakpoint } from "@/utils/responsiveCellHeight";
import { ParkingLocation, ParkingSlot } from "@prisma/client";
import { User } from "lucia";
import { leaveSlot, reserveSlot } from "@/actions/reserveSlot";
import { useToast } from "@/components/ui/use-toast";
import { convertToPhPesoFormat } from "@/utils/convertToPhPesoFormat";
import { useRouter } from "next/navigation";

interface GridStackNodeData extends GridStackNode {
  occupied: boolean;
  userId: string;
}

type ParkingGridProps = {
  user: User;
  data?: ParkingLocation & { parkingSlots: ParkingSlot[] };
  alreadyCreated: boolean;
  layout: (GridStackWidget & { id: string })[];
  setLayout?: (widgets: GridStackWidget[] | GridStackOptions) => void;
};

export default forwardRef(function CustomParkingGrid(
  { user, data, alreadyCreated, layout, setLayout }: ParkingGridProps,
  ref,
) {
  const gridRef = useRef<GridStack>();

  const [dialogData, setDialogData] = useState<{
    open: boolean;
    eligible: boolean;
    slotId: string;
  }>({ open: false, eligible: false, slotId: "" });
  const [leavingDialog, setLeavingDialog] = useState<{
    open: boolean;
    slotId: string;
  }>({ open: false, slotId: "" });

  const { toast } = useToast();
  const router = useRouter();

  // ADMIN-ONLY FUNCTIONS
  // add a new parking slot
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

      gridRef.current.addWidget(newWidget);
    }
  }

  // remove newly created parking slot
  function removeWidget(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    if (!setLayout) {
      return;
    }
    // remove widget with highest id
    const maxId = Math.max(...layout.map((widget) => parseInt(widget.id)));

    const updatedLayout = layout.filter(
      (widget) => parseInt(widget.id) !== maxId,
    );

    setLayout(updatedLayout);
  }

  // RESERVATION FUNCTIONS
  // reserve a slot
  async function handleReserve(slotId: string) {
    if (!data) return;

    const result = await reserveSlot(
      { locationId: data.id, id: slotId },
      data.name,
      data.baseRate,
      user,
    );

    if (result) {
      toast({
        variant: "destructive",
        duration: 5000,
        title: "Error",
        description: result.message,
      });
    } else {
      router.refresh();
    }
  }

  // leave a parking slot
  async function handleLeaveSpot(slotId: string) {
    if (!data) return;

    const result = await leaveSlot({ id: slotId }, data.id);

    if (result) {
      toast({
        variant: "destructive",
        duration: 5000,
        title: "Error",
        description: result.message,
      });
    } else {
      router.refresh();
    }
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

    // Attach click event listeners
    grid.getGridItems().forEach((node) => {
      const slot = node.gridstackNode! as GridStackNodeData;

      const contentElement = slot.el!.querySelector(
        ".grid-stack-item-content",
      ) as HTMLElement;

      if (slot.occupied && slot.userId !== user.id) {
        // slot occupied by someone else
        contentElement.style.backgroundColor = "#c31617"; // red
      } else if (slot.occupied && slot.userId === user.id) {
        // slot occupied by user
        contentElement.style.backgroundColor = "#2f9e17"; // green

        contentElement.addEventListener("click", () => {
          setLeavingDialog({ open: true, slotId: slot.id! });
        });
      } else {
        // available slot
        if (!data) return;

        contentElement.style.backgroundColor = "initial";

        contentElement.addEventListener("click", () => {
          if (data.baseRate > user.wallet) {
            // not eligible to reserve slot
            setDialogData({ open: true, eligible: false, slotId: slot.id! });
          } else {
            // can reserve slot
            setDialogData({ open: true, eligible: true, slotId: slot.id! });
          }
        });
      }
    });

    // saves layout every time ga add ka or move a spot
    grid.on("added", (event, element) => {
      if (!setLayout) {
        return;
      }

      setLayout(grid.save());
    });

    grid.on("dragstop", (event, element) => {
      if (!setLayout) {
        return;
      }

      setLayout(grid.save());
    });

    // kada resize na check ya ang window width.
    function resizeHandler() {
      const newCellHeight = getCellHeightForBreakpoint(window.innerWidth);
      grid.cellHeight(newCellHeight);
    }

    window.addEventListener("resize", resizeHandler);

    // Cleanup event listener on component unmount
    return () => {
      grid.getGridItems().forEach((node) => {
        const slot = node.gridstackNode! as GridStackNodeData;

        const contentElement = slot.el!.querySelector(
          ".grid-stack-item-content",
        ) as HTMLElement;

        contentElement.removeEventListener("click", () => {
          setLeavingDialog({ open: true, slotId: slot.id! });
        });

        contentElement.removeEventListener("click", () => {
          if (data!.baseRate > user.wallet) {
            // not eligible to reserve slot
            setDialogData({ open: true, eligible: false, slotId: slot.id! });
          } else {
            // can reserve slot
            setDialogData({ open: true, eligible: true, slotId: slot.id! });
          }
        });
      });

      window.removeEventListener("resize", resizeHandler);
      grid.offAll();
    };
  }, [layout, user.wallet, data]);

  return (
    <div>
      {/* reserving a slot */}
      <Dialog
        open={dialogData.open}
        onOpenChange={() =>
          setDialogData({
            open: !dialogData.open,
            eligible: dialogData.eligible,
            slotId: "",
          })
        }
      >
        <DialogContent>
          {dialogData.eligible && data ? (
            // user has enough balance to reserve slot
            <>
              <DialogHeader>
                <DialogTitle>Reserve this slot?</DialogTitle>
                <DialogDescription>
                  Once you do, you will be charged the base rate of{" "}
                  {convertToPhPesoFormat(data.baseRate)}, and for every
                  succeeding hour, you will be charged{" "}
                  {convertToPhPesoFormat(data.hourlyRate)}.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button
                    onClick={async () => handleReserve(dialogData.slotId)}
                    type="button"
                    className="bg-green-700 hover:bg-green-600"
                  >
                    Reserve
                  </Button>
                </DialogClose>
              </DialogFooter>
            </>
          ) : (
            // user is broke
            <DialogHeader>
              <DialogTitle>Not enough balance!</DialogTitle>
              <DialogDescription>
                You need to top up your wallet to reserve this slot.
              </DialogDescription>
            </DialogHeader>
          )}
        </DialogContent>
      </Dialog>

      {/* leaving a slot */}
      <Dialog
        open={leavingDialog.open}
        onOpenChange={() =>
          setLeavingDialog({ open: !leavingDialog.open, slotId: "" })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave this parking slot?</DialogTitle>
            <DialogDescription>
              Once you do, this slot will be available for others to reserve.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                onClick={async () => handleLeaveSpot(leavingDialog.slotId)}
                type="button"
                className="bg-green-700 hover:bg-green-600"
              >
                Leave
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {!alreadyCreated && (
        // you cannot add more spots if already created
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
          <p className="text-sm text-red-500">
            Take note, you cannot edit grid layout once submitted
          </p>
        </>
      )}

      <div className={`grid-stack controlled border border-black`}>
        {/* new widgets are inserted here! */}
      </div>
    </div>
  );
});
