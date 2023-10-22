import React from "react";
import { useThunk } from "../hooks/useThunk";
import { fetchEmailInfo } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setIsShowingFullEmail } from "../store/slices/emailSlice";
import { setUpdateStatus } from "../store/slices/emailSlice";

function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // 12-hour clock, so 0 should be represented as 12
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + ampm;
}

function convertUnixTimestampToDate(timestamp) {
  const date = new Date(timestamp);
  const formattedDate =
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " " +
    formatAMPM(date);
  return formattedDate;
}

const Email = ({ email }) => {
  const dispatch = useDispatch();
  const [doFetchMailInfo] = useThunk(fetchEmailInfo);

  const formattedDate = convertUnixTimestampToDate(email.date);
  const handleClick = () => {
    doFetchMailInfo(email.id);
    dispatch(setIsShowingFullEmail(true));
    dispatch(setUpdateStatus(email.id));
  };
  return (
    <div
      className={`border flex gap-5 p-2 cursor-pointer bg-white rounded-xl`}
      onClick={handleClick}
    >
      <div className="max-w-20">
        <div className="uppercase w-12 h-12 rounded-full bg-[#e54065] flex items-center justify-center text-white font-bold">
          <span>{email.from.name.charAt(0)}</span>
        </div>
      </div>
      <div>
        <div>
          From: <span className="font-bold">{email.from.name}</span>{" "}
          <span className="font-bold">&lt;{email.from.email}&gt;</span>{" "}
        </div>
        <div>
          Subject: <span className="font-bold">{email.subject}</span>{" "}
        </div>
        <p className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[70%]">
          {email.short_description}
        </p>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
};

export default Email;
export { setIsShowingFullEmail };
