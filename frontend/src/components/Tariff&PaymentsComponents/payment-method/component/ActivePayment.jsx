import { FaFilePdf } from "react-icons/fa";

const ActivePayment = () => {
  return (
    <article className="space-y-9">
      <p className="text-xs max-w-[55%]">
        Sie erhalten Ihre Rechnungen für Produkte bei Hostpoint zur Zeit per
        E-Mail an Ihre hinterlegte E-Mail-Adresse (kristian.kovac@gmx.ch).
        Mahnungen werden per Post-Versand an Ihre hinterlegte Rechnungsadresse
        verschickt
      </p>
      <section className="flex justify-between max-w-[55%]">
        <div className="w-fit text-center space-y-2">
          <div className="border py-4 px-6 rounded-lg w-fit">
            <FaFilePdf className="text-gray-500 text-[100px]" />
          </div>
          <h1>Email Rechnung</h1>
        </div>

        <p className="text-xs sm:text-sm font-bold">
          Rechnung als PDF per E-Mail an:
        </p>

        <div className="space-y-2">
          <p className="text-xs sm:text-sm">Kristian.kovac@gmx.ch</p>
          <p className="text-xs sm:text-sm text-blue-400">
            E-Mail-Adresse andern
          </p>
        </div>
      </section>
    </article>
  );
};

export default ActivePayment;
