"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { createUser } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { GenderOptions } from "@/constants";
import { Label } from "../ui/label";

export default function RegisterForm({ user }: { user: User }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      console.log("DEBUG 1. try");
      const userData = { name, email, phone };

      const user = await createUser(userData);
      console.log("DEBUG 2. pós createUser");
      console.log(user);

      if (user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.log("❌ | Error while submiting form:", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal information</h2>
          </div>
        </section>

        {/* FULL NAME FIELD */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="Jhon dee"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        {/* Email e Phone */}
        <div className="flex flex-col gap-6 xl:flex-row">
          {/* EMAIL FIELD */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="m@example.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          {/* PHONE FIELD */}
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="(15) 91234-5678"
          />
        </div>

        {/* DateOfBirth & Gender */}
        <div className="flex flex-col gap-6 xl:flex-row">
          {/* Date of Birth */}
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthdate"
            label="Date of birth"
            placeholder="23/12/2002"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          {/* Gender */}
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        {/* // TODO - 1:45:32 \\ */}

        <div className="flex flex-col gap-6 xl:flex-row"></div>

        <div className="flex flex-col gap-6 xl:flex-row"></div>

        <div className="flex flex-col gap-6 xl:flex-row"></div>

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
}
