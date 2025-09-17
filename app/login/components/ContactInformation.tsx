import Link from "next/link";

export const ContactInformation = () => {
  return (
    <>
      <div className="font-family-apercu text-[20px]">
        Contacta con nosotros
      </div>

      <a href="mailto:lotesnavidad@pekata.com" className="underline text-base">
        lotesnavidad@pekata.com
      </a>

      <div className="text-base">930 467 474</div>

      <div className="flex flex-row gap-2 flex-wrap">
        <Link
          href="https://www.pekata.com"
          target="_blank"
          className="underline text-sm"
        >
          Política de privacidad
        </Link>
        <Link
          href="https://www.pekata.com"
          target="_blank"
          className="underline text-sm"
        >
          Política de protección de datos personales
        </Link>
      </div>
    </>
  );
};
