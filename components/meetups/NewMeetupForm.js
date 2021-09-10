import React, { useRef } from "react";
import classes from "./NewMeetupForm.module.css";
import Card from "../ui/Card";
import Input from "./Input";

const NewMeetupForm = (props) => {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const meetupData = {
      title: titleInputRef.current.value,
      image: imageInputRef.current.value,
      address: addressInputRef.current.value,
      description: descriptionInputRef.current.value,
    };

    props.onAddMeetup(meetupData);
  };

  const formData = [
    { id: "title", ref: titleInputRef, label: "Meetup Title", type: "text", isInput: true },
    { id: "image", ref: imageInputRef, label: "Meetup Image", type: "url", isInput: true },
    { id: "address", ref: addressInputRef, label: "Address", type: "text", isInput: true },
    { id: "description", ref: descriptionInputRef, label: "Description", type: "text", rows: "5", isInput: false },
  ];

  return (
    <Card>
      <form onSubmit={submitHandler} className={classes.form}>
        {formData.map((inputData) => (
          <Input key={inputData.id} ref={inputData.ref} inputData={inputData} />
        ))}
        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
};

export default NewMeetupForm;
