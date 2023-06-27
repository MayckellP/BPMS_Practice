import { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputError from "@/Components/InputError";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Crear({ auth, stock, filterStock }) {
    useEffect(() => {}, []);

    console.log("Filtro: ", filterStock);
    const { data, setData, post, processing, errors, reset } = useForm({
        model: "",
        category: "",
        color: "",
        quantity: "",
        image: "NO",
    });

    const clicked = (e) => {
        setData("model", e.target.value);
    };

    const productsColors = [];
    var imgReference;
    stock.map((item) => {
        if (data.model === item.model) {
            productsColors.push({
                color: item.color,
            });
            data.category = item.category;
            imgReference = item.image;
        }
    });

    const submit = (e) => {
        console.log(data);
        e.preventDefault();
        var content = document.getElementById("content-product");
        var allOk = document.getElementById("all-ok");
        var infoContent = document.getElementById("info-content");
        var infoConfirmed = document.getElementById("info-confirmed");

        content.className = "hidden";
        content.style.display = "none";

        allOk.style.display = "inherit";
        allOk.className = "visible";

        infoContent.className = "hiddenMobile";
        infoContent.style.display = "none";

        infoConfirmed.style.display = "inherit";
        infoConfirmed.className = "visibleMobile";

        const timer = setTimeout(() => {
            post(route("orders.store"));
        }, 1500);
        return () => clearTimeout(timer);
    };

    return (
        <AuthenticatedLayout user={auth.user} header={"Quick Purchase"}>
            <Head title="Order" />

            <div className="orderNow-cont-global">
                <div className="orderNow-cont-left">
                    <Link href={route("orders.index")}>
                        <PrimaryButton className="btn-home border-0">
                            <img
                                src="/images/icons/arrow_left.svg"
                                alt="generate_order"
                            />

                            <span>HOME </span>
                        </PrimaryButton>
                    </Link>

                    <form onSubmit={submit} className="form-order">
                        <h2>ORDER NOW!</h2>
                        <Form.Control
                            type="hidden"
                            value={data.referenceClient}
                            onChange={(e) =>
                                setData("referenceClient", e.target.value)
                            }
                            required
                        />
                        <Form.Control
                            type="hidden"
                            value={data.referenceOrder}
                            onChange={(e) =>
                                setData("referenceOrder", e.target.value)
                            }
                        />

                        <div className="cont-selects">
                            <FloatingLabel
                                controlId="floatingSelect"
                                style={{ width: "49%" }}
                            >
                                <Form.Select
                                    type="select"
                                    aria-label="FloatingModel"
                                    className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                    onClick={clicked}
                                    required
                                >
                                    <option>Select Product</option>
                                    {filterStock.map((item, id) => (
                                        <option key={id} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>

                            <FloatingLabel
                                controlId="floatingSelect"
                                style={{ width: "49%" }}
                            >
                                <Form.Select
                                    aria-label="Floating label select example"
                                    className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                    onClick={(e) =>
                                        setData("color", e.target.value)
                                    }
                                    required
                                >
                                    <option>Select Color</option>
                                    {productsColors.map((item) => (
                                        <option
                                            key={item.color}
                                            value={item.color}
                                        >
                                            {item.color}
                                        </option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                        </div>

                        <div className="mt-4">
                            <FloatingLabel
                                controlId="floatingQuantity"
                                label="Quantity"
                                className="label-quantity mb-3 text-black d-flex align-items-center"
                            >
                                <Form.Control
                                    type="number"
                                    className="form-order-input me-2 bg-white rounded-3 text-black"
                                    style={{ width: "30%" }}
                                    value={data.quantity}
                                    placeholder="0"
                                    onChange={(e) =>
                                        setData("quantity", e.target.value)
                                    }
                                    required
                                />
                                <span className="quantity-order">PCS</span>
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingComment"
                                label="Comment"
                            >
                                <Form.Control
                                    as="textarea"
                                    className="form-order-input bg-white rounded-3 text-black"
                                    style={{
                                        height: "150px",
                                        maxHeight: "230px",
                                        minHeight: "100px",
                                    }}
                                    value={data.observation}
                                    onChange={(e) =>
                                        setData("observation", e.target.value)
                                    }
                                />
                            </FloatingLabel>
                        </div>
                        <Button type="submit" className="btn-generate-orderNow">
                            GENERATE ORDER
                        </Button>
                        <span className="info-orderNow" id="info-content">
                            If you need something more specific, please contact
                            a Business Advisor.
                        </span>
                        <span
                            className="info-orderNow-confirmed"
                            id="info-confirmed"
                        >
                            ORDER PROCESSED!
                        </span>
                    </form>
                </div>

                <div className="orderNow-cont-right">
                    <div className="cont-product-orderNow" id="content-product">
                        {stock.map((item, id) =>
                            data.model == item.model &&
                            data.color == item.color ? (
                                <img
                                    src={`/images/3.warehouse_view/${item.image}`}
                                    alt={item.model}
                                />
                            ) : (
                                ""
                            )
                        )}
                    </div>
                    <div className="order-OK" id="all-ok">
                        <img src="/images/icons/OK.svg" alt="generate_order" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
