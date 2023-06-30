import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import ButonCreate from "@/Components/ButtonCreate";
import { ProductSold } from "@/Components/Charts/ProductSold";
import { ProductRequested } from "@/Components/Charts/ProductRequested";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({
    auth,
    employeeChart,
    productsChart,
    myPerformance,
    productsSold,
    productsRequested,
}) {
    //-------------------------------CHARTJS

    //-------------------------------DATA AND DESIGN FOR PIE CHART EMPLOYEE
    //VARIABLES ARRAY FOR CHART
    var productSold = [];
    var quantityProductSold = [];
    var colorProductSold = [];

    //TO PUSH THE VARIABLES ARRAY
    productsSold.map((item) => {
        productSold.push(item.model);
        quantityProductSold.push(item.total_quantity);
        colorProductSold.push(item.color);
    });

    //DESIGN
    const dataPie = {
        labels: productSold,
        datasets: [
            {
                data: quantityProductSold,
                backgroundColor: colorProductSold,
                borderColor: "white",
                borderWidth: 1,
            },
        ],
    };

    //-------------------------------DATA AND DESIGN FOR PIE CHART PRODUCTS
    //VARIABLES ARRAY FOR CHART
    var productRequested = [];
    var quantityProductRequested = [];
    var colorProductRequested = [];

    //TO PUSH THE VARIABLES ARRAY
    productsRequested.map((item) => {
        productRequested.push(item.model);
        quantityProductRequested.push(item.total_quantity);
        colorProductRequested.push(item.color);
    });

    //DESIGN
    const dataPieProduct = {
        labels: productRequested,
        datasets: [
            {
                data: quantityProductRequested,
                backgroundColor: colorProductRequested,
                borderColor: "white",
                borderWidth: 1,
            },
        ],
    };

    return (
        <AuthenticatedLayout user={auth.user} header={"Dashboard"}>
            <Head title="Dashboard" />

            <div className="cont-global-warehouse">
                <div className="cont-left-warehouse">
                    <div className="cont-chart-warehouse">
                        <div className="cont-title-chart-warehouse">
                            <h2 className="title-chart-order">Product Sold</h2>
                        </div>
                        <div className="subCont-chart-warehouse">
                            <ProductSold data={dataPie} />
                        </div>
                    </div>
                </div>

                <div className="cont-right-warehouse">
                    <div className="cont-chart-warehouse-product">
                        <div className="cont-title-chart-product-warehouse">
                            <h2 className="title-chart-product-produced">
                                Products Requested
                            </h2>
                        </div>
                        <div className="chart-product-warehouse">
                            <ProductRequested data={dataPieProduct} />
                        </div>
                    </div>

                    <div className="btn-order-warehouse">
                        <Link href={route("stock.show", "inventar")}>
                            <PrimaryButton className="btn-generate-employee">
                                <div className="btn-vector-employee py-2">
                                    <span>SHOW INVENTAR</span>
                                    <img
                                        src="/images/icons/performance.svg"
                                        alt="generate_order"
                                    />
                                </div>
                            </PrimaryButton>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
