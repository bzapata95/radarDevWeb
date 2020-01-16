import React from "react";

import "./styles.css";

export default function DevItem({ dev, onClick, onClickEdit }) {
  async function handleDelete(id) {
    if (window.confirm("¿Are you sure?")) {
      onClick(id);
    }
  }

  async function handleEdit(id) {
    onClickEdit(id);
  }
  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(", ")}</span>
        </div>
        <button
          type="button"
          onClick={() => handleDelete(dev._id)}
          className="delete"
        >
          &times;
        </button>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>
        Ingresar al perfil de Github
      </a>
      <button
        type="button"
        className="edit"
        onClick={() => handleEdit(dev._id)}
      >
        Edit
      </button>
    </li>
  );
}
