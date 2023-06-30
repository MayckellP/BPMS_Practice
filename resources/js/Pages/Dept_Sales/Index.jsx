import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import ButonCreate from "@/Components/ButtonCreate";
import { SaleProduct } from "@/Components/Charts/SaleProduct";
import { SalePerformance } from "@/Components/Charts/SalePerformance";
import ModalRate from "@/Components/ModalRate";
import ModalClaim from "@/Components/ModalClaim";
import PrimaryButton from "@/Components/PrimaryButton";
import moment from "moment";

export default function Index({ auth, filterChart, myOrders, myPerformance }) {
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
    const month = [
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

    const performance = [];
    var monthlyPerformance = 0;

    myPerformance.map((item) => {
        performance.push(parseInt(item.total_price));
    });

    if (performance.length > 0) {
        monthlyPerformance = performance.reduce(
            (accumulator, currentValue) => accumulator + currentValue
        );
    }
    console.log("rendimiento: ", performance);

    //DESIGN
    const dataBar = {
        labels: month,
        datasets: [
            {
                label: "Total Monthly",
                data: performance,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "white",
                color: "Black",
            },
        ],
    };

    const options = {
        scales: {
            y: {
                max: 20000, // Establece el valor máximo del eje y
                beginAtZero: true, // Comienza el eje y desde cero
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                color: "Black",
                font: {
                    size: 20,
                },
            },
        },
    };

    return (
        <AuthenticatedLayout user={auth.user} header={"Dashboard"}>
            <Head title="Dashboard" />

            <div className="cont-global-sales">
                <div className="cont-left-sales">
                    <div className="cont-chart-sales">
                        <div className="cont-title-chart-sales">
                            <h2 className="title-chart-order">
                                Personal Performance
                            </h2>
                        </div>
                        <div className="subCont-chart-sales">
                            <SalePerformance
                                dataBar={dataBar}
                                options={options}
                            />
                        </div>
                        <div className="cont-performance-goal">
                            <h4 className="title-performance">
                                Monthly Performance
                            </h4>
                            <div className="cont-performance">
                                <span>${monthlyPerformance}.00</span>
                            </div>
                            <h4 className="title-performance">Monthly Goal</h4>
                            <div className="cont-goal">
                                <span>$20.000.00</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cont-right-sales">
                    <div className="cont-chart-sales-product">
                        <div className="cont-title-chart-product-sale">
                            <h2 className="title-chart-product-sale">
                                Top selling Products
                            </h2>
                        </div>
                        <div className="chart-product-sale">
                            <SaleProduct data={dataPie} />
                        </div>
                    </div>
                    <div className="cont-btn-order-sale">
                        <div className="btn-order-sale">
                            <Link href={route("deptSales.create")}>
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
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
