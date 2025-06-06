
// Main application logic
class GamingHubApp {
    constructor() {
        this.currentPage = 'home';
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.loadInitialData();
        this.setupEventListeners();
    }
    
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const page = item.getAttribute('data-page');
                this.navigateToPage(page);
                
                // Update active nav item
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }
    
    navigateToPage(page) {
        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(p => p.classList.remove('active'));
        
        // Show selected page
        const targetPage = document.getElementById(`${page}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = page;
            
            // Load page-specific data
            this.loadPageData(page);
        }
    }
    
    loadPageData(page) {
        switch(page) {
            case 'games':
                this.loadAllGames();
                break;
            case 'profile':
                this.loadUserProfile();
                break;
            case 'home':
                this.loadHomePage();
                break;
        }
    }
    
    loadInitialData() {
        this.loadHomePage();
    }
    
    loadHomePage() {
        // Load featured games (first 4 games)
        const featuredGames = gameData.slice(0, 4);
        displayGames(featuredGames, 'featured-games-grid');
        
        // Load AI recommendations
        displayAIRecommendations();
    }
    
    loadAllGames() {
        displayGames(gameData, 'all-games-grid');
    }
    
    loadUserProfile() {
        // Profile data is already in HTML, but we could update it dynamically here
        console.log('Profile loaded for user:', userData.name);
    }
    
    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('game-search');
        const genreFilter = document.getElementById('genre-filter');
        
        if (searchInput) {
            searchInput.addEventListener('input', debounce(() => {
                filterGames();
            }, 300));
        }
        
        if (genreFilter) {
            genreFilter.addEventListener('change', () => {
                filterGames();
            });
        }
        
        // Handle window resize for responsive design
        window.addEventListener('resize', debounce(() => {
            this.handleResize();
        }, 250));
    }
    
    handleResize() {
        // Adjust chatbot position on mobile
        const chatbot = document.getElementById('chatbot');
        if (window.innerWidth <= 768) {
            chatbot.style.width = 'calc(100vw - 2rem)';
        } else {
            chatbot.style.width = '350px';
        }
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new GamingHubApp();
    
    // Add some interactive features
    addInteractiveFeatures();
});

function addInteractiveFeatures() {
    // Add hover effects to cards
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('.game-card')) {
            e.target.closest('.game-card').style.transform = 'translateY(-5px)';
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('.game-card')) {
            e.target.closest('.game-card').style.transform = 'translateY(0)';
        }
    });
    
    // Add loading animation for page transitions
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-item')) {
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => {
                page.style.opacity = '0.7';
                page.style.transition = 'opacity 0.3s ease';
            });
            
            setTimeout(() => {
                pages.forEach(page => {
                    page.style.opacity = '1';
                });
            }, 300);
        }
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // You can add service worker here for offline functionality
        console.log('Gaming Hub App loaded successfully!');
    });
}
