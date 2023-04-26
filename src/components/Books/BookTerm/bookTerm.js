import React from "react";
import {Link} from "react-router-dom";

const bookTerm = (props) => {
    return (
        <tr>
            <td scope={"col"}>{props.term.name}</td>
            <td scope={"col"}>{props.term.author.name + " " + props.term.author.surname}</td>
            <td scope={"col"}>{props.term.category}</td>
            <td scope={"col"}>{props.term.availableCopies}</td>
            <td scope={"col"} className="text-right">
                <a title={"Delete"} className={"btn btn-danger me-2"}
                   onClick={() => props.onDelete(props.term.id)}>
                    Delete
                </a>
                <Link className="btn btn-info me-2"
                      onClick={() => props.onEdit(props.term.id)}
                      to={`/books/edit/${props.term.id}`}>
                    Edit
                </Link>
                {props.term.availableCopies ? (
                    <button className={"btn btn-success"}
                            onClick={() => props.onRentBook(props.term.id)}>
                        Rent the book</button>
                ) : (
                    <button className={"btn btn-secondary"}
                            disabled
                            onClick={() => props.onRentBook(props.term.id)}>
                        Rent the book</button>
                )}
            </td>
        </tr>
    )
}

export default bookTerm;