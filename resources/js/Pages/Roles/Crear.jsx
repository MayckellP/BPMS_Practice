import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import InputError from "@/Components/InputError";
import Button from "react-bootstrap/Button";

export default function Crear({ auth, permission }) {
    console.log(typeof permission);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        permission: [],
    });
    const submit = (e) => {
        console.log(data);
        e.preventDefault();
        post(route("roles.store"), { onSuccess: () => reset() });
    };

    const btnRole = (role) => {
        permission.map((item) => {
            document.getElementById(item.name).checked = false;
        });
        data.permission = [];
        data.name = "";
        if (role.target.id === "Admin") {
            permission.map((item) => {
                document.getElementById(item.name).checked = true;
                data.permission.push([item.name]);
            });
            document.getElementById("title-form").value = "Administrador";
            data.name = "Administrador";
        } else if (role.target.id === "Client") {
            document.getElementById("show-order").checked = true;
            document.getElementById("create-order").checked = true;
            document.getElementById("edit-order").checked = true;
            document.getElementById("delete-order").checked = true;
            data.permission.push(
                ["show-order"],
                ["create-order"],
                ["edit-order"],
                ["delete-order"]
            );
            document.getElementById("title-form").value = "Client";
            data.name = "Client";
        } else if (
            role.target.id === "Sale Employee" ||
            role.target.id === "Sale Manager"
        ) {
            document.getElementById("show-order-sale").checked = true;
            document.getElementById("create-order-sale").checked = true;
            document.getElementById("edit-order-sale").checked = true;
            document.getElementById("delete-order-sale").checked = true;
            data.permission.push(
                ["show-order-sale"],
                ["create-order-sale"],
                ["edit-order-sale"],
                ["delete-order-sale"]
            );
            document.getElementById("title-form").value = "Seller";
            data.name = "Seller";
        } else if (
            role.target.id === "Warehouse Manager" ||
            role.target.id === "Warehouse Employee"
        ) {
            document.getElementById("show-stock").checked = true;
            document.getElementById("create-stock").checked = true;
            document.getElementById("edit-stock").checked = true;
            document.getElementById("delete-stock").checked = true;
            data.permission.push(
                ["show-stock"],
                ["create-stock"],
                ["edit-stock"],
                ["delete-stock"]
            );
            document.getElementById("title-form").value = "Warehouse";
            data.name = "Warehouse";
        } else if (
            role.target.id === "Production Manager" ||
            role.target.id === "Production Employee"
        ) {
            document.getElementById("goTo_dept_production").checked = true;
            document.getElementById(
                "goTo_dept_production_register"
            ).checked = true;
            data.permission.push(
                ["goTo_dept_production"],
                ["goTo_dept_production_register"]
            );
            document.getElementById("title-form").value = "Production Manager";
            data.name = "Production Manager";
        } else if (role.target.id === "Logistic Manager") {
            document.getElementById("goTo_dept_logistic").checked = true;
            document.getElementById(
                "goTo_dept_logistic_register"
            ).checked = true;
            data.permission.push(
                ["goTo_dept_logistic"],
                ["goTo_dept_logistic_register"]
            );
            document.getElementById("title-form").value = "Logistic Manager";
            data.name = "Logistic Manager";
        } else if (role.target.id === "Logistic Employee") {
            document.getElementById(
                "goTo_dept_logistic_employee"
            ).checked = true;
            document.getElementById(
                "goTo_dept_logistic_register_employee"
            ).checked = true;
            data.permission.push(
                ["goTo_dept_logistic_employee"],
                ["goTo_dept_logistic_register_employee"]
            );
            document.getElementById("title-form").value = "Logistic Employee";
            data.name = "Logistic Employee";
        }
    };
    return (
        <AuthenticatedLayout user={auth.user} header={"Create Roles"}>
            <Head title="Roles" />

            <div className="cont-global-roles">
                <form onSubmit={submit} className="form-roles">
                    <div className="mb-4">
                        <FloatingLabel label="Role name" className="mb-0">
                            <Form.Control
                                type="text"
                                className="form-title"
                                id="title-form"
                                value=""
                                disabled
                            />
                        </FloatingLabel>
                        <InputError message={errors.name} className="mt-2" />
                        <div className="cont-cardRoles row row-cols-1 row-cols-md-2 g-4 pb-4">
                            <div
                                className="cont-department bg-gradient"
                                style={{ backgroundColor: "darkcyan" }}
                            >
                                <h4>Special Roles</h4>
                                <div className="d-flex">
                                    <div
                                        className="cont-manager"
                                        onClick={btnRole}
                                    >
                                        <span>Client</span>
                                        <img
                                            id="Client"
                                            src="/images/0.log_view/Client-role.svg"
                                            alt="Client_Role"
                                        />
                                    </div>
                                    <div
                                        className="cont-employee"
                                        onClick={btnRole}
                                    >
                                        <span>Admin</span>
                                        <img
                                            id="Admin"
                                            src="/images/0.log_view/Admin.svg"
                                            alt="Client_Role"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="cont-department bg-danger bg-gradient">
                                <h4>Sale Department</h4>
                                <div className="d-flex">
                                    <div
                                        className="cont-manager"
                                        onClick={btnRole}
                                    >
                                        <span>Manager</span>
                                        <img
                                            id="Sale Manager"
                                            src="/images/0.log_view/Manager.svg"
                                            alt="Client_Role"
                                        />
                                    </div>
                                    <div
                                        className="cont-employee"
                                        onClick={btnRole}
                                    >
                                        <span>Employee</span>
                                        <img
                                            id="Sale Employee"
                                            src="/images/0.log_view/Employees.svg"
                                            alt="Client_Role"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="cont-department bg-secondary bg-gradient">
                                <h4>Warehouse Department</h4>
                                <div className="d-flex">
                                    <div
                                        className="cont-manager"
                                        onClick={btnRole}
                                    >
                                        <span>Manager</span>
                                        <img
                                            id="Warehouse Manager"
                                            src="/images/0.log_view/Manager.svg"
                                            alt="Client_Role"
                                        />
                                    </div>
                                    <div
                                        className="cont-employee"
                                        onClick={btnRole}
                                    >
                                        <span>Employee</span>
                                        <img
                                            id="Warehouse Employee"
                                            src="/images/0.log_view/Employees.svg"
                                            alt="Client_Role"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="cont-department bg-success bg-gradient">
                                <h4>Production Department</h4>
                                <div className="d-flex">
                                    <div
                                        className="cont-manager"
                                        onClick={btnRole}
                                    >
                                        <span>Manager</span>
                                        <img
                                            id="Production Manager"
                                            src="/images/0.log_view/Manager.svg"
                                            alt="Client_Role"
                                        />
                                    </div>
                                    <div
                                        className="cont-employee"
                                        onClick={btnRole}
                                    >
                                        <span>Employee</span>
                                        <img
                                            id="Production Employee"
                                            src="/images/0.log_view/Employees.svg"
                                            alt="Client_Role"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="cont-department bg-dark bg-gradient">
                                <h4>Logistic Department</h4>
                                <div className="d-flex">
                                    <div
                                        className="cont-manager"
                                        onClick={btnRole}
                                    >
                                        <span>Manager</span>
                                        <img
                                            id="Logistic Manager"
                                            src="/images/0.log_view/Manager.svg"
                                            alt="Client_Role"
                                        />
                                    </div>
                                    <div
                                        className="cont-employee"
                                        onClick={btnRole}
                                    >
                                        <span>Employee</span>
                                        <img
                                            id="Logistic Employee"
                                            src="/images/0.log_view/Employees.svg"
                                            alt="Client_Role"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {permission.map((type) => (
                            <div key={type.id} className="mb-3" hidden>
                                <Form.Check // prettier-ignore
                                    type="checkbox"
                                    id={type.name}
                                    label={type.name}
                                    value={type.name}
                                />
                            </div>
                        ))}
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <Button type="submit" className="btn-roles">
                        Create Role
                    </Button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
