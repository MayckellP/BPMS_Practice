import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import ButonCreate from "@/Components/ButtonCreate";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Index({ auth, users, relation, roles }) {
    console.log("UserId Current: ", auth.user.id);
    console.log("Users: ", users.data);
    console.log("Roles: ", roles);
    console.log("Relation: ", relation);
    var rolesArray = [""];
    var countRole = 0;
    var currentUser = {};

    users.data.map((item) => {
        relation.map((relationItem) => {
            if (relationItem.model_id === item.id) {
                roles.map((type) => {
                    if (type.id === relationItem.role_id) {
                        console.log("Usuario con Role: ", type.name);
                        rolesArray.push(type.name);
                    }
                });
            }
        });
    });

    return (
        <AuthenticatedLayout user={auth.user} header={"Users"}>
            <Head title="Users" />

            <div className="cont-global-users">
                <div className="cont-btns-users">
                    {JSON.parse(sessionStorage.getItem("currentUser"))
                        .rolename === "Administrador" && (
                        <ButonCreate
                            styleBtn="w-50 m-1"
                            styleLink="fs-4 text-white fw-bold text-decoration-none"
                            title="Create User"
                            link={route("users.create")}
                        />
                    )}

                    {JSON.parse(sessionStorage.getItem("currentUser"))
                        .rolename === "Administrador" && (
                        <ButonCreate
                            styleBtn="w-50 m-1 bg-warning border-0"
                            styleLink="fs-4 text-white fw-bold text-decoration-none"
                            title="Show Roles"
                            link={route("roles.index")}
                        />
                    )}
                </div>
                <div className="cont-user-table">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th className="email-mobile">Email</th>
                                <th>Role</th>
                                <th colSpan={2} className="text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td className="email-mobile">
                                        {item.email}
                                    </td>
                                    <td>{rolesArray[item.id]}</td>
                                    <td className="text-center p-1">
                                        {
                                            <ButonCreate
                                                title="Edit"
                                                styleBtn="w-100 bg-success border-0 p-1"
                                                styleLink="fs-md text-white fw-bold text-decoration-none"
                                                link={route(
                                                    "users.edit",
                                                    item.id
                                                )}
                                            />
                                        }
                                    </td>
                                    <td className="text-center p-1">
                                        <Link
                                            className="text-decoration-none"
                                            href={route(
                                                "users.destroy",
                                                item.id
                                            )}
                                            method="delete"
                                            as="button"
                                        >
                                            <Button className="text-white fw-bold border-0 p-1 px-2 fs-md bg-danger">
                                                Delete
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>

            {/* <div className="py-12">
                <div className="max-w-10xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 d-flex justify-content-between w-100">
                        </div>
                        <div className="p-6 text-gray-900 ">
                            
                        </div>
                    </div>
                </div>
            </div> */}
        </AuthenticatedLayout>
    );
}
