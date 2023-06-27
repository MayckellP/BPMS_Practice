import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ModalProduct from "./ModalProduct";

function CardRole(props) {
    return (
        <Card className="cont-card mx-2">
            <Card.Img
                variant="top"
                src={props.img}
                alt={props.infoImg}
                className="cont-card-img"
            />
            <Card.Body className="cont-card-body">
                <Card.Title className="card-title">{props.category}</Card.Title>
                <Card.Text></Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CardRole;
