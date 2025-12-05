const PaidInvoices = () => {
  return (
    <article className="flex gap-20 flex-col lg:flex-row ">
      <section className="flex-1 space-y-1">
        <List label="Status" value="Bezahit" isGreen={true} />
        <List label="Rechnungsnummer" value="731672" />
        <List label="Rechnungsdatum" value="27.10.2024" />
        <List label="Bezahit am" value="30.10.2024" />

        <List
          label="Rechnung als PDF"
          value="Herunterladen"
          isBlue={true}
          isBold={true}
        />
      </section>
      <section className="flex-1 space-y-1">
        <List label="Rechnungsbetrag" value="CHF 10.00" />
        <List label="Zehlungen" value="CHF 10.00" />
      </section>
    </article>
  );
};

export default PaidInvoices;

const List = ({
  label,
  value,
  isBlue = false,
  isBold = false,
  isGreen = false,
}) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xs sm:text-sm font-[600] ">{label}</p>
      <p
        className={`text-xs sm:text-sm ${isGreen ? "text-green-500" : ""} ${
          isBlue ? "text-blue-500" : ""
        } ${isBold ? "font-bold" : ""} `}
      >
        {value}
      </p>
    </div>
  );
};
