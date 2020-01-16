import React, { useState, useEffect } from "react";

import "./styles.css";

export default function DevForm({ onSubmit }) {
  const [github_username, setGitUsername] = useState("");
  const [techs, setTechs] = useState("");

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      error => {
        console.log(error);
      },
      {
        timeout: 30000
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    });

    setGitUsername("");
    setTechs("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuario de github</label>
        <input
          name="github_username"
          id="github_username"
          required
          value={github_username}
          onChange={e => setGitUsername(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologías</label>
        <input
          name="techs"
          id="techs"
          required
          value={techs}
          onChange={e => setTechs(e.target.value)}
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitud</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
            required
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitud</label>
          <input
            type="number"
            name="longitude"
            id="longitude"
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
            required
          />
        </div>
      </div>

      <button type="submit">Guardar</button>
    </form>
  );
}
