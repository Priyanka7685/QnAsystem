"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/Auth";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function RegisterPage() {
    const {createAccount, login} = useAuthStore()
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState("")
    const router = useRouter()

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // collect data 
        const formData = new FormData(e.currentTarget)
        const firstname = formData.get("firstname")
        const lastname = formData.get("lastname")
        const email = formData.get("email")
        const password = formData.get("password")

        // validate
        if(!firstname || !lastname || !email ||!password) {
            setError(() => "Please fill out the fields")
            return 
        }

        // call the store
        setIsLoading(true)
        setError("")

        const response = await createAccount(
            `${firstname} ${lastname}`,
            email?.toString(),
            password?.toString()
        )

        if(response.error) {
            setError(() => response.error!.message)
        } else {
            const loginResponse = await login(email.toString(), password.toString())
            if(loginResponse.error) {
                setError(() => loginResponse.error!.message)
            } else {
                router.push("/login")
            }
        }

        setIsLoading(() => false)
    } 

    return (
        <div className="m-5 mx-auto w-full max-w-md rounded-none border border-solid border-white/30 bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Welcome to Riverflow
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
            Signup with riverflow if you you don&apos;t have an account.
            <br /> If you already have an account,{" "}
            <Link href="/login" className="text-orange-500 hover:underline">
                login
            </Link>{" "}
            to riverflow
        </p>

        {error && (
            <p className="mt-8 text-center text-sm text-red-500 dark:text-red-400">{error}</p>
        )}
        <form className="my-8" onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                <div>
                    <Label htmlFor="firstname">First name</Label>
                    <Input className="text-white" id="firstname" name="firstname" placeholder="Tyler" type="text" />
                </div>
                <div>
                    <Label htmlFor="lastname">Last name</Label>
                    <Input className="text-white"  id="lastname" name="lastname" placeholder="Durden" type="text" />
                </div>
            </div>
            <div className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                className="text-white" 
                    id="email"
                    name="email"
                    placeholder="projectmayhem@fc.com"
                    type="email"
                />
            </div>
            <div className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input className="text-white"  id="password" name="password" placeholder="••••••••" type="password" />
            </div>

            <button
                className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
                disabled={isLoading}
            >
                Sign up &rarr;
                {/* <BottomGradient /> */}
            </button>

            <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

            <div className="flex flex-col space-y-4">
                <button
                    className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    type="button"
                    disabled={isLoading}
                >
                    <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                        Google
                    </span>
                    {/* <BottomGradient /> */}
                </button>
                <button
                    className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    type="button"
                    disabled={isLoading}
                >
                    <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                        GitHub
                    </span>
                    {/* <BottomGradient /> */}
                </button>
            </div>
        </form>
    </div>
    )
}

export default RegisterPage