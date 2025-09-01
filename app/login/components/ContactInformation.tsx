import Link from "next/link";

export const ContactInformation = () => {
  return (
    <>
      <div>Contacta con nosotros</div>

      <a href="mailto:lotesnavidad@pekata.com" className="underline">
        lotesnavidad@pekata.com
      </a>

      <div>930 467 474</div>

      <div className="flex flex-row gap-2 flex-wrap">
        <Link
          href="https://www.pekata.com"
          target="_blank"
          className="underline text-gray-700"
        >
          Política de privacidad
        </Link>
        <Link
          href="https://www.pekata.com"
          target="_blank"
          className="underline text-gray-700"
        >
          Política de protección de datos personales
        </Link>
      </div>
    </>
  );
};
