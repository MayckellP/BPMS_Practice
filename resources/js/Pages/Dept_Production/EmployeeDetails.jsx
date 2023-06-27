import { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { ProductionPerformanceDetail } from "@/Components/Charts/ProductionPerformanceDetail";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function EmployeeDetails({
    auth,
    employeesToProduction,
    employeeTable,
    employeePerformanceDetail,
}) {
    console.log("employeesPerformance: ", employeePerformanceDetail);
    console.log("employees: ", employeeTable);
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

    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [dataBarChart, setDataBarChart] = useState(null);

    const [monthlyPerformance, setMonthlyPerformance] = useState(null);

    const cardClick = (employee) => {
        setSelectedEmployee(employee);
        console.log("funciona");

        const performance = [];
        var addMonthlyPerformance;

        employeePerformanceDetail.map((item) => {
            if (employee.id === item.id) {
                performance.push(parseInt(item.total_quantity));
            }
        });

        if (performance.length > 0) {
            addMonthlyPerformance = performance.reduce(
                (accumulator, currentValue) => accumulator + currentValue
            );
            setMonthlyPerformance(addMonthlyPerformance);
        }
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
        setDataBarChart(dataBar);
        console.log(dataBarChart);
    };

    console.log("fuera de la funcion", performance);

    const myEmployees = employeesToProduction.map((employee, index) => (
        <Card
            className="card-employee"
            key={index}
            onClick={() => {
                cardClick(employee);
            }}
        >
            <Card.Body className="card-body">
                <Card.Img
                    variant="top"
                    src="/images/4.production_view/worker_1.jpg"
                    alt="foto_employee"
                    className="card-img"
                />
                <Card.Title
                    className="card-title text-black w-100 mt-1"
                    style={{ fontSize: "15px" }}
                >
                    {employee.name}
                </Card.Title>
            </Card.Body>
        </Card>
    ));

    return (
        <AuthenticatedLayout user={auth.user} header={"Employee Details"}>
            <Head title="Employee" />

            <div className="cont-global-employeeDetails">
                <div className="cont-top-allEmployees">
                    <h2>Team Production</h2>
                    <div className="cont-card-employee row-cols-1 row-cols-md-3 g-4">
                        {myEmployees}
                    </div>
                </div>

                {selectedEmployee ? (
                    <div className="cont-bot-allEmployeesDetail">
                        {console.log("que dice?: ", selectedEmployee)}
                        <div className="cont-bot-left">
                            <Link href={"#"}>
                                <PrimaryButton className="btn-performance border-0">
                                    <span>Performance</span>
                                    <img
                                        src="/images/icons/arrow_left.svg"
                                        alt="generate_order"
                                    />
                                </PrimaryButton>
                            </Link>
                            <div className="cont-monthly-performance">
                                <h4 className="title-performance">
                                    Monthly Performance
                                </h4>
                                <div className="cont-performance">
                                    <span>{monthlyPerformance}</span>
                                </div>
                                <h4 className="title-performance">
                                    Monthly Goal
                                </h4>
                                <div className="cont-goal">
                                    <span>20.000</span>
                                </div>
                            </div>
                        </div>
                        <div className="cont-bot-right">
                            <h4>{selectedEmployee.name}</h4>
                            <ProductionPerformanceDetail
                                dataBar={dataBarChart}
                            />
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </AuthenticatedLayout>
    );
}
