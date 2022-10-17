import React, { Component } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TodoItem from "./TodoItem";
import Done from "./Done";
import { icon } from "../contants";
import AddTodo from "./AddTodo";
import EmptyTodo from "./EmptyTodo";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listTodo: [],
      tempoItem: {},
      hold: false,
      dialog: false,
      sort: {
        name: false,
        asc: true,
      },
      emptyTodo: true,
    };
  }

  saveChange = (childData) => {
    let { listTodo } = this.state;
    let index = listTodo.findIndex((item) => item.id === childData.id);
    if (childData.title === listTodo[index].title) {
      this.setState({
        tempoItem: {},
      });
    } else {
      listTodo[index].title = childData.title;
      this.setState({
        listTodo: listTodo,
      });
      toast.success("🦄 Update successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  deleteTodo = (todo) => {
    let { listTodo } = this.state;
    listTodo = listTodo.filter((item) => item.id != todo.id);
    this.setState({
      listTodo: listTodo,
      tempoItem: {},
    });
    toast.error("🦄 Delete complete!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  dragDrop = () => {
    let { listTodo } = this.state;
    let x, y;
    let hold = false;
    let innerZone = false;
    let pd;
    let todoItem = document.querySelectorAll(".todo__create__at");
    let todo_tempo = document.getElementById("todo_tempo");
    let todo__done = document.querySelector("#todo__done");
    let minX = todo__done.getBoundingClientRect().left;
    let maxX = todo__done.getBoundingClientRect().right;
    let minY = todo__done.getBoundingClientRect().top;
    let maxY = todo__done.getBoundingClientRect().bottom;
    todoItem.forEach((item) => {
      item.addEventListener("mouseup", function (e) {
        hold = false;
        todo_tempo.innerHTML = "";
      });
      item.addEventListener("mousedown", function (e) {
        hold = true;
        todo_tempo.innerHTML = `${item.parentElement.outerHTML}`;
        pd = item.parentElement.getAttribute("pd");
      });
      item.addEventListener("touchmove", function (e) {
        hold = true;
        var touchLocation = e.targetTouches[0];
        let x = touchLocation.pageX;
        let y = touchLocation.pageY;
        if (hold) {
          todo_tempo.innerHTML = `${item.parentElement.outerHTML}`;
          pd = item.parentElement.getAttribute("pd");
          todo_tempo.style.left = `${x - 100}px`;
          todo_tempo.style.top = `${y}px`;
        }
        if (x > minX && y > minY && x < maxX && y < maxY) {
          innerZone = true;
          if (hold) {
            todo__done.classList.add("hover");
          }
        } else {
          innerZone = false;
          todo__done.classList.remove("hover");
        }
      });
    });
    window.addEventListener("mousemove", (e) => {
      x = e.clientX;
      y = e.clientY;
      if (x > minX && y > minY && x < maxX && y < maxY) {
        innerZone = true;
        if (hold) {
          todo__done.classList.add("hover");
        }
      } else {
        innerZone = false;
        todo__done.classList.remove("hover");
      }
      e.preventDefault();
      todo_tempo.style.left = `${x - 100}px`;
      todo_tempo.style.top = `${y}px`;
    });
    todo_tempo.addEventListener("mouseup", () => {
      if (innerZone && hold) {
        let index = listTodo.findIndex((item) => item.id === +pd);
        listTodo[index].state = 1;
        this.setState({
          listTodo: listTodo,
        });
      }
      todo_tempo.innerHTML = "";
      hold = false;
    });
    window.addEventListener("touchend", (e) => {
      if (innerZone && hold) {
        let index = listTodo.findIndex((item) => item.id === +pd);
        listTodo[index].state = 1;
        this.setState({
          listTodo: listTodo,
        });
      }
      todo_tempo.innerHTML = "";
      todo__done.classList.remove("hover");
      hold = false;
    });
  };

  componentDidMount() {
    const list = localStorage.getItem("listTodo");
    this.setState({
      listTodo: JSON.parse(list),
    });
    this.dragDrop();
  }
  componentDidUpdate() {
    localStorage.setItem("listTodo", JSON.stringify(this.state.listTodo));
    this.dragDrop();
  }
  showDialog = () => {
    this.setState({
      dialog: true,
    });
  };
  hiddenDialog = () => {
    this.setState({
      dialog: false,
    });
  };
  addTodo = (value) => {
    if (!value) {
      alert("Todo cant empty");
    } else {
      let d = new Date();
      let id = Math.round(Date.now());
      let todo = {
        id: id,
        title: value,
        createAt: d.toUTCString(),
        state: 0,
      };
      let tempoTodo = this.state.listTodo || [];
      tempoTodo.push(todo);
      this.setState({
        listTodo: tempoTodo,
        dialog: false,
      });
    }
  };
  nameToggle = () => {
    let { sort } = this.state;
    sort.name = !sort.name;
    this.setState({
      sort: sort,
    });
  };
  ascToggle = () => {
    let { sort } = this.state;
    sort.asc = !sort.asc;
    this.setState({
      sort: sort,
    });
  };
  sortFnc = (sort) => {
    if (sort.name) {
      if (sort.asc) {
        return "nameASC";
      } else {
        return "nameDESC";
      }
    } else {
      if (sort.asc) {
        return "dateASC";
      } else {
        return "dateDESC";
      }
    }
  };
  render() {
    let { listTodo } = this.state;
    let sortMethod = this.sortFnc(this.state.sort);
    return (
      <>
        <div>
          <h2>TO DO LIST</h2>
          <div className="container">
            <div className="todo__sort">
              Sort:
              <button
                className="todo__sort__btn--method todo__sort__btn"
                onClick={this.nameToggle}
              >
                {this.state.sort.name ? "Name" : "Date"}
              </button>
              <button
                className="todo__sort__btn--az todo__sort__btn"
                onClick={this.ascToggle}
              >
                {this.state.sort.asc ? "ASC" : "DESC"}
              </button>
            </div>
            <div className="list__content">
              <div className="todo__wrapper">
                <div className="todo__header">
                  <div className="todo__title">to do</div>
                  <button
                    className="todo__btn--add"
                    onClick={this.showDialog}
                    id="btn__add"
                  >
                    {icon.add}New task
                  </button>
                </div>
                <div className="todo__list">
                  <div className="todo__list__empty"></div>
                  {Array.isArray(listTodo) &&
                    listTodo.length > 0 &&
                    listTodo.map((item) =>
                      item.state === 0 ? (
                        <TodoItem
                          key={item.id}
                          todo={item}
                          tempoItem={this.state.tempoItem}
                          getItem={this.saveChange}
                          deleteTodo={this.deleteTodo}
                          sort={sortMethod}
                        />
                      ) : (
                        ""
                      )
                    )}
                  <EmptyTodo>Add to do</EmptyTodo>
                </div>
              </div>
              <Done listTodo={listTodo} />
            </div>
          </div>
        </div>
        <AddTodo
          hiddenDialog={this.hiddenDialog}
          addTodo={this.addTodo}
          dialog={this.state.dialog}
        />
        <div id="todo_tempo" className="todo__item__tempo"></div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ToastContainer />
      </>
    );
  }
}

TodoList.propTypes = {};

export default TodoList;
