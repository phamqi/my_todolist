import React, { Component } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TodoItem from "./TodoItem";
import Done from "./Done";
import { icon } from "./icon";

class TodoList extends Component {
  state = {
    listTodo: [
      { id: 1, title: "alo alo", createAt: "to day", state: 0 },
      { id: 2, title: "blo alo", createAt: "to day", state: 0 },
      { id: 3, title: "clo alo", createAt: "to day", state: 0 },
    ],
    tempoItem: {},
  };
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
  render() {
    let { listTodo } = this.state;
    return (
      <>
        <div>
          <h2>TO DO LIST</h2>
          <div className="list__content">
            <div className="todo__wrapper">
              <div className="todo__header">
                <div className="todo__title">to do</div>
                <button className="todo__btn--add">{icon.add}New task</button>
              </div>
              <div className="todo__list">
                {listTodo &&
                  listTodo.length > 0 &&
                  listTodo.map((item) =>
                    item.state === 0 ? (
                      <TodoItem
                        key={item.id}
                        listTodo={item}
                        tempoItem={this.state.tempoItem}
                        getItem={this.saveChange}
                        deleteTodo={this.deleteTodo}
                      />
                    ) : (
                      ""
                    )
                  )}
              </div>
            </div>
            <Done />
          </div>
        </div>
        <div className="list__popup">
          <div className="list__popup__content">
            <div className="list__popup__content__title">CREATE TO DO</div>
            <div className="list__popup__content__txt"></div>
            <div className="list__popup__content__action">
              <button className="list__popup__content__action--save"></button>
              <button className="list__popup__content__action--cancel"></button>
            </div>
          </div>
        </div>
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
        {/* Same as */}
        <ToastContainer />
      </>
    );
  }
}

TodoList.propTypes = {};

export default TodoList;
