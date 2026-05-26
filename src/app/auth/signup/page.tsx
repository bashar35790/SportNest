"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, FieldError, Form, Input, Label, TextField, Description } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inputStyles =
  "w-full rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 px-5 py-4 focus-within:border-brand-secoundry focus-within:bg-white focus-within:ring-1 focus-within:ring-brand-secoundry focus:outline-none transition-all duration-300 hover:bg-white hover:border-slate-300";

export default function Signup() {
  const [loading, setLoading] = useState(false);
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
    if (loading) return;
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);

    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      image: data.Image,
    });
    if (error) {
      alert(`Error : ${error.message}`)
      setLoading(false);
    } else {
      router.refresh();
      router.push("/auth/login");
    }

  };

  const handleSocialSignup = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 px-4 py-20 mt-10">
      <div className="relative z-10 w-full max-w-xl p-8 sm:p-12 bg-white border border-slate-100 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] flex flex-col gap-8 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">

        {/* Header */}
        <div className="text-center space-y-3 w-full">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Create <span className="text-brand-secoundry">Account</span>
          </h2>
          <p className="text-slate-500 font-medium text-sm sm:text-base">
            Join SportNest and elevate your sports experience
          </p>
        </div>

        {/* Form */}
        <Form
          className="flex w-full flex-col gap-5 text-left"
          render={(props) => <form {...props} data-custom="foo" />}
          onSubmit={onSubmit}
        >
          {/* Name  */}
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) return "Name must be at least 3 characters";
              return null;
            }}
          >
            <Label className="text-slate-700 text-xs font-bold uppercase tracking-widest mb-1.5 ml-1 block">Full Name</Label>
            <Input placeholder="Your full name" className={inputStyles} />
            <FieldError className="text-red-400 text-xs mt-1.5 ml-1" />
          </TextField>

          {/* email  */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return "Please enter a valid email address";
              return null;
            }}
          >
            <Label className="text-slate-700 text-xs font-bold uppercase tracking-widest mb-1.5 ml-1 block">Email Address</Label>
            <Input placeholder="Enter your email" className={inputStyles} />
            <FieldError className="text-red-400 text-xs mt-1.5 ml-1" />
          </TextField>

          {/* image  */}
          <TextField isRequired name="Image">
            <Label className="text-slate-700 text-xs font-bold uppercase tracking-widest mb-1.5 ml-1 block">Profile Image URL</Label>
            <Input placeholder="Enter Image URL" className={inputStyles} />
            <FieldError className="text-red-400 text-xs mt-1.5 ml-1" />
          </TextField>

          {/* password */}
          <TextField
            isRequired
            minLength={6}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 6) return "Password must be at least 6 characters";
              if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
              if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter";
              return null;
            }}
          >
            <Label className="text-slate-700 text-xs font-bold uppercase tracking-widest mb-1.5 ml-1 block">Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
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
            <Description className="text-slate-400 text-[10px] uppercase tracking-wider mt-2 ml-1 font-medium block">
              At least 6 chars, 1 uppercase, 1 lowercase
            </Description>
            <FieldError className="text-red-400 text-xs mt-1.5 ml-1" />
          </TextField>

          {/* signup button  */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full flex items-center justify-center bg-brand-primari text-brand-secoundry font-bold text-lg h-14 rounded-2xl hover:shadow-lg hover:shadow-brand-primari/20 transition-all duration-300"
              isDisabled={loading}
            >
              {!loading && <Check className="w-5 h-5 mr-2" />}
              {loading ? "Creating Account..." : "Join Exclusive Access"}
            </Button>
          </div>
        </Form>

        <div className="relative flex items-center justify-center w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative bg-white px-4 text-xs font-bold uppercase tracking-widest text-slate-400">
            Or continue with
          </div>
        </div>

        <Button
          className="flex items-center justify-center w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-base h-14 rounded-2xl transition-all duration-300"
          onPress={handleSocialSignup}
        >
          <Icon icon="devicon:google" className="w-5 h-5 mr-2" />
          Sign up with Google
        </Button>

        <div className="w-full flex justify-center items-center mt-2">
          <p className="text-slate-500 text-sm font-medium">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-brand-primari hover:opacity-80 font-bold transition-colors cursor-pointer">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
