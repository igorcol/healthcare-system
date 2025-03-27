
import PatientForm from "@/components/forms/PatientForm";
import { Link } from "lucide-react";
import Image from "next/image";

export default function Home() {
  // TODO : OTP VERIFICATION | PasskeyModal

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image 
            src='/assets/icons/logo-full.svg'
            alt="patient"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />
          
          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">© 2025 CarePulse.</p>
            <Link href="/?admin=true" className="text-green-500 cursor-pointer">
              Admin
            </Link>
          </div>
        </div>
      </section>  

      {/* BG IMAGE */}
      <Image 
        src='/assets/images/onboarding-img.png'
        alt="patient"
        height={1000}
        width={1000}
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
