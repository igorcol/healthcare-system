"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ID, Query } from "node-appwrite"
import { users } from "../appwrite.config"
import { parseStringify } from "../utils"

export const createUser = async (user: CreateUserParams) => {

    // Create a new autentication appwrite user
    try {
        const newUser = await users.create(
            ID.unique(), 
            user.email, 
            user.phone , 
            undefined, 
            user.name
        )
         
        return parseStringify(newUser)
    }
    catch (error) {
        console.log(`X ERROR: `, error)
        if (error instanceof Error && 'code' in error && (error as any)?.code === 409) {
            const documents = await users.list([
                Query.equal('email', [user.email])
            ]);

            return documents?.users[0];
        }
    }

}

export const getUser = async (userId: string) => {
    try {
        
        const user = await users.get(userId);

        return parseStringify(user);

    } catch (error) {
        console.log(error)
    }
}