import { getYear } from "date-fns";
import { Phone, Mail } from "lucide-react";

export const Footer = () => {
  const showPolicyLinks = false;
  return (
    <footer className="bg-black text-white text-sm py-8">
      <div className="flex flex-col md:flex-row justify-between max-w-7xl mx-auto w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-6 md:mb-0">
          <img
            src="/images/logo-white.png"
            alt="Pekata"
            className="max-w-1/2 md:max-w-1/3 mb-4"
          />
          <div className="space-y-2 text-base">
            <div>Contacta con nosotros</div>

            <div className="flex items-center gap-2">
              <svg
                width="22"
                height="23"
                viewBox="0 0 22 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.9914 5.47055C15.4036 3.87474 13.2867 2.99805 11.0323 2.99805C6.39033 2.99805 2.60885 6.77953 2.60481 11.4215C2.60481 12.9083 2.99266 14.3546 3.72794 15.6353L2.53613 20.0026L7.00441 18.831C8.23662 19.5016 9.62235 19.8571 11.0323 19.8571H11.0364C15.6784 19.8571 19.4598 16.0757 19.4639 11.4296C19.4598 9.17931 18.5831 7.06233 16.9914 5.47055ZM11.0323 18.431C9.77183 18.431 8.53962 18.0916 7.46497 17.4533L7.21045 17.2998L4.56019 17.9947L5.2672 15.4091L5.10155 15.1424C4.39859 14.0274 4.03095 12.7386 4.03095 11.4175C4.03095 7.56329 7.17409 4.42014 11.0364 4.42014C12.9069 4.42014 14.6643 5.15139 15.9894 6.47248C17.3105 7.79762 18.0377 9.55504 18.0377 11.4256C18.0337 15.2919 14.8906 18.431 11.0323 18.431ZM14.8744 13.187C14.6643 13.082 13.6301 12.5729 13.4361 12.5002C13.2422 12.4315 13.1008 12.3952 12.9635 12.6053C12.8221 12.8153 12.4181 13.2921 12.2969 13.4294C12.1757 13.5708 12.0504 13.587 11.8403 13.482C11.6302 13.3769 10.9515 13.1547 10.1476 12.4356C9.52135 11.8781 9.10119 11.1872 8.97595 10.9771C8.85475 10.767 8.96383 10.6539 9.06887 10.5489C9.16179 10.456 9.27895 10.3024 9.38399 10.1812C9.48903 10.06 9.52539 9.97116 9.59407 9.82976C9.66275 9.68836 9.63043 9.56716 9.57791 9.46211C9.52539 9.35707 9.10523 8.31878 8.92747 7.89862C8.75779 7.48653 8.58406 7.54309 8.45478 7.53905C8.33358 7.53097 8.19218 7.53097 8.05078 7.53097C7.90938 7.53097 7.68314 7.58349 7.48921 7.79358C7.29529 8.00366 6.75393 8.5127 6.75393 9.55099C6.75393 10.5893 7.50941 11.5872 7.61446 11.7286C7.7195 11.87 9.09715 13.995 11.2101 14.9081C11.7111 15.1263 12.1029 15.2555 12.41 15.3525C12.915 15.5141 13.3715 15.4899 13.7351 15.4373C14.1391 15.3767 14.9794 14.9283 15.1572 14.4354C15.3309 13.9425 15.3309 13.5224 15.2784 13.4335C15.2259 13.3446 15.0845 13.2921 14.8744 13.187Z"
                  fill="white"
                />
              </svg>
              930 467 464
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> 600 000 000
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> campaigns@pekatafoods.com
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-6 text-base">
          <div>
            <div className="font-semibold mb-2 text-[#B3B3B3]">
              Customer service
            </div>
            <div className="space-y-1">
              <div>Preguntas frecuentes</div>
              <div>Contacto</div>
              <div>Condiciones de compra</div>
              <div>Envíos y devoluciones</div>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2 text-[#B3B3B3]">
              Sobre Nosotros
            </div>
            <div className="space-y-1">
              <div>Quiénes somos</div>
              <div>Formas de pago</div>
              <div>Presupuesto a medida</div>
              <div>Listas personalizadas</div>
            </div>
          </div>
        </div>
      </div>

      {showPolicyLinks && (
        <div className="border-t border-[#4b5675] mt-6 pt-4 text-xs w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              Copyright © {getYear(new Date())}, Pekata.
            </div>

            <div className="flex flex-col md:flex-row gap-2">
              <span className="underline">Política de privacidad</span>
              <span className="underline">Aviso legal</span>
              <span className="underline">Términos y condiciones</span>
              <span className="underline">Cookies</span>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
