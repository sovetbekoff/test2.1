import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminModal from "../components/AdminModal";
import "../style/Navbar.css"; // Подключение стилей

const Navbar = ({ setIsAdmin, isAdmin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAdminClick = () => {
    setIsModalOpen(true);
  };

  const handleVerify = (isVerified) => {
    setIsAdmin(isVerified);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <nav>
      <button onClick={() => navigate("/posts")}>Карточки</button>

      <button onClick={() => navigate("/add")}>Добавить Пост</button>

      <button onClick={handleAdminClick}>Админ</button>
      <button onClick={() => navigate("/favorites")}>fav</button>
      {isModalOpen && (
        <AdminModal onVerify={handleVerify} onClose={handleCloseModal} />
      )}
    </nav>
  );
};

export default Navbar;
