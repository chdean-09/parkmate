"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/schema/formSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface LoginFormProps {
  login: (formData: FormData) => Promise<ActionResult | void>;
}

export default function LogInForm(props: LoginFormProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { login } = props;

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    setIsClicked(true);

    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    const result = await login(formData);

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
    setIsClicked(false);
  }

  return (
    <Form {...form}>
      <form
        id="login-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 mb-3 flex flex-col"
      >
        <h2 className="mb-4 text-xl text-wrap flex flex-col text-center ">
          <span id="login-greet">Welcome To ParkMate!</span>
          <span id="login-continue-text" className="text-base">
            Login to continue
          </span>
        </h2>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  id="username-field"
                  placeholder="username"
                  required
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  id="password-field"
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
        {/* clicked */}
        {isClicked && (
          <Button
            id="login-btn-disabled"
            className={`flex gap-1 w-full md:w-auto self-center ${isClicked ? "disabled" : ""}`}
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
            Login
          </Button>
        )}
        {/* not clicked */}
        {!isClicked && (
          <Button
            id="login-btn-active"
            className={`w-full md:w-auto self-center`}
            type="submit"
          >
            {" "}
            Login
          </Button>
        )}
      </form>
    </Form>
  );
}
