import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Button from "react-bootstrap/Button";
import ConfirmCLientModal from "@/Components/ConfirmCLientModal";
import ConfirmToProduceModal from "@/Components/ConfirmToProduceModal";
import ConfirmToDeliverModal from "@/Components/ConfirmToDeliverModal";
import SearchChat_Track from "@/Components/SearchChat_Track";
import Pusher from "pusher-js";
import moment from "moment";

export default function Index({
    auth,
    myFriends,
    myClients,
    employees,
    employeesToProduction,
    employeesToLogistic,
    allClients,
}) {
    var proccess = [];
    var countStep = 0;
    allClients.map((stepProccess) => {
        proccess.push({
            order_id: stepProccess.client.order_id,
            step1_Confirmed: stepProccess.client.confirmed,
            step2_date_to_produce: stepProccess.client.date_to_produce,
            step3_date_to_deliver: stepProccess.client.date_to_deliver,
            step4_sent_to: stepProccess.client.sent_to,
        });
    });

    const proccessCount = JSON.parse(sessionStorage.getItem("proccess"));
    const roleNametoTrack = JSON.parse(
        sessionStorage.getItem("currentUser")
    ).rolename;

    console.log("PROCCESS: ", proccess);
    //SHOW MY ROLENAME
    const roleName = JSON.parse(sessionStorage.getItem("currentUser")).rolename;

    console.log("My Friends: ", myFriends);
    console.log("Company Clients: ", allClients);

    //SHOW AND HIDE EVERY OPTION CHAT

    const [selectedTrack, setSelectedTrack] = useState(false);

    const [selectedTrackCompany, setSelectedTrackCompany] = useState(false);

    //FILTER TO SEARCH
    const [filteredData, setFilteredData] = useState(allClients);

    //FUNCTION SEARCH
    const goToSearchTrack = (e) => {
        const finalRegister = allClients.filter((itemRegister) =>
            itemRegister.client.model.toLowerCase().includes(e.toLowerCase())
        );
        setFilteredData(finalRegister);
    };

    const [trackDetails, setTrackDetails] = useState(true);

    const trackMobile = () => {
        if (window.innerWidth < 1000) {
            setTrackDetails(false);
        }
    };

    const trackClick = (trackChat) => {
        setSelectedTrack(trackChat);
    };

    const [showTrack, setShowTrack] = useState(false);

    const showTracksDetail = () => {
        setSelectedTrackCompany(true);
        setSelectedTrack(null);
    };

    const [globalTrack, setGlobalTrack] = useState(proccess);
    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher("b907c187a5da80746d68", {
            cluster: "eu",
        });
        const channel = pusher.subscribe("globalTrack-channel");
        channel.bind("globalTrack-message", function (data) {
            //alert(JSON.stringify(data));
            const newData = Object.entries(data);
            console.log("PUSHER DATA: ", newData[0][1]);
            setFilteredData(newData[0][1]);
        });
    }, []);

    console.log("saber que trae: ", selectedTrack);
    return (
        <AuthenticatedLayout user={auth.user} header={"Track"}>
            <Head title="Chat" />

            <div className="cont-global-chat">
                <div className="cont-chatBox">
                    {trackDetails && (
                        <div className="cont-chats">
                            <div className="cont-chat-track">
                                <div className="btn-chats-track">
                                    <Link href={route("chat.index")}>
                                        <Button
                                            className={"btn-track"}
                                            id="btn-chat"
                                        >
                                            <img
                                                src="/images/icons/general_Chat.svg"
                                                alt="chat"
                                            />
                                        </Button>
                                    </Link>

                                    <Link href={route("track.index")}>
                                        <Button
                                            className={"btn-track"}
                                            id="btn-track"
                                        >
                                            <img
                                                src="/images/icons/account_tree.svg"
                                                alt="chat"
                                            />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <SearchChat_Track onSearch={goToSearchTrack} />

                            {/* --------------------------------- SHOW TRACKS BOX */}

                            <div className="cont-tracks-global" id="tracksLeft">
                                <div
                                    className="chatMobile"
                                    onClick={trackMobile}
                                >
                                    <div
                                        className="cont-contact-trackCompany"
                                        onClick={showTracksDetail}
                                    >
                                        <div className="cont-trackCompany-foto my-2">
                                            <img
                                                src="/images/0.log_view/JustLogo.svg"
                                                alt="chat"
                                            />
                                        </div>
                                        <div className="cont-trackCompany-title">
                                            <h3>Company Team</h3>
                                            <span>
                                                <b>Show Tracks </b>
                                            </span>
                                        </div>
                                        {/* <div className="cont-trackCompany-sended"></div> */}
                                    </div>
                                </div>

                                <div className="cont-tracks-users">
                                    {filteredData.map((trackChat, index) => {
                                        let stepTrack = "";

                                        if (roleName === "Seller") {
                                            if (
                                                trackChat.client.confirmed ===
                                                null
                                            ) {
                                                stepTrack = "new Order";
                                            } else {
                                                stepTrack = "confirmed";
                                            }
                                            return (
                                                <div
                                                    className=""
                                                    onClick={trackMobile}
                                                >
                                                    <div
                                                        key={index}
                                                        className={
                                                            "con-contact-tracks-users"
                                                        }
                                                        onClick={() => {
                                                            trackClick(
                                                                trackChat
                                                            );
                                                        }}
                                                    >
                                                        <div className="cont-tracks-foto">
                                                            <img
                                                                src="/images/0.log_view/JustLogo.svg"
                                                                alt="chat"
                                                            />
                                                        </div>

                                                        <div className="cont-tracks-title">
                                                            <h3>
                                                                {
                                                                    trackChat
                                                                        .company
                                                                        .name
                                                                }
                                                            </h3>
                                                            <div className="w-100 d-flex justify-between">
                                                                <span className="fw-bold italic">
                                                                    {stepTrack}
                                                                </span>
                                                                <span>
                                                                    {
                                                                        trackChat
                                                                            .client
                                                                            .model
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {/* <div className="cont-tracks-sended">
                                                            <span>15 min.</span>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            );
                                        } else if (
                                            roleName === "Production Manager"
                                        ) {
                                            if (
                                                trackChat.client.confirmed !==
                                                null
                                            ) {
                                                if (
                                                    trackChat.client
                                                        .date_to_produce ===
                                                    null
                                                ) {
                                                    stepTrack = "new Order";
                                                } else {
                                                    stepTrack = "Confirmed";
                                                }
                                                return (
                                                    <div
                                                        className="chatMobile"
                                                        onClick={trackMobile}
                                                    >
                                                        <div
                                                            key={index}
                                                            className={
                                                                "con-contact-tracks-users"
                                                            }
                                                            onClick={() => {
                                                                trackClick(
                                                                    trackChat
                                                                );
                                                            }}
                                                        >
                                                            <div className="cont-tracks-foto">
                                                                <img
                                                                    src="/images/0.log_view/JustLogo.svg"
                                                                    alt="chat"
                                                                />
                                                            </div>

                                                            <div className="cont-tracks-title">
                                                                <h3>
                                                                    {
                                                                        trackChat
                                                                            .company
                                                                            .name
                                                                    }
                                                                </h3>
                                                                <div className="w-100 d-flex justify-between">
                                                                    <span className="fw-bold italic">
                                                                        {
                                                                            stepTrack
                                                                        }
                                                                    </span>
                                                                    <span>
                                                                        {
                                                                            trackChat
                                                                                .client
                                                                                .model
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            {/* <div className="cont-tracks-sended">
                                                                <span>
                                                                    15 min.
                                                                </span>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        } else if (
                                            roleName === "Logistic Manager"
                                        ) {
                                            if (
                                                trackChat.client
                                                    .date_to_produce !== null
                                            ) {
                                                if (
                                                    trackChat.client
                                                        .date_to_deliver ===
                                                    null
                                                ) {
                                                    stepTrack = "new Order";
                                                } else {
                                                    stepTrack = "Confirmed";
                                                }
                                                return (
                                                    <div
                                                        className="chatMobile"
                                                        onClick={trackMobile}
                                                    >
                                                        <div
                                                            key={index}
                                                            className={
                                                                "con-contact-tracks-users"
                                                            }
                                                            onClick={() => {
                                                                trackClick(
                                                                    trackChat
                                                                );
                                                            }}
                                                        >
                                                            <div className="cont-tracks-foto">
                                                                <img
                                                                    src="/images/0.log_view/JustLogo.svg"
                                                                    alt="chat"
                                                                />
                                                            </div>

                                                            <div className="cont-tracks-title">
                                                                <h3>
                                                                    {
                                                                        trackChat
                                                                            .company
                                                                            .name
                                                                    }
                                                                </h3>
                                                                <div className="w-100 d-flex justify-between">
                                                                    <span className="fw-bold italic">
                                                                        {
                                                                            stepTrack
                                                                        }
                                                                    </span>
                                                                    <span>
                                                                        {
                                                                            trackChat
                                                                                .client
                                                                                .model
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            {/* <div className="cont-tracks-sended">
                                                                <span>
                                                                    15 min.
                                                                </span>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ---------------------------------SHOW TRACKS BOX DETAILS */}
                    {selectedTrack ? (
                        <div className="cont-chatDetails">
                            <div className="trackDetails-top">
                                <Link
                                    href={route("track.index")}
                                    className="cont-back-chat"
                                >
                                    <img
                                        src="/images/icons/back_chat.svg"
                                        alt="chat"
                                    />
                                </Link>
                                <div className="cont-trackDetails-foto">
                                    <img
                                        src="/images/0.log_view/JustLogo.svg"
                                        alt="chat"
                                    />
                                </div>
                                <div className="cont-trackDetails-title">
                                    <h3>{selectedTrack.company.name}</h3>
                                    <span>
                                        {selectedTrack.client.model}
                                        {" - "}
                                        {selectedTrack.client.color}
                                        {" - "}
                                        {selectedTrack.client.quantity}
                                    </span>
                                </div>
                            </div>

                            <div className="trackDetails-mid">
                                <div className="cont-message-track">
                                    <div className="cont-message-track-foto">
                                        <img
                                            src="/images/0.log_view/JustLogo.svg"
                                            alt="chat_user"
                                        />
                                    </div>
                                    <div className="cont-message-track-title">
                                        <h3>
                                            Company Team -{" "}
                                            {selectedTrack.company.name}
                                        </h3>
                                        <div className="cont-message-track-content">
                                            <span>
                                                <b>Track: </b>
                                                <br />
                                                {selectedTrack.client
                                                    .date_to_produce == null
                                                    ? "Dept. Sales"
                                                    : selectedTrack.client
                                                          .date_to_deliver ===
                                                      null
                                                    ? "Dept. Production"
                                                    : selectedTrack.client
                                                          .sent_to === null
                                                    ? "Dept Logistic"
                                                    : "Delivered"}
                                            </span>
                                        </div>
                                        <span>15 min.</span>
                                    </div>
                                    <div className="cont-btns-track">
                                        <Link
                                            className="btn-show-proccess text-decoration-none"
                                            href={route(
                                                roleName === "Seller"
                                                    ? "deptSales.show"
                                                    : roleName ===
                                                      "Production Manager"
                                                    ? "deptProduction.show"
                                                    : "deptLogistic.show",
                                                selectedTrack.client.order_id
                                            )}
                                        >
                                            <span>Show Proccess</span>
                                            <div className="cont-proces-icon">
                                                <img
                                                    src="/images/icons/show.svg"
                                                    alt="chat_user"
                                                />
                                            </div>
                                        </Link>

                                        {selectedTrack.client.confirmed ===
                                            null &&
                                            roleName === "Seller" && (
                                                <ConfirmCLientModal
                                                    data={selectedTrack}
                                                    btn_class="btn-confirm-sale"
                                                    title="CONFIRM"
                                                    icon="/images/icons/claim.svg"
                                                    altIcon="claim_order"
                                                    modalTitle="Claim Title"
                                                    headerModal="headerModal"
                                                    cont_titleModal="cont_titleModal"
                                                    img_class="w-75"
                                                    logoModal="/images/0.log_view/NewLogo-black.svg"
                                                    slogan_class="slogan_class"
                                                />
                                            )}

                                        {/* EVERY BUTTON SHOULD MAKE A POST */}
                                        {roleName === "Warehouse employee" && (
                                            <ConfirmToProduceModal
                                                data={selectedTrack}
                                                btn_class="btn-start-proccess"
                                                title="START"
                                                icon="/images/icons/claim.svg"
                                                altIcon="claim_order"
                                                modalTitle="Claim Title"
                                                headerModal="headerModal"
                                                cont_titleModal="cont_titleModal"
                                                img_class="w-75"
                                                logoModal="/images/0.log_view/NewLogo-black.svg"
                                                slogan_class="slogan_class"
                                            />
                                        )}
                                        {selectedTrack.client.confirmed !==
                                            null &&
                                            selectedTrack.client
                                                .date_to_produce === null &&
                                            roleName ===
                                                "Production Manager" && (
                                                <ConfirmToProduceModal
                                                    dataOrder={selectedTrack}
                                                    dataEmployees={
                                                        employeesToProduction
                                                    }
                                                    btn_class="btn-start-proccess"
                                                    title="START"
                                                    icon="/images/icons/claim.svg"
                                                    altIcon="claim_order"
                                                    modalTitle="Claim Title"
                                                    headerModal="headerModal"
                                                    cont_titleModal="cont_titleModal"
                                                    img_class="w-75"
                                                    logoModal="/images/0.log_view/NewLogo-black.svg"
                                                    slogan_class="slogan_class"
                                                />
                                            )}
                                        {selectedTrack.client
                                            .date_to_produce !== null &&
                                            selectedTrack.client
                                                .date_to_deliver === null &&
                                            roleName === "Logistic Manager" && (
                                                <ConfirmToDeliverModal
                                                    dataOrder={selectedTrack}
                                                    dataEmployees={
                                                        employeesToLogistic
                                                    }
                                                    btn_class="btn-start-proccess"
                                                    title="START"
                                                    icon="/images/icons/claim.svg"
                                                    altIcon="claim_order"
                                                    modalTitle="Claim Title"
                                                    headerModal="headerModal"
                                                    cont_titleModal="cont_titleModal"
                                                    img_class="w-75"
                                                    logoModal="/images/0.log_view/NewLogo-black.svg"
                                                    slogan_class="slogan_class"
                                                />
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : selectedTrackCompany ? (
                        <div className="cont-chatDetails">
                            <div className="trackDetails-top">
                                <Link
                                    href={route("track.index")}
                                    className="cont-back-chat"
                                >
                                    <img
                                        src="/images/icons/back_chat.svg"
                                        alt="chat"
                                    />
                                </Link>
                                <div className="cont-trackDetails-foto">
                                    <img
                                        src="/images/0.log_view/JustLogo.svg"
                                        alt="chat"
                                    />
                                </div>
                                <div className="cont-trackDetails-title">
                                    <h3>Company Team</h3>
                                    <span>
                                        {employees.length}
                                        {employees.length > 1
                                            ? " members..."
                                            : " member..."}
                                    </span>
                                </div>
                            </div>

                            <div className="trackDetails-mid">
                                {filteredData.map(
                                    (client, index) =>
                                        client.client.confirmed !== null && (
                                            <div
                                                className="cont-message-track"
                                                key={index}
                                            >
                                                <div className="cont-message-track-foto">
                                                    <img
                                                        src="/images/0.log_view/JustLogo.svg"
                                                        alt="chat_user"
                                                    />
                                                </div>
                                                <div className="cont-message-track-title">
                                                    <h3>
                                                        {client.company.name} -{" "}
                                                        {client.client.model}
                                                    </h3>
                                                    <div className="cont-message-track-content">
                                                        <span>
                                                            <b>Track: </b>
                                                            <br />
                                                            {client.client
                                                                .date_to_produce ==
                                                            null
                                                                ? "Dept. Sales"
                                                                : client.client
                                                                      .date_to_deliver ===
                                                                  null
                                                                ? "Dept. Production"
                                                                : client.client
                                                                      .sent_to ===
                                                                  null
                                                                ? "Dept Logistic"
                                                                : "Delivered"}
                                                        </span>
                                                    </div>
                                                    <span>15 min.</span>
                                                </div>
                                                <div className="cont-btns-track">
                                                    <Link
                                                        className="btn-show-proccess text-decoration-none"
                                                        href={route(
                                                            roleName ===
                                                                "Seller"
                                                                ? "deptSales.show"
                                                                : roleName ===
                                                                  "Production Manager"
                                                                ? "deptProduction.show"
                                                                : "deptLogistic.show",
                                                            client.client
                                                                .order_id
                                                        )}
                                                    >
                                                        <span>
                                                            Show Proccess
                                                        </span>
                                                        <div className="cont-proces-icon">
                                                            <img
                                                                src="/images/icons/show.svg"
                                                                alt="chat_user"
                                                            />
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                )}
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
