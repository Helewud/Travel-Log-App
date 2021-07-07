import React from "react";

const logForm = () => {
  return (
    <form>
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
      <textarea className="display-form" name="comment" placeholder="Comment" />
      <input className="display-form" type="file" name="filename"></input>
      <select
        className="display-form"
        placeholder="Rate your experience"
        name="rating"
        required
        id="rate"
      >
        <option value="">--rate your experience--</option>
        <option value="1">😡 Poor</option>
        <option value="2">😏 Good</option>
        <option value="3">🙂 Average</option>
        <option value="4">😊 Great</option>
        <option value="5">😁 Excellent</option>
      </select>
      <input className="display-form" type="date" />
      <input className="display-form" type="submit"></input>
    </form>
  );
};

export default logForm;
