import { useCallback, useState } from "react";

import { v4 as uuidv4 } from "uuid";

interface CommentType {
  id: string;
  name: string;
  comment: string;
}

const fieldsConfig = {
    name: {
        label: "Name",
        name: "name",
        required: true,
    },
    comment: {
        label: "Comment",
        name: "comment",
        required: true,
    }
};

function Comments() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [comments, setComments] = useState<CommentType[]>([]);

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const validateForm = useCallback((
    values: { name: string; label: string; value: string; required: boolean }[],
  ) => {
    const newErrors: Record<string, string> = {};
    let error = "";
    values.forEach(({ name, label, value, required }) => {
      if (!value && required) {
        error = label + " is required";
      }

      if (typeof value !== typeof "") {
        error = label + " is invalid";
      }

      if(error){
        newErrors[name] = error;
      }
    });
    setErrors({...errors, ...newErrors});
    return !error;
  }, [errors]);
  
  const addComment = useCallback(() => {
    if (
      !validateForm([
        {
          ...fieldsConfig.name,
          value: name,
        },
        {
          ...fieldsConfig.comment,
          value: comment,
        },
      ])
    ) {
      return;
    }

    setComments([
      {
        id: uuidv4(),
        name,
        comment,
      },
      ...comments,
    ]);

    setName("");
    setComment("");
  }, [comment, comments, name, validateForm]);

  return (
    <section className="flex flex-col space-y-12 px-6 py-10 md:px-12 lg:px-6">
      <div className="flex flex-col items-center space-y-6">
        <h3 className="text-3xl">Leave A Comment</h3>
        <div className="w-full">
          <label>Name</label>
          <p className="text-red-500">{errors && errors.name}</p>
          <input
            type="text"
            value={name}
            className="w-full border-b-2 text-center font-sans"
            onChange={(event) => {
              validateForm([
                {
                  ...fieldsConfig.name,
                  value: event.target.value,
                },
              ]);
              setName(event.target.value);
            }}
          ></input>
        </div>
        <div className="w-full">
          <label>Comment</label>
          <p className="text-red-500">{errors && errors.comment}</p>
          <textarea
            value={comment}
            className="h-40 w-full border-2 font-sans"
            onChange={(event) => {
              validateForm([
                {
                  ...fieldsConfig.comment,
                  value: event.target.value,
                },
              ]);
              setComment(event.target.value);
            }}
          />
        </div>
        <button
          onClick={addComment}
          className="w-64 bg-black p-6 text-2xl text-white"
        >
          Submit
        </button>
      </div>
      <div>
        <h3 className="text-3xl">Comments</h3>
        <ul>
          {comments.length ? (
            comments.map(({ id, name, comment }) => (
              <li key={id} className="py-12">
                <p>{comment}</p>
                <h4 className="text-gray-400">{`By ${name}`}</h4>
              </li>
            ))
          ) : (
            <p className="text-gray-400">No comments</p>
          )}
        </ul>
      </div>
    </section>
  );
}

export default Comments;
