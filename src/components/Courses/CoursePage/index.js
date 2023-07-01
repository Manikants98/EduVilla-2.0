import React from "react";
import { getCourseFn } from "../../../services/GetCourses";
import { useMutation } from "react-query";
import { useState, useEffect } from "react";
import { Loader } from "../../../shared/Loader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { Button, IconButton, List, ListItemButton } from "@mui/material";
import CourcesDrawer from "../../../shared/CourcesDrawer";
import ReactQuill from "react-quill";
import { useFormik } from "formik";
import { Add, DeleteTwoTone } from "@mui/icons-material";
import { toast } from "react-toastify";
import classNames from "classnames";
import axiosInstance from "../../../config/axios";

const CoursePage = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [chapter, setChapter] = useState([]);

  const { handleSubmit, handleChange, values, resetForm } = useFormik({
    initialValues: {
      title: "",
      description: "",
      content: "",
    },
    onSubmit: () => {
      console.log(values.title, description, content, "mkx");
      axiosInstance
        .post("chapters", {
          course_id: id,
          title: values.title,
          description: description,
          content: content,
        })
        .then((res) => {
          toast.success(res.data.message);
          mutate(id);
          setChapter(res.data.data.id);
          resetForm();
          setDescription("");
          setContent("");
        })
        .catch((err) => toast.error(err.response.data.message));
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    mutate(id);
    // eslint-disable-next-line
  }, [id]);

  const { mutate, isLoading } = useMutation(getCourseFn, {
    onSuccess: (res) => {
      setData(res?.data?.[0]);
    },
  });

  const handleDelete = (chapter_id) => {
    axiosInstance.delete(`chapters?chapter_id=${chapter_id}`).then((res) => {
      console.log(res);
      toast.success(res.data.message);
      mutate(id);
    });
  };
  const chapters = data?.chapters;
  const chapterData = chapters?.filter((i) => i.chapter_id === chapter)?.[0];

  useEffect(() => {
    setChapter(chapters?.[0]?.chapter_id);
  }, [chapters]);
  return (
    <>
      <div className="h-16 lg:h-20 px-5 z-50 flex justify-between rounded sticky top-0 bg-white shadow-card items-center">
        <IconButton
          className="flex justify-center"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
        </IconButton>
        <CourcesDrawer
          chapters={chapters}
          setChapter={setChapter}
          chapter={chapter}
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex gap-2 p-2 w-full">
          <List className="!shadow-card !whitespace-nowrap lg:!block !hidden !fixed !z-0 !w-[15%] !h-[87vh] !rounded !p-1">
            {chapters?.map((i) => {
              return (
                <ListItemButton
                  className={classNames(
                    "!rounded",
                    i.chapter_id === chapter && "!bg-black !text-white"
                  )}
                  onClick={() => setChapter(i.chapter_id)}
                >
                  {i.chapter_title}
                </ListItemButton>
              );
            })}
            <ListItemButton
              className="!flex !justify-between !rounded"
              onClick={() => setChapter(null)}
            >
              Chapter <Add />
            </ListItemButton>
          </List>
          <div className="flex flex-col items-center w-[inherit] lg:w-[85%] lg:h-[85vh] lg:overflow-y-auto lg:ml-[15%] lg:px-5 px-px">
            {!chapter ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-7 p-2 h-full lg:w-11/12"
              >
                <p className="text-xl font-semibold p-5 text-center">
                  Add Chapter
                </p>
                <span className="w-full">
                  <p>Title*</p>
                  <input
                    name="title"
                    id="title"
                    className="outline-none p-2 border border-gray-300 w-full"
                    placeholder="Enter Title"
                    value={values.title}
                    onChange={handleChange}
                  />
                </span>
                <span className="">
                  <ReactQuill
                    theme="snow"
                    placeholder="Description"
                    value={description}
                    className="desc"
                    onChange={setDescription}
                  />
                </span>
                <span>
                  <ReactQuill
                    theme="snow"
                    placeholder="Content"
                    value={content}
                    className="content"
                    modules={{
                      toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        [{ size: [] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                          { list: "ordered" },
                          { list: "bullet" },
                          { indent: "-1" },
                          { indent: "+1" },
                        ],
                        ["link", "image", "video"],
                        ["clean"],
                      ],
                    }}
                    onChange={setContent}
                  />
                </span>

                <Button
                  type="submit"
                  variant="contained"
                  disableElevation
                  className="!rounded-none"
                >
                  Submit
                </Button>
              </form>
            ) : (
              <>
                <div className="flex flex-col lg:flex-row justify-between items-center shadow-card rounded w-full">
                  <div className="flex text-center mt-3 w-full flex-col">
                    <h1 className="text-xs text-gray-400 lg:text-sm uppercase">
                      {data?.heading}
                    </h1>
                    <h1 className="font-bold w-full capitalize text-2xl lg:text-4xl">
                      {chapterData?.chapter_title}
                    </h1>
                  </div>
                  <img
                    className="w-3/4 lg:w-2/5 object-cover m-4 rounded"
                    src={data?.image_url}
                    alt=""
                  />
                </div>
                <div className="text-left shadow-card p-3 rounded pb-10 my-4 w-full">
                  <span className="flex gap-1">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: chapterData?.chapter_description,
                      }}
                    ></p>
                  </span>
                </div>
                <div className="text-left shadow-card p-3 rounded pb-10 my-4 w-full">
                  <span className=" gap-1">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: chapterData?.chapter_content,
                      }}
                      className="!whitespace-normal chapter-content"
                    ></p>
                  </span>
                </div>
                <span
                  className="!text-red-500 flex cursor-pointer justify-end"
                  onClick={() => handleDelete(chapterData?.chapter_id)}
                >
                  <DeleteTwoTone color="error" /> Delete
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CoursePage;
