import React from "react";
const url = process.env.REACT_APP_API + "/api/logs";

const logForm = () => {
  console.log(url);
  return (
    <form action={url} method="POST" encType="multipart/form-data">
      <input
        className="display-form"
        type="text"
        name="title"
        placeholder="Title"
      ></input>
      <textarea
        className="display-form"
        type="text"
        name="description"
        placeholder="Description"
      />
      <textarea
        className="display-form"
        name="comments"
        placeholder="Comment"
      />
      <input className="display-form" type="file" name="image"></input>
      <select
        className="display-form"
        placeholder="Rate your experience"
        name="rating"
        required
        id="rate"
      >
        <option value="">--rate your experience--</option>
        <option value="1">😡 Poor</option>
        <option value="2">😏 Average</option>
        <option value="3">🙂 Good</option>
        <option value="4">😊 Great</option>
        <option value="5">😁 Excellent</option>
      </select>
      <input className="display-form" type="Date" name="visitDate" />
      <input className="display-form" type="submit"></input>
    </form>
  );
};

export default logForm;
