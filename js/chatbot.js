
// Chatbot functionality
class ChatBot {
    constructor() {
        this.isOpen = true;
        this.isTyping = false;
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.inputField = document.getElementById('chatbot-input-field');
        this.sendButton = document.getElementById('chatbot-send');
        this.toggleButton = document.getElementById('chatbot-toggle');
        this.chatbotElement = document.getElementById('chatbot');
        
        this.init();
    }
    
    init() {
        // Toggle chatbot
        this.toggleButton.addEventListener('click', () => this.toggle());
        
        // Send message on button click
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        // Send message on Enter key
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Auto-resize input
        this.inputField.addEventListener('input', () => {
            this.inputField.style.height = 'auto';
            this.inputField.style.height = Math.min(this.inputField.scrollHeight, 100) + 'px';
        });
    }
    
    toggle() {
        this.isOpen = !this.isOpen;
        this.chatbotElement.classList.toggle('collapsed', !this.isOpen);
        
        // Change icon
        const icon = this.toggleButton.querySelector('i');
        icon.className = this.isOpen ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
    }
    
    async sendMessage() {
        const message = this.inputField.value.trim();
        if (!message || this.isTyping) return;
        
        // Add user message
        this.addMessage(message, 'user');
        this.inputField.value = '';
        this.inputField.style.height = 'auto';
        
        // Show typing indicator
        this.showTyping();
        
        // Simulate AI response delay
        setTimeout(() => {
            this.hideTyping();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000 + Math.random() * 1500);
    }
    
    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        messageDiv.innerHTML = `
            <div class="message-content">${content}</div>
        `;
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    showTyping() {
        this.isTyping = true;
        this.sendButton.disabled = true;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="loading">
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                </div>
            </div>
        `;
        
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTyping() {
        this.isTyping = false;
        this.sendButton.disabled = false;
        
        const typingIndicator = this.messagesContainer.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for specific game genres
        if (lowerMessage.includes('rpg') || lowerMessage.includes('ról')) {
            return this.getRandomResponse('rpg');
        }
        
        if (lowerMessage.includes('action') || lowerMessage.includes('akcj')) {
            return this.getRandomResponse('action');
        }
        
        if (lowerMessage.includes('strategy') || lowerMessage.includes('strateg')) {
            return this.getRandomResponse('strategy');
        }
        
        if (lowerMessage.includes('adventure') || lowerMessage.includes('przygod')) {
            return this.getRandomResponse('adventure');
        }
        
        // Check for specific game mentions
        if (lowerMessage.includes('witcher')) {
            return 'The Witcher 3 to jedna z najlepszych gier RPG! Oferuje ponad 100 godzin rozgrywki z niesamowitą fabułą i postaciami.';
        }
        
        if (lowerMessage.includes('cyberpunk')) {
            return 'Cyberpunk 2077 po aktualizacjach to zupełnie inna gra! Futurystyczny Night City czeka na eksplorację.';
        }
        
        // Check for greetings
        if (lowerMessage.includes('cześć') || lowerMessage.includes('witaj') || lowerMessage.includes('hello')) {
            return 'Cześć! Cieszę się, że mogę Ci pomóc w znalezieniu idealnych gier. O jakim gatunku chciałbyś porozmawiać?';
        }
        
        // Check for help requests
        if (lowerMessage.includes('pomoc') || lowerMessage.includes('help')) {
            return 'Mogę pomóc Ci znaleźć gry według gatunku (RPG, Action, Strategy, Adventure) lub odpowiedzieć na pytania o konkretne tytuły. Czego szukasz?';
        }
        
        // Default responses
        return this.getRandomResponse('default');
    }
    
    getRandomResponse(category) {
        const responses = chatbotResponses[category] || chatbotResponses.default;
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
});
