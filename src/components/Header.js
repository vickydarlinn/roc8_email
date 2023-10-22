import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilteredStatus,
  setIsShowingFullEmail,
} from "../store/slices/emailSlice";

const Header = () => {
  const dispatch = useDispatch();
  const filteredStatus = useSelector(
    (state) => state.emails.filteredEmailValue
  );
  const filters = ["unread", "read", "favorite"];

  const handleFilterClick = (filter) => {
    dispatch(setFilteredStatus(filter));
    dispatch(setIsShowingFullEmail(false));
  };

  return (
    <div className="flex gap-1 items-center p-4">
      <span>Filter by: </span>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => handleFilterClick(filter)}
          className={`${
            filter === filteredStatus ? "bg-blue-500 text-white" : ""
          } px-3 py-1 rounded-lg hover:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-500`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Header;
