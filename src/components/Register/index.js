import React, { useState } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../../schemas";
import { registerFormData } from "../../mockData";
import { CustomTextField } from "../../shared/CustomTextField";
import { useMutation } from "react-query";
import { registerFn } from "../../services/Register";
import { Loader } from "../../shared/Loader";
import { CustomButton } from "../../shared/CustomButton";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import registerLogo from "../../assets/images/register/signup.gif";
import { toast } from "react-toastify";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const SignUp = () => {
  const { isLoading, mutate } = useMutation(registerFn, {
    onSuccess: () => {
      toast.success("Sign Up Successfully");
      navigate("/login");
    },
  });
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      const reqBody = {
        name: values.name,
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
        <>
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-[45%] flex flex-col text-center justify-center items-center">
              <img className="" src={registerLogo} alt="" />
            </div>
            <div className="lg:w-[55%]">
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col justify-center w-full h-full items-center p-5 "
              >
                <h1 className="font-bold text-2xl lg:text-4xl m-3">Sign Up</h1>

                {registerFormData.map((data, index) => (
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

                <p className="text-sm mr-3 lg:w-1/2">
                  <Checkbox
                    checked={checked}
                    onClick={() => setChecked(!checked)}
                  />
                  I Agree To The
                  <span className="text-primary ml-1 cursor-pointer">
                    Terms & Conditions
                  </span>
                  .
                </p>

                <CustomButton
                  disabled={formik.isValid && checked ? false : true}
                  className="w-11/12 lg:w-1/2 !m-4"
                  type="submit"
                >
                  Sign Up
                </CustomButton>

                <p className="">
                  Already Have An Account?
                  <span
                    className="text-blue-500 m-2 cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </span>
                </p>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SignUp;
