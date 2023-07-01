import React, { useState } from "react";
import {
  Modal,
  Box,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import { courseSchema } from "../../../schemas";
import { CustomTextField } from "../../../shared/CustomTextField";
import { courseData, categoryData } from "../../../mockData";
import { useMutation } from "react-query";
import { createCourseFn } from "../../../services/CreateCourse";
import { Loader } from "../../../shared/Loader";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { CustomButton } from "../../../shared/CustomButton";
import { toast } from "react-toastify";
const initialValues = {
  heading: "",
  category: "",
  description: "",
  image_url: "",
};

const AddCourse = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const handleOpen = () => {
    setOpen(true);
    setImage(null);
  };
  const handleClose = () => setOpen(false);
  const client = useQueryClient();
  const { isLoading, mutate } = useMutation(createCourseFn, {
    onSuccess: () => {
      navigate("/courses");
      handleClose();
      client.refetchQueries("getCourse");
    },
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const img = e.target.files[0];
    const imageRef = ref(storage, `images/${img.name}`);
    uploadBytes(imageRef, img).then((gallery) => {
      getDownloadURL(gallery.ref).then((url) => {
        setImage(url);
      });
    });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: courseSchema,

    onSubmit: (values, action) => {
      const reqBody = {
        image_url: image,
        heading: values.heading,
        category: values.category,
        description: values.description,
      };
      if (image) mutate(reqBody);
      toast.success("Course Added..!");
      action.resetForm();
    },
  });

  return isLoading ? (
    <Loader show={isLoading} />
  ) : (
    <>
      <div
        onClick={handleOpen}
        className="justify-between w-full content-between"
      >
        <div>+ Add Course</div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box className="flex flex-col  outline-none justify-center absolute top-1/2 left-1/2 p-5 w-11/12 lg:w-3/5 -translate-x-1/2 -translate-y-1/2 rounded bg-white ">
          {/* <div > */}
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col bg-white space items-center"
            >
              <h1 className="text-3xl font-bold mb-6 p-2">Add Course</h1>

              {image ? (
                <>
                  <img
                    src={image}
                    alt=""
                    className="w-1/2 h-24 object-contain mb-3"
                  />
                  <p
                    className="cursor-pointer text-xs text-red-500"
                    onClick={() => setImage(null)}
                  >
                    Remove Image
                  </p>
                </>
              ) : (
                <Button
                  variant="outlined"
                  className="!m-2 !capitalize w-11/12 lg:w-1/2 !border-primary !py-3 !border-dashed !text-primary"
                  component="label"
                >
                  Upload Image
                  <input
                    hidden
                    onChange={handleChange}
                    value={formik.image_url}
                    formik={formik}
                    name="image_url"
                    id="image_url"
                    accept="image/*"
                    type="file"
                  />
                </Button>
              )}

              {courseData.map((data, index) => (
                <CustomTextField
                  placeholder={data.placeholder}
                  type={data.type}
                  name={data.name}
                  id={data.id}
                  key={index}
                  formik={formik}
                  className="w-11/12 lg:w-1/2 !h-12 !m-3"
                />
              ))}

              <FormControl size="small" className="w-11/12 lg:w-1/2 !h-12 !m-3">
                <Select
                  displayEmpty
                  value={formik.values["category"]}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  name={"category"}
                  id={"category"}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return (
                        <span className="text-gray-400">Select Category</span>
                      );
                    }

                    return selected;
                  }}
                >
                  {categoryData.map((item, index) => (
                    <MenuItem
                      value={item.heading}
                      className="!capitalize"
                      key={item.id}
                    >
                      {item.heading}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <CustomButton size="small" type="submit" className="w-1/2 !m-4">
                Add Course
              </CustomButton>
            </form>
          {/* </div> */}
        </Box>
      </Modal>
    </>
  );
};

export default AddCourse;
