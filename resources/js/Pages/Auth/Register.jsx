import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Footer from "@/Components/Footer";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="bg-login">
                <div className="cont-general">
                    <form onSubmit={submit} className="form-account">
                        <div className="cont-logo-black">
                            <img
                                src="images/0.log_view/NewLogo-black.svg"
                                alt=""
                            />
                        </div>
                        <h2 className="title-form-account">
                            Create a new account
                        </h2>

                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        {/* <div className="mt-3">
                            <InputLabel htmlFor="lastname" value="Lastname" />

                            <TextInput
                                id="lastname"
                                name="lastname"
                                value={data.lastname}
                                className="mt-1 block w-full"
                                autoComplete="lastname"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("lastname", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.lastname}
                                className="mt-2"
                            />
                        </div> */}

                        <div className="mt-2">
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-2">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-2">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                            />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        {/* <Radios /> */}

                        <PrimaryButton
                            className="btn-account mt-2"
                            disabled={processing}
                        >
                            Create account
                        </PrimaryButton>

                        <Link
                            href={route("login")}
                            className="mt-2 text-lg text-gray-800"
                        >
                            I have an account -{" "}
                            <span className="link-form"> Sing in</span>
                        </Link>
                    </form>
                    <div className="bg-top-register">
                        <div className="cont-img-megaf">
                            <img
                                src="/images/0.log_view/JustLogo.svg"
                                alt="Phrase_Login"
                            />
                        </div>
                        <div className="cont-img-workers">
                            <img
                                src="/images/0.log_view/Workers_CreateAccount.svg"
                                alt="Phrase_Login"
                            />
                        </div>
                        <div className="cont-img-worker">
                            <img
                                src="/images/0.log_view/Worker_CreateAccount.svg"
                                alt="Phrase_Login"
                            />
                        </div>
                    </div>
                    <div className="bg-mid"></div>

                    <Footer />
                </div>
            </div>
        </GuestLayout>
    );
}
