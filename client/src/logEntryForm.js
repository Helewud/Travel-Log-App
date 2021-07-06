import React from "react";
import StarRating from "./starRating";

const logEntryForm = () => {
  return (
    <form>
      <input
        className="fm-1"
        type="text"
        name="title"
        placeholder="Title"
      ></input>
      <textarea
        className="fm-1"
        type="text"
        name="description"
        placeholder="Description"
      />
      <textarea className="fm-1" name="comment" placeholder="comment" />
      <input className="fm-1" type="file" name="filename"></input>

      <StarRating />

      <input className="fm-1" type="submit"></input>
    </form>
  );
};

export default logEntryForm;
