import { useState } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "react-bootstrap/Modal";
import { FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ModalProductDelivered(props) {
    const [image, setImage] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        order_id: props.id,
        receiver: "",
        foto_1: "",
    });

    const showImage = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const imgUrl = reader.result;
            setImage(imgUrl);
            console.log(event.target.files);
        };

        reader.readAsDataURL(file);
        setData("foto_1", file);
    };

    const submit = (e) => {
        console.log(data);
        e.preventDefault();
        post(route("deptLogistic.store"));
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button onClick={handleShow} className={props.btn_class}>
                <i className="bi bi-truck"></i>
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
                            {image && (
                                <img
                                    src={image}
                                    className="cont-newFoto-stock"
                                ></img>
                            )}
                        </div>
                        <div className="cont-detail-product">
                            <form
                                onSubmit={submit}
                                encType="multipart/form-data"
                            >
                                <div className="d-flex w-100">
                                    <FloatingLabel
                                        label="Model"
                                        className="w-100 me-2"
                                    >
                                        <Form.Control
                                            type="text"
                                            className="form-product-quantity me-2 w-100 bg-white rounded-3 py-2 text-black "
                                            value={props.model}
                                            disabled
                                        />
                                    </FloatingLabel>

                                    <FloatingLabel
                                        label="Color"
                                        className="w-100 ms-2"
                                    >
                                        <Form.Control
                                            type="text"
                                            className="form-product-quantity me-2 w-100 bg-white rounded-3 py-2 text-black "
                                            value={props.color}
                                            disabled
                                        />
                                    </FloatingLabel>
                                </div>

                                <div className="d-flex w-100 mt-3">
                                    <FloatingLabel
                                        label="Receiver"
                                        className="w-100 me-2"
                                    >
                                        <Form.Control
                                            type="text"
                                            className="form-product-quantity me-2 mb-3 w-75 bg-white rounded-3 py-2 text-black "
                                            value={data.receiver}
                                            onChange={(e) =>
                                                setData(
                                                    "receiver",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </FloatingLabel>

                                    <div className="d-flex w-100 ms-2">
                                        <input
                                            type="file"
                                            className="form-product-quantity me-2 w-75 bg-white rounded-3 py-0 text-black"
                                            onChange={showImage}
                                            id="foto"
                                            hidden
                                        />
                                        <label
                                            htmlFor="foto"
                                            className="mt-3 fs-4"
                                        >
                                            <i class="bi bi-camera-fill"> </i>
                                            Upload Photo!
                                        </label>
                                    </div>
                                </div>

                                <div className="cont-quantity-btn mt-3">
                                    <div className="d-flex w-50">
                                        <Form.Control
                                            type="number"
                                            className="form-product-quantity me-2 w-50 bg-white rounded-3 py-0 text-black "
                                            value={props.quantity}
                                            disabled
                                        />
                                        <span className="quantity-order">
                                            PCS
                                        </span>
                                    </div>
                                    <Button
                                        type="submit"
                                        onClick={handleClose}
                                        disabled={processing}
                                        className="btn-addCart bg-success"
                                    >
                                        Deliver Product
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

export default ModalProductDelivered;
