const ProfitInitialValues = {
  saleId: null,
  date: "",
  vehicle: "",
  revenue: "",
  cost: null,
  profit: 0,
  forfitmargin: "",
};
const profitInputs = [
  {
    name: "saleId",
    label: "Sale Id",
    type: "text",
  },
  {
    name: "vehicle",
    label: "vehicle",
    type: "select",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "follow-up", label: "Follow-Up" },
    ],
  },
  {
    name: "revenue",
    label: "revenue",
    type: "text",
  },
  { name: "cost", label: "Cost", type: "text" },
  { name: "Date", label: "Date", type: "date" },
  { name: "profit", label: "profit", type: "text" },
  { name: "profitmargin", label: "profitmargin", type: "text" },
];
const invoicesInputs = [
  {
    name: "invoice",
    label: "Sale Id",
    type: "text",
  },
  {
    name: "vehicle",
    label: "vehicle",
    type: "select",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "follow-up", label: "Follow-Up" },
    ],
  },
  {
    name: "customerName",
    label: "Customer Name",
    type: "select",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "follow-up", label: "Follow-Up" },
    ],
  },

  { name: "amount", label: "Amount", type: "number" },

  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "follow-up", label: "Follow-Up" },
    ],
  },
];
export { ProfitInitialValues, profitInputs, invoicesInputs };
