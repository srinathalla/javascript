import React from "react";
import Joi from "joi-browser";
import Input from "./input";
import Form from "./form";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: ""
    },
    errors: {}
  };

  doSubmit = async e => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status >= 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            onChange={this.handleChange}
            value={data.username}
            label="Username"
            error={errors.username}
          />
          <Input
            name="password"
            onChange={this.handleChange}
            value={data.password}
            label="Password"
            error={errors.password}
          />
          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
