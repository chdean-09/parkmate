"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { parkingFormSchema } from "@/schema/formSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import CustomParkingGrid from "./parkingGrid";
import { useEffect, useState } from "react";
import { GridStackOptions, GridStackWidget } from "gridstack";
import {
  deleteLocation,
  submitLocation,
  updateLocation,
} from "@/actions/editorSubmit";
import { User } from "lucia";
import { useRouter } from "next/navigation";
import { ParkingLocation, ParkingSlot } from "@prisma/client";

export default function EditorForm({
  owner,
  latitude,
  longitude,
  fetchedData,
}: {
  owner: User;
  latitude: number;
  longitude: number;
  fetchedData: (ParkingLocation & { parkingSlots: ParkingSlot[] }) | null;
}) {
  const router = useRouter();
  const gridLayout: ParkingSlot[] = fetchedData?.parkingSlots || [];

  const form = useForm<z.infer<typeof parkingFormSchema>>({
    resolver: zodResolver(parkingFormSchema),
    defaultValues: {
      name: fetchedData?.name || "",
      baseRate: fetchedData?.baseRate || undefined,
      hourlyRate: fetchedData?.hourlyRate || undefined,
      gridLayout: gridLayout,
    },
  });

  const baseRate = form.watch("baseRate");
  const hourlyRate = form.watch("hourlyRate");
  const grid = form.watch("gridLayout");

  async function handleSubmit(data: z.infer<typeof parkingFormSchema>) {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("baseRate", data.baseRate.toString());
    formData.append("hourlyRate", data.hourlyRate.toString());
    formData.append("gridLayout", JSON.stringify(data.gridLayout));
    formData.append("latitude", String(latitude));
    formData.append("longitude", String(longitude));

    if (fetchedData) {
      // update the location data
      const result = await updateLocation(formData);

      if (result) {
        if (result.success) {
          router.push("/home");
        } else {
          form.setError("name", {
            type: "manual",
            message: result.message,
          });
        }
      }
    } else {
      // create a new location
      const result = await submitLocation(formData, owner);

      if (result) {
        if (result.success) {
          router.push("/home");
        } else {
          form.setError("name", {
            type: "manual",
            message: result.message,
          });
        }
      }
    }
  }

  const [layout, setLayout] = useState<GridStackWidget[] | GridStackOptions>(
    [],
  );

  useEffect(() => {
    setLayout(gridLayout);
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-[95%] flex flex-col items-center pb-3"
      >
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Name</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    placeholder="Parking Location Name"
                    className="col-span-3"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage className="col-span-4 text-center" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="baseRate"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">
                  Base/Starting Rate (₱)
                </FormLabel>
                <FormControl>
                  <Input
                    id="base"
                    placeholder="0.00"
                    className="col-span-3"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage className="col-span-4 text-center" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hourlyRate"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">
                  Rate per Hour (₱/hr)
                </FormLabel>
                <FormControl>
                  <Input
                    id="rate"
                    placeholder="0.00"
                    className="col-span-3"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage className="col-span-4 text-center" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="gridLayout"
          render={({ field }) => (
            <FormItem className="w-full mb-6">
              <CustomParkingGrid
                user={owner}
                alreadyCreated={fetchedData ? true : false}
                layout={field.value as (GridStackWidget & { id: string })[]}
                setLayout={(newLayout) => {
                  setLayout(newLayout);
                  field.onChange(newLayout);
                }}
                {...field}
              />
              <FormMessage className="col-span-4 text-center" />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-2 w-full max-w-80">
          <Button
            className="basis-[100%] bg-green-700 hover:bg-green-600"
            disabled={
              baseRate <= 0 ||
              hourlyRate <= 0 ||
              (grid as GridStackWidget[]).length === 0 ||
              !form.formState.isDirty // disable if wala gn change valuess
            }
            type="submit"
          >
            {fetchedData ? "Confirm Update" : "Create"}
          </Button>
        </div>
      </form>

      {fetchedData && (
        // can only delete if the location exists
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"destructive"} className="w-full max-w-80">
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete this
                parking location and all its parking slots.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  onClick={async () => {
                    deleteLocation(fetchedData.latitude, fetchedData.longitude);
                  }}
                >
                  Delete
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Form>
  );
}
