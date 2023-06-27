import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import moment from "moment";
import SearchRegister from "@/Components/SearchRegister";
import ModalProductStock from "@/Components/ModalProductStock";
import ModalProductStockToEdit from "@/Components/ModalProductStockToEdit";
import ModalProductStockToCreate from "@/Components/ModalProductStockToCreate";

export default function Dashboard({ auth, myStock }) {
    const [filteredData, setFilteredData] = useState(myStock);

    const goToSearch = (e) => {
        const finalRegister = myStock.filter((itemRegister) =>
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
            <tr
                key={item.id}
                className={item.quantity < 1000 ? "bg-danger" : ""}
            >
                <td className="tbl-index">{index + 1}</td>
                <td className="tbl-item">{item.model}</td>
                <td className="tbl-td">{item.quantity}</td>
                <td className="tbl-td">{item.color}</td>
                <td className="tbl-td">
                    {item.created_at !== null
                        ? moment(item.confirmed).format("YYYY-MM-DD")
                        : "--"}
                </td>
                <td className="text-center">
                    <ModalProductStockToEdit
                        btn_class="btn-stock-edit-tbl"
                        div_class=""
                        title="Edit"
                        icon=""
                        altIcon=""
                        headerModal="headerModal"
                        cont_titleModal="cont_titleModal"
                        img_class="w-75"
                        logoModal="/images/0.log_view/NewLogo-black.svg"
                        slogan_class="d-none"
                        sloganContent=""
                        img={item.image}
                        imgError="/images/3.warehouse_view/error_image.png"
                        infoImg={item.model}
                        category={item.category}
                        model={item.model}
                        quantity={item.quantity}
                        infoProduct="Nada..."
                        color={item.color}
                        id={item.id}
                    />
                </td>
                <td className="text-center">
                    <ModalProductStock
                        btn_class="btn-stock-details-tbl"
                        div_class=""
                        title="Details"
                        icon=""
                        altIcon=""
                        headerModal="headerModal"
                        cont_titleModal="cont_titleModal"
                        img_class="w-75"
                        logoModal="/images/0.log_view/NewLogo-black.svg"
                        slogan_class="d-none"
                        sloganContent=""
                        img={item.image}
                        imgError="/images/3.warehouse_view/error_image.png"
                        infoImg={item.model}
                        category={item.category}
                        model={item.model}
                        quantity={item.quantity}
                        infoProduct="Nada..."
                        color={item.color}
                    />
                </td>
            </tr>
        ),
        idTable++
    );

    useEffect(() => {
        console.log("estado inicial: ", filteredData);
    });
    return (
        <AuthenticatedLayout user={auth.user} header={"Stock"}>
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
                        <div className="cont-register-inventar">
                            <div className="btn-register-inventar">
                                <Link href={route("stock.show", "register")}>
                                    <Button
                                        className="btn-register"
                                        id="btn-track"
                                    >
                                        <span>ORDERS</span>
                                    </Button>
                                </Link>

                                <Link href={route("stock.show", "stock")}>
                                    <Button
                                        className="btn-inventar"
                                        id="btn-inventar"
                                    >
                                        <span>STOCK</span>
                                    </Button>
                                </Link>
                            </div>
                        </div>

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
                    <ModalProductStockToCreate
                        btn_class="btn-create-product"
                        div_class=""
                        title="+"
                        icon=""
                        altIcon=""
                        headerModal="headerModal"
                        cont_titleModal="cont_titleModal"
                        img_class="w-75"
                        logoModal="/images/0.log_view/NewLogo-black.svg"
                        slogan_class="d-none"
                        sloganContent=""
                        img=""
                        imgError="/images/3.warehouse_view/error_image.png"
                        infoImg=""
                        category=""
                        model=""
                        quantity=""
                        infoProduct="Nada..."
                        color=""
                        id=""
                    />
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th className="tbl-header py-2 ">#</th>
                                <th className="tbl-header py-2 ">Product</th>
                                <th className="tbl-header py-2 ">Quantity</th>
                                <th className="tbl-header py-2 ">Color</th>
                                <th className="tbl-header py-2 ">Created</th>
                                <th colSpan={3} className="tbl-header py-2 ">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>{showOrders}</tbody>
                    </Table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
