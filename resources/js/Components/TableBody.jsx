function TableBody(props) {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>{props.role}</td>
        </tr>
    );
}

export default TableBody;
