"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneinput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton'
}

export default function PatientForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    },
  });

  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true)
    try {
      const userData = {name, email, phone}

      //TODO : 58:15

    } 
    catch (error) {
      console.log('❌ | Error while submiting form:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>
        
        {/* FULL NAME FIELD */}
        <CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control} 
          name='name'
          label='Full Name'
          placeholder='Jhon dee'
          iconSrc='assets/icons/user.svg'
          iconAlt='user'
        />
        
        {/* EMAIL FIELD */}
        <CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control} 
          name='email'
          label='Email'
          placeholder='m@example.com'
          iconSrc='assets/icons/email.svg'
          iconAlt='email'
        />
        
        {/* PHONE FIELD */}
        <CustomFormField 
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control} 
          name='phone'
          label='Phone Number'
          placeholder='(15) 91234-5678'
        />

        <SubmitButton isLoading={isLoading}>
          Get Started
        </SubmitButton>
      </form>
    </Form>
  );
}
