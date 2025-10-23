import { ContactInformation } from "../components/ContactInformation";
import { Form } from "../components/Form";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <div
        className="flex min-h-[300px] md:w-1/2 items-center justify-center bg-center bg-cover"
        style={{ backgroundImage: `url(./images/login-background.png)` }}
      >
        <img src="./images/logo-white.png" alt="Pekata" className="max-w-1/3" />
      </div>

      <div className="flex flex-col md:w-1/2 md:ml-1 lg:ml-20 md:items-start  md:justify-end flex-1/2 md:flex-1 p-8">
        <div className="flex-1 hidden md:block" />

        <div className="md:flex-1 w-full md:w-3/4 lg:w-3/5 md:max-w-[400px]">
          <h2 className="md:mt-6 text-[22px] md:text-[36px] font-bold mb-4">
            Bienvenidos a Pekata
          </h2>

          <Form />
        </div>

        <div className="flex flex-col gap-4 md:gap-1 text-sm md:flex-1 justify-end md:max-w-3/4 w-full mt-4">
          <ContactInformation />
        </div>
      </div>
    </div>
  );
}
