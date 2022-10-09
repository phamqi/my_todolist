import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { icon } from "../contants";

class Done extends Component {
  render() {
    return (
      <div id="todo__done" className="todo__wrapper">
        <div className="todo__header todo__header--done">
          <div className="todo__title">Done</div>
        </div>
        <div className="todo__list">
          <div className="todo__item__wrapper">
            <div className="todo__item__wrapper--border"></div>
            {this.props.listTodo &&
              this.props.listTodo.length > 0 &&
              this.props.listTodo.map((item) =>
                item.state === 1 ? (
                  <div className="todo__item--done" key={item.id}>
                    <div className="todo__create__at--done">
                      <span className="todo__create__at__icon">
                        {icon.calendar}
                      </span>
                      <span className="todo__create__at__time">
                        {item.createAt}
                      </span>
                    </div>
                    <div className="todo__details">
                      <span className="todo__details__txt">{item.title}</span>
                      <div className="todo__details__action">
                        <button className="todo__details__action__btn--done todo__details__action__btn">
                          {icon.done}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )
              )}
            <div className="todo__item--done hidden"></div>
          </div>
        </div>
      </div>
    );
  }
}

Done.propTypes = {};

export default Done;
