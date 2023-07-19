import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import NavLink from "@/Components/NavLink";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Dropdown from "@/Components/Dropdown";
import ButonCreate from "./ButtonCreate";
function NavbarMobile(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            {[false].map((expand) => (
                <Navbar
                    key={expand}
                    expand={expand}
                    bg="dark"
                    variant="dark"
                    className="NavbarMobile"
                >
                    <Container className="cont-logo-cart">
                        <Navbar.Brand
                            href={props.linkHome}
                            className="cont-img-client-mobile"
                        >
                            {props.user.logo === null ? (
                                <img
                                    src="/images/logo_img/Client_logo_default.svg"
                                    alt="Photo User"
                                />
                            ) : (
                                <img
                                    src={`/images/logo_img/${props.user.logo}`}
                                    alt="Photo User"
                                />
                            )}
                        </Navbar.Brand>
                        {(props.roleName === "Client" ||
                            props.roleName === "Seller") && (
                            <Button onClick={handleShow} className="btn-cart">
                                <div className={props.contNotify}>
                                    {props.notifyCount}
                                </div>
                                <img
                                    src="/images/icons/Navbar/cart.svg"
                                    alt="Phrase_Login"
                                />
                            </Button>
                        )}
                        <Navbar.Toggle
                            aria-controls={`offcanvasNavbar-expand-${expand}`}
                        />

                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                            className="navMenu-opened px-2"
                            style={{ width: "55%" }}
                        >
                            <Offcanvas.Header
                                closeButton
                                className="cont-nav-header border-bottom"
                            >
                                <Offcanvas.Title
                                    id={`offcanvasNavbarLabel-expand-${expand}`}
                                >
                                    <div className="cont-img-user-mobile">
                                        {props.user.foto === null ? (
                                            <img
                                                src="/images/profile_img/profile_default.jpg"
                                                alt="Photo User"
                                            />
                                        ) : (
                                            <img
                                                src={`/images/profile_img/${props.user.foto}`}
                                                alt="Photo User"
                                            />
                                        )}
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span>
                                                    <button
                                                        type="button"
                                                        className="ms-3 inline-flex items-center px-2 py-2  border-transparent fs-4 leading-4 font-medium rounded-md text-white-500  hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        {props.name}
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
                                                    method="post"
                                                    as="button"
                                                >
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </Offcanvas.Title>
                            </Offcanvas.Header>

                            <Offcanvas.Body className="canvas-body">
                                <div className="cont-mid-navbar h-75">
                                    <ul>
                                        <li>
                                            {props.roleName !==
                                                "Administrador" && (
                                                <NavLink
                                                    href={props.linkHome}
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
                                            {(props.roleName === "Client" ||
                                                props.roleName === "Seller" ||
                                                props.roleName ===
                                                    "Administrador") && (
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
                                            {props.roleName &&
                                                props.roleName !==
                                                    "Administrador" && (
                                                    <NavLink
                                                        href={
                                                            props.linkRegister
                                                        }
                                                        className="link-navbar"
                                                    >
                                                        <img
                                                            src="/images/icons/Navbar/register.svg"
                                                            alt="Phrase_Login"
                                                        />
                                                        Register
                                                    </NavLink>
                                                )}
                                        </li>
                                        <li>
                                            {props.roleName === "Client" ? (
                                                <NavLink
                                                    href={route(
                                                        "track.show",
                                                        props.user.id
                                                    )}
                                                    className="link-navbar"
                                                >
                                                    <img
                                                        src="/images/icons/Navbar/track.svg"
                                                        alt="Phrase_Login"
                                                    />
                                                    Track
                                                </NavLink>
                                            ) : (
                                                props.roleName &&
                                                props.roleName !==
                                                    "Administrador" && (
                                                    <NavLink
                                                        href={route(
                                                            "chat.index"
                                                        )}
                                                        className="link-navbar"
                                                    >
                                                        {props.notifyProccess && (
                                                            <div
                                                                className={
                                                                    props.notifyProccess
                                                                }
                                                            >
                                                                !
                                                            </div>
                                                        )}
                                                        <img
                                                            src="/images/icons/Navbar/chats.svg"
                                                            alt="Phrase_Login"
                                                        />
                                                        Chat
                                                    </NavLink>
                                                )
                                            )}
                                        </li>

                                        <li>
                                            {(props.roleName ===
                                                "Administrador" ||
                                                props.user.email ===
                                                    "admin@hotmail.com") && (
                                                <NavLink
                                                    href={route("users.index")}
                                                    className="link-navbar"
                                                >
                                                    <img
                                                        src="/images/icons/Navbar/users.svg"
                                                        alt="Phrase_Login"
                                                    />
                                                    Users
                                                </NavLink>
                                            )}
                                        </li>

                                        <li>
                                            {(props.roleName ===
                                                "Administrador" ||
                                                props.user.email ===
                                                    "admin@hotmail.com") && (
                                                <NavLink
                                                    href={route("roles.index")}
                                                    className="link-navbar"
                                                >
                                                    <img
                                                        src="/images/icons/Navbar/roles.svg"
                                                        alt="Phrase_Login"
                                                    />
                                                    Roles
                                                </NavLink>
                                            )}
                                        </li>
                                        <li>
                                            <hr className="divider" />
                                        </li>
                                        <li>
                                            <NavLink
                                                href={route("support.index")}
                                                className="link-navbar"
                                            >
                                                <img
                                                    src="/images/icons/Navbar/support.svg"
                                                    alt="Phrase_Login"
                                                />
                                                Support
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                                <div className="cont-bot-navbar-mobile">
                                    <div className="cont-img-logo-mobile">
                                        <img
                                            src="/images/0.log_view/NewLogo.svg"
                                            alt="Phrase_Login"
                                        />
                                    </div>
                                </div>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}

            <Offcanvas
                show={show}
                onHide={handleClose}
                placement="end"
                className="canvas w-75"
            >
                <Offcanvas.Header>
                    <Offcanvas.Title className="w-100">
                        <h2 className="cart-title">Your Order</h2>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="cart-body">{props.myCart}</div>
                    <div className="btn-order">
                        <ButonCreate
                            title="Add to Cart"
                            styleBtn=" rounded-5 bg-success w-75 border-0"
                            styleLink="text-white fw-bold text-decoration-none fs-5"
                            link={route("store.index")}
                        />
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default NavbarMobile;
