import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "../../redux/store";

import s from "./Filter.module.css";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.contacts.filter);

  const filterChange = (e) => {
    const value = e.target.value;
    dispatch(changeFilter(value));
  };

  return (
    <label>
      Find contact by name
      <input
        className={s.input}
        type="text"
        value={filter}
        onChange={filterChange}
      />
    </label>
  );
};

export default Filter;
