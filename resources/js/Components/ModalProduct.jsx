import { useState } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ModalProduct(props) {
    const roleName = JSON.parse(sessionStorage.getItem("currentUser")).rolename;
    const { data, setData, post, processing, errors, reset } = useForm({
        model: props.model,
        category: props.category,
        color: "",
        quantity: "",
        image: props.img,
        auxiliar_user: "",
    });

    const clicked = (e) => {
        setData("color", e.target.value);
    };

    const productsColors = [];
    var imgReference;
    props.stockColor.map((item) => {
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
        post(route("store.store"));
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button onClick={handleShow} className={props.btn_class}>
                <div className={props.div_class}>
                    <span>{props.title}</span>
                    <img src={props.icon} alt={props.altIcon} />
                </div>
            </Button>

            <Modal show={show} onHide={handleClose} dialogClassName="my-modal">
                <Modal.Header className={props.headerModal}>
                    <Modal.Title>
                        <img
                            src={props.logoModal}
                            alt={props.altLogo}
                            className={props.img_class}
                        />
                    </Modal.Title>
                    <span className={props.slogan_class}>
                        {props.sloganContent}
                    </span>
                </Modal.Header>

                <Modal.Body>
                    <div className="cont-product-detail">
                        <div className="cont-product-foto">
                            <img src={props.img} alt={props.infoImg} />
                            <span>{props.category}</span>
                        </div>
                        <div className="cont-detail-product">
                            <h2>{props.model}</h2>
                            <span className="info-card">
                                {props.infoProduct}
                            </span>
                            <form onSubmit={submit}>
                                <Form.Control
                                    type="hidden"
                                    value={data.category}
                                    onChange={(e) =>
                                        setData("category", e.target.value)
                                    }
                                />
                                <Form.Control
                                    type="hidden"
                                    value={data.model}
                                    onChange={(e) =>
                                        setData("model", e.target.value)
                                    }
                                />
                                <div>
                                    <p>Color:</p>
                                    <Form.Select
                                        aria-label="Floating label select example"
                                        className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0 mt-2"
                                        style={{ height: "2.5rem" }}
                                        onClick={clicked}
                                        required
                                    >
                                        <option>Select color</option>
                                        {productsColors.map((item) => (
                                            <option
                                                key={item.color}
                                                value={item.color}
                                            >
                                                {item.color}
                                            </option>
                                        ))}
                                    </Form.Select>

                                    {roleName === "Seller" && (
                                        <div>
                                            <p>Client:</p>
                                            <Form.Select
                                                aria-label="Floating label select example"
                                                className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0 mt-2"
                                                style={{ height: "2.5rem" }}
                                                onClick={(e) =>
                                                    setData(
                                                        "auxiliar_user",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option>Select Company</option>
                                                {props.clients.map((item) => (
                                                    <option
                                                        key={item.id}
                                                        value={item.user_id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </div>
                                    )}
                                </div>
                                <p>Quantity:</p>
                                <div className="cont-quantity-btn">
                                    <div className="d-flex w-50">
                                        <Form.Control
                                            type="number"
                                            className="form-product-quantity me-2 w-50 bg-white rounded-3 py-0 text-black "
                                            placeholder="0"
                                            value={data.quantity}
                                            onChange={(e) =>
                                                setData(
                                                    "quantity",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <span className="quantity-order">
                                            PCS
                                        </span>
                                    </div>
                                    <Button
                                        type="submit"
                                        onClick={handleClose}
                                        className="btn-addCart"
                                    >
                                        Add to cart
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalProduct;
