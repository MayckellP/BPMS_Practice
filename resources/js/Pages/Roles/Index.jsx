import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import ButonCreate from "@/Components/ButtonCreate";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

export default function Index({ auth, roles, permisos }) {
    const rolesArray = roles;
    console.log("Roles: ", rolesArray);
    console.log("permisos: ", permisos);

    const showRoles = rolesArray.data.map((item) => (
        <tr key={item.id}>
            <td>{item.name}</td>
            {/* <td className="text-center">
                {
                    <ButonCreate
                        title="Edit"
                        styleBtn="w-75 bg-success rounded-5"
                        styleLink="fs-lg  text-white fw-bold text-decoration-none"
                        link={route("roles.edit", item.id)}
                    />
                }
            </td> */}
            <td className="text-center">
                <Link
                    className="text-decoration-none w-75"
                    href={route("roles.destroy", item.id)}
                    method="delete"
                    as="button"
                >
                    <Button className="text-white fw-bold border-0 w-100 fs-lg bg-danger rounded-5">
                        Delete
                    </Button>
                </Link>
            </td>
        </tr>
    ));
    return (
        <AuthenticatedLayout user={auth.user} header={"Roles"}>
            <Head title="Roles" />

            <div className="p-5">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-2 text-gray-900">
                            <ButonCreate
                                title="Create Roles"
                                styleBtn="w-50 rounded-2 bg-warning border-warning"
                                styleLink="text-decoration-none fw-bold fs-3 text-white "
                                link={route("roles.create")}
                            />
                        </div>
                        <div className="p-0 m-1 text-gray-900 ">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th className="text-center">Role</th>
                                        <th colSpan={2} className="text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>{showRoles}</tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
