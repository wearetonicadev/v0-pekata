import { getYear } from "date-fns";

export const Footer = () => {
  return (
    <footer className="bg-black text-white text-sm py-8">
      <div className="flex flex-col md:flex-row justify-between px-4 max-w-7xl mx-auto">
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg md:text-xl font-bold mb-4">Pekata</h3>
          <div className="space-y-2">
            <div>Contacta con nosotros</div>
            <div>📞 934 567 234</div>
            <div>✉️ atencioncliente@pekata.com</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="font-semibold mb-2">Customer service</div>
            <div className="space-y-1">
              <div>Preguntas frecuentes</div>
              <div>Contacto</div>
              <div>Condiciones de compra</div>
              <div>Envíos y devoluciones</div>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">Sobre Nosotros</div>
            <div className="space-y-1">
              <div>Quiénes somos</div>
              <div>Formas de pago</div>
              <div>Presupuesto a medida</div>
              <div>Listas personalizadas</div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-[#4b5675] mt-6 pt-4 text-xs">
        <div className="px-4 max-w-7xl mx-auto flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            Copyright © {getYear(new Date())}, Pekata.
          </div>

          <div className="flex flex-col md:flex-row gap-2">
            <span>Política de privacidad</span>
            <span>Aviso legal</span>
            <span>Términos y condiciones</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
