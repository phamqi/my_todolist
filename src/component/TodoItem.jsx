import React, { Component } from "react";
import PropTypes from "prop-types";
import { icon } from "../contants";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: this.props.todo,
      tempoItem: this.props.tempoItem,
    };
    this.editToggle = this.editToggle.bind(this);
  }
  editToggle(e) {
    e.stopPropagation();
    let todo = this.state.todo;
    this.setState({
      tempoItem: todo,
    });
  }
  editTodo = (e) => {
    e.preventDefault();
    e.stopPropagation();
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

  saveChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.getItem(this.state.tempoItem);
    this.setState({
      tempoItem: {},
    });
  };
  onKeyPress = (e) => {
    if (e.key === "Enter") {
      document.getElementById("btn_save").click();
    }
  };
  returnSort = (sort, item) => {
    let method;
    switch (sort) {
      case "nameASC":
        method = item.title.charCodeAt(0);
        break;
      case "nameDESC":
        method = +item.title.charCodeAt(0) * -1;
        break;
      case "dateASC":
        method = item.id;
        break;
      case "dateDESC":
        method = +item.id * -1;
        break;
      default:
        method = item.id;
    }
    return method;
  };
  render() {
    let method = this.returnSort(this.props.sort, this.props.todo);
    return (
      <div
        pd={this.state.todo.id}
        key={this.state.todo.id}
        className="todo__item"
        style={{
          "--order": `${method}`,
        }}
      >
        <div className="todo__create__at">
          <span className="todo__create__at__icon">{icon.calendar}</span>
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
              onKeyPress={(e) => this.onKeyPress(e)}
            ></input>
          )}

          <div className="todo__details__action">
            {Object.keys(this.state.tempoItem).length === 0 ? (
              <button
                id="btn_edit"
                className="todo__details__action__btn--edit todo__details__action__btn"
                onClick={(e) => this.editToggle(e)}
              >
                {icon.edit}
              </button>
            ) : (
              <button
                id="btn_save"
                className="todo__details__action__btn--save todo__details__action__btn"
                onClick={(e) => this.saveChange(e)}
              >
                {icon.save}
              </button>
            )}
            <button
              id="btn_delete"
              className="todo__details__action__btn--delete todo__details__action__btn"
              onClick={(e) => this.props.deleteTodo(this.state.todo, e)}
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
