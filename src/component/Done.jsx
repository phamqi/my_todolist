import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.scss";

class Done extends Component {
  render() {
    return (
      <div className="todo__wrapper">
        <div className="todo__header">
          <div className="todo__title">to do</div>
          <button className="todo__btn--add">New task</button>
        </div>
        <div className="todo__list">
          <div className="todo__item">
            <div className="todo__create__at">
              <span className="todo__create__at__icon">[ ]</span>
              <span className="todo__create__at__time">10/6/2021</span>
            </div>
            <div className="todo__details">
              <span className="todo__details__txt">Do some thing</span>
              <div className="todo__details__action">
                <button>ED</button>
                <button>BE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Done.propTypes = {};

export default Done;
