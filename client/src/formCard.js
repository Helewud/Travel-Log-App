import React, { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import axios from "axios";
const API_URL = process.env.REACT_APP_API;

// react-hook-form components controller
const LogForm = ({ location, onClose, getEntries }) => {
  const { register, handleSubmit, control } = useForm();
  const { isSubmitted, isSubmitSuccessful } = useFormState({
    control,
  });

  // react-hook-form function to be called on submit
  const onSubmit = (data) => {
    const form = new FormData();
    form.append("latitude", location.latitude);
    form.append("longitude", location.longitude);

    for (const key in data) {
      form.append(key, data[key]);
    }

    form.set("image", data.image[0]);

    axios
      .post(`${API_URL}/api/logs`, form)
      .then((res) => {
        onClose();
      })
      .catch((err) => console.log(err));
  };

  // current date
  const currentDate = new Date(Date.now()).toISOString().split("T")[0];

  return (
    //   react-hook-form form instance
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <input
        className="display-form start"
        {...register("title", { required: true })}
        type="text"
        placeholder="Title"
      />
      <textarea
        className="display-form"
        type="text"
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
        accept="image/*"
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
        max={currentDate}
        value={currentDate}
        {...register("visitDate", { required: true })}
      />
      {isSubmitted && isSubmitSuccessful ? (
        <div className="lds-dual-ring"></div>
      ) : (
        <input className="display-form" type="submit"></input>
      )}
    </form>
  );
};

export default LogForm;
