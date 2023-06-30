import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputError from "@/Components/InputError";
import Button from "react-bootstrap/Button";

export default function Crear({ auth, permission, rolePermission, role }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: role.name,
        permission: [],
    });
    const submit = (e) => {
        e.preventDefault();
        put(route("roles.update", role.id), { onSuccess: () => reset() });
    };
    const saveData = (e) => {
        setData("name", e.target.value);
    };

    const checked = (e) => {
        if (e.target.checked) {
            data.permission.push([e.target.value]);
        } else {
            console.log("false");
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Roles
                </h2>
            }
        >
            <Head title="Roles" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div className="">
                                    <FloatingLabel
                                        controlId="floatingName"
                                        label="Name"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="text"
                                            className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                            value={data.name}
                                            onChange={saveData}
                                            required
                                        />
                                    </FloatingLabel>
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />

                                    <div className="d-flex w-100">
                                        <div className="w-50 ">
                                            <h2>Assign Role</h2>
                                            {permission.map((type) => (
                                                <div
                                                    key={type.id}
                                                    className="mb-3"
                                                >
                                                    <Form.Check // prettier-ignore
                                                        type="checkbox"
                                                        id={type.name}
                                                        label={type.name}
                                                        value={type.name}
                                                        onClick={checked}
                                                    />
                                                </div>
                                            ))}
                                            <InputError
                                                message={errors.email}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div>
                                            <h2>Current Roles</h2>
                                            {permission.map((type) => (
                                                <div
                                                    key={type.id}
                                                    className="mb-2"
                                                >
                                                    {rolePermission[type.id] ===
                                                        type.id && (
                                                        <span className="">
                                                            - {type.name}
                                                        </span>
                                                    )}
                                                    {/* {rolePermission.map(
                                                        (item) => (
                                                            <div>

                                                            </div>
                                                        )
                                                    )} */}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <Button type="submit" className="mt-2">
                                    Create Role
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
