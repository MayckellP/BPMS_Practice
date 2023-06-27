import { useState, useEffect } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import ButonCreate from "@/Components/ButtonCreate";
import Footer from "@/Components/Footer";
import Pusher from "pusher-js";

import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavbarMobile from "@/Components/NavbarMobile";

export default function Authenticated({ user, header, children }) {
    /*-------------------------------------------------------------------------PUSHER   */
    const proccessCount = JSON.parse(sessionStorage.getItem("proccess"));

    const [track, setTrack] = useState(proccessCount);
    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher("b907c187a5da80746d68", {
            cluster: "eu",
        });
        const channel = pusher.subscribe("companyTrack-channel");
        channel.bind("track-message", function (data) {
            //alert(JSON.stringify(data));
            console.log("PUSHER DATA: ", data);
            sessionStorage.setItem("proccess", JSON.stringify(data));
            setTrack(data);
        });
    }, []);

    /*-------------------------------------------------------------------------EDIT BACKGROUND  */
    var background;
    if (
        window.location.pathname == "/orders/create" ||
        window.location.pathname == "/deptSales/create"
    ) {
        background = "bg-view-order";
    } else {
        background = "bg-view";
    }
    /*-------------------------------------------------------------------------FUNCTION LINKS  */
    var countProccess = JSON.parse(sessionStorage.getItem("proccess"));
    const roleName = JSON.parse(sessionStorage.getItem("currentUser")).rolename;
    var identifier = "register";
    var linkHome;
    var linkRegister;
    var notifyProccess;

    //------------------------- ROLE "CLIENT"
    if (roleName === "Client") {
        linkHome = route("orders.index");
        linkRegister = route("orders.show", identifier);

        //------------------------- ROLE "ADMIN"
    } else if (roleName === "Admin") {
        linkHome = route("users.index");

        //------------------------- ROLE "SELLER"
    } else if (roleName === "Seller") {
        linkHome = route("deptSales.index");
        linkRegister = route("deptSales.show", identifier);
        if (track.confirmedCount > 0) {
            notifyProccess = "notifyProccess";
        } else {
            notifyProccess = "d-none";
        }

        //------------------------- ROLE "PRODUCTION MANAGER"
    } else if (roleName === "Production Manager") {
        linkHome = route("deptProduction.index");
        linkRegister = route("deptProduction.show", identifier);
        if (track.date_to_produceCount > 0) {
            notifyProccess = "notifyProccess";
        } else {
            notifyProccess = "d-none";
        }

        //------------------------- ROLE "LOGISTIC MANAGER"
    } else if (
        roleName === "Logistic Manager" ||
        roleName === "Logistic Employee"
    ) {
        linkHome = route("deptLogistic.index");
        linkRegister = route("deptLogistic.show", identifier);
        if (track.date_to_deliverCount > 0) {
            notifyProccess = "notifyProccess";
        } else {
            notifyProccess = "d-none";
        }

        //------------------------- ROLE "WAREHOUSE"
    } else if (roleName === "Warehouse") {
        linkHome = route("stock.index");
        linkRegister = route("stock.show", identifier);
        if (track.date_to_deliverCount > 0) {
            notifyProccess = "notifyProccess";
        } else {
            notifyProccess = "d-none";
        }
    }

    /*-------------------------------------------------------------------------CART SHOP  */
    const cartDetails = JSON.parse(sessionStorage.getItem("myCurrentCart"));
    console.log("variable:", cartDetails);
    const myNewCart = cartDetails.map((item) => (
        <div className="cart-item" key={item.id}>
            <div className="cont-img-product mb-4">
                <img src={item.image} alt={item.image} />
            </div>
            <div className="cont-details-product">
                <h3 className="product-title">{item.model}</h3>
                <p>{item.quantity} PCS</p>
                <div className="d-flex">
                    <div
                        className="color"
                        style={{ backgroundColor: item.color }}
                    ></div>
                    <span>{item.color}</span>
                </div>
            </div>
            <div className="cont-delete-product">
                <Link
                    href={route("store.destroy", item.id)}
                    method="delete"
                    as="button"
                >
                    <div className="cont-img-delete">
                        <img src="/images/icons/trash.svg" alt="Phrase_Login" />
                    </div>
                </Link>
            </div>
        </div>
    ));

    /*-------------------------------------------------------------------------NOTIFY CART  */
    const notifyCount = cartDetails.length;
    var contNotify;
    console.log(notifyCount);
    if (cartDetails.length < 1) {
        contNotify = "d-none";
    } else {
        contNotify = "notify";
    }
    /*-------------------------------------------------------------------------LOG OUT -> REMOVE CART  */
    const removeCart = () => sessionStorage.removeItem("itemInCart");

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [show, setShow] = useState(false);

    const closeCart = () => setShow(false);
    const showCart = () => setShow(true);

    useEffect(() => {
        function lockOrientation() {
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock("portrait").catch(function () {
                    // Error al intentar bloquear la orientación
                });
            } else if (screen.lockOrientation) {
                screen.lockOrientation("portrait").catch(function () {
                    // Error al intentar bloquear la orientación
                });
            }
        }

        lockOrientation();

        return () => {
            // Desbloquear la orientación al desmontar el componente si es necesario
            if (screen.orientation && screen.orientation.unlock) {
                screen.orientation.unlock();
            } else if (screen.unlockOrientation) {
                screen.unlockOrientation();
            }
        };
    }, []);

    return (
        <div className="bg-home">
            <div className="side-navbar">
                <div className="cont-top-navbar">
                    <div className="cont-img-client">
                        {user.logo === null ? (
                            <img
                                src="/images/logo_img/Client_logo_default.svg"
                                alt="Logo User"
                            />
                        ) : (
                            <img
                                src={`/images/logo_img/${user.logo}`}
                                alt="Logo User"
                            />
                        )}
                    </div>
                </div>
                <div className="cont-mid-navbar">
                    <ul>
                        <li>
                            {(roleName === "Client" ||
                                roleName === "Seller" ||
                                roleName === "Production Manager" ||
                                roleName === "Logistic Manager" ||
                                roleName === "Logistic Employee" ||
                                roleName === "Warehouse") && (
                                <NavLink
                                    href={linkHome}
                                    className="link-navbar"
                                >
                                    <img
                                        src="/images/icons/Navbar/home.svg"
                                        alt="Phrase_Login"
                                    />
                                    Home
                                </NavLink>
                            )}
                        </li>

                        <li>
                            {(roleName === "Client" ||
                                roleName === "Seller" ||
                                roleName === "Administrador") && (
                                <NavLink
                                    href={route("store.create")}
                                    className="link-navbar"
                                >
                                    <img
                                        src="/images/icons/Navbar/store.svg"
                                        alt="Phrase_Login"
                                    />
                                    Store
                                </NavLink>
                            )}
                        </li>

                        <li>
                            <NavLink
                                href={linkRegister}
                                className="link-navbar"
                            >
                                <img
                                    src="/images/icons/Navbar/register.svg"
                                    alt="Phrase_Login"
                                />
                                Register
                            </NavLink>
                        </li>
                        <li>
                            {roleName === "Client" ? (
                                <NavLink
                                    href={route("track.show", user.id)}
                                    className="link-navbar"
                                >
                                    <img
                                        src="/images/icons/Navbar/track.svg"
                                        alt="Phrase_Login"
                                    />
                                    Track
                                </NavLink>
                            ) : (
                                <NavLink
                                    href={route("chat.index")}
                                    className="link-navbar"
                                >
                                    <div className={notifyProccess}>!</div>
                                    <img
                                        src="/images/icons/Navbar/chats.svg"
                                        alt="Phrase_Login"
                                    />
                                    Chat
                                </NavLink>
                            )}
                        </li>
                        <li>
                            <hr className="divider" />
                        </li>
                        <li>
                            <NavLink href={"#"} className="link-navbar">
                                <img
                                    src="/images/icons/Navbar/support.svg"
                                    alt="Phrase_Login"
                                />
                                Support
                            </NavLink>
                        </li>
                        <li>
                            {roleName === "Administrador" && (
                                <NavLink
                                    href={route("users.index")}
                                    className="link-navbar"
                                >
                                    <img
                                        src="/images/icons/Navbar/track.svg"
                                        alt="Phrase_Login"
                                    />
                                    Users
                                </NavLink>
                            )}
                        </li>
                    </ul>
                </div>
                <div className="cont-bot-navbar mb-3">
                    <div className="cont-img-logo">
                        <img
                            src="/images/0.log_view/NewLogo.svg"
                            alt="Phrase_Login"
                        />
                    </div>
                </div>
            </div>

            <div className={background} id="bg-global">
                <NavbarMobile
                    name={user.name}
                    myCart={myNewCart}
                    contNotify={contNotify}
                    notifyCount={notifyCount}
                    user={user}
                    identifier={identifier}
                    linkHome={linkHome}
                    linkRegister={linkRegister}
                    notifyProccess={notifyProccess}
                    roleName={roleName}
                />
                {header && (
                    <header className="cont-title-view">
                        <div className="title-view">{header}</div>
                        <div className="cont-profile-cart">
                            <div className="cont-img-user">
                                {user.foto === null || user.foto === "NO" ? (
                                    <img
                                        src="/images/profile_img/profile_default.jpg"
                                        alt="Photo User"
                                    />
                                ) : (
                                    <img
                                        src={`/images/profile_img/${user.foto}`}
                                        alt="Photo User"
                                    />
                                )}
                                <span>
                                    <Dropdown className="bg-black">
                                        <Dropdown.Trigger className="bg-black">
                                            <span className="bg-black">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-2 py-2  border-transparent text-md leading-4 font-medium rounded-md text-white-500 bg-black hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {user.name}

                                                    <svg
                                                        className="ml-2 -mr-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                            >
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                /* onClick={removeCart} */
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </span>
                            </div>
                            {(roleName === "Client" ||
                                roleName === "Seller") && (
                                <div className="cont-img-cart">
                                    <div className={contNotify}>
                                        {notifyCount}
                                    </div>
                                    <Button
                                        onClick={showCart}
                                        className="btn-cart"
                                        id="bg-cart"
                                    >
                                        <img
                                            src="/images/icons/Navbar/cart.svg"
                                            alt="Phrase_Login"
                                        />
                                    </Button>

                                    <Offcanvas
                                        show={show}
                                        onHide={closeCart}
                                        placement="end"
                                        className="canvas"
                                    >
                                        <Offcanvas.Header>
                                            <Offcanvas.Title className="w-100">
                                                <h2 className="cart-title">
                                                    Your Order
                                                </h2>
                                            </Offcanvas.Title>
                                        </Offcanvas.Header>
                                        <Offcanvas.Body>
                                            <div className="cart-body">
                                                {myNewCart}
                                            </div>
                                            <div className="btn-order">
                                                <ButonCreate
                                                    title="Add to Cart"
                                                    styleBtn=" rounded-5 bg-success w-50 border-0"
                                                    styleLink="text-white fw-bold text-decoration-none fs-5"
                                                    link={route("store.index")}
                                                />
                                            </div>
                                        </Offcanvas.Body>
                                    </Offcanvas>
                                </div>
                            )}
                        </div>
                    </header>
                )}

                <main className="cont-body-view">{children}</main>
                <Footer />
            </div>
        </div>
    );
}
