import React, { useState, useEffect } from "react";

export default function DevForm({ found, onSubmit }) {
  const [github_username, setGitUsername] = useState("");
  const [techs, setTechs] = useState("");

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  if (github_username !== null) {
  }

  useEffect(() => {
    const fields = () => {
      setGitUsername(found.github_username);
      setTechs(found.techs);
      setLatitude(found.location.coordinates[1]);
      setLongitude(found.location.coordinates[0]);
    };
    fields();
    return () => {
      setGitUsername("");
      setTechs("");
      setLatitude("");
      setLongitude("");
    };
  }, [found]);

  async function handleSubmit(e) {
    e.preventDefault();
    await onSubmit(
      {
        github_username,
        techs,
        latitude,
        longitude
      },
      found._id
    );
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

      <button type="submit">Editar</button>
    </form>
  );
}
