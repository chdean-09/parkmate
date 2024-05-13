"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/schema/formSchema";
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
import { Input } from "@/components/ui/input";

interface SignUpFormProps {
  signUp: (formData: FormData) => Promise<ActionResult | void>;
}

export default function SignUp(props: SignUpFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { signUp } = props;

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    const result = await signUp(formData);

    if (result) {
      if (result.error === "Invalid username") {
        form.setError("username", {
          type: "manual",
          message: result.error,
        });
      } else if (result.error === "Invalid password") {
        form.setError("password", {
          type: "manual",
          message: result.error,
        });
      } else if (result.error === "Incorrect username or password") {
        form.setError("password", {
          type: "manual",
          message: result.error,
        });
      }
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 mb-3 flex flex-col"
      >
        <h2 className="mb-4 text-xl text-wrap flex flex-col text-center ">
          Welcome To ParkMate! <br />{" "}
          <span className="text-base"> Sign up to continue</span>
        </h2>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="password"
                  required
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full md:w-auto self-center" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

interface ActionResult {
  error: string;
}
