// import React, { useState } from "react";

// const AdminModal = ({ onVerify }) => {
//   const [password, setPassword] = useState("");
//   const adminPassword = "123456";

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password === adminPassword) {
//       onVerify(true);
//       alert("Вы вошли как администратор!");
//     } else {
//       alert("Неправильный пароль");
//     }
//   };

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <h3>Введите пароль администратора</h3>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Пароль"
//           />
//           <button type="submit">Войти</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminModal;

import React, { useState } from "react";
import "../style/moadlStyles.css"

const AdminModal = ({ onVerify }) => {
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
