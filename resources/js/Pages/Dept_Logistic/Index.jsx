import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import ButonCreate from "@/Components/ButtonCreate";

import { ProductRequested } from "@/Components/Charts/ProductRequested";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({
    auth,
    employeeChart,
    productsChart,
    myPerformance,
}) {
    console.log("ORDERS: ", productsChart);
    console.log("Chart: ", employeeChart);
    console.log("REQUEST: ", myPerformance);

    //-------------------------------CHARTJS

    //-------------------------------DATA AND DESIGN FOR PIE CHART PRODUCTS
    //VARIABLES ARRAY FOR CHART
    var product = [];
    var quantityProductProduced = [];
    var colorProduct = [];

    //TO PUSH THE VARIABLES ARRAY
    productsChart.map((item) => {
        product.push(`${item.model}`);
        quantityProductProduced.push(item.total_quantity);
        colorProduct.push(item.color);
    });

    //DESIGN
    const dataPieProduct = {
        labels: product,
        datasets: [
            {
                data: quantityProductProduced,
                backgroundColor: colorProduct,
                borderColor: "white",
                borderWidth: 1,
            },
        ],
    };

    return (
        <AuthenticatedLayout user={auth.user} header={"Dashboard"}>
            <Head title="Dashboard" />

            <div className="cont-global-logistic">
                <div className="cont-left-logistic">
                    <div className="cont-chart-logistic">
                        <div className="cont-title-chart-logistic">
                            <h2 className="title-chart-logistic">
                                Vehicle Location
                            </h2>
                        </div>
                        <div className="subCont-chart-logistic">
                            {/* <EmployeePerformance data={dataPie} /> */}
                        </div>
                    </div>
                </div>

                <div className="cont-right-logistic">
                    <div className="cont-chart-logistic-product">
                        <div className="cont-title-chart-product-logistic">
                            <h2 className="title-chart-product-logistic">
                                Products Delivered
                            </h2>
                        </div>
                        <div className="chart-product-logistic">
                            <ProductRequested data={dataPieProduct} />
                        </div>
                    </div>
                    <div className="cont-btn-order-logistic">
                        <div className="btn-order-logistic">
                            <Link
                                href={route(
                                    "deptLogistic.show",
                                    "RoutesDetails"
                                )}
                            >
                                <PrimaryButton className="btn-show-routes">
                                    <div className="btn-vector-routes py-2">
                                        <span>SHOW PERFORMANCE</span>
                                        <img
                                            src="/images/icons/trucker_icon.svg"
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
