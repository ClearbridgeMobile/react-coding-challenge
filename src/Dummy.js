import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dummy = () => {
  const naviagte = useNavigate();
  const redirect = () => {
    naviagte("/app/1");
  };
  useEffect(() => {
    redirect();
  }, []);
  return <></>;
};

export default Dummy;
