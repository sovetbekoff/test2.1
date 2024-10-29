// components/CategoryFilter.js
import React from "react";
// import styles from "../style/CategoryFilter.module.css";

const CategoryFilter = ({ categoryFilter, setCategoryFilter }) => {
  return (
    <div>
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Все категории</option>
          <option value="anon">Анон</option>
          <option value="confession">Признание</option>
          <option value="lost_found">Нашел/Потерял</option>
          <option value="news">Новости</option>
        </select>
      </select>
    </div>
  );
};

export default CategoryFilter;
