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
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("clients.store"));
    };
    return (
        <AuthenticatedLayout user={auth.user} header={"Company Register"}>
            <Head title="Dashboard" />

            <div className="p-3">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2>Welcome!</h2>
                            <p>
                                If you are a new user, please fill in the
                                following form about your company. following
                                form about your company:
                            </p>
                            <div className="w-75">
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
