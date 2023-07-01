import { Avatar } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { users } from "../../services/Users";
import { Loader } from "../../shared/Loader";
const Users = () => {
  const { isLoading, mutate, data } = useMutation(users);
  useEffect(() => {
    mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-center text-primary text-2xl font-bold m-5">
            Registered Users
          </h1>
          <hr />
          <div className="flex flex-wrap gap-7 text-center p-5 justify-center">
            {data?.data?.map((item) => {
              return (
                <>
                  <div className="flex flex-col w-72 items-center pt-5 !bg-gray-100 rounded shadow-md hover:scale-105 duration-500">
                    <div className="flex flex-col shadow-md rounded items-center p-5 w-72 mt-10 pt-12 bg-white">
                      <h1 className="font-bold text-lg">{item.name}</h1>
                      <h1 className="text-xs">{item.email}</h1>
                      <div className="flex flex-col"></div>
                    </div>
                    <Avatar
                      className="!rounded-full !bg-primary !absolute !h-20 !w-20"
                      alt={item.name}
                      src={item.profile_url}
                    />
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Users;
