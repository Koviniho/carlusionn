
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Text from "../../../components/Heading/text";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import PATHS from "../../../routes/path";
import { loginHandler } from "../../../store/features/auth/authSlice";
import showToast from "../../../utils/toaster";
import Images from "../../../assets/images";

// import Or from "../Or";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { isLoading, errorMessage } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      emailOrUsername: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      emailOrUsername: Yup.string().required("Email is required"),
      password: Yup.string()
        .min(6, "Must be 6 characters or more")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const response = await dispatch(loginHandler(values));
      console.log("🚀 ~ onSubmit: ~ response:", response)
      if (response?.payload?.token && response?.payload?.message) {
        navigate(PATHS.dashboard);
        showToast("success", response?.payload?.message);
      }else{
        showToast("error", errorMessage);
      }
    },
  });

  return (
    <div className="grid min-h-screen    bg-gradient-to-r from-[#0255A2] to-[#1A2042]">
      <div
        className="w-4/12 mx-auto  mt-10
      
      flex flex-col justify-center   px-2  "
      >
        <div className="rounded-lg flex flex-col items-center justify-center bg-[#5882C147]  border border-[#5882C1] ">
          <img src={Images.loginLogo} alt="logo" className="w-40 my-5" />
          <div className="  px-10  w-full">
            <form onSubmit={formik.handleSubmit} className="">
              <Text content="Login" textColor="text-white" textSize="text-xl" />
              <div className="my-5">
                <Input
                  label="Email/Username"
                  name="emailOrUsername"
                  type="text"
                  required
                  value={formik.values.emailOrUsername}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.emailOrUsername &&
                    formik.errors.emailOrUsername
                  }
                />
              </div>
              <div className="mt-5 mb-2">
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
              <div className="flex items-center justify-between mb-5 ">
                <Link className="text-secondary text-[13px] underline" to="#">
                  Forgot Password?
                </Link>
              </div>
              {/* {errorMessage && (
                <p className="text-red-500 text-start my-2">{errorMessage}</p>
              )} */}
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full"
                bgColor="primary"
                borderColor="primary"
                borderRadius="rounded-md"
                text={t("Sign In")}
                textColor="white"
              />
            </form>

            {/* <Or /> */}
            <p className="text-center text-white text-sm my-5">
              Don’t have an account yet?
              <span className="text-secondary">
                <Link to="/sign-up"> Create a account</Link>
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center  my-10 gap-3">
          <p className="text-white font-medium">Powered by </p>
       <a href="https://smatik.ch/"> <img src={Images.poweredBy} /></a> {" "}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
