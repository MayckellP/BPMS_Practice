import Button from "react-bootstrap/Button";
import NavLink from "@/Components/NavLink";

function ButonCreate(props) {
    return (
        <>
            <Button
                variant="info"
                className={props.styleBtn}
                style={{ width: "48%" }}
            >
                <NavLink
                    href={props.link}
                    className={props.styleLink}
                    method={props.method}
                >
                    {props.title}
                </NavLink>
            </Button>
        </>
    );
}

export default ButonCreate;
