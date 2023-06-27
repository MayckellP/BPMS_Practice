import { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputError from "@/Components/InputError";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Dashboard({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        phone: "",
        address: "",
        logo: "",
    });
    const submit = (e) => {
        console.log("POST:  ", data);
        e.preventDefault();
        post(route("clients.store"));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Company Register
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2>Bienvenido!</h2>
                            <p>
                                Al ser un usuario nuevo, porfavor rellene el
                                siguiente formulario sobre su emppresa:{" "}
                            </p>
                            <div className="w-50">
                                <form onSubmit={submit}>
                                    <div className="">
                                        <FloatingLabel
                                            controlId="floatingName"
                                            label="Company Name"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="text"
                                                className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </FloatingLabel>

                                        <FloatingLabel
                                            controlId="floatingEmail"
                                            label="Phone"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="number"
                                                className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                                value={data.phone}
                                                onChange={(e) =>
                                                    setData(
                                                        "phone",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </FloatingLabel>

                                        <FloatingLabel
                                            controlId="floatingPassword"
                                            label="Comapny address"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="text"
                                                aria-label="Floating label select example"
                                                className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                                value={data.address}
                                                onChange={(e) =>
                                                    setData(
                                                        "address",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </FloatingLabel>

                                        <FloatingLabel
                                            controlId="floatingPasswordConfirm"
                                            label="Logo"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="text"
                                                aria-label="Floating label select example"
                                                className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                                value={data.logo}
                                                onChange={(e) =>
                                                    setData(
                                                        "logo",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </FloatingLabel>
                                    </div>
                                    <Button type="submit" className="mt-2">
                                        Confirm Company
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
