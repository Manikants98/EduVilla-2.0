import React from "react";
import { getCourseFn } from "../../services/GetCourses";
import { useQuery } from "react-query";
import { Loader } from "../../shared/Loader";
import AddCourse from "../../components/Courses/AddCourse";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(["getCourse"], () => getCourseFn(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-5 gap-2 lg:p-5 p-2">
        {data?.data?.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => navigate(`/course/${item.id}`)}
              className="bg-white flex flex-col cursor-pointer shadow-card rounded transition-transform hover:scale-105 duration-700"
            >
              <img
                src={item.image_url}
                alt=""
                className="lg:h-72 h-48 rounded-t object-cover"
              />

              <div className="px-4 py-3">
                <span className="text-gray-400 mr-3 uppercase text-xs">
                  {item.category}
                </span>
                <p className="lg:text-xl text-lg font-bold text-black truncate block capitalize">
                  {item.heading}
                </p>
              </div>
            </div>
          );
        })}
        <div className="flex justify-center lg:h-auto h-52 items-center text-primary bg-white flex-col shadow-card rounded hover:scale-105 duration-700 border-dashed border-2 border-primary">
          <p className="cursor-pointer">
            <AddCourse />
          </p>
        </div>
      </div>
    </>
  );
};

export default Courses;
