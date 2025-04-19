"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ID, Query } from "node-appwrite"
import { APPWRITE_BUCKET_ID, APPWRITE_DATABASE_ID, APPWRITE_PATIENT_COLLECTION_ID, APPWRITE_PROJECT_ID, databases, NEXT_PUBLIC_APPWRITE_ENDPOINT, storage, users } from "../appwrite.config"
import { parseStringify } from "../utils"
import { InputFile } from 'node-appwrite/file'

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

export const registerPatient = async ({ identificationDocument, ...patient }: RegisterUserParams) => {
    try {
        let file;

        if (identificationDocument) {
            const inputFile = InputFile.fromBuffer(
                identificationDocument?.get('blobFile') as Blob,
                identificationDocument?.get('fileName') as string
            )

            file = await storage.createFile(APPWRITE_BUCKET_ID!, ID.unique(), inputFile);
        }

        // console.log({
        //     identificationDocumentId: file?.$id || null,
        //     identificationDocumentUrl: `${NEXT_PUBLIC_APPWRITE_ENDPOINT!}/storage/buckets/${APPWRITE_BUCKET_ID!}/files/${file?.$id}/view?project=${APPWRITE_PROJECT_ID!}`,
        // })

        const newPatient = await databases.createDocument(
            APPWRITE_DATABASE_ID!,
            APPWRITE_PATIENT_COLLECTION_ID!,
            ID.unique(),
            {
                ...patient,
                identificationDocumentId: file?.$id || null,
                identificationDocumentUrl: `${NEXT_PUBLIC_APPWRITE_ENDPOINT!}/storage/buckets/${APPWRITE_BUCKET_ID!}/files/${file?.$id}/view?project=${APPWRITE_PROJECT_ID!}`,
            }
        )

        console.log('Registration OK')
        return parseStringify(newPatient);

    } catch (error) {
        console.log('Registration error: ', error)
    }
}

export const getPatient = async (userId: string) => {
    try {
        
        const patients = await databases.listDocuments(
            APPWRITE_DATABASE_ID!,
            APPWRITE_PATIENT_COLLECTION_ID!,
            [ Query.equal('userId', userId) ]
        );

        return parseStringify(patients.documents[0]);

    } catch (error) {
        console.log(error)
    }
}
