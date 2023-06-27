import Table from "react-bootstrap/Table";
import TableBody from "./TableBody";

function TableRegister(props) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {/* <TableBody
                    id={props.id}
                    name={props.name}
                    email={props.email}
                    role={props.role}
                ></TableBody> */}
            </tbody>
        </Table>
    );
}

export default TableRegister;
