import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import ButonCreate from "@/Components/ButtonCreate";
import { ClientOrder } from "@/Components/Charts/ClientOrder";
import { ClientRating } from "@/Components/Charts/ClientRating";
import ModalRate from "@/Components/ModalRate";
import ModalClaim from "@/Components/ModalClaim";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({
    auth,
    filterChart,
    myOrders,
    myClaims,
    myId,
    totalTrack,
}) {
    var countClaim = 0;
    var countSolution = 0;

    myClaims.map((item) => {
        if (item.order.user_id === auth.user.id) {
            countClaim++;
            if (item.solution !== "NO") {
                countSolution++;
            }
        }
    });

    //-------------------------------CHARTJS

    //-------------------------------DATA AND DESIGN FOR PIE CHART
    //VARIABLES ARRAY FOR CHART
    var quantityDelivered = [];
    var orderDelivered = [];
    var colorOrder = [];

    //TO PUSH THE VARIABLES ARRAY
    filterChart.map((item) => {
        orderDelivered.push(`${item.model}`);
        quantityDelivered.push(item.total_cantidad);
        colorOrder.push(item.color);
    });

    //DESIGN
    const dataPie = {
        labels: orderDelivered,
        datasets: [
            {
                data: quantityDelivered,
                backgroundColor: colorOrder,
                borderColor: "white",
                borderWidth: 1,
            },
        ],
    };

    //------------------------------DATA AND DESIGN FOR BAR CHART
    //DATA
    const labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const rates = [2, 3, 3, 4, 5, 2, 5, 3, 4, 3, 5, 3];

    //DESIGN
    const dataBar = {
        labels,
        datasets: [
            {
                label: "Good Rate",
                data: rates,
                backgroundColor: "rgba(36, 101, 180, 0.8)",
                color: "Black",
            },
        ],
    };

    return (
        <AuthenticatedLayout user={auth.user} header={"Dashboard"}>
            <Head title="Dashboard" />

            <div className="cont-global">
                <div className="cont-left">
                    <div className="cont-chart-order">
                        <div className="cont-title-chart">
                            <h2 className="title-chart-order">
                                Order Delivered
                            </h2>
                        </div>
                        <div className="subCont-chart-order">
                            <ClientOrder data={dataPie} />
                        </div>
                    </div>

                    <div className="cont-btn-order-rate">
                        <Link href={route("orders.create")}>
                            <PrimaryButton className="btn-generate-order">
                                <div className="btn-vector-order py-2">
                                    <span>GENERATE ORDER</span>
                                    <img
                                        src="/images/icons/code.svg"
                                        alt="generate_order"
                                    />
                                </div>
                            </PrimaryButton>
                        </Link>

                        <ModalRate
                            data={myOrders}
                            btn_class="btn-rate-order border-0"
                            div_class="btn-vector-rate py-2"
                            title="Rate Order"
                            icon="/images/icons/rate.svg"
                            altIcon="generate_order"
                            headerModal="headerModal"
                            cont_titleModal="cont_titleModal"
                            img_class="w-75"
                            logoModal="/images/0.log_view/NewLogo-black.svg"
                            slogan_class="slogan_class"
                            sloganContent="Your Feedback is important to us!"
                        ></ModalRate>
                    </div>
                </div>

                <div className="cont-right">
                    <div className="cont-chart-rate">
                        <div
                            className="d-flex align-items-center p-2"
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <ClientRating dataBar={dataBar} />
                        </div>
                    </div>
                    <div className="cont-btn-graph">
                        <div className="cont-chart-claim ">
                            <div className="pt-3 text-center w-50 d-flex flex-column p-0">
                                <h3 className="chart-claim-title">Claims</h3>
                                <span className="chart-claim-counter">
                                    {countClaim}
                                </span>
                            </div>
                            <div className=" pt-3 text-center w-50 d-flex flex-column border-start">
                                <h3 className="chart-claim-title">Solutions</h3>
                                <span className="chart-claim-counter">
                                    {countSolution}
                                </span>
                            </div>
                        </div>
                        <div className="cont-btn-claim-rate">
                            <ModalRate
                                data={myOrders}
                                btn_class="btn-rate-order-mobile border-0"
                                div_class="btn-vector-rate-mobile py-2"
                                title="Rate Order"
                                icon="/images/icons/rate.svg"
                                altIcon="generate_order"
                                headerModal="headerModal"
                                cont_titleModal="cont_titleModal"
                                img_class="w-75"
                                logoModal="/images/0.log_view/NewLogo-black.svg"
                                slogan_class="slogan_class"
                                sloganContent="Your Feedback is important to us!"
                            ></ModalRate>
                            <ModalClaim
                                data={myOrders}
                                btn_class="btn-claim-order border-0"
                                div_class="btn-vector-claim py-2"
                                title="Claim Order"
                                icon="/images/icons/claim.svg"
                                altIcon="claim_order"
                                modalTitle="Claim Title"
                                headerModal="headerModal"
                                cont_titleModal="cont_titleModal"
                                img_class="w-75"
                                logoModal="/images/0.log_view/NewLogo-black.svg"
                                slogan_class="slogan_class"
                                sloganContent="Your Feedback is important to us!"
                            ></ModalClaim>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
