import React, { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.errors };
    const error = this.validateProperty(input);

    if (error) {
      errors[input.name] = error;
    } else {
      delete errors[input.name];
    }

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);

    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  doSubmit = e => {
    console.log("Submitted");
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();

    if (errors) {
      this.setState({ errors });
    } else {
      this.setState({ errors: {} });
    }

    this.doSubmit(e);
  };
}

export default Form;
