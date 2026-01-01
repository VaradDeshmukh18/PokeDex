import { useState } from "react";

export const PokemonCard = ({ pokemonData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get type badge colors
  const getTypeBadgeColor = (type) => {
    const typeColors = {
      grass: '#78C850',
      fire: '#F08030',
      water: '#6890F0',
      bug: '#A8B820',
      normal: '#A8A878',
      poison: '#A040A0',
      electric: '#F8D030',
      ground: '#E0C068',
      fairy: '#EE99AC',
      fighting: '#C03028',
      psychic: '#F85888',
      rock: '#B8A038',
      ghost: '#705898',
      ice: '#98D8D8',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      flying: '#A890F0',
    };
    return typeColors[type.toLowerCase()] || '#A8A878';
  };

  return (
    <>
      {/* Card - Basic View */}
      <li 
        className="pokemon-card"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="pokemon-basic-info">
          <div className="pokemon-id">#{pokemonData.id}</div>
          
          <figure>
            <img
              src={pokemonData.image}
              alt={pokemonData.name}
              className="pokemon-image"
            />
          </figure>
          
          <h1 className="pokemon-name">{pokemonData.name}</h1>
          
          {/* Type badges */}
          <div className="pokemon-types">
            {pokemonData.types.map((type) => (
              <span
                key={type}
                className="type-badge"
                style={{ backgroundColor: getTypeBadgeColor(type) }}
              >
                {type}
              </span>
            ))}
          </div>

          {/* <p className="click-hint">Click to view details</p> */}
        </div>
      </li>

      {/* Modal Overlay - Detailed View */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              ✕
            </button>

            <div className="modal-header">
              <div className="modal-id">#{pokemonData.id}</div>
              <figure className="modal-figure">
                <img
                  src={pokemonData.image}
                  alt={pokemonData.name}
                  className="modal-image"
                />
              </figure>
              <h1 className="modal-name">{pokemonData.name}</h1>
              
              {/* Type badges */}
              <div className="pokemon-types">
                {pokemonData.types.map((type) => (
                  <span
                    key={type}
                    className="type-badge"
                    style={{ backgroundColor: getTypeBadgeColor(type) }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-body">
              <div className="details-section">
                <h3>Base Stats</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">HP</span>
                    <div className="stat-bar-container">
                      <div 
                        className="stat-bar hp-bar" 
                        style={{ width: `${(pokemonData.hp / 255) * 100}%` }}
                      ></div>
                      <span className="stat-value">{pokemonData.hp}</span>
                    </div>
                  </div>
                  
                  <div className="stat-item">
                    <span className="stat-label">Attack</span>
                    <div className="stat-bar-container">
                      <div 
                        className="stat-bar attack-bar" 
                        style={{ width: `${(pokemonData.attack / 255) * 100}%` }}
                      ></div>
                      <span className="stat-value">{pokemonData.attack}</span>
                    </div>
                  </div>
                  
                  <div className="stat-item">
                    <span className="stat-label">Defense</span>
                    <div className="stat-bar-container">
                      <div 
                        className="stat-bar defense-bar" 
                        style={{ width: `${(pokemonData.defense / 255) * 100}%` }}
                      ></div>
                      <span className="stat-value">{pokemonData.defense}</span>
                    </div>
                  </div>
                  
                  <div className="stat-item">
                    <span className="stat-label">Speed</span>
                    <div className="stat-bar-container">
                      <div 
                        className="stat-bar speed-bar" 
                        style={{ width: `${(pokemonData.speed / 255) * 100}%` }}
                      ></div>
                      <span className="stat-value">{pokemonData.speed}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h3>Physical Attributes</h3>
                <div className="attributes-grid">
                  <div className="attribute-box">
                    <span className="attribute-label">Height</span>
                    <span className="attribute-value">{pokemonData.height / 10} m</span>
                  </div>
                  <div className="attribute-box">
                    <span className="attribute-label">Weight</span>
                    <span className="attribute-value">{pokemonData.weight / 10} kg</span>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h3>Abilities</h3>
                <div className="abilities-list">
                  {pokemonData.abilities.map((ability, index) => (
                    <span key={index} className="ability-badge">
                      {ability}
                    </span>
                  ))}
                </div>
              </div>

              <div className="details-section">
                <div className="experience-box">
                  <span className="experience-label">Base Experience</span>
                  <span className="experience-value">{pokemonData.baseExperience} XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};