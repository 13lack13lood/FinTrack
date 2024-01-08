"use client";

import FillButton from "@/src/components/buttons/FillButton";
import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import Image from "next/image";
import { loginAccount, signInWithGoogle } from "@/util/firebase/auth";
import { useRouter } from "next/navigation";

const validationSchema = yup.object({
    email: yup.string().email("Email must be valid").required("Email is required"),
    password: yup.string().required("Password is required"),
});

const Page = () => {
    const [fail, setFail] = useState(false);
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center mt-10 mx-auto space-y-10 w-[350px]">
            <div className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent p-4">Log In</div>
            <div
                className="flex flex-row justify-evenly py-2 rounded-xl w-full bg-bgcolor-primary drop-shadow-bg items-center border-2 border-bgcolor-primary transition-all duration-200 hover:border-accent"
                onClick={async () => {
                    await signInWithGoogle();
                    router.push("/");
                }}
            >
                <Image src="/google.png" alt="Google Icon" width={40} height={40}></Image>
                <div className="text-white text-xl text-center">Log In With Google</div>
            </div>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                onSubmit={async (values) => {
                    if (typeof (await loginAccount(values.email, values.password)) == "boolean") {
                        setFail(true);
                    } else {
                        setFail(false);
                        router.push("/");
                    }
                }}
                validationSchema={validationSchema}
            >
                <Form className="flex flex-col items-center justify-center space-y-10 w-full">
                    <div className="flex flex-col justify-center text-accent text-lg  w-full">
                        <div className="text-base font-semibold pl-2">Email</div>
                        <Field className="text-white font-light rounded-lg px-4 py-2 outline-none border-2 border-bgcolor-primary transition-all duration-200 focus:border-accent bg-bgcolor-primary drop-shadow-bg" name="email" />
                        <ErrorMessage component="a" className="text-base font-semibold text-loss-m mt-3 pl-2" name="email" />
                    </div>
                    <div className="flex flex-col justify-center text-accent text-lg w-full">
                        <div className="text-base font-semibold pl-2">Password</div>
                        <Field
                            className="text-white font-light rounded-lg px-4 py-2 outline-none border-2 border-bgcolor-primary transition-all duration-200 focus:border-accent bg-bgcolor-primary drop-shadow-bg"
                            name="password"
                            type="password"
                        />
                        <ErrorMessage component="a" className="text-base font-semibold text-loss-m mt-3 pl-2" name="password" />
                    </div>

                    <div className="flex flex-col items-center mt-8">
                        <FillButton text="Log In" onClick={() => {}} />
                        {fail && <div className="text-base font-semibold text-loss-m mt-3">Error Signing In</div>}
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default Page;
