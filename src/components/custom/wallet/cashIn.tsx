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

export default function CashIn({ owner }: UserProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof cashInFormSchema>>({
    resolver: zodResolver(cashInFormSchema),
    defaultValues: {
      amount: 0,
    },
  });

  async function handleSubmit(data: z.infer<typeof cashInFormSchema>) {
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
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-[95%] flex flex-col items-center pb-3"
      >
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
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
