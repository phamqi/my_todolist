import React, { Component } from "react";

class AddTodo extends Component {
  state = {
    valueInput: "",
  };
  onChange = (e) => {
    this.setState({
      valueInput: e.target.value,
    });
  };
  handleClick = () => {
    this.props.addTodo(this.state.valueInput);
    this.setState({
      valueInput: "",
    });
  };
  onKeyPress = (e) => {
    if (e.key === "Enter") {
      this.props.addTodo(this.state.valueInput);
      this.setState({
        valueInput: "",
      });
    }
  };
  componentDidUpdate() {
    if (this.props.dialog === true) {
      document.getElementById("todo__txt").focus();
    }
  }
  render() {
    return (
      <div
        className={
          this.props.dialog ? "list__popup  list__popup--show" : "list__popup"
        }
      >
        <div className="list__popup__content">
          <div className="list__popup__content__title">CREATE TO DO</div>
          <div className="list__popup__content__txt">
            <input
              id="todo__txt"
              className="list__popup__content__txt__input"
              type="text"
              value={this.state.valueInput}
              onChange={this.onChange}
              onKeyPress={this.onKeyPress}
            />
          </div>
        </div>
        <div className="list__popup__action">
          <button
            className="list__popup__action__btn list__popup__action__btn__save"
            onClick={this.handleClick}
          >
            Create
          </button>
          <button
            className="list__popup__action__btn list__popup__action__btn__cancel"
            onClick={this.props.hiddenDialog}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default AddTodo;
