import * as sdk from 'node-appwrite'

export const {
    APPWRITE_PROJECT_ID, 
    APPWRITE_API_KEY, 
    APPWRITE_DATABASE_ID,
    APPWRITE_PATIENT_COLLECTION_ID,
    APPWRITE_DOCTOR_COLLECTION_ID,
    APPWRITE_APPOINTMENT_COLLECTION_ID,
    NEXT_PUBLIC_APPWRITE_BUCKET_ID: APPWRITE_BUCKET_ID,
    NEXT_PUBLIC_APPWRITE_ENDPOINT,
} = process.env

const client = new sdk.Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY as string)

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);

// console.log({
//     endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
//     projectId: process.env.APPWRITE_PROJECT_ID,
//     apiKey: process.env.APPWRITE_API_KEY?.slice(0, 10) + '...',
//   })