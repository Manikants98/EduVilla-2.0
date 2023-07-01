import React from "react";
import { getCourseFn } from "../../services/GetCourses";
import { useQuery } from "react-query";
import { Loader } from "../../shared/Loader";
import { categoryData } from "../../mockData";
import homeLogo from "../../assets/images/home/home.gif";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isLoading, data } = useQuery(["getCourse"], () => getCourseFn());
  const navigate = useNavigate();

  // const frontEnd = (char) => {
  //   document.getElementById(char).scrollIntoView({
  //     behavior: "smooth",
  //     block: "center",
  //     inline: "center",
  //   });
  // };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {/* <div className="fixed flex gap-2 whitespace-nowrap hide-scroll overflow-x-auto lg:top-20 top-[4rem] z-50 bg-white w-full">
        {categoryData?.map((cat) => {
          return (
            <p
              onClick={() => frontEnd(cat.heading)}
              className="cursor-pointer p-2 hover:bg-gray-50 hover:border-b-2 border-blue-500 hover:text-blue-500"
            >
              {cat.heading}
            </p>
          );
        })}
      </div> */}
      <div className="flex flex-col m-3 lg:flex-row justify-center items-center">
        <h1 className="text-3xl text-center lg:w-2/5 lg:m-20 tracking-wider drop-shadow font-semibold text-primary lg:text-7xl">
          Welcome to EduVilla
        </h1>
        <img src={homeLogo} alt="" />
      </div>
      <div className="grid grid-cols-1 mx-5">
        {categoryData.map((category, index) => {
          return (
            <div
              id={category.heading}
              key={index}
              className="rounded-xl bg-white"
            >
              <Divider textAlign="left">
                <h1 className="font-semibold text-center text-primary lg:text-left my-3 text-xl lg:text-3xl">
                  {category.heading}
                </h1>
              </Divider>
              {data.data && data?.data.length !== 0 ? (
                <div className="flex flex-row w-full overflow-x-auto hide-scroll lg:m-0">
                  {data?.data
                    ?.filter((item) => item?.category === category.heading)
                    .map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="bg-white shadow-card my-4 mx-8 lg:mx-2 cursor-pointer lg:mr-5 rounded hover:scale-105 duration-500"
                          onClick={() => navigate(`/course/${item.id}`)}
                        >
                          <img
                            src={item.image_url}
                            alt=""
                            className="h-80 w-72 rounded-t object-cover"
                          />

                          <div className="px-4 py-3 w-72">
                            <span className="text-gray-400 mr-3 uppercase text-xs">
                              {item.category}
                            </span>
                            <p className="lg:text-xl text-lg font-bold truncate block capitalize">
                              {item.heading}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="m-5 ml-0 text-gray-600 font-bold text-xl">
                  No Course Found
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
