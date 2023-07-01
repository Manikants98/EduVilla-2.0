import React, { useState } from "react";
import { FormControl, Avatar, Select, MenuItem, Button } from "@mui/material";
import { useFormik } from "formik";
import { CustomTextField } from "../../shared/CustomTextField";
import { profileData } from "../../mockData";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useMutation } from "react-query";
import { updateProfileFn } from "../../services/UpdateProfile/";
import { updateProfileSchema } from "../../schemas";
import { CustomButton } from "../../shared/CustomButton";
import { useSelector } from "react-redux";
import profileLogo from "../../assets/images/profile/profile.gif";
import { setUserData } from "../../Redux/Actions/UserData";
import { useDispatch } from "react-redux";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Loader } from "../../shared/Loader";
import { useSnackbar } from "notistack";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const userData = useSelector((state) => state.userData) || {};
  const { mutate, isLoading } = useMutation(updateProfileFn, {
    onSuccess: () => {
      enqueueSnackbar("Saved Changes", { variant: "success" });
    },
  });

  const dispatch = useDispatch();

  const values = {
    name: userData.name ? userData.name : "",
    email: userData.email ? userData.email : "",
    gender: userData.gender ? userData.gender : "",
    dob: userData.dob ? userData.dob.slice(0, 10) : "",
    state: userData.state ? userData.state : "",
    zipcode: userData.zipcode ? userData.zipcode : "",
    country: userData.country ? userData.country : "",
    city: userData.city ? userData.city : "",
    phone: userData.phone ? userData.phone : "",
    profile_url: userData.profile_url ? userData.profile_url : "",
  };

  const handleChange = (e) => {
    setProfile(null);
    const img = e.target.files[0];
    const imageRef = ref(storage, `images/${img.name}`);
    uploadBytes(imageRef, img).then((gallery) => {
      getDownloadURL(gallery.ref).then((url) => {
        setProfile(url);
      });
    });
  };

  const formik = useFormik({
    initialValues: values,
    enableReinitialize: true,
    validationSchema: updateProfileSchema,
    onSubmit: (values, action) => {
      const reqBody = {
        id: userData.id,
        profile_url: profile == null ? userData.profile_url : profile,
        name: values.name,
        email: values.email,
        dob: values.dob,
        gender: values.gender,
        state: values.state,
        zipcode: values.zipcode,
        country: values.country,
        city: values.city,
        phone: values.phone,
      };

      dispatch(setUserData(reqBody));
      setEditMode(!editMode);
      editMode === true ? mutate(reqBody) : setEditMode(!editMode);
    },
  });

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="flex flex-col lg:flex-row rounded">
        <div className="lg:w-1/2 flex flex-col text-center justify-center items-center">
          <img src={profileLogo} alt="" />
        </div>
        <div className="flex flex-col lg:p-5 py-5 shadow lg:w-1/2 m-3 border-2 rounded-md">
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col items-center"
          >
            {profile || userData.profile_url ? (
              <>
                <div className="rounded-full border-primary border-2 p-px mb-1 bg-white">
                  <Avatar
                    src={profile || userData.profile_url}
                    alt={userData.name}
                    className="!h-36 !w-36"
                  />
                </div>
                {editMode === true ? (
                  <>
                    <p
                      className="text-red-500 text-xs cursor-pointer"
                      onClick={() => {
                        setProfile(null);
                        dispatch(
                          setUserData({ ...userData, profile_url: null })
                        );
                      }}
                    >
                      Remove Image
                    </p>
                    <Button component="label" className="!capitalize !text-xs">
                      <input
                        onChange={handleChange}
                        value={formik.profile_url}
                        formik={formik}
                        name="profile_url"
                        id="profile_url"
                        accept="image/*"
                        type="file"
                        key={formik.id}
                        hidden
                      />
                      Change Profile Picture
                    </Button>
                  </>
                ) : null}
              </>
            ) : (
              <div className="rounded-full border-primary border-2 mb-5 p-px bg-white">
                <Avatar
                  src=""
                  alt={userData.name}
                  component="label"
                  className="!h-36 !w-36"
                >
                  <input
                    onChange={handleChange}
                    value={formik.profile_url}
                    formik={formik}
                    key={formik.id}
                    name="profile_url"
                    id="profile_url"
                    accept="image/*"
                    type="file"
                    hidden
                  />
                  <AddAPhotoIcon fontSize="large" />
                </Avatar>
              </div>
            )}

            {editMode === true ? (
              <div className="grid lg:grid-cols-2 lg:gap-5 mt-3 lg:px-0 px-4 bg-white min-w-full rounded-xl">
                {profileData.map((data) => (
                  <>
                    <CustomTextField
                      placeholder={data.placeholder}
                      name={data.name}
                      id={data.id}
                      disabled={data.id === "email" ? true : false}
                      key={formik.id}
                      formik={formik}
                      className="!h-16"
                    />
                  </>
                ))}
                <FormControl size="small" className="!h-16">
                  <Select
                    displayEmpty
                    value={formik.values["gender"]}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name={"gender"}
                    id={"gender"}
                    key={formik.id}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return (
                          <span className="text-gray-400">Select Gender</span>
                        );
                      }

                      return selected;
                    }}
                  >
                    {["Male", "Female"].map((item, index) => (
                      <MenuItem
                        value={item}
                        className="!capitalize"
                        key={index}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <CustomButton
                  disabled={formik.isValid ? false : true}
                  className="!h-10 !m-0"
                  type="submit"
                >
                  Save Changes
                </CustomButton>
              </div>
            ) : (
              <>
                <div className="grid lg:grid-cols-2 lg:gap-5 mt-3 lg:px-0 px-4 bg-white min-w-full rounded-xl">
                  {profileData.map((data) => (
                    <>
                      <CustomTextField
                        placeholder={data.placeholder}
                        name={data.name}
                        id={data.id}
                        disabled={true}
                        key={formik.id}
                        formik={formik}
                        className="!h-16 !border-none"
                      />
                    </>
                  ))}
                  <FormControl disabled size="small" className="!h-16">
                    <Select
                      displayEmpty
                      value={formik.values["gender"]}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      name={"gender"}
                      id={"gender"}
                      key={formik.id}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return (
                            <span className="text-gray-400">Select Gender</span>
                          );
                        }

                        return selected;
                      }}
                    >
                      {["Male", "Female"].map((item, index) => (
                        <MenuItem
                          value={item}
                          className="!capitalize"
                          key={index}
                        >
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <CustomButton
                    disabled={formik.isValid ? false : true}
                    className="!h-10 !m-0"
                    type="submit"
                  >
                    Edit
                  </CustomButton>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
