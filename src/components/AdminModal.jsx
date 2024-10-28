import React, { useState } from "react";
import "../style/modalStyles.css";

const AdminModal = ({ onVerify, onClose }) => {
  const [password, setPassword] = useState("");
  const adminPassword = "123456";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === adminPassword) {
      onVerify(true);
      alert("Вы вошли как администратор!");
    } else {
      alert("Неправильный пароль");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        <h3>Введите пароль администратора</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            required
          />
          <button type="submit">Войти</button>
        </form>
      </div>
    </div>
  );
};

export default AdminModal;
