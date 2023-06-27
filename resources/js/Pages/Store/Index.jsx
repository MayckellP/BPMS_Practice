import { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Table from "react-bootstrap/Table";
import ButonCreate from "@/Components/ButtonCreate";

export default function Dashboard({ auth, myCart }) {
    //-------------------------------FUNCTION TO SHOW ORDERS IN TABLE (JAVASSCRIPT / HTML)
    console.log("My Carts: ", myCart);
    const showCarts = myCart.map((item) => (
        <tr key={item.id}>
            <td>{item.product}</td>
            <td>{item.quantity}</td>
            <td className="text-center">
                {
                    <ButonCreate
                        title="Edit"
                        styleBtn="w-50 bg-info"
                        styleLink="fs-6 text-black fw-bold text-decoration-none"
                        link={route("orders.edit", item.id)}
                    />
                }
            </td>
            {JSON.parse(sessionStorage.getItem("currentUser")).rolename ===
                "Administrador" && (
                <td className="text-center">
                    <Link
                        className="text-decoration-none"
                        href={route("orders.destroy", item.id)}
                        method="delete"
                        as="button"
                    >
                        <Button className="text-white fw-bold border-0 p-1 px-2 fs-4 bg-danger">
                            Delete
                        </Button>
                    </Link>
                </td>
            )}
            {JSON.parse(sessionStorage.getItem("currentUser")).rolename ===
                "Supervisor" && (
                <td className="text-center">
                    <Link
                        className="fs-4 text-white fw-bold text-decoration-none bg-danger"
                        href={route("orders.destroy", item.id)}
                        method="delete"
                        as="button"
                    >
                        Delete
                    </Link>
                </td>
            )}
        </tr>
    ));
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    CART
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="d-flex justify-between align-items-center m-3">
                                <h2>My Cart</h2>
                                <ButonCreate
                                    title="Add to Cart"
                                    styleBtn=" rounded-5 bg-success w-25 border-0"
                                    styleLink="text-white fw-bold text-decoration-none fs-5"
                                    link={route("store.create")}
                                />
                            </div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Order</th>
                                        <th>Quantity</th>
                                        <th colSpan={2} className="text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>{showCarts}</tbody>
                            </Table>
                        </div>
                        <div className="mx-4 mb-3">
                            <ButonCreate
                                title="Create Order"
                                styleBtn=" rounded-5 bg-dark w-25 border-0 shadow"
                                styleLink="text-white fw-bold text-decoration-none fs-5"
                                link={"store/order"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
