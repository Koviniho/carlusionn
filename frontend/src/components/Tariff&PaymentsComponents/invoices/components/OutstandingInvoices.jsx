const OutstandingInvoices = () => {
  return (
    <article className="flex gap-20 flex-col lg:flex-row ">
      <section className="flex-1 space-y-1">
        <List label="Rechnung als PDF" value="HerunterLanden" isBlue={true} />
        <br />
        <List label="Refrenze Nummer" value="0000  000 00 00 12" />
        <List label="ESR Teilnehmernummer" value="01-99999-2" />
        <List label="Einzalung Fur" value="Hotspot AG, Nueue" />
        <br />

        <List
          label="Direct bzahlen"
          value="Rachnung Bazahlen"
          isBlue={true}
          isBold={true}
        />
      </section>
      <section className="flex-1 space-y-1">
        <List label="Rechnungsnummer" value="73329978" />
        <List label="Rechnungsdatum" value="22.12.2024" />
        <List label="Zahlber bis" value="21.01.2025" />
        <br />
        <List label="Rechnungsbetrag" value="CHF 10.0" isBold={true} />
      </section>
    </article>
  );
};

export default OutstandingInvoices;

const List = ({ label, value, isBlue = false, isBold = false }) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xs sm:text-sm font-[600] ">{label}</p>
      <p
        className={`text-xs sm:text-sm ${isBlue ? "text-blue-500" : ""} ${
          isBold ? "font-bold" : ""
        } `}
      >
        {value}
      </p>
    </div>
  );
};
