import React from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../Styles/Styles.css";
const Comments = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  return (
    <div>
      <h3> Have Feedback?</h3>
      <Form onSubmit={handleSubmit(onSubmit)} className="mainCommentContainer">
        <Form.Group className="commentsFormContainer">
          <div className="userDetailsContainer">
            <div>
              <Form.Control
                type="text"
                placeholder="Username"
                {...register("username", { required: true, maxLength: 15 })}
                isInvalid={!!errors.username}
              />
              {errors.username && (
                <Form.Control.Feedback type="invalid">
                  Username is required
                </Form.Control.Feedback>
              )}
            </div>
            <div>
              <Form.Control
                type="email"
                placeholder="Email Address"
                {...register("email", { required: true, maxLength: 15 })}
                isInvalid={!!errors.email}
              />
              {errors.username && (
                <Form.Control.Feedback type="invalid">
                  Enter a valid Email address
                </Form.Control.Feedback>
              )}
            </div>
            <div>
              <Form.Control
                type="tel"
                placeholder="Phone Number"
                {...register("phone", { required: true })}
                isInvalid={!!errors.phone}
              />
              {errors.username && (
                <Form.Control.Feedback type="invalid">
                  phone number is required
                </Form.Control.Feedback>
              )}
            </div>
          </div>
          <div>
            <Form.Control
              as="textarea"
              placeholder="Comments"
              rows={3}
              {...register("comment", { required: true, maxLength: 150 })}
              isInvalid={!!errors.comment}
            />
            {errors.username && (
              <Form.Control.Feedback type="invalid">
                Enter a comment before submitting
              </Form.Control.Feedback>
            )}
          </div>
          <Button variant="dark" type="submit" style={{ margin: "20px" }}>
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Comments;
