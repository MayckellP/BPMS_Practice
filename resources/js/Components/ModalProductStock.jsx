import { useState } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ModalProductStock(props) {
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
                        <div className="cont-detailStock-product">
                            <h2>{props.model}</h2>
                            <span className="info-cardStock">
                                {props.category}
                            </span>
                            <p>{props.quantity} PCS</p>
                            <div className="cont-colorStock">
                                <div
                                    className="colorStock"
                                    style={{ backgroundColor: props.color }}
                                ></div>
                                <span>{props.color}</span>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalProductStock;
