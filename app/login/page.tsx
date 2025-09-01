"use client";

import { ContactInformation } from "@/app/login/components/ContactInformation";
import { Form } from "@/app/login/components/Form";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <div
        className="flex-1 flex items-center justify-center bg-center bg-cover"
        style={{ backgroundImage: `url(/images/login-background.png)` }}
      >
        <img src="/images/logo.png" alt="Pekata" className="max-w-1/3" />
      </div>
      {/* <div className="max-w-md w-full p-8"> */}
      <div className="flex flex-col md:items-center justify-around md:justify-end flex-1/2 md:flex-1 p-8">
        <div className="flex-1 hidden md:block" />

        <div className="md:flex-1 w-full md:max-w-3/4">
          <h2 className="mt-6 text-2xl md:text-3xl font-bold mb-6">
            Bienvenidos a Pekata
          </h2>

          <Form />
        </div>

        <div className="flex flex-col gap-1 text-sm md:flex-1 justify-end md:max-w-3/4 w-full">
          <ContactInformation />
        </div>
      </div>
    </div>
  );
}
