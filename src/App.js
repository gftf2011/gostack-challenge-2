import React, { useState, useEffect } from "react";

/**
 * Styles
 */
import "./styles.css";

/**
 * Services
 */
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  /**
   * Effects
   */
  useEffect(() => {
    const fetch = async () => {
      const response = await api.get('/repositories');
      const { data } = response;
      setRepositories(data);
    };
    fetch();
  }, []);

  /**
   * Handlers
   */
  async function handleAddRepository() {
    try {
      const body = {
        url: "https://github.com/josepholiveira",
        title: `Challenge ${Date.now()}`,
        techs: ["React", "Node.js"],
      };
      const response = await api.post('/repositories', body);
      const { data } = response;
      setRepositories([...repositories, data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      setRepositories(repositories.filter(repository => (repository.id !== id)));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
