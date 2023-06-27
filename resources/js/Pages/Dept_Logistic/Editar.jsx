import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputError from "@/Components/InputError";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Crear({ auth, order }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        product: order.product,
        quantity: order.quantity,
        color: order.color,
    });
    const submit = (e) => {
        console.log(data);
        e.preventDefault();
        put(route("orders.update", order.id));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Order
                </h2>
            }
        >
            <Head title="Blogs" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div className="">
                                    <FloatingLabel
                                        controlId="floatingName"
                                        label="Product"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="text"
                                            className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                            value={data.product}
                                            onChange={(e) =>
                                                setData(
                                                    "product",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </FloatingLabel>

                                    <FloatingLabel
                                        controlId="floatingEmail"
                                        label="Quantity"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="number"
                                            className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                            value={data.quantity}
                                            onChange={(e) =>
                                                setData(
                                                    "quantity",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </FloatingLabel>

                                    <FloatingLabel
                                        controlId="floatingEmail"
                                        label="Color"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="text"
                                            className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                            value={data.color}
                                            onChange={(e) =>
                                                setData("color", e.target.value)
                                            }
                                            required
                                        />
                                    </FloatingLabel>
                                </div>
                                <Button type="submit" className="mt-2">
                                    Edit Order
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
