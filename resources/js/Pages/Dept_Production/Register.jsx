import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import moment from "moment";
import SearchRegister from "@/Components/SearchRegister";

export default function Dashboard({ auth, myOrders, completeTable, sellerID }) {
    console.log("My Register: ", completeTable);
    console.log("My ID: ", sellerID);
    const [filteredData, setFilteredData] = useState(completeTable);

    const goToSearch = (e) => {
        const finalRegister = completeTable.filter((itemRegister) =>
            itemRegister.model.toLowerCase().includes(e.toLowerCase())
        );

        setFilteredData(finalRegister);
    };

    const changeDate = () => {
        const allMonth = document.getElementById("checkbox-input");
        const allMonthBG = document.getElementById("color-allMonth");
        const date = document.getElementById("date-input");

        if (allMonth.checked) {
            date.type = "month";
            allMonthBG.style.backgroundColor = "rgb(169, 247, 146)";
        } else if (!allMonth.checked) {
            date.type = "date";
            allMonthBG.style.backgroundColor = "white";
        }
    };
    var idTable;
    const showOrders = filteredData.map(
        (item, index) => (
            <tr key={item.id}>
                <td className="tbl-index">{index + 1}</td>
                <td className="tbl-item">{item.model}</td>
                <td className="tbl-td">{item.quantity}</td>
                <td className="tbl-td">{item.color}</td>
                <td className="tbl-td">
                    {item.confirmed !== null
                        ? moment(item.confirmed).format("YYYY-MM-DD")
                        : "--"}
                </td>
                <td className="tbl-td">
                    {item.sent_to !== null
                        ? moment(item.sent_to).format("YYYY-MM-DD")
                        : "--"}
                </td>
                <td className="tbl-td">
                    {item.receiver === null ? "--" : item.receiver}
                </td>
                <td className="text-center">
                    {
                        <Link href={route("deptProduction.show", item.id)}>
                            <Button className="btn-details-tbl">
                                Show details
                            </Button>
                        </Link>
                    }
                </td>
            </tr>
        ),
        idTable++
    );

    useEffect(() => {
        console.log("estado inicial: ", filteredData);
    });
    return (
        <AuthenticatedLayout user={auth.user} header={"Register"}>
            <Head title="Register" />

            <div className="cont-global-register">
                <div className="cont-filter-register">
                    <div className="cont-date-search">
                        <Form.Control
                            type="date"
                            className="filter-date-register"
                            id="date-input"
                        />

                        <SearchRegister onSearch={goToSearch} />

                        <Form.Select className="select-register-mobile">
                            <option>Select option...</option>
                            <option>Large select</option>
                            <option>Large select</option>
                            <option>Large select</option>
                        </Form.Select>
                    </div>

                    <div className="cont-allMonth-select">
                        <div className="cont-allMonth" id="color-allMonth">
                            <Form.Check
                                type="checkbox"
                                id="checkbox-input"
                                onClick={changeDate}
                                label="All Month"
                                className="filter-allMonth-check"
                            />
                        </div>
                        <Form.Select className="select-register">
                            <option>Select option...</option>
                            <option>Large select</option>
                            <option>Large select</option>
                            <option>Large select</option>
                        </Form.Select>

                        <div className="register-cont-search-mobile">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Search Product"
                                className="register-search-input-mobile"
                            >
                                <Form.Control
                                    type="text"
                                    className="register-search-text-mobile h-100"
                                />
                            </FloatingLabel>
                            <Button className="register-cont-lupe-mobile">
                                <img
                                    src="/images/icons/lupe.svg"
                                    alt="searcher"
                                />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="cont-table-register">
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th className="tbl-header py-2 ">#</th>
                                <th className="tbl-header py-2 ">Product</th>
                                <th className="tbl-header py-2 ">Quantity</th>
                                <th className="tbl-header py-2 ">Color</th>
                                <th className="tbl-header py-2 ">Created</th>
                                <th className="tbl-header py-2 ">Sent</th>
                                <th className="tbl-header py-2 ">Receiver</th>
                                <th className="tbl-header py-2 ">Action</th>
                            </tr>
                        </thead>
                        <tbody>{showOrders}</tbody>
                    </Table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
