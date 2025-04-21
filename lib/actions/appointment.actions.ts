'use server'
import { ID, Query } from "node-appwrite";
import { APPWRITE_APPOINTMENT_COLLECTION_ID, APPWRITE_DATABASE_ID, databases } from "../appwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";

export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try {

        const newAppointment = await databases.createDocument(
            APPWRITE_DATABASE_ID!,
            APPWRITE_APPOINTMENT_COLLECTION_ID!,
            ID.unique(),
            appointment
        )

        console.log('Registration OK')
        return parseStringify(newAppointment);

    } catch (error) {
        console.log('Create Appointment error: ', error)
    }
}

export const getAppointment = async (appointmentId: string) => {
    try {
        const appointment = await databases.getDocument(
            APPWRITE_DATABASE_ID!,
            APPWRITE_APPOINTMENT_COLLECTION_ID!,
            appointmentId
        )

        return parseStringify(appointment)

    } catch (error) {
        console.log("Get Appointment error: ", error)
    }
}

export const getRecentAppointmentList = async () => {
    try {
        const appointments = await databases.listDocuments(
            APPWRITE_DATABASE_ID!,
            APPWRITE_APPOINTMENT_COLLECTION_ID!,
            [Query.orderDesc('$createdAt')]
        )

        const initialCounts = {
            scheduledCount: 0,
            pendingCount: 0,
            cancelledCount: 0
        }

        const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
            if (appointment.status === 'scheduled') {
                acc.scheduledCount += 1;
            } else if (appointment.status === 'pending') {
                acc.pendingCount += 1;
            } else if (appointment.status === 'cancelled') {
                acc.cancelledCount += 1;
            }
            return acc;
        }, initialCounts);

        const data = {
            totalCount: appointments.total,
            ...counts,
            documents: appointments.documents
        }

        return parseStringify(data);

    } catch (error) {
        console.log(error)
    }
}