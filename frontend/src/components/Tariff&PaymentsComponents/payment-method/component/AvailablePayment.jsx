import React from "react";
import { FaFilePdf } from "react-icons/fa";

const AvailablePayment = () => {
  return (
    <article>
      <section className="flex justify-between max-w-[65%]">
        <div className="w-fit text-center space-y-2">
          <div className="border py-4 px-6 rounded-lg w-fit">
            <FaFilePdf className="text-gray-500 text-[100px]" />
          </div>
          <h1>Email Rechnung</h1>
        </div>

        <div className=" flex flex-col justify-between max-w-[35%]">
          <p className="text-xs sm:text-sm font-bold">Post-Versand an:</p>
          <p className="text-xs sm:text-sm italic">
            Bitte beachten Sie, dass wir Ihnen ab januar 2026 pro
            papier-Rechnung CHF 3.00 verrechnen werden.
          </p>
          <button className="bg-blue-400 text-white py-2 px-4 rounded-md w-fit">
            Activieren
          </button>
        </div>

        <div className="space-y-2">
          <p className="text-xs sm:text-sm">Herr Kristian Kovac</p>
          <p className="text-xs sm:text-sm">Musterstrasse 24 4900 Zurich</p>
          <p className="text-xs sm:text-sm text-blue-400 font-[600]">
            Rechnungs-Addresse andern
          </p>
        </div>
      </section>
    </article>
  );
};

export default AvailablePayment;
