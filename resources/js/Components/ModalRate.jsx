import { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputError from "@/Components/InputError";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import moment from "moment";

function ModalRate(props) {
    const rating = [1, 2, 3, 4, 5];
    var Orderdata = props.data;

    if (Orderdata == undefined) {
        Orderdata = [""];
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { data, setData, post, processing, errors, reset } = useForm({
        order_id: "",
        rating: "",
    });

    const clicked = (e) => {
        setData("order_id", e.target.value);
        var dataShowed = e.target.value;

        Orderdata.map((itemData) => {
            if (itemData.id == dataShowed) {
                document.getElementById(
                    "detailOrder"
                ).innerHTML = `<b>Product: </b>${itemData.model}
                <br>
                <b>Quantity: </b>${itemData.quantity}
                <br>
                <b>Color: </b>${itemData.color}
                <br>
                <b>Date: </b>${moment(itemData.updated_at).format(
                    "YYYY-MM-DD"
                )}`;
            }
        });
    };

    const submit = (e) => {
        console.log("POST:  ", data);
        e.preventDefault();
        post(route("rateOrders.store"));
    };
    console.log(data);

    return (
        <>
            <Button
                onClick={handleShow}
                className={props.btn_class}
                style={{ width: "48%" }}
            >
                <div className={props.div_class}>
                    <span>{props.title}</span>
                    <img src={props.icon} alt={props.altIcon} />
                </div>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className={props.headerModal}>
                    <Modal.Title className={props.cont_titleModal}>
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
                    <form onSubmit={submit} className="w-100">
                        <div className="">
                            <FloatingLabel
                                controlId="floatingSelect"
                                className="mb-3"
                            >
                                <Form.Select
                                    type="select"
                                    aria-label="Floating label select example"
                                    className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                    onClick={clicked}
                                >
                                    <option disabled>Select Order</option>
                                    {Orderdata.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.model} / Quantity:{" "}
                                            {item.quantity}
                                        </option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>

                            <div className="p-1 py-3 border-2 mb-3 rounded-3">
                                <h5>
                                    <b>Order details:</b>
                                </h5>
                                <div id="detailOrder" className="px-2"></div>
                            </div>

                            <div className="mb-3">
                                <h6>Rating</h6>
                                <div className="mt-3 d-flex justify-around">
                                    {rating.map((type) => (
                                        <div key={type} className="mb-3">
                                            <Form.Check
                                                type="radio"
                                                name="rating"
                                                id={type}
                                                label={type}
                                                value={type}
                                                onChange={(e) =>
                                                    setData(
                                                        "rating",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            onClick={handleClose}
                            className="btn-rate"
                        >
                            Generate Rating
                        </Button>
                        {/*  <Button
                            onClick={handleClose}
                            className="bg-danger border-0"
                        >
                            Cancel
                        </Button> */}
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalRate;
