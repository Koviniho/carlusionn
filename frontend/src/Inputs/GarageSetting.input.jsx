import * as Yup from "yup";

// Define fields array
const OwnEmailInput = [
  {
    name: "SMTPHost/Server",
    label: "SMTP Host/Server ",
    type: "text",
    placeholder: "Autocenter-Niederbipp-AG ",
    require: true,
  },
  {
    name: "SMTPPort",
    label: "SMTP Port ",
    type: "number",
    placeholder: "840",
  },
  {
    name: "usernameEmail ",
    label: "Username / Email  ",
    type: "text",
    placeholder: "Autocenter-Niederbipp-AG ",
    require: true,
  },
  {
    name: "password ",
    label: "Password",
    type: "password",
    placeholder: "Autocenter-Niederbipp-AG ",
    require: true,
  },
  {
    name: "SenderEmail   ",
    label: "Sender Email  ",
    type: "email ",
    placeholder: "Autocenter-Niederbipp-AG ",
    require: true,
  },
  {
    name: "SSL/TSL   ",
    label: "SSL/TSL Enfore ",
    type: "toggle",
    placeholder: "Autocenter-Niederbipp-AG ",
    require: true,
  },
];

export { OwnEmailInput };
