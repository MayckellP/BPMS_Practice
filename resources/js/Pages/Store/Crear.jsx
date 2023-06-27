import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputError from "@/Components/InputError";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CardStore from "@/Components/CardStore";
import SearchStore from "@/Components/SearchStore";

export default function Crear({
    auth,
    myCart,
    stockProduct,
    stockColor,
    clients,
}) {
    const [filteredStore, setFilteredStore] = useState(stockProduct);

    const goToSearch = (e) => {
        const finalStore = stockProduct.filter((itemStore) =>
            itemStore.model.toLowerCase().includes(e.toLowerCase())
        );

        setFilteredStore(finalStore);
    };

    const productArray = filteredStore.map((item) => (
        <CardStore
            key={item.id}
            img={item.image}
            infoImg="foto-items"
            category={item.category}
            model={item.model}
            infoProduct="Bottle seal with ISO 17712:2013 certification, exclusive anti-spin 'attack' system for its injected design in two colors, laser engraving, customizable, bar code, Qr code, transparent security acrylic, the only ones that comply with clauses 5 and 6 of ISO 17712."
            stockColor={stockColor}
            clients={clients}
        ></CardStore>
    ));

    const { data, setData, post, processing, errors, reset } = useForm({
        product: "",
        color: "",
        quantity: "",
    });

    const submit = (e) => {
        console.log(data);
        e.preventDefault();
        post(route("store.store"));
    };
    return (
        <AuthenticatedLayout user={auth.user} header={"Store"}>
            <Head title="Store" />
            <div className="cont-global-store">
                <div className="cont-product-store">
                    <FloatingLabel
                        controlId="floatingSelect"
                        className="category-select-product"
                    >
                        <Form.Select
                            aria-label="Floating label select example"
                            className="form-order-input w-100 bg-secondary fs-5 bg-white border-none text-black rounded-3 py-0"
                            style={{ height: "40px" }}
                        >
                            <option>Default order</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </FloatingLabel>

                    <div className="store-items row row-cols-1 row-cols-md-3 g-4 pb-2">
                        {productArray}
                    </div>
                </div>

                <div className="cont-filter-store">
                    <div className="cont-search-categories">
                        <SearchStore onSearch={goToSearch} />
                        <div className="cont-category-filter">
                            <div className="cont-title-category">
                                <h2>PRODUCT CATEGORY</h2>
                            </div>
                            <div className="cont-selects-categories">
                                <FloatingLabel
                                    controlId="floatingSelect"
                                    className="filter-input-category"
                                >
                                    <Form.Select
                                        aria-label="Floating label select example"
                                        className="form-order-input fs-6 w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                        style={{ height: "40px" }}
                                    >
                                        <option>Security & Controls</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </FloatingLabel>

                                <FloatingLabel
                                    controlId="floatingSelect"
                                    className="filter-input-category"
                                >
                                    <Form.Select
                                        aria-label="Floating label select example"
                                        className="form-order-input fs-6 w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                        style={{ height: "40px" }}
                                    >
                                        <option>Load Protection</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </FloatingLabel>

                                <FloatingLabel
                                    controlId="floatingSelect"
                                    className="filter-input-category"
                                >
                                    <Form.Select
                                        aria-label="Floating label select example"
                                        className="form-order-input fs-6 w-100 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                        style={{ height: "40px" }}
                                    >
                                        <option>Fruit Perservation</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
