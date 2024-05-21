"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { parkingFormSchema } from "@/schema/formSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import CustomParkingGrid from "./parkingGrid";
import { useEffect, useState } from "react";
import { GridStackOptions, GridStackWidget } from "gridstack";
import { submitLocation, updateLocation } from "@/actions/editorSubmit";
import { User } from "lucia";
import { useRouter } from "next/navigation";
import { Prisma, ParkingLocation, ParkingSlot } from "@prisma/client";

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
      baseRate: fetchedData?.baseRate || 0,
      hourlyRate: fetchedData?.hourlyRate || 0,
      gridLayout: gridLayout,
    },
  });

  async function handleSubmit(data: z.infer<typeof parkingFormSchema>) {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("baseRate", data.baseRate.toString());
    formData.append("hourlyRate", data.hourlyRate.toString());
    formData.append("gridLayout", JSON.stringify(data.gridLayout));
    formData.append("latitude", latitude.toString());
    formData.append("longitude", longitude.toString());

    if (fetchedData) {
      const result = await updateLocation(formData, owner);

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
  console.log(layout);

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
                layout={field.value as (GridStackWidget & { id: string })[]}
                setLayout={(newLayout) => {
                  setLayout(newLayout);
                  field.onChange(newLayout);
                }}
              />
              <FormMessage className="col-span-4 text-center" />
            </FormItem>
          )}
        />
        <Button
          className="w-full max-w-56 self-center bg-green-700 hover:bg-green-600"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
