import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import { getGenres } from "../services/genreService";
import { saveMovie } from "../services/fakeMovieService";

class NewMovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],

    errors: {}
  };

  async componentDidMount() {
    let { data: genres } = await getGenres();

    this.setState({
      genres
    });
  }

  schema = {
    _id: Joi.string().allow(""),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };

  doSubmit = e => {
    saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    const { data, errors, genres } = this.state;
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="title"
            onChange={this.handleChange}
            value={data.title}
            label="Title"
            error={errors.title}
          />
          <Select
            name="genreId"
            onChange={this.handleChange}
            value={data.genreId}
            label="Genre"
            error={errors.genreId}
            genres={genres}
          />
          <Input
            name="numberInStock"
            onChange={this.handleChange}
            value={data.numberInStock}
            label="Number in Stock"
            error={errors.numberInStock}
          />
          <Input
            name="dailyRentalRate"
            onChange={this.handleChange}
            value={data.dailyRentalRate}
            label="Daily Rental Rate"
            error={errors.dailyRentalRate}
          />
          <button disabled={this.validate()} className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default NewMovieForm;
