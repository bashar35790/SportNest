"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, FieldError, Form, Input, Label, TextField, InputGroup, Description } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inputStyles =
  "w-full rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 px-5 py-4 focus-within:border-brand-secoundry focus-within:bg-white focus-within:ring-1 focus-within:ring-brand-secoundry focus:outline-none transition-all duration-300 hover:bg-white hover:border-slate-300";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { data: session, isPending: sessionPending } = authClient.useSession();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleSocialSignup = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

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
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 px-4 py-20 mt-10 dark:bg-brand-secoundry">
      <div className="relative z-10 w-full max-w-lg p-8 sm:p-12 bg-white dark:bg-slate-800 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] flex flex-col gap-8 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]  ">

        {/* Header */}
        <div className="text-center space-y-3 w-full">
          <div className="w-16 h-16 bg-brand-primari/5 rounded-2xl mx-auto flex items-center justify-center mb-6 border border-brand-primari/10 shadow-sm">
            <Check className="w-8 h-8 text-brand-primari" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Welcome <span className="text-brand-secoundry dark:text-white">Back</span>
          </h2>
          <p className="text-slate-500 font-medium text-sm sm:text-base">
            Sign in to access your premium facilities
          </p>
        </div>

        {/* Form */}
        <Form
          className="flex w-full flex-col gap-5 text-left"
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
            <Label className="text-slate-700 text-xs font-bold uppercase tracking-widest mb-1.5 ml-1 block">Email Address</Label>
            <Input placeholder="Enter your email" className={inputStyles} />
            <FieldError className="text-red-400 text-xs mt-1.5 ml-1" />
          </TextField>

          {/* password */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
          >
            <Label className="text-slate-700 text-xs font-bold uppercase tracking-widest mb-1.5 ml-1 block">Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className={inputStyles}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-brand-primari transition-colors cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <FieldError className="text-red-400 text-xs mt-1.5 ml-1" />
          </TextField>

          {/* login button  */}
          <div className="pt-4">
            <Button type="submit" className="w-full bg-brand-primari text-brand-secoundry font-bold text-lg h-14 rounded-2xl hover:shadow-lg hover:shadow-brand-primari/20 transition-all duration-300">
              Sign In to Dashboard
            </Button>
          </div>
        </Form>

        <div className="relative flex items-center justify-center w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative bg-white px-4 text-xs font-bold uppercase  text-slate-400">
            Or continue with
          </div>
        </div>

        <Button
          className="flex items-center justify-center w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-base h-14 rounded-2xl transition-all duration-300"
          onPress={handleSocialSignup}
        >
          <Icon icon="devicon:google" className="w-5 h-5 mr-2" />
          Sign in with Google
        </Button>

        <div className="w-full flex justify-center items-center mt-2">
          <p className="text-slate-500 text-sm font-medium">
            New to SportNest?{" "}
            <Link href="/auth/signup" className="text-brand-primari hover:opacity-80 font-bold transition-colors cursor-pointer">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

