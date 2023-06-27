import { useEffect, useState } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Footer from "@/Components/Footer";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <div className="bg-login">
                <div className="cont-general">
                    <form onSubmit={submit} className="form-login">
                        <div className="cont-logo-black">
                            <img
                                src="images/0.log_view/NewLogo-black.svg"
                                alt=""
                            />
                        </div>
                        <h2 className="title-form-login">Welcome!</h2>
                        <div>
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="block mt-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="ml-2 text-lg text-gray-800">
                                    Remember me
                                </span>
                            </label>
                        </div>
                        <PrimaryButton
                            className="btn-login"
                            disabled={processing}
                        >
                            Log in
                        </PrimaryButton>

                        <div className="password-account">
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="underline"
                                >
                                    Forgot your password?
                                </Link>
                            )}

                            <Link href={route("register")}>
                                <p className="mt-2 text-md text-gray-800">
                                    I dont have an Account -{" "}
                                    <span className="link-form">
                                        Create Account
                                    </span>
                                </p>
                            </Link>
                        </div>
                    </form>
                    <div className="bg-top">
                        <div className="cont-img">
                            <img
                                src="/images/0.log_view/Progress_Login.svg"
                                alt="Phrase_Login"
                            />
                        </div>
                        <h2 className="phrase">
                            Be Better <br></br>
                            Everyday!
                        </h2>
                    </div>
                    <div className="bg-mid"></div>

                    <Footer />
                </div>
            </div>
        </GuestLayout>
    );
}
