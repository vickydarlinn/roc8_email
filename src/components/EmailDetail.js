import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setFavorite } from "../store/slices/emailSlice";

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

const EmailDetail = () => {
  const dispatch = useDispatch();
  const { emailFullDetail, allEmails } = useSelector((state) => state.emails);
  console.log(emailFullDetail);
  console.log(emailFullDetail?.info?.id);
  const email = allEmails?.find((e) => {
    return e.id === emailFullDetail?.info?.id;
  });
  const formattedDate = convertUnixTimestampToDate(email?.date);

  if (emailFullDetail.isLoading) {
    return <div>Loading...</div>;
  }
  const handleFavorite = (email) => {
    dispatch(setFavorite(email.id));
  };

  return (
    <div className="bg-white flex  h-full">
      <div className="w-20 p-5">
        <div className="uppercase w-12 h-12 rounded-full bg-[#e54065] flex items-center justify-center text-white font-bold ">
          <span>{email?.from?.name?.charAt(0)}</span>
        </div>
      </div>
      <div>
        <div className="flex justify-between p-3">
          <span className=" text-3xl">{email?.from.name}</span>
          <button
            className="py-1 px-3 bg-[#e54065] text-white rounded-3xl"
            onClick={() => handleFavorite(email)}
          >
            {email.isFavorite ? "Remove from favorite" : " Mark as favorite"}
          </button>
        </div>
        <div className="my-5 p-2">{formattedDate}</div>
        <div className="p-2">{emailFullDetail?.info?.body}</div>
      </div>
    </div>
  );
};

export default EmailDetail;
