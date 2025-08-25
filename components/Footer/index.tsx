export const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="px-4 md:px-6 py-6 md:py-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4">Pekata</h3>
            <div className="space-y-2 text-sm">
              <div>Contacta con nosotros</div>
              <div>📞 934 567 234</div>
              <div>✉️ atencioncliente@pekata.com</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 text-sm">
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
        <div className="border-t border-[#4b5675] mt-6 md:mt-8 pt-4 flex flex-col md:flex-row justify-between text-xs space-y-2 md:space-y-0">
          <div>Copyright © 2023, Pekata.</div>
          <div className="flex flex-wrap gap-4">
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
