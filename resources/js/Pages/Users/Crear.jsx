import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputError from "@/Components/InputError";
import Button from "react-bootstrap/Button";

export default function Crear({ auth, roles }) {
    console.log(roles);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        roles: "",
        foto: "",
        area: "",
        job_position: "",
        address: "",
        phone: "",
    });
    const submit = (e) => {
        console.log(data);
        e.preventDefault();
        post(route("users.store"), { onSuccess: () => reset() });
    };
    return (
        <AuthenticatedLayout user={auth.user} header={"Create users"}>
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form
                                onSubmit={submit}
                                method="post"
                                className="text-center"
                            >
                                <div className="d-flex">
                                    <div className="w-50 p-3">
                                        <h3>User Form</h3>
                                        <FloatingLabel
                                            controlId="floatingName"
                                            label="Name"
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
                                        <InputError
                                            message={errors.name}
                                            className="mt-2"
                                        />

                                        <FloatingLabel
                                            controlId="floatingEmail"
                                            label="Email"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="email"
                                                className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </FloatingLabel>
                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />

                                        <FloatingLabel
                                            controlId="floatingPassword"
                                            label="Password"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="password"
                                                aria-label="Floating label select example"
                                                className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </FloatingLabel>
                                        <InputError
                                            message={errors.password}
                                            className="mt-2"
                                        />

                                        <FloatingLabel
                                            controlId="floatingPasswordConfirm"
                                            label="Password"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="password"
                                                aria-label="Floating label select example"
                                                className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                                value={
                                                    data.password_confirmation
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </FloatingLabel>
                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                            className="mt-2"
                                        />

                                        <FloatingLabel
                                            controlId="floatingSelect"
                                            label="Roles"
                                            className="mb-3"
                                        >
                                            <Form.Select
                                                type="select"
                                                aria-label="Floating label select example"
                                                className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                                onClick={(e) =>
                                                    setData(
                                                        "roles",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                {roles.map((item) => (
                                                    <option
                                                        key={item.id}
                                                        value={item.name}
                                                    >
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </div>
                                    <div className="w-50 p-3 ">
                                        <h3>Employee's data</h3>
                                        <FloatingLabel
                                            controlId="floatingSelectArea"
                                            label="Area"
                                            className="mb-3"
                                        >
                                            <Form.Select
                                                type="select"
                                                aria-label="Floating label select example"
                                                className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                                onClick={(e) =>
                                                    setData(
                                                        "area",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option
                                                    value={"sales_department"}
                                                >
                                                    Sales Department
                                                </option>
                                                <option
                                                    value={
                                                        "production_department"
                                                    }
                                                >
                                                    Production Department
                                                </option>
                                                <option
                                                    value={
                                                        "warehouse_department"
                                                    }
                                                >
                                                    Warehouse
                                                </option>
                                                <option
                                                    value={
                                                        "logistic_department"
                                                    }
                                                >
                                                    Logistic Department
                                                </option>
                                            </Form.Select>
                                        </FloatingLabel>

                                        <FloatingLabel
                                            controlId="floatingSelectArea"
                                            label="Job position"
                                            className="mb-3"
                                        >
                                            <Form.Select
                                                type="select"
                                                aria-label="Floating label select example"
                                                className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                                onClick={(e) =>
                                                    setData(
                                                        "job_position",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value={"supervisor"}>
                                                    Supervisor
                                                </option>
                                                <option value={"employee"}>
                                                    Employee
                                                </option>
                                            </Form.Select>
                                        </FloatingLabel>

                                        <FloatingLabel
                                            controlId="floatingFoto"
                                            label="Foto"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="text"
                                                aria-label="Floating label select example"
                                                className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                                value={data.foto}
                                                onChange={(e) =>
                                                    setData(
                                                        "foto",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </FloatingLabel>
                                        <InputError
                                            message={errors.foto}
                                            className="mt-2"
                                        />

                                        <FloatingLabel
                                            controlId="floatingAddress"
                                            label="address"
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
                                                required
                                            />
                                        </FloatingLabel>
                                        <InputError
                                            message={errors.address}
                                            className="mt-2"
                                        />

                                        <FloatingLabel
                                            controlId="floatingPhone"
                                            label="Phone"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="text"
                                                aria-label="Floating label select example"
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
                                        <InputError
                                            message={errors.phone}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="w-75 m-auto">
                                    <Button type="submit" className="mt-2 w-75">
                                        GENERATE USER
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
