import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./like";
import TableHeader from "./common/tableheader";
import TableBody from "./common/tablebody";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: item => <Link to={"/movies/" + item._id}> {item.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: item => (
        <Like liked={item.liked} onClick={() => this.props.onLike(item)} />
      )
    },
    {
      key: "delete",
      content: item => (
        <button
          onClick={() => this.props.onDelete(item)}
          className="bbtn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <table className="table">
        <TableHeader
          onSort={onSort}
          sortColumn={sortColumn}
          columns={this.columns}
        />

        <TableBody data={movies} columns={this.columns} />
      </table>
    );
  }
}

export default MoviesTable;
