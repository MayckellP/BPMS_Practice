import { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdateCompanyLogo({ className = "" }) {
    const [logo, setLogo] = useState(null);

    const roleName = JSON.parse(sessionStorage.getItem("currentUser")).rolename;
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            logo: "",
            id: user.id,
        });

    const showLogo = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const imgUrl = reader.result;
            setLogo(imgUrl);
            console.log(event.target.files);
        };

        reader.readAsDataURL(file);
        setData("logo", file);
    };

    const submit = (e) => {
        e.preventDefault();
        console.log(data);

        post(route("profile.addImage"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Company Logo
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's as Company logo.
                </p>
            </header>

            <form
                onSubmit={submit}
                className="mt-6 space-y-6"
                encType="multipart/form-data"
            >
                <div>
                    <label htmlFor="logo">Company Logo</label>
                    <input
                        type="file"
                        id="logo"
                        className="mt-1 block w-full"
                        onChange={showLogo}
                    />
                </div>

                {logo && <img src={logo} className="cont-foto-logo"></img>}
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
