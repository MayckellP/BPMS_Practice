import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SearchChat_Track = ({ onSearch }) => {
    const [searchText, setSearchText] = useState("");

    const dataCaptured = (e) => {
        setSearchText(e.target.value);
    };

    const goToSearch = () => {
        onSearch(searchText);
    };
    return (
        <div className="cont-search-chat">
            <div className="cont-input-search-chat">
                <Form.Control
                    type="text"
                    className="input-search-chat"
                    value={searchText}
                    onChange={dataCaptured}
                />

                <Button className="chat-cont-lupe" onClick={goToSearch}>
                    <img src="/images/icons/lupe.svg" alt="searcher" />
                </Button>
            </div>
        </div>
    );
};

export default SearchChat_Track;
