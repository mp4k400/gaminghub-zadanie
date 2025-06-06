
// Game Card Component
function createGameCard(game, showAiReason = false) {
    const card = document.createElement('div');
    card.className = 'game-card';
    
    const ratingClass = game.rating >= 9 ? 'high' : game.rating >= 8 ? 'medium' : 'low';
    const formattedDate = new Date(game.releaseDate).toLocaleDateString('pl-PL');
    
    card.innerHTML = `
        <div class="game-image">
            <i class="${game.image}"></i>
            <div class="game-rating ${ratingClass}">${game.rating}/10</div>
        </div>
        <div class="game-content">
            <div class="game-header">
                <h3 class="game-title">${game.title}</h3>
                <span class="game-genre">${game.genre}</span>
            </div>
            <p class="game-description">${game.description}</p>
            <div class="game-footer">
                <div class="game-date">
                    <i class="fas fa-calendar"></i>
                    ${formattedDate}
                </div>
                <div class="game-price">${game.price} zł</div>
            </div>
            <div class="game-actions">
                <button class="btn-primary" onclick="addToLibrary('${game.title}')">
                    Dodaj do biblioteki
                </button>
                <button class="btn-secondary">
                    <i class="fas fa-user"></i>
                </button>
            </div>
        </div>
        ${showAiReason ? `
            <div class="ai-recommendation-card">
                <div class="ai-recommendation-text">
                    <i class="fas fa-robot"></i>
                    AI: ${game.aiReason}
                </div>
            </div>
        ` : ''}
    `;
    
    return card;
}

// Add to library function
function addToLibrary(gameTitle) {
    // Simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #10b981, #059669);
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-check"></i>
            <span>Dodano do biblioteki!</span>
        </div>
        <div style="font-size: 0.9rem; opacity: 0.9; margin-top: 0.2rem;">
            ${gameTitle} został dodany do Twojej biblioteki gier.
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Search and filter functions
function filterGames() {
    const searchTerm = document.getElementById('game-search').value.toLowerCase();
    const selectedGenre = document.getElementById('genre-filter').value;
    
    const filteredGames = gameData.filter(game => {
        const matchesSearch = game.title.toLowerCase().includes(searchTerm) || 
                            game.description.toLowerCase().includes(searchTerm);
        const matchesGenre = !selectedGenre || game.genre === selectedGenre;
        
        return matchesSearch && matchesGenre;
    });
    
    displayGames(filteredGames, 'all-games-grid');
}

// Display games function
function displayGames(games, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    games.forEach(game => {
        const gameCard = createGameCard(game);
        container.appendChild(gameCard);
    });
}

// Display AI recommendations
function displayAIRecommendations() {
    const container = document.getElementById('ai-recommended-games');
    if (!container) return;
    
    container.innerHTML = '';
    
    aiRecommendations.forEach(game => {
        const gameCard = createGameCard(game, true);
        container.appendChild(gameCard);
    });
}

// CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
