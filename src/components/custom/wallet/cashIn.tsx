"use client";

import { cashIn } from "@/actions/cashInSubmit";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cashInFormSchema } from "@/schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User } from "lucia";

export default function CashIn({ owner }: { owner: User }) {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const form = useForm<z.infer<typeof cashInFormSchema>>({
    resolver: zodResolver(cashInFormSchema),
    defaultValues: {
      amount: 0,
    },
  });

  async function handleSubmit(data: z.infer<typeof cashInFormSchema>) {
    setIsClicked(true);
    const formData = new FormData();

    formData.append("amount", data.amount.toString());

    const result = await cashIn(formData, owner);

    if (result) {
      if (result.success) {
        router.push("/wallet");
      } else {
        form.setError("amount", {
          type: "manual",
          message: result.message,
        });
      }
    }
    setIsClicked(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col items-center pb-3 px-5 gap-5"
      >
        <div className="grid gap-4 py-4 w-full md:w-56">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    className="w-full md:w-56"
                    id="amount"
                    placeholder="username"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* clicked */}
        {isClicked && (
          <Button
            className={`flex gap-1 w-full md:md:w-56 self-center ${isClicked ? "disabled" : ""}`}
            disabled={isClicked}
            type="submit"
          >
            <div
              className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            Cash in
          </Button>
        )}
        {/* not clicked */}
        {!isClicked && (
          <Button className={`w-full md:w-56 self-center`} type="submit">
            {" "}
            Cash in
          </Button>
        )}
      </form>
    </Form>
  );
}
