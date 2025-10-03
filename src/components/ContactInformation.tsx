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
        <a
          href="https://www.pekata.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-sm"
        >
          Política de privacidad
        </a>
        <a
          href="https://www.pekata.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-sm"
        >
          Política de protección de datos personales
        </a>
      </div>
    </>
  );
};
