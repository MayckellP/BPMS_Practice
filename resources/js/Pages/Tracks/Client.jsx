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

export default function Index({ auth, myOrdersTrack }) {
    var proccess = [];
    myOrdersTrack.map((stepProccess) => {
        proccess.push({
            order_id: stepProccess.order_id,
            step1_Confirmed: stepProccess.confirmed,
            step2_date_to_produce: stepProccess.date_to_produce,
            step3_date_to_deliver: stepProccess.date_to_deliver,
            step4_sent_to: stepProccess.sent_to,
        });
    });

    const proccessCount = JSON.parse(sessionStorage.getItem("proccess"));
    //SHOW AND HIDE EVERY OPTION CHAT

    console.log("My Orders: ", myOrdersTrack);

    const [selectedTrack, setSelectedTrack] = useState(false);

    const [selectedTrackCompany, setSelectedTrackCompany] = useState(false);

    //FILTER TO SEARCH
    const [filteredData, setFilteredData] = useState(myOrdersTrack);

    //FUNCTION SEARCH
    const goToSearchTrack = (e) => {
        const finalRegister = myOrdersTrack.filter((itemRegister) =>
            itemRegister.model.toLowerCase().includes(e.toLowerCase())
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

    //const [globalTrack, setGlobalTrack] = useState(proccess);
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

            console.log("NEW PUSHER DATA: ", newData);
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
                                {/* <div className="btn-chats-track">
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

                                    <Link href={route("track.show")}>
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
                                </div> */}
                            </div>
                            <SearchChat_Track onSearch={goToSearchTrack} />

                            {/* --------------------------------- SHOW TRACKS BOX */}

                            <div className="cont-tracks-global" id="tracksLeft">
                                <div className="chatMobile">
                                    <div className="cont-contact-trackCompany">
                                        <div className="cont-trackCompany-foto my-2">
                                            <img
                                                src="/images/0.log_view/JustLogo.svg"
                                                alt="chat"
                                            />
                                        </div>
                                        <div className="cont-trackCompany-title">
                                            <h3>Your Products</h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="cont-tracks-users">
                                    {filteredData.map((trackChat, index) => {
                                        let stepTrack = "";

                                        return (
                                            <div
                                                className=""
                                                onClick={trackMobile}
                                                key={index}
                                            >
                                                <div
                                                    className={
                                                        "con-contact-tracks-users"
                                                    }
                                                    onClick={() => {
                                                        trackClick(trackChat);
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
                                                                trackChat.client
                                                                    .model
                                                            }
                                                        </h3>
                                                        <div className="w-100 d-flex justify-between">
                                                            <span className="fw-bold italic">
                                                                {
                                                                    trackChat
                                                                        .client
                                                                        .category
                                                                }
                                                            </span>
                                                            <span>
                                                                {
                                                                    trackChat
                                                                        .client
                                                                        .quantity
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
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
                                    <h3>{selectedTrack.client.model}</h3>
                                    <span>
                                        {selectedTrack.client.color} {" - "}
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
                                            {selectedTrack.company.name} -{" "}
                                            {selectedTrack.client.model}
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
                                                "orders.show",
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
                                    </div>
                                </div>
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
