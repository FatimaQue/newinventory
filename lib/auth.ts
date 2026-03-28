import { stackServerApp } from "@/stack/server";
import { StackServerApp } from "@stackframe/stack";
import { redirect } from "next/navigation";
export async function getCurrentUser(){
    const user =await stackServerApp.getUser();
    if(!user){
        redirect("/sign-in");
    }
    return user
}