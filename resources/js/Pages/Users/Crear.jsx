import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputError from "@/Components/InputError";
import Button from "react-bootstrap/Button";

export default function Crear({ auth, roles }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        roles: "",
        area: "",
        job_position: "",
        address: "",
        phone: "",
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("users.store"), { onSuccess: () => reset() });
    };
    const validatePhone = (e) => {
        const regex = /^[0-9]+$/;
        if (regex.test(e.target.value)) {
            setData("phone", e.target.value);
        } else {
            setData("phone", " ");
        }
    };
    return (
        <AuthenticatedLayout user={auth.user} header={"Create users"}>
            <Head title="Users" />

            <div className="p-1">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="">
                            {/* ---------------------------------------------------------------------FORM TO CREATE USER */}
                            <form
                                onSubmit={submit}
                                method="post"
                                className="text-center"
                            >
                                <div className="d-flex">
                                    <div className="w-50 p-3">
                                        <h3>New User</h3>
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
                                            className="mb-3"
                                        >
                                            <Form.Select
                                                type="select"
                                                aria-label="Floating label select example"
                                                className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                                onChange={(e) =>
                                                    setData(
                                                        "roles",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option>Role</option>
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
                                        <h3>Position</h3>
                                        <FloatingLabel
                                            controlId="floatingSelectArea"
                                            className="mb-3"
                                        >
                                            <Form.Select
                                                type="select"
                                                aria-label="Floating label select example"
                                                className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                                onChange={(e) =>
                                                    setData(
                                                        "area",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option>Area</option>
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
                                            className="mb-3"
                                        >
                                            <Form.Select
                                                type="select"
                                                aria-label="Floating label select example"
                                                className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                                onChange={(e) =>
                                                    setData(
                                                        "job_position",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option>Job Position</option>
                                                <option value={"supervisor"}>
                                                    Supervisor
                                                </option>
                                                <option value={"employee"}>
                                                    Employee
                                                </option>
                                            </Form.Select>
                                        </FloatingLabel>

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
                                                onChange={validatePhone}
                                                required
                                            />
                                        </FloatingLabel>
                                        <InputError
                                            message={errors.phone}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className=" w-100 m-auto">
                                    <Button
                                        type="submit"
                                        className="mt-2 w-50 fs-5 bg-success fw-bold border-success"
                                    >
                                        Create User
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
