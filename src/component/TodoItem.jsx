import React, { Component } from "react";
import PropTypes from "prop-types";
import { icon } from "./icon";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: this.props.listTodo,
      tempoItem: this.props.tempoItem,
    };
    this.editToggle = this.editToggle.bind(this);
  }
  editToggle(todo) {
    this.setState({
      tempoItem: todo,
    });
  }
  editTodo = (e) => {
    let editTodo = { ...this.state.tempoItem };
    if (!e.target.value) {
      alert("Todo cant empty");
    } else {
      editTodo.title = e.target.value;
      this.setState({
        tempoItem: editTodo,
      });
    }
  };
  saveChange = () => {
    this.props.getItem(this.state.tempoItem);
    this.setState({
      tempoItem: {},
    });
  };
  render() {
    return (
      <div key={this.state.todo.id} className="todo__item">
        <div className="todo__create__at">
          <span className="todo__create__at__icon">[ ]</span>
          <span className="todo__create__at__time">
            {this.state.todo.createAt}
          </span>
        </div>
        <div className="todo__details">
          {Object.keys(this.state.tempoItem).length === 0 ? (
            <input
              className="todo__details__txt"
              value={this.state.todo.title}
              readOnly
            ></input>
          ) : (
            <input
              className="todo__details__txt"
              value={this.state.tempoItem.title}
              onChange={(e) => this.editTodo(e)}
            ></input>
          )}

          <div className="todo__details__action">
            {Object.keys(this.state.tempoItem).length === 0 ? (
              <button
                className="todo__details__action__btn--edit todo__details__action__btn"
                onClick={() => this.editToggle(this.state.todo)}
              >
                {icon.edit}
              </button>
            ) : (
              <button
                className="todo__details__action__btn--save todo__details__action__btn"
                onClick={this.saveChange}
              >
                {icon.save}
              </button>
            )}
            <button
              className="todo__details__action__btn--delete todo__details__action__btn"
              onClick={() => this.props.deleteTodo(this.state.todo)}
            >
              {icon.delete}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

TodoItem.propTypes = {};

export default TodoItem;
