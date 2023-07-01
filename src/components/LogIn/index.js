import React from "react";
import { useFormik } from "formik";
import { logInSchema } from "../../schemas";
import { loginFormData } from "../../mockData";
import { CustomTextField } from "../../shared/CustomTextField";
import { useNavigate } from "react-router-dom";
import { loginFn } from "../../services/Login";
import { useMutation } from "react-query";
import { Loader } from "../../shared/Loader";
import { CustomButton } from "../../shared/CustomButton";
import { toast } from "react-toastify";
import loginLogo from "../../assets/images/login/login.gif";
import { useQueryClient } from "react-query";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const LogIn = () => {
  const navigate = useNavigate();
  const client = useQueryClient();

  const { isLoading, mutate } = useMutation(loginFn, {
    onSuccess: (res) => {
      if (res?.data && res?.data.length !== 0) {
        localStorage.setItem("token", res?.data[0].token);
        client.refetchQueries("user");
        toast.success("Sign In Successfully");
        navigate("/home");
      }
    },
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: logInSchema,
    onSubmit: async (values, action) => {
      const reqBody = {
        email: values.email,
        password: values.password,
      };
      mutate(reqBody);
    },
  });

  return (
    <>
      {isLoading ? (
        <Loader show={isLoading} />
      ) : (
        <div className="flex flex-col lg:flex-row rounded">
          <div className="lg:w-[45%] flex flex-col text-center justify-center items-center">
            <img className="" src={loginLogo} alt="" />
          </div>
          <div className="lg:w-[55%]">
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col justify-center w-full h-full items-center p-5"
            >
              <h1 className="font-bold text-2xl lg:text-4xl m-3">Sign In</h1>
              {loginFormData.map((data, index) => (
                <CustomTextField
                  label={data.label}
                  type={data.type}
                  name={data.name}
                  id={data.id}
                  key={index}
                  formik={formik}
                  className="w-11/12 lg:w-1/2 !h-12 !m-3"
                />
              ))}

              <CustomButton
                type="submit"
                disabled={formik.isValid ? false : true}
                className="w-11/12 lg:w-1/2 !m-4"
              >
                Sign In
              </CustomButton>
              <p className="mt-2">
                Don't Have An Account?
                <span
                  className="text-primary m-2 cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </span>
                
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LogIn;
