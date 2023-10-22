import React, { useEffect, useState } from "react";
import { useThunk } from "../hooks/useThunk";
import { fetchAllMails } from "../store/thunks/fetchAllEmails";
import { useSelector } from "react-redux";
import Email from "./Email";
import EmailDetail from "./EmailDetail";

const AllEmails = () => {
  const {
    allEmails: emails,
    isShowingFullEmail,
    filteredEmailValue,
  } = useSelector((state) => state.emails);
  let filteredEmails = emails;

  if (filteredEmailValue === "favorite") {
    filteredEmails = emails.filter((email) => email.isFavorite);
  } else {
    filteredEmails = emails.filter(
      (email) => email.status === filteredEmailValue
    );
  }

  const [doFetchMails, isLoading, error] = useThunk(fetchAllMails);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    doFetchMails(currentPage);
  }, [currentPage]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center text-3xl mt-3">
        Loading....
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center text-3xl mt-3">
        {error.message}
      </div>
    );
  }
  return (
    <>
      <div className="flex">
        <div
          className={`flex flex-col gap-2 p-5 max-h-screen overflow-auto ${
            isShowingFullEmail ? "min-w-[40%]" : "w-full"
          } `}
        >
          {filteredEmails.map((email) => (
            <Email key={email.id} email={email} />
          ))}
        </div>
        {isShowingFullEmail && (
          <div className="max-w-[80vw] m-5 min-h-[90vh]  ">
            <EmailDetail />
          </div>
        )}
      </div>
      <div className="flex justify-between p-5">
        <button
          className={` text-white px-5 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black cursor-pointer"
          }`}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1 ? true : false}
        >
          Prev
        </button>
        <button
          className="bg-black text-white px-5 py-2 rounded-lg cursor-pointer"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default AllEmails;
