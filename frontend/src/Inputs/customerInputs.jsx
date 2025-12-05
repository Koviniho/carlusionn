export const customerDocumentInputs = [
    {
      name: "passIdType",
      label: "ID type",
      type: "select",
      required: true,
      placeholder: "Schweizerpass / -ID",
      options: [
        { value: "-", label: "Select document type" },
        { value: "swiss", label: "Swiss" },
        { value: "foreign", label: "Foreign" },
      ],
    },
    {
        name: "document",
        label: "Document",
        type: "file",
      },
    // {
    //   name: "seller",
    //   label: "Seller",
    //   type: "text",
    //   placeholder: "Enter Seller",
    // },
    // {
    //   name: "purchaseDate",
    //   label: "Purchase Date",
    //   type: "date",
    //   placeholder: "DD.MM.YYYY",
    // },
    // {
    //   name: "plannedInvestment",
    //   label: "Planned Investment",
    //   type: "text",
    //   placeholder: "10’000 CHF",
    // },
    // {
    //   name: "document",
    //   label: "Document",
    //   type: "file",
    // },
  ];