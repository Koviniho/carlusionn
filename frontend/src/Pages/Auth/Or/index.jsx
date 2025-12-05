import { BsTwitterX } from "react-icons/bs";
import {
  auth,
  provider,
  facebookProvider,
  signInWithPopup,
  githubProvider,
  twitterProvider,
} from "../../../firebase";
import { axiosWithoutToken } from "../../../services/api";
import showToast from "../../../utils/toaster";
import { useNavigate } from "react-router-dom";
import PATHS from "../../../routes/path";
import Icons from "../../../assets/icons";
import Images from "../../../assets/images";

function Or() {
  const navigate = useNavigate();
  // login and signup with google
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const response = await axiosWithoutToken.post("/auth/google", {
          idToken: user.accessToken,
        });
        localStorage.setItem("token", response?.data?.token);
        if (response?.data?.token && response?.data?.message) {
          showToast("success", response?.data?.message);
          navigate(PATHS.dashboard);
        }
      }
    } catch (error) {
      console.error("Error during Google sign-in", error);
    }
  };
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      if (user) {
        const response = await axiosWithoutToken.post("/auth/facebook", {
          idToken: user.accessToken,
        });
        localStorage.setItem("token", response?.data?.token);
        if (response?.data?.token && response?.data?.message) {
          showToast("success", response?.data?.message);
          navigate(PATHS.dashboard);
        }
      }
      // Optionally send the user info to your Express backend
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  //login and signup with github
  const handleGitHubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      if (user) {
        const response = await axiosWithoutToken.post("/auth/github", {
          idToken: user.accessToken,
        });
        localStorage.setItem("token", response?.data?.token);
        if (response?.data?.token && response?.data?.message) {
          showToast("success", response?.data?.message);
          navigate(PATHS.dashboard);
        }
      }
    } catch (error) {
      console.error("Error during GitHub login:", error);
    }
  };
  // login and signup with twitter
  const signInWithTwitter = async () => {
    try {
      const result = await signInWithPopup(auth, twitterProvider);
      // Get user info
      const user = result.user;
      if (user) {
        const response = await axiosWithoutToken.post("/auth/twitter", {
          idToken: user.accessToken,
        });
        localStorage.setItem("token", response?.data?.token);
        if (response?.data?.token && response?.data?.message) {
          showToast("success", response?.data?.message);
          navigate(PATHS.dashboard);
        }
      }
    } catch (error) {
      console.error("Error during Twitter sign-in:", error);
    }
  };
  return (
    <div className="">
      <div className="flex items-center justify-center gap-2 my-5">
        <span className="flex-grow border border-white h-[0.2px]"></span>
        <span className="text-sm text-white whitespace-nowrap">
          or continue with
        </span>
        <span className="flex-grow border border-white h-[0.2px]"></span>
      </div>

      <div className="flex items-center justify-center gap-3 mt-5 ">
        <div className="bg-white px-5 py-2 rounded-lg cursor-pointer">
          <Icons.BsFacebook
            onClick={handleLogin}
            size={24}
            className="text-[#059BE5]"
          />
        </div>
        <div className="bg-white px-5 py-2 rounded-lg cursor-pointer">
          <BsTwitterX
            onClick={signInWithTwitter}
            size={24}
            className="cursor-pointer bg-black text-white p-1 rounded"
          />
        </div>
        <div className="bg-white px-5 py-2 rounded-lg cursor-pointer">
          <Icons.IoLogoGithub
            onClick={handleGitHubLogin}
            size={24}
            className="cursor-pointer "
          />
        </div>
        <div className="bg-white px-5 py-2.5 rounded-lg cursor-pointer">
          <img
            src={Images.google2}
            onClick={handleSignIn}
            // size={24}
            className="  "
          />
        </div>
      </div>
    </div>
  );
}

export default Or;
