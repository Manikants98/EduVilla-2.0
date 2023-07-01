import React from "react";
import { useFormik } from "formik";
import { contactSchema } from "../../schemas";
import { CustomButton } from "../../shared/CustomButton";
import { CustomTextField } from "../../shared/CustomTextField";
import contactLogo from "../../assets/images/contact/contact.gif";
import { contactData } from "../../mockData";
import { useMutation } from "react-query";
import { ContactUsFn } from "../../services/ContactUs";
import { Loader } from "../../shared/Loader";
import { toast } from "react-toastify";
const initialValues = {
  name: "",
  email: "",
  meassage: "",
};
const ContactUs = () => {
  const { mutate, isLoading } = useMutation(ContactUsFn, {
    onSuccess: () => {
      toast.success("Mail sent to Edu-Villa");
    },
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: contactSchema,
    onSubmit: (values, action) => {
      const reqBody = {
        name: values.name,
        email: values.email,
        message: values.message,
      };

      mutate(reqBody);
      action.resetForm();
    },
  });

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="flex flex-col lg:flex-row rounded">
        <div className="lg:w-[45%] flex flex-col text-center justify-center items-center">
          <img className="" src={contactLogo} alt="" />
        </div>
        <div className="lg:w-[55%]">
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col justify-center w-full h-full items-center p-5"
          >
            <h1 className="font-bold text-2xl lg:text-4xl m-3">Contact Us</h1>
            {contactData.map((data) => (
              <CustomTextField
                label={data.label}
                type={data.type}
                name={data.name}
                id={data.id}
                multiline={data.name === "message" ? true : false}
                rows={data.name === "message" ? 4 : 1}
                placeholder={data.placeholder}
                formik={formik}
                className="w-11/12 lg:w-1/2 !h-12 !m-3"
              />
            ))}

            <CustomButton
              type="submit"
              disabled={formik.isValid ? false : true}
              className="w-11/12 lg:w-1/2 !mt-20 !m-6"
            >
              Submit
            </CustomButton>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
