import React, { Children, Component } from "react";
import PropTypes from "prop-types";
import { icon } from "../contants";

class EmptyTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: this.props.todo,
      tempoItem: this.props.tempoItem,
    };
  }
  addClick = () => {
    let pingTo = document.querySelector("#btn__add");
    pingTo.click();
  };
  componentDidMount() {}
  render() {
    return (
      <div
        className=" todo__item todo__item--empty"
        style={{
          "--order": `99999999999999999999`,
        }}
      >
        <button
          id="btn__ping"
          className=" todo__item__btn__ping"
          onClick={this.addClick}
        >
          {icon.add}
          <span>{this.props.children}</span>
        </button>
      </div>
    );
  }
}

EmptyTodo.propTypes = {
  children: PropTypes.any,
};

export default EmptyTodo;
