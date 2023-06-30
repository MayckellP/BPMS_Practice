import { useState, useEffect, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SearchChat_Track from "@/Components/SearchChat_Track";
import Pusher from "pusher-js";
import moment from "moment";

export default function Chat({
    auth,
    myFriends,
    employees,
    allClients,
    chats,
    myEmployeeID,
}) {
    var proccess = [];
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
    var notifyProccess;
    if (roleNametoTrack === "Client") {
    } else if (roleNametoTrack === "Admin") {
    } else if (roleNametoTrack === "Seller") {
        if (proccessCount.confirmedCount > 0) {
            notifyProccess = "notifyProccess";
        } else {
            notifyProccess = "d-none";
        }
    } else if (roleNametoTrack === "Production Manager") {
        if (proccessCount.date_to_produceCount > 0) {
            notifyProccess = "notifyProccess";
        } else {
            notifyProccess = "d-none";
        }
    } else if (roleNametoTrack === "Logistic Manager") {
        if (proccessCount.date_to_deliverCount > 0) {
            notifyProccess = "notifyProccess";
        } else {
            notifyProccess = "d-none";
        }
    }

    //SHOW MY ROLENAME
    const roleName = JSON.parse(sessionStorage.getItem("currentUser")).rolename;

    //SHOW AND HIDE EVERY OPTION CHAT
    const [selectedFriend, setSelectedFriend] = useState(null);

    const [selectedChatCompany, setSelectedChatCompany] = useState(false);

    //FILTER TO SEARCH
    const [filteredFriend, setFilteredFriend] = useState(myFriends);

    //ADD PUSHER
    var [allMessage, setAllMessage] = useState([]);

    //FUNCTION SEARCH
    const goToSearchFriend = (e) => {
        const finalRegister = myFriends.filter((itemRegister) =>
            itemRegister.name.toLowerCase().includes(e.toLowerCase())
        );

        setFilteredFriend(finalRegister);
    };

    //FUNCTION TO SCROLL
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const [chatDetails, setChatDetails] = useState(true);

    const chatMobile = () => {
        if (window.innerWidth < 1000) {
            setChatDetails(false);
        }
    };

    const chatClick = (myFriend) => {
        setSelectedFriend(myFriend);
        const privateChannel = `${myEmployeeID} - ${myFriend.id}`;
        setData("channel", privateChannel);
    };

    const showChatsDetail = () => {
        setSelectedChatCompany(true);
        setSelectedFriend(null);
        const companyChannel = "Company_Channel";
        setData("channel", companyChannel);
        if (window.innerWidth < 1000) {
            const mobileLeft = document.getElementById("chatsLeft");
            mobileLeft.style.display = "none";
        }
    };
    scrollToBottom();

    var [messageChannel, setMessageChannel] = useState();
    var [companyMessageChannel, setCompanyMessageChannel] = useState();
    const [arrCount, setArrCount] = useState([]);

    //PUSHER
    const [messages, setMessages] = useState(chats);
    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher("b907c187a5da80746d68", {
            cluster: "eu",
        });

        const channel = pusher.subscribe("company-channel");
        channel.bind("message", function (data) {
            allMessage.push(data);

            setMessages((prevMessages) => [...prevMessages, data]);
            scrollToBottom();
        });
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        message: "",
        channel: "",
        user_id: auth.user.id,
    });

    const submit = (e) => {
        post(route("chat.store"));
        e.preventDefault();
        setData("message", "");
    };

    companyMessageChannel = allMessage.find(
        (channel) => channel.channel === "Company_Channel"
    );

    return (
        <AuthenticatedLayout user={auth.user} header={"Chat"}>
            <Head title="Chat" />

            <div className="cont-global-chat">
                <div className="cont-chatBox">
                    {chatDetails && (
                        <div className="cont-chats" id="chatsLeft">
                            <div className="cont-chat-track">
                                <div className="btn-chats-track">
                                    <Link href={route("chat.index")}>
                                        <Button
                                            className="btn-chat"
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
                                            className="btn-track"
                                            id="btn-track"
                                        >
                                            {roleName !== "Warehouse" && (
                                                <div className={notifyProccess}>
                                                    !
                                                </div>
                                            )}
                                            <img
                                                src="/images/icons/account_tree.svg"
                                                alt="chat"
                                            />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <SearchChat_Track onSearch={goToSearchFriend} />

                            {/* --------------------------------- SHOW CHATS BOX */}
                            <div className="cont-chats-global">
                                <div
                                    className="chatMobile"
                                    onClick={chatMobile}
                                ></div>
                                <div
                                    className="cont-contact-chatCompany"
                                    onClick={showChatsDetail}
                                >
                                    <div className="cont-chatCompany-foto my-2">
                                        <img
                                            src="/images/0.log_view/JustLogo.svg"
                                            alt="chat"
                                        />
                                    </div>
                                    <div className="cont-chatCompany-title">
                                        <h3>Company Team</h3>
                                        {companyMessageChannel ? (
                                            <span className="fw-bold text-danger">
                                                New Messages
                                            </span>
                                        ) : (
                                            <span>Show Messages</span>
                                        )}
                                    </div>
                                    <div className="cont-chatCompany-sended">
                                        <span></span>
                                    </div>
                                </div>

                                <div className="cont-chats-users">
                                    {filteredFriend.map((myFriend) => {
                                        allMessage.forEach((channel) => {
                                            if (
                                                `${myFriend.id} - ${myEmployeeID}` ===
                                                channel.channel
                                            ) {
                                                arrCount.push({
                                                    myChannel: channel.channel,
                                                });
                                            }
                                        });
                                        messageChannel = arrCount.find(
                                            (channel) =>
                                                channel.myChannel ===
                                                `${myFriend.id} - ${myEmployeeID}`
                                        );
                                        return (
                                            <div
                                                className=""
                                                onClick={chatMobile}
                                            >
                                                <div
                                                    className="con-contact-chat-users"
                                                    key={myFriend.id}
                                                    onClick={() =>
                                                        chatClick(myFriend)
                                                    }
                                                >
                                                    <div className="cont-chat-foto my-2">
                                                        {myFriend.foto ===
                                                        null ? (
                                                            <img
                                                                src="/images/profile_img/profile_default.jpg"
                                                                alt="Photo User"
                                                            />
                                                        ) : (
                                                            <img
                                                                src={`/images/profile_img/${myFriend.foto}`}
                                                                alt="Photo User"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="cont-chat-title">
                                                        <h3>
                                                            {myFriend.name}{" "}
                                                        </h3>
                                                        {messageChannel ? (
                                                            <span className="fw-bold text-danger">
                                                                New Message
                                                            </span>
                                                        ) : (
                                                            <span>
                                                                Show Message
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="cont-chat-sended">
                                                        <span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ---------------------------------SHOW CHATS BOX DETAILS */}
                    {selectedFriend ? (
                        <div className="cont-chatDetails" id="chat-right">
                            <div className="chatDetails-top">
                                <Link
                                    href={route("chat.index")}
                                    className="cont-back-chat"
                                >
                                    <img
                                        src="/images/icons/back_chat.svg"
                                        alt="chat"
                                    />
                                </Link>
                                <div className="cont-chatDetails-foto">
                                    <img
                                        src="/images/0.log_view/JustLogo.svg"
                                        alt="chat"
                                    />
                                </div>
                                <div className="cont-chatDetails-title">
                                    <h3>{selectedFriend.name}</h3>
                                    <span>
                                        {employees.length}
                                        {employees.length > 1
                                            ? " members..."
                                            : " member..."}
                                    </span>
                                </div>
                            </div>

                            <div className="chatDetails-mid">
                                {messages.map(
                                    (message, index) =>
                                        (message.channel ===
                                            `${myEmployeeID} - ${selectedFriend.id}` ||
                                            message.channel ===
                                                `${selectedFriend.id} - ${myEmployeeID}`) &&
                                        (message.channel ===
                                        `${myEmployeeID} - ${selectedFriend.id}` ? (
                                            <div
                                                className="cont-myMessage"
                                                key={index}
                                            >
                                                <div className="cont-message-foto">
                                                    <div className="foto-img">
                                                        {auth.user.foto ===
                                                        null ? (
                                                            <img
                                                                src="/images/profile_img/profile_default.jpg"
                                                                alt="Photo User"
                                                            />
                                                        ) : (
                                                            <img
                                                                src={`/images/profile_img/${auth.user.foto}`}
                                                                alt="Photo User"
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="cont-myMessage-title">
                                                    <h3>Me</h3>
                                                    <div className="cont-myMessage-content">
                                                        <span>
                                                            {message.message}
                                                        </span>
                                                    </div>
                                                    <span>
                                                        {moment(
                                                            message.created_at
                                                        ).fromNow()}
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className="cont-message"
                                                key={index}
                                            >
                                                <div className="cont-message-foto">
                                                    <div className="foto-img">
                                                        {selectedFriend.foto ===
                                                        null ? (
                                                            <img
                                                                src="/images/profile_img/profile_default.jpg"
                                                                alt="Photo User"
                                                            />
                                                        ) : (
                                                            <img
                                                                src={`/images/profile_img/${selectedFriend.foto}`}
                                                                alt="Photo User"
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="cont-message-title">
                                                    <h3>
                                                        {selectedFriend.name}
                                                    </h3>
                                                    <div className="cont-message-content">
                                                        <span>
                                                            {message.message}
                                                        </span>
                                                    </div>
                                                    <span>
                                                        {moment(
                                                            message.created_at
                                                        ).fromNow()}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="chatDetails-bot">
                                <form onSubmit={submit}>
                                    <div className="cont-text-message">
                                        <Form.Control
                                            type="text"
                                            className="input-message"
                                            placeholder="New Message"
                                            value={data.message}
                                            onChange={(e) =>
                                                setData(
                                                    "message",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <Button
                                            className="cont-btn-message"
                                            type="submit"
                                        >
                                            <span>Send</span>
                                            <img
                                                src="/images/icons/send.svg"
                                                alt="searcher"
                                            />
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) : selectedChatCompany ? (
                        <div className="cont-chatDetails">
                            <div className="chatDetails-top">
                                <Link
                                    href={route("chat.index")}
                                    className="cont-back-chat"
                                >
                                    <img
                                        src="/images/icons/back_chat.svg"
                                        alt="chat"
                                    />
                                </Link>
                                <div className="cont-chatDetails-foto">
                                    <img
                                        src="/images/0.log_view/JustLogo.svg"
                                        alt="chat"
                                    />
                                </div>
                                <div className="cont-chatDetails-title">
                                    <h3>Company Team</h3>
                                    <span>
                                        {employees.length}
                                        {employees.length > 1
                                            ? " members..."
                                            : " member..."}
                                    </span>
                                </div>
                            </div>

                            <div className="chatDetails-mid">
                                {messages.map(
                                    (message, index) =>
                                        message.channel === "Company_Channel" &&
                                        (message.user_id == auth.user.id ? (
                                            <div
                                                className="cont-myMessage"
                                                key={index}
                                            >
                                                <div className="cont-message-foto">
                                                    <div className="foto-img">
                                                        {auth.user.foto ===
                                                        null ? (
                                                            <img
                                                                src="/images/profile_img/profile_default.jpg"
                                                                alt="Photo User"
                                                            />
                                                        ) : (
                                                            <img
                                                                src={`/images/profile_img/${auth.user.foto}`}
                                                                alt="Photo User"
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="cont-myMessage-title">
                                                    <h3>Me</h3>
                                                    <div className="cont-myMessage-content">
                                                        <span>
                                                            {message.message}
                                                        </span>
                                                    </div>
                                                    <span>
                                                        {moment(
                                                            message.created_at
                                                        ).fromNow()}
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            employees.map(
                                                (employee, index) =>
                                                    employee.user_id ===
                                                        message.user_id && (
                                                        <div
                                                            className="cont-message"
                                                            key={index}
                                                        >
                                                            <div className="cont-message-foto">
                                                                <div className="foto-img">
                                                                    {employee.foto ===
                                                                    null ? (
                                                                        <img
                                                                            src="/images/profile_img/profile_default.jpg"
                                                                            alt="Photo User"
                                                                        />
                                                                    ) : (
                                                                        <img
                                                                            src={`/images/profile_img/${employee.foto}`}
                                                                            alt="Photo User"
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="cont-message-title">
                                                                <h3 key={index}>
                                                                    {
                                                                        employee.name
                                                                    }
                                                                </h3>

                                                                <div className="cont-message-content">
                                                                    <span>
                                                                        {
                                                                            message.message
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <span>
                                                                    {moment(
                                                                        message.created_at
                                                                    ).fromNow()}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )
                                            )
                                        ))
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="chatDetails-bot">
                                <form onSubmit={submit}>
                                    <div className="cont-text-message">
                                        <Form.Control
                                            type="text"
                                            className="input-message"
                                            placeholder="New Message"
                                            value={data.message}
                                            onChange={(e) =>
                                                setData(
                                                    "message",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <Button
                                            className="cont-btn-message"
                                            type="submit"
                                        >
                                            <span>Send</span>
                                            <img
                                                src="/images/icons/send.svg"
                                                alt="searcher"
                                            />
                                        </Button>
                                    </div>
                                </form>
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
