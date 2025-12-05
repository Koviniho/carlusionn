import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLoginUser } from "../store/features/auth/authSlice";

const useUserInfo = () => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    role: null,
    userId: null,
    username: null,
    email: null,
  });

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await dispatch(getLoginUser());

      const { role, id, username, email } = response?.payload?.user;

      setUserInfo({ role, userId: id, username, email });
    };
    getUserInfo();
  }, [dispatch]);

  return userInfo;
};

export default useUserInfo;
