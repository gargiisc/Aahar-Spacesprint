import React, { useState, useEffect } from "react";
import './ContactForm.css';
//Define the ContactUsForm functional component:
const Form = () => {
  //Define the state variables using the useState hook:
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [loading, setLoading] = useState("Send");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  //Define the validateEmail function:
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  //Define the handleSubmit function that is called when the submit button is clicked:

  const handleSubmit = async (event) => {
    //Prevent the default form submission behavior, so as to set conditions to be validated before submission
    event.preventDefault();

    setName("");
    setEmail("");
    setMessage("");
    setSubmitSuccess(false);
    setSubmitError(false);

    //set conditions for checking each of the input fields to make sure they have valid values. If any field is empty or invalid, the appropriate error message is set in the state.

    if (name.trim() === "") {
      setNameError("Name is required");
    }

    if (email.trim() === "") {
      setEmailError("Email is required.");
    } else if (!validateEmail(email.trim())) {
      setEmailError("Invalid email address.");
    }

    if (message.trim() === "") {
      setMessageError("Please enter a message");
    }

    //Set condition for when no error is detected (all fields are valid)
    if (nameError === "" && emailError === "" && messageError === "") {
      try {
        setLoading("Sending message...");
        await fetch(
          "https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: 3,
              name: name,
              email: email,
              subject: "Contact Form Submission",
              message: message,
            }),
          }
        );
        //Allow to submit and display success message to the user

        setSubmitSuccess(true);
        //Reset state variables for each form field to empty string
      } catch (error) {
        setSubmitError(true);
      } finally {
        setLoading("Send");
      }
    }
  };

  //Use useEffect code to clear the form and success message after 30 seconds:
  useEffect(() => {
    let resetForm = null;
    if (submitSuccess) {
      resetForm = setTimeout(() => {
        setSubmitSuccess(false);
        setName("");
        setEmail("");
        setMessage("");
      }, 30000);
      return () => clearTimeout(resetForm);
    }
  }, [submitSuccess]);

  //Define the JSX for the form

  return (
    <div>
      {submitSuccess && !messageError && !emailError && !nameError && (
        <p className="success-message">
          Thank you for contacting us! We will be in touch with you soon.
        </p>
      )}
      {submitError && (
        <p>
          Submission failed! Please fill out all required fields correctly and
          try again.
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {nameError && <p>{nameError}</p>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {emailError && <p>{emailError}</p>}
        </div>

        <div>
          <label htmlFor="subject">Subject:</label>
          <input type="text" id="subject"></input>
        </div>

        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          ></textarea>
          {messageError && <p>{messageError}</p>}
        </div>

        <div>
          <button type="submit">{loading}</button>
        </div>
      </form>
    </div>
  );
};

export default Form;