import { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputError from "@/Components/InputError";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import moment from "moment";

function ConfirmToProduceModal(props) {
    var Orderdata = props.dataOrder;
    var Employees = props.dataEmployees;

    if (Orderdata == undefined || Employees == undefined) {
        Orderdata = [""];
        Employees = [""];
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { data, setData, post, processing, errors, reset } = useForm({
        model: Orderdata.client.model,
        color: Orderdata.client.color,
        quantity: Orderdata.client.quantity,
        comment: "N/A",
        order_id: Orderdata.client.order_id,
        id_employee: "",
        activity: "",
    });

    const submit = (e) => {
        console.log("POST:  ", data);
        e.preventDefault();
        post(route("track.store"));
    };
    const activities = ["task_1", "task_2", "task_3", "task_4"];
    return (
        <>
            <div onClick={handleShow} className={props.btn_class}>
                <span>{props.title}</span>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className={props.headerModal}>
                    <Modal.Title className={props.cont_titleModal}>
                        <img
                            src={props.logoModal}
                            alt={props.altLogo}
                            className={props.img_class}
                        />
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form onSubmit={submit} className="w-100">
                        <div className="w-100 d-flex justify-between">
                            <FloatingLabel
                                controlId="floatingColor"
                                className="mb-3"
                                style={{ width: "48%" }}
                            >
                                <Form.Control
                                    type="text"
                                    className="form-order-input bg-secondary w-100 bg-white border-none text-black rounded-3 py-0"
                                    value={data.model}
                                    onChange={(e) =>
                                        setData("model", e.target.value)
                                    }
                                    required
                                />
                            </FloatingLabel>

                            <FloatingLabel
                                controlId="floatingColor"
                                className="mb-3"
                                style={{ width: "48%" }}
                            >
                                <Form.Control
                                    type="text"
                                    className="form-order-input bg-secondary w-100 bg-white border-none text-black rounded-3 py-0"
                                    value={data.color}
                                    onChange={(e) =>
                                        setData("color", e.target.value)
                                    }
                                    required
                                />
                            </FloatingLabel>
                        </div>
                        <div className="w-100 d-flex align-items-center">
                            <FloatingLabel
                                controlId="floatingQuantity"
                                className="mb-3"
                                style={{ width: "30%" }}
                            >
                                <Form.Control
                                    type="number"
                                    className="form-order-input bg-secondary w-100 bg-white border-none text-black rounded-3 py-0"
                                    value={data.quantity}
                                    onChange={(e) =>
                                        setData("quantity", e.target.value)
                                    }
                                    required
                                />
                            </FloatingLabel>
                            <p className="ms-2 fs-3 fw-bold">PCS</p>
                        </div>
                        <FloatingLabel
                            controlId="floatingComment"
                            className="mb-3"
                            style={{ width: "100%", height: "8rem" }}
                        >
                            <Form.Control
                                type="text"
                                className="form-order-input d-flex align-items-baseline bg-secondary w-100 h-100 bg-white border-none text-black rounded-3 py-0"
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingSelect"
                            className="mb-3"
                        >
                            <Form.Select
                                type="select"
                                aria-label="Floating label select example"
                                className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                onChange={(e) =>
                                    setData("id_employee", e.target.value)
                                }
                            >
                                <option>Employee</option>
                                {Employees.map((employee, index) => (
                                    <option key={index} value={employee.id}>
                                        {employee.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingSelect"
                            className="mb-3"
                        >
                            <Form.Select
                                type="select"
                                aria-label="Floating label select example"
                                className="form-order-input w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                onChange={(e) =>
                                    setData("activity", e.target.value)
                                }
                            >
                                <option>Task</option>
                                {activities.map((task, index) => (
                                    <option key={index} value={task}>
                                        {task}
                                    </option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>

                        <div className="w-100 d-flex justify-end">
                            <Button
                                type="submit"
                                onClick={handleClose}
                                className="btn-rate"
                            >
                                Assign!
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ConfirmToProduceModal;
