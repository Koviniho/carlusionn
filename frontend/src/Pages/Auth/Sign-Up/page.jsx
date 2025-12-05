import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../../components/Input";
import { useDispatch, useSelector } from "react-redux";
import PATHS from "../../../routes/path";
import showToast from "../../../utils/toaster";
import { signupHandler } from "../../../store/features/auth/authSlice";
import Images from "../../../assets/images";
import Or from "../Or";
import Text from "../../../components/Heading/text";
import { FaSpinner } from "react-icons/fa";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      licenseKey: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(
          /^[a-zA-Z][a-zA-Z0-9_]*$/,
          "Username must start with a letter and can only contain letters, numbers, and underscores"
        )
        .min(3, "Must be at least 3 characters")
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(
          /[^A-Za-z0-9]/,
          "Password must contain at least one special character"
        )
        .required("Password is required"),
      licenseKey: Yup.string().required("License key is required"),
    }),
    onSubmit: async (values) => {
      const response = await dispatch(signupHandler(values));

      if (response?.payload?.success && response?.payload?.message) {
        showToast("success", response?.payload?.message);
        navigate(PATHS.login);
      }
      if (!response?.payload?.success && response?.payload?.message) {
        showToast("error", response?.payload?.message);
        // navigate(PATHS.login);
      }
      if (!response?.payload?.success && !response?.payload?.message) {
        showToast("error", errorMessage || "User Registration failed");
        // navigate(PATHS.login);
      }
    },
  });

  return (
    <div className="grid min-h-screen overflow-auto  bg-gradient-to-r from-[#0255A2] to-[#1A2042]">
      <div
        className="w-4/12 mx-auto  mt-10
      
      flex flex-col justify-center   px-2  "
      >
        <div className="rounded-[28px] flex flex-col items-center justify-center bg-[#5882C147]  border border-[#5882C1] ">
          <img src={Images.loginLogo} alt="logo" className="w-40 my-5" />
          <div className=" px-10 w-full ">
            <form onSubmit={formik.handleSubmit}>
              <Text
                content="Signup"
                textColor="text-white"
                textSize="text-xl"
              />
              <div className="my-5">
                <Input
                  label="Username"
                  name="username"
                  type="text"
                  required
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={formik.touched.username && formik.errors.username}
                />
              </div>
              <div className="my-5">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && formik.errors.email}
                />
              </div>
              <div className="my-5">
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  required
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && formik.errors.password}
                />
              </div>
              <div className="my-5">
                <Input
                  label="License Key"
                  name="licenseKey"
                  type="text"
                  required
                  value={formik.values.licenseKey}
                  onChange={formik.handleChange}
                  error={formik.touched.licenseKey && formik.errors.licenseKey}
                />
              </div>
              {errorMessage && console.log({ errorMessage }) && (
                <p className="text-red-500 text-start my-2 ">
                  {errorMessage || "Error"}
                </p>
              )}
              <button
                type="submit"
                // isLoading={isLoading}
                className="w-full bg-[#003465] border border-[#003465] rounded-lg text-white py-2 flex justify-center items-center hover:text-primary hover:bg-white"
                // bgColor="primary"
                // borderColor="primary"
                // borderRadius="rounded-[10px]"
                // text="Sign Up"
                // textColor="white"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" /> Loading...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            {/* <Or></Or> */}
            <p className="text-center text-white text-sm my-5">
              Already have an account?{" "}
              <span className="text-secondary">
                <Link to={PATHS.login}>Login</Link>
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center  my-10 gap-3">
          <p className="text-white font-medium">Powered by </p>
          <a href="https://smatik.ch/" target="_blank">
            {" "}
            <img src={Images.poweredBy} />
          </a>{" "}
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
