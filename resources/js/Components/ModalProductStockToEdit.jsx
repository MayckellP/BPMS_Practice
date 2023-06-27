import { useState } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ModalProductStockToEdit(props) {
    const { data, setData, patch, processing, errors, reset } = useForm({
        model: props.model,
        category: props.category,
        color: props.color,
        quantity: props.quantity,
    });

    const submit = (e) => {
        console.log(data);
        e.preventDefault();
        patch(route("stock.update", props.id));
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
                            {props.img == "NO" ? (
                                <img src={props.imgError} alt={props.infoImg} />
                            ) : (
                                <img
                                    src={`/images/3.warehouse_view/${props.img}`}
                                    alt={props.infoImg}
                                />
                            )}
                            <span>{props.category}</span>
                        </div>
                        <div className="cont-detail-product">
                            <form
                                onSubmit={submit}
                                encType="multipart/form-data"
                            >
                                <div className="d-flex w-100">
                                    <Form.Control
                                        type="text"
                                        className="form-product-quantity me-2 w-75 bg-white rounded-3 py-2 text-black "
                                        value={data.model}
                                        onChange={(e) =>
                                            setData("model", e.target.value)
                                        }
                                    />

                                    <Form.Control
                                        type="text"
                                        className="form-product-quantity me-2 w-75 bg-white rounded-3 py-2 text-black "
                                        value={data.category}
                                        onChange={(e) =>
                                            setData("category", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="d-flex w-100 mt-3">
                                    <div className="w-50">
                                        <Form.Control
                                            type="text"
                                            className="form-product-quantity me-2 mb-3 w-75 bg-white rounded-3 py-2 text-black "
                                            value={data.color}
                                            onChange={(e) =>
                                                setData("color", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="cont-quantity-btn mt-3">
                                    <div className="d-flex w-50">
                                        <Form.Control
                                            type="number"
                                            className="form-product-quantity me-2 w-50 bg-white rounded-3 py-0 text-black "
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
                                        className="btn-addCart bg-success"
                                    >
                                        Save Changes
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

export default ModalProductStockToEdit;
