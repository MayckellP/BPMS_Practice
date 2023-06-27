import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import TranslateSelect from "./TranslateSelect";

const Footer = () => {
    return (
        <div className="bg-bot">
            <ul>
                <li className="copyRight">© MP-Solutions</li>
                <li>Privacy</li>
                <li>Terms</li>
                <li>Help</li>
            </ul>
            <div className="cont-dropdown">
                {/* <select
                    className="form-select-footer"
                    aria-label="Default select example"
                >
                    <option>Language</option>
                    <option defaultValue={"English"}>English</option>
                    <option defaultValue={"Spanish"}>Spanish</option>
                    <option defaultValue={"German"}>German</option>
                </select> */}
                <TranslateSelect />
            </div>
        </div>
    );
};

export default Footer;
