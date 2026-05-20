"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, FieldError, Form, Input, Label, TextField, InputGroup, Description } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inputStyles =
  "border border-gray-300 focus-within:border-brand-secoundry focus-within:ring-1 focus-within:ring-brand-secoundry focus:outline-none w-full";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { data: session, isPending: sessionPending } = authClient.useSession();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);

    const { error } = await authClient.signIn.email({
      email: data.email, // required
      password: data.password, // required
      rememberMe: true,
      callbackURL: "/",
    });
    if (error) {

    } else {
      router.refresh();
      router.push("/");
    }
  };




  return (
    <div className="py-12 md:py-16 mx-auto px-4">
      <div className="bg-brand-primari p-6 md:p-10 rounded-2xl max-w-2xl mx-auto flex flex-col justify-center items-center gap-5 shadow-2xl">
        {/* Header */}
        <div className="text-left space-y-2.5 w-full">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">Welcome back</h2>
          <p className="text-white/80 font-medium">Sign in to access your professional tiles gallery.</p>
        </div>

        {/* Form */}
        <Form
          className="flex w-full flex-col gap-4 text-left"
          render={(props) => <form {...props} data-custom="foo" />}
          onSubmit={onSubmit}
        >
          {/* email  */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-white">Email</Label>
            <Input placeholder="Enter you email" className={inputStyles} />
            <FieldError />
          </TextField>
          {/* password */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
          >
            <Label className="text-white/90 text-xs font-bold uppercase tracking-widest">Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className={`${inputStyles} rounded-xl bg-white/5 border-white/20 text-white placeholder:text-white/40 px-4 py-3`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-widest text-black hover:text-black transition-colors cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <Description className="text-white/60 text-[10px] uppercase tracking-wider mt-1 font-medium">At least 8 chars, 1 uppercase, 1 number</Description>
            <FieldError className="text-red-300 text-xs mt-1" />
          </TextField>

          {/* login button  */}
          <div className="flex gap-2">
            <Button type="submit" className={"bg-brand-secoundry text-black"}>
              <Check />
              Submit
            </Button>
            <Button type="reset" variant="secondary" className={"text-brand-primari"}>
              Reset
            </Button>
          </div>
        </Form>

        <h4 className="text-white text-center font-bold">Or</h4>
        <div className="w-full flex gap-2 justify-center items-center mt-5">
          <p className="text-white/80 text-sm font-medium">Don't have any account?</p>
          <Link href="/auth/signup" className="text-white underline decoration-white/60 font-bold transition-all cursor-pointer">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

