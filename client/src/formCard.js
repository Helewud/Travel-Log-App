import React from "react";
import { useForm } from "react-hook-form";
const url = process.env.REACT_APP_API + "/api/logs";

const LogForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(url);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className="display-form"
        {...register("title", { required: true })}
        // type="text"
        placeholder="Title"
      />
      <textarea
        className="display-form"
        // type="text"
        {...register("description")}
        placeholder="Description"
        rows={3}
      />
      <textarea
        className="display-form"
        {...register("comment")}
        placeholder="Comment"
        rows={3}
      />
      <input
        className="display-form"
        type="file"
        {...register("image", { required: true })}
      ></input>
      <select
        className="display-form"
        placeholder="Rate your experience"
        {...register("rating", { required: true })}
        id="rate"
      >
        <option value="">--rate your experience--</option>
        <option value="1">😡 Poor</option>
        <option value="2">😏 Average</option>
        <option value="3">🙂 Good</option>
        <option value="4">😊 Great</option>
        <option value="5">😁 Excellent</option>
      </select>
      <input
        className="display-form"
        type="Date"
        {...register("visitDate", { required: true })}
      />
      <input className="display-form" type="submit"></input>
    </form>
  );
};

export default LogForm;
