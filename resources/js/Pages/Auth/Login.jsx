import { useEffect, useState } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { FloatingLabel, Form } from "react-bootstrap";
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

    const [valuePDF, setValuePDF] = useState("Hi");
    const activeBtnToDownload = (e) => {
        var btnDownload = document.getElementById("btn-dwnld");
        if (e.target.value === "") {
            btnDownload.style.display = "none";
        } else {
            btnDownload.style.display = "inherit";
            btnDownload.style.color = "green";
            btnDownload.style.opacity = "100%";
            setValuePDF(e.target.value);
        }
    };
    const downloadGuide = () => {
        const link = document.createElement("a");
        const urlFile = valuePDF;
        link.href = urlFile;
        link.setAttribute("download", "Guide_to_use_App");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
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
                            <div className="guide-app">
                                <Form.Select
                                    type="select"
                                    aria-label="FloatingModel"
                                    className="w-75 bg-secondary bg-white shadow-md text-black rounded-3 "
                                    onChange={activeBtnToDownload}
                                >
                                    <option value="">Download guide</option>
                                    <option
                                        value={
                                            "/guideToUseApp/Nutzung_und_Funktionalität_des_Projekts-DE.pdf"
                                        }
                                    >
                                        German
                                    </option>
                                    <option
                                        value={
                                            "/guideToUseApp/Use_and_functionality_of_the_project-EN.pdf"
                                        }
                                    >
                                        English
                                    </option>
                                    <option
                                        value={
                                            "/guideToUseApp/Uso_y_funcionalidad_del_proyecto-ES.pdf"
                                        }
                                    >
                                        Spanish
                                    </option>
                                </Form.Select>
                                <div className="btn-download">
                                    <a
                                        href="#"
                                        id="btn-dwnld"
                                        onClick={downloadGuide}
                                    >
                                        <i className="bi bi-arrow-down-circle-fill"></i>
                                    </a>
                                </div>
                            </div>
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
