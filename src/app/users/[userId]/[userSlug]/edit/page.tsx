"use client"
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/Auth";
import { Label } from "@radix-ui/react-label";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { error } from "console";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

const Page = () => {
    

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="m-5 mx-auto w-full max-w-md rounded-none border border-solid border-white/30 bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Update your account
        </h2>
       

        {/* {error && (
            <p className="mt-8 text-center text-sm text-red-500 dark:text-red-400">{error}</p>
        )} */}
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


            <button
                className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
                // disabled={isLoading}
            >
                Update &rarr;
                {/* <BottomGradient /> */}
            </button>

            <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

            
        </form>
    </div>
    );
};

export default Page;