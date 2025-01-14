import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forms.css"
const Passwords = ({ setOpen }) => {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const [password, setPassword] = useState("");
  const [rPassword, setRPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handlerUpdatePassword = async (e) => {
    e.preventDefault();

    //if equal pass with r_pass
    if (password === rPassword) {
      try {
        const formData = new FormData();
        formData.append("password", password);
        const { data } = await axios.put(
          `/api/users/update/${userInfo._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        localStorage.removeItem("userInfo", JSON.stringify(data));
        alert("Contraseña actualizada con éxito!");
        navigate("/login");
      } catch (err) {
        alert("Contraseña no actualizada!");
      }
    } else {
      alert("Las contraseñas no coinciden!");
    }

    if(passwordError){
      alert("La contraseña debe tener al menos 8 caracteres"); 
      return;
    }
  };

  const handleUpdatePasswordChange = (event) =>{
    setPassword(event.target.value);
    if (event.target.value.length < 8){
      setPasswordError(true);
      
    }else{
      setPasswordError(false);
    }
  };

  return (
    <div className="passwords">
      <form onSubmit={handlerUpdatePassword}>
        <div className="close-form" onClick={() => setOpen(false)}>
          X
        </div>
        <div className="form-group">
        <label htmlFor="pass">Contraseña</label>
          <input
            required
            onChange={handleUpdatePasswordChange}
            type="password"
            id="pass"
            //onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {passwordError && (
            <span className="error-message">
              La contraseña debe tener al menos 8 caracteres
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="r_pass">Confirmar contraseña</label>
          <input
            required
            type="password"
            id="r_pass"
            onChange={(e) => setRPassword(e.target.value)}
            value={rPassword}
          />
          {passwordError && (
            <span className="error-message">
              La contraseña debe tener al menos 8 caracteres
            </span>
          )}
        </div>
        <div className="form-btn">
          <button type="submit">
            <FontAwesomeIcon icon={faRefresh} /> Actualizar contraseña
          </button>
        </div>
      </form>
    </div>
  );
};

export default Passwords;
