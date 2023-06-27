import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function RegisterDetail({
    auth,
    allCompleteTable,
    orderDetailID,
    employees,
}) {
    var identifier = "register";
    const orderDetail = [];
    console.log("TABLA COMPLETA: ", allCompleteTable);
    allCompleteTable.map((item) => {
        if (item.id == orderDetailID) {
            orderDetail.push(item);
        }
    });
    var sellerName;
    var produceName;
    var qualityName;
    var driverName;

    orderDetail.map((order) => {
        employees.map((employe) => {
            if (order.seller_id === employe.id) {
                sellerName = employe.name;
            }
        });
    });

    console.log("OrderDetail: ", orderDetail);
    console.log("Data employee: ", employees);
    return (
        <AuthenticatedLayout user={auth.user} header={"Register Details"}>
            <Head title="Register Details" />

            <div className="cont-global-registerDetails">
                <div className="cont-top">
                    <div className="cont-btn-back-regsterDetails">
                        <Link
                            href={route("stock.show", identifier)}
                            className="text-decoration-none"
                        >
                            <Button className="btn-backToRegister border-0">
                                <img
                                    src="/images/icons/arrow_left.svg"
                                    alt="generate_order"
                                />

                                <span>Back</span>
                            </Button>
                        </Link>
                    </div>
                    <div className="cont-title-details">
                        <span className="title-details">
                            {orderDetail[0].model}
                        </span>
                        <div className="cont-color-quantity">
                            <span className="color-details me-3">
                                {orderDetail[0].color}
                            </span>
                            <span className="quantity-details">
                                {orderDetail[0].quantity} PCS
                            </span>
                        </div>
                    </div>
                </div>
                <div className="cont-bot">
                    <div className="cont-banner-details">
                        <div className="cont-banner-img-title">
                            <img
                                src="/images/icons/sales_dept..svg"
                                alt="generate_order"
                            />
                            <h2>Order created</h2>
                        </div>

                        {orderDetail[0].confirmed === null ? (
                            <div className="w-75 d-flex align-items-center">
                                <Box sx={{ width: "90%" }}>
                                    <LinearProgress />
                                </Box>
                            </div>
                        ) : (
                            <div className="div-details-mmobile">
                                <div className="cont-details-banner">
                                    <div className="cont-details-left">
                                        <span className="mb-2">
                                            <b>Date: </b>
                                            {orderDetail[0].confirmed === null
                                                ? "--"
                                                : moment(
                                                      orderDetail[0].confirmed
                                                  ).format("YYYY-MM-DD")}
                                        </span>
                                        <span>
                                            <b>Seller: </b>
                                            {sellerName}
                                        </span>
                                    </div>
                                    <span>
                                        <b>Observation: </b>
                                        N/A
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="cont-banner-details">
                        <div className="cont-banner-img-title">
                            <img
                                src="/images/icons/production_dept..svg"
                                alt="generate_order"
                            />
                            <h2>Order produced</h2>
                        </div>

                        {orderDetail[0].date_to_produce === null ? (
                            <div className="w-75 d-flex align-items-center">
                                <Box sx={{ width: "90%" }}>
                                    <LinearProgress />
                                </Box>
                            </div>
                        ) : (
                            <div className="div-details-mmobile">
                                <div className="cont-details-banner">
                                    <div className="cont-details-left">
                                        <span className="mb-2">
                                            <b>Date: </b>
                                            {orderDetail[0].date_to_produce ===
                                            null
                                                ? "--"
                                                : moment(
                                                      orderDetail[0]
                                                          .date_to_produce
                                                  ).format("YYYY-MM-DD")}
                                        </span>
                                        <span>
                                            <b>Observation: </b>
                                            N/A
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="cont-banner-details">
                        <div className="cont-banner-img-title">
                            <img
                                src="/images/icons/quality_dept..svg"
                                alt="generate_order"
                            />
                            <h2>Order reviewed</h2>
                        </div>
                        {orderDetail[0].date_to_deliver === null ? (
                            <div className="w-75 d-flex align-items-center">
                                <Box sx={{ width: "90%" }}>
                                    <LinearProgress />
                                </Box>
                            </div>
                        ) : (
                            <div className="div-details-mmobile">
                                <div className="cont-details-banner">
                                    <div className="cont-details-left">
                                        <span className="mb-2">
                                            <b>Date: </b>
                                            {orderDetail[0].date_to_deliver ===
                                            null
                                                ? "--"
                                                : moment(
                                                      orderDetail[0]
                                                          .date_to_deliver
                                                  ).format("YYYY-MM-DD")}
                                        </span>

                                        <span>
                                            <b>Observation: </b>
                                            N/A
                                        </span>
                                    </div>
                                </div>
                                <span className="cont-files-details">
                                    <b>Files:</b>
                                    <img
                                        src="/images/icons/img_here.jpg"
                                        alt="generate_order"
                                    />
                                    <img
                                        src="/images/icons/img_here.jpg"
                                        alt="generate_order"
                                    />
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="cont-banner-details">
                        <div className="cont-banner-img-title">
                            <img
                                src="/images/icons/logistic_dept..svg"
                                alt="generate_order"
                            />
                            <h2>Order delivered</h2>
                        </div>
                        {orderDetail[0].sent_to === null ? (
                            <div className="w-75 d-flex align-items-center">
                                <Box sx={{ width: "90%" }}>
                                    <LinearProgress />
                                </Box>
                            </div>
                        ) : (
                            <div className="div-details-mmobile">
                                <div className="cont-details-banner">
                                    <div className="cont-details-left">
                                        <span className="mb-2">
                                            <b>Date: </b>
                                            {orderDetail[0].sent_to === null
                                                ? "--"
                                                : moment(
                                                      orderDetail[0].sent_to
                                                  ).format("YYYY-MM-DD")}
                                        </span>

                                        <span>
                                            <b>Observation: </b>
                                            N/A
                                        </span>
                                    </div>
                                </div>
                                <span className="cont-files-details">
                                    <b>Files:</b>
                                    {orderDetail[0].foto_1 === null ? (
                                        <img
                                            src="/images/icons/img_here.jpg"
                                            alt="generate_order"
                                        />
                                    ) : (
                                        <img
                                            src={`/images/deliveredProduct_img/${orderDetail[0].foto_1}`}
                                            alt="generate_order"
                                        />
                                    )}

                                    {orderDetail[0].foto_2 === null ? (
                                        <img
                                            src="/images/icons/img_here.jpg"
                                            alt="generate_order"
                                        />
                                    ) : (
                                        orderDetail[0].foto_2
                                    )}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
