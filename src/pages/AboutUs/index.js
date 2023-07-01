import React from "react";
import { Avatar } from "@mui/material";
import aboutLogo from "../../assets/images/about/aboutLogo.gif";

const AboutUs = () => {
  return (
    <>
      <div className="flex flex-col m-3 lg:flex-row justify-center items-center">
        <h1 className="text-3xl text-center w-11/12 tracking-wider drop-shadow font-semibold text-primary lg:text-7xl">
          About Us
        </h1>
        <img src={aboutLogo} alt="" />
      </div>

      <h1 className="m-3 text-xl text-primary font-bold text-center lg:text-3xl">
        Our Teams
      </h1>
      <hr />
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="flex flex-col items-center w-72 m-7 pt-5 !bg-gray-100 rounded shadow-md hover:scale-105 duration-500">
          <div className="flex flex-col shadow-md rounded items-center p-5 w-72 mt-10 pt-12 bg-white">
            <h1 className="font-semibold text-lg">Mani Kant Sharma</h1>
            <h1 className="text-xs m-1">Dadzheromani@gmail.com</h1>
            <h1 className="m-1 text-sm">Founder and CEO of Edu-Villa™</h1>
          </div>
          <Avatar
            className="!rounded-full !bg-primary !absolute !h-20 !w-20"
            alt="M"
            src="https://firebasestorage.googleapis.com/v0/b/elearning-mkx.appspot.com/o/images%2FPicsArt_02-17-07.14.53~2.png?alt=media&token=a005f787-846b-4318-9a5b-d00aa847e7f6"
          >
            M
          </Avatar>
        </div>
        <div className="flex flex-col items-center w-72 m-2 pt-5 !bg-gray-100 rounded shadow-md hover:scale-105 duration-500">
          <div className="flex flex-col shadow-md rounded items-center p-5 w-72 mt-10 pt-12 bg-white">
            <h1 className="font-semibold text-lg">Abhishek Kumar Sharma</h1>
            <h1 className="text-xs m-1">Abhi9936413991@gmail.com</h1>
            <h1 className="m-1 text-sm">Founder and CEO of Edu-Villa™</h1>
          </div>
          <Avatar
            className="!rounded-full !bg-primary !absolute !h-20 !w-20"
            alt="A"
            src="https://firebasestorage.googleapis.com/v0/b/elearning-mkx.appspot.com/o/images%2FIMG_20221014_024930.jpg?alt=media&token=0c9534ee-5caa-4965-aa17-a91787abd861"
          >
            A
          </Avatar>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
