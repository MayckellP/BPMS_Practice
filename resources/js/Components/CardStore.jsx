import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ModalProduct from "./ModalProduct";

function CardStore(props) {
    return (
        <Card className="cont-card mx-2">
            <Card.Img
                variant="top"
                src={`/images/3.warehouse_view/${props.img}`}
                alt={props.infoImg}
                className="cont-card-img"
            />
            <Card.Body className="cont-card-body">
                <Card.Title className="card-title">{props.category}</Card.Title>
                <Card.Text>
                    <ModalProduct
                        btn_class="btn-card"
                        div_class=""
                        title={props.model}
                        icon=""
                        altIcon=""
                        headerModal="headerModal"
                        cont_titleModal="cont_titleModal"
                        img_class="w-75"
                        logoModal="/images/0.log_view/NewLogo-black.svg"
                        slogan_class="d-none"
                        sloganContent=""
                        img={`/images/3.warehouse_view/${props.img}`}
                        infoImg={props.infoImg}
                        category={props.category}
                        model={props.model}
                        infoProduct={props.infoProduct}
                        stockColor={props.stockColor}
                        clients={props.clients}
                    ></ModalProduct>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CardStore;
