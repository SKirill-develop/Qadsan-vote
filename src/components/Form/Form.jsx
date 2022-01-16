import React from "react";
import stylesForm from "./Form.module.css";
import { Button, Form } from "react-bootstrap";

class MainForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      StellarWallet: "",
      AmountDay: "",
      SuccessSend: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch("https://qadsan.vote/send.php", {
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => response.text())
      .then((response) => {
        console.log(response);
        if (response === "success") {
          this.setState({ 
            StellarWallet: "",
            AmountDay: "",
            SuccessSend: true, })
        }
      });
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className={stylesForm.form}>
        <div className="container">
          <Form onSubmit={this.handleSubmit}>
            <div className="mb-5">
              <Form.Group className="mb-3" controlId="formBasicStellar">
                <Form.Label>Your stellar address</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  name="StellarWallet"
                  value={this.state.StellarWallet}
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicNumber">
                <Form.Label>Amount Days</Form.Label>
                <Form.Control
                  type="number"
                  className="form-control"
                  name="AmountDay"
                  value={this.state.AmountDay}
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>
            </div>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
          {this.state.SuccessSend && <p>Sucessfully sent</p>}
        </div>
      </div>
    );
  }
}

export default MainForm;
