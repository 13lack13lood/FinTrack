"use client";

import FillButton from "@/src/components/buttons/FillButton";
import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { auth } from "@/util/firebase/firebase";
import { User, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { isStateChanged } from "@/util/firebase/auth";

const validationSchemaName = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Email must be valid").required("Email is required"),
});

const validationSchemaPassword = yup.object({
    password: yup.string().min(8, "Your password must be at least 8 characters"),
    confirmpassword: yup.string().oneOf([yup.ref("password")], "Passwords must match"),
});

const Page = () => {
    const [fail, setFail] = useState(false);
    const [success, setSuccess] = useState(false);
    const [signedIn, setSignedIn] = useState(false);
    const [user, setUser] = useState<User | null>();

    const router = useRouter();

    useEffect(() => {
        const listener = isStateChanged((user) => {
            if (user) {
                setSignedIn(true);
                console.log("signed in");
            } else {
                setSignedIn(false);
                router.push("/login");
            }
            setUser(auth.currentUser);
        });

        return () => {
            listener();
        };
    }, []);

    return (
        signedIn &&
        user && (
            <div className="flex flex-col items-center justify-center mt-10 mx-auto space-y-10 w-[350px]">
                <div className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent p-4">My Account</div>

                <Formik
                    initialValues={{
                        name: user.displayName ? user.displayName : "",
                        email: user.email ? user.email : "",
                    }}
                    onSubmit={async (values) => {
                        if (values.name == user.displayName && values.email == user.email) {
                            try {
                                updateProfile(user, {
                                    displayName: values.name,
                                });
                                updateEmail(user, values.email);
                                setSuccess(true);
                            } catch (e) {
                                setFail(true);
                            }
                        }
                    }}
                    validationSchema={validationSchemaName}
                >
                    <Form className="flex flex-col items-center justify-center space-y-10 w-full">
                        <div className="flex flex-col justify-center text-accent text-lg font-light w-full">
                            <div className="text-base font-semibold pl-2">Name</div>
                            <Field className="text-white font-light rounded-lg px-4 py-2 outline-none border-2 border-bgcolor-primary transition-all duration-200 focus:border-accent bg-bgcolor-primary drop-shadow-bg" name="name" />
                            <ErrorMessage component="a" className="text-base font-semibold text-loss-m mt-3 pl-2" name="name" />
                        </div>
                        <div className="flex flex-col justify-center text-accent text-lg  w-full">
                            <div className="text-base font-semibold pl-2">Email</div>
                            <Field className="text-white font-light rounded-lg px-4 py-2 outline-none border-2 border-bgcolor-primary transition-all duration-200 focus:border-accent bg-bgcolor-primary drop-shadow-bg" name="email" />
                            <ErrorMessage component="a" className="text-base font-semibold text-loss-m mt-3 pl-2" name="email" />
                        </div>
                        <div className="flex flex-col items-center mt-8">
                            <FillButton text="Change Name And Email" onClick={() => {}} />

                            {success && <div className="text-base font-semibold text-gain-m mt-3">Successfully Updated</div>}
                        </div>
                    </Form>
                </Formik>
                <Formik
                    initialValues={{
                        password: "",
                        confirmpassword: "",
                    }}
                    onSubmit={async (values) => {
                        if (values.password != "") {
                            updatePassword(user, values.password);
                            setSuccess(true);
                        }
                    }}
                    validationSchema={validationSchemaPassword}
                >
                    <Form className="flex flex-col items-center justify-center space-y-10 w-full">
                        <div className="flex flex-col justify-center text-accent text-lg w-full">
                            <div className="text-base font-semibold pl-2">New Password</div>
                            <Field
                                className="text-white font-light rounded-lg px-4 py-2 outline-none border-2 border-bgcolor-primary transition-all duration-200 focus:border-accent bg-bgcolor-primary drop-shadow-bg"
                                name="password"
                                type="password"
                            />
                            <ErrorMessage component="a" className="text-base font-semibold text-loss-m mt-3 pl-2" name="password" />
                        </div>
                        <div className="flex flex-col justify-center text-accent text-lg w-full">
                            <div className="text-base font-semibold pl-2">Confirm Password</div>
                            <Field
                                className="text-white font-light rounded-lg px-4 py-2 outline-none border-2 border-bgcolor-primary transition-all duration-200 focus:border-accent bg-bgcolor-primary drop-shadow-bg"
                                name="confirmpassword"
                                type="password"
                            />
                            <ErrorMessage component="a" className="text-base font-semibold text-loss-m mt-3 pl-2" name="confirmpassword" />
                        </div>
                        <div className="flex flex-col items-center mt-8">
                            <FillButton text="Change Password" onClick={() => {}} />
                            {fail && <div className="text-base font-semibold text-loss-m mt-3">Error Updating Password</div>}
                            {success && <div className="text-base font-semibold text-gain-m mt-3">Successfully Updated</div>}
                        </div>
                    </Form>
                </Formik>
            </div>
        )
    );
};

export default Page;
