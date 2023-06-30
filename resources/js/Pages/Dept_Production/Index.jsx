import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import ButonCreate from "@/Components/ButtonCreate";
import { EmployeePerformance } from "@/Components/Charts/EmployeePerformance";
import { ProductRequested } from "@/Components/Charts/ProductRequested";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({
    auth,
    employeeChart,
    productsChart,
    myPerformance,
}) {
    //-------------------------------CHARTJS

    //-------------------------------DATA AND DESIGN FOR PIE CHART EMPLOYEE
    //VARIABLES ARRAY FOR CHART
    var employee = [];
    var quantityProduced = [];
    var colorEmployee = ["#6AC042", "#BE7A2F"];

    //TO PUSH THE VARIABLES ARRAY
    employeeChart.map((item) => {
        employee.push(item.name);
        quantityProduced.push(item.total_quantity);
    });

    //DESIGN
    const dataPie = {
        labels: employee,
        datasets: [
            {
                data: quantityProduced,
                backgroundColor: colorEmployee,
                borderColor: "white",
                borderWidth: 1,
            },
        ],
    };

    //-------------------------------DATA AND DESIGN FOR PIE CHART PRODUCTS
    //VARIABLES ARRAY FOR CHART
    var product = [];
    var quantityProductProduced = [];
    var colorProduct = [];

    //TO PUSH THE VARIABLES ARRAY
    productsChart.map((item) => {
        product.push(item.model);
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

            <div className="cont-global-production">
                <div className="cont-left-production">
                    <div className="cont-chart-production">
                        <div className="cont-title-chart-production">
                            <h2 className="title-chart-order">
                                Employees Performance
                            </h2>
                        </div>
                        <div className="subCont-chart-production">
                            <EmployeePerformance data={dataPie} />
                        </div>
                    </div>
                </div>

                <div className="cont-right-production">
                    <div className="cont-chart-production-product">
                        <div className="cont-title-chart-product-production">
                            <h2 className="title-chart-product-produced">
                                Products Requested
                            </h2>
                        </div>
                        <div className="chart-product-production">
                            <ProductRequested data={dataPieProduct} />
                        </div>
                    </div>

                    <div className="btn-order-production">
                        <Link
                            href={route(
                                "deptProduction.show",
                                "EmployeeDetails"
                            )}
                        >
                            <PrimaryButton className="btn-generate-employee">
                                <div className="btn-vector-employee py-2">
                                    <span>SHOW PERFORMANCE</span>
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
