import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputError from "@/Components/InputError";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormCheck } from "react-bootstrap";

export default function Crear({
    auth,
    roles,
    user,
    userRole,
    company,
    employee,
}) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: user.name,
        email: user.email,
        password: "",
        password_confirmation: "",
        roles: "",
    });
    const submit = (e) => {
        e.preventDefault();
        put(route("users.update", user.id));
    };

    {
        /* ---------------------------------------------------------------------FUNCTION TO SHOW USERS INFO */
    }
    const dataUser = document.getElementById("dataUser");
    const showDataClient = () => {
        dataUser.innerHTML = `
        <div class="w-100 m-auto bg-dark p-2 py-3 rounded-3 shadow">
            <p class="w-100 p-2 mb-3 bg-white rounded-3 fw-bold"> ${company[0].name}</p>
            <p class="w-100 p-2 mb-3 bg-white rounded-3 fw-bold"> ${company[0].address}</p>
            <p class="w-100 p-2 mb-3 bg-white rounded-3 fw-bold"> ${company[0].phone}</p>
            <p class="w-100 p-2 mb-0 bg-white rounded-3 fw-bold"> ${company[0].logo}</p>
        </div>`;
    };

    const showDataEmployee = () => {
        dataUser.innerHTML = `
        <div class="w-100 m-auto bg-warning p-2 py-3 rounded-3 shadow">
            <p class="w-100 p-2 mb-3 bg-white rounded-3 fw-bold"> ${employee[0].name}</p>
            <p class="w-100 p-2 mb-3 bg-white rounded-3 fw-bold"> ${employee[0].address}</p>
            <p class="w-100 p-2 mb-3 bg-white rounded-3 fw-bold"> ${employee[0].phone}</p>
            <p class="w-100 p-2 mb-0 bg-white rounded-3 fw-bold"> ${employee[0].foto}</p>
        </div>`;
    };

    return (
        <AuthenticatedLayout user={auth.user} header={"Edit users"}>
            <Head title="Users" />

            <div className="cont-global-users">
                <div className="cont-user-edit">
                    <form onSubmit={submit} className="form-user-edit">
                        {/* ---------------------------------------------------------------------FORM TO EDIT USER */}
                        <h3 className="text-center">User Register</h3>
                        <div className="">
                            <FloatingLabel
                                controlId="floatingName"
                                className="mb-3"
                                label="Name"
                            >
                                <Form.Control
                                    type="text"
                                    className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                    placeholder="Name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />
                            </FloatingLabel>

                            <FloatingLabel
                                controlId="floatingEmail"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="email"
                                    className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />
                            </FloatingLabel>

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
                                        setData("password", e.target.value)
                                    }
                                />
                            </FloatingLabel>

                            <FloatingLabel
                                controlId="floatingPasswordConfirm"
                                label="Password"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="password"
                                    aria-label="Floating label select example"
                                    className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                />
                            </FloatingLabel>

                            <FloatingLabel
                                controlId="floatingSelect"
                                className="mb-3"
                            >
                                <Form.Select
                                    type="select"
                                    aria-label="Floating label select example"
                                    className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                    onClick={(e) =>
                                        setData("roles", e.target.value)
                                    }
                                >
                                    <option>Role</option>
                                    {roles.map((item) => (
                                        <option key={item.id} value={item.name}>
                                            {item.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                        </div>
                        <Button
                            type="submit"
                            className="mt-2 w-50 bg-success fw-bold border-success fs-5"
                        >
                            Save Changes
                        </Button>
                    </form>

                    <div className="cont-user-detail">
                        <div
                            className="m-auto w-100 d-flex justify-around
                         mb-1"
                        >
                            <Button
                                className="bg-dark border-dark fw-bold"
                                style={{ widht: "45%" }}
                                onClick={showDataClient}
                            >
                                Client's info
                            </Button>
                            <Button
                                className="bg-warning border-warning fw-bold"
                                style={{ widht: "45%" }}
                                onClick={showDataEmployee}
                            >
                                Employee's info
                            </Button>
                        </div>
                        <div id="dataUser" className="dataUser"></div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
