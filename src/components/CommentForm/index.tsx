import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CommentForm = () => {
    const handleSubmit = (values:any) => {
        console.log(values);
    }
    const formik = useFormik({
        initialValues: {
            comment: '',
        },
        validationSchema: Yup.object({
            comment: Yup.string().required('Comment is required'),
        }),
        onSubmit: (values) => {
            handleSubmit(values.comment);
            formik.resetForm();
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label>
                Comment:
                <textarea
                    name="comment"
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your comment"
                />
            </label>
            {formik.touched.comment && formik.errors.comment && (
                <p style={{ color: 'red' }}>{formik.errors.comment}</p>
            )}
            <button type="submit">Submit</button>
        </form>
    );
}

export default CommentForm;