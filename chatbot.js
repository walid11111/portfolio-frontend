// chatbot.js - Enhanced with better error handling and UX improvements
document.addEventListener('DOMContentLoaded', function() {
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotWindow = document.getElementById('chatbot-window');
  const chatbotSend = document.getElementById('chatbot-send');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotMessages = document.getElementById('chatbot-messages');
  
  // Check if elements exist to avoid errors
  if (!chatbotToggle || !chatbotWindow || !chatbotClose || !chatbotSend || !chatbotInput || !chatbotMessages) {
    console.warn('Chatbot elements not found. Skipping chatbot initialization.');
    return;
  }
  
  // Toggle chatbot window
  chatbotToggle.addEventListener('click', function() {
    chatbotWindow.classList.toggle('scale-0');
    chatbotWindow.classList.toggle('opacity-0');
    chatbotWindow.classList.toggle('scale-100');
    chatbotWindow.classList.toggle('opacity-100');
    
    // Add 3D rotation effect on toggle
    if (chatbotWindow.classList.contains('scale-0')) {
      chatbotWindow.style.transform = 'translateY(40px) scale(0.9) rotateX(20deg)';
    } else {
      chatbotWindow.style.transform = 'translateY(0) scale(1) rotateX(0)';
      chatbotInput.focus();
      
      // Add welcome message if first interaction
      if (localStorage.getItem('chatbotFirstVisit') === null) {
        setTimeout(() => {
          addMessage("Welcome to my digital realm! I'm Walid's AI assistant, built to showcase his skills, projects, and expertise. Ask me anything to explore his world!", 'bot');
        }, 300);
        localStorage.setItem('chatbotFirstVisit', 'false');
      }
    }
  });
  
  // Close chatbot window
  chatbotClose.addEventListener('click', function() {
    chatbotWindow.classList.add('scale-0');
    chatbotWindow.classList.add('opacity-0');
    chatbotWindow.classList.remove('scale-100');
    chatbotWindow.classList.remove('opacity-100');
    chatbotWindow.style.transform = 'translateY(40px) scale(0.9) rotateX(20deg)';
  });
  
  // Send message functionality
  const sendMessage = function() {
    const message = chatbotInput.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Clear input
    chatbotInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Get streamed response from backend
    getStreamedBotResponse(message);
  };
  
  chatbotSend.addEventListener('click', sendMessage);
  chatbotInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  // Add message to chat
  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');
    
    if (sender === 'user') {
      messageDiv.classList.add('user');
      messageDiv.innerHTML = `<span class="message-text">${text}</span>`;
    } else {
      messageDiv.classList.add('bot');
      messageDiv.innerHTML = `
        <div class="bot-avatar"><i class="fas fa-robot"></i></div>
        <span class="message-text">${text}</span>
      `;
    }
    
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  
  // Show typing indicator
  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  
  // Remove typing indicator
  function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }
  
  // Handle streamed response from backend API
  async function getStreamedBotResponse(userMessage) {
    try {
      const response = await fetch('https://portfolio-backend-psi-drab.vercel.app/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage })
      });
      
      if (!response.ok) throw new Error('API error');
      
      // Remove typing indicator
      removeTypingIndicator();
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botMessageDiv = null;
      let botMessageText = '';
      
      // Create a bot message div to append streamed text
      botMessageDiv = document.createElement('div');
      botMessageDiv.classList.add('chat-message', 'bot');
      botMessageDiv.innerHTML = `
        <div class="bot-avatar"><i class="fas fa-robot"></i></div>
        <span class="message-text"></span>
      `;
      chatbotMessages.appendChild(botMessageDiv);
      const textSpan = botMessageDiv.querySelector('.message-text');
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        botMessageText += chunk;
        textSpan.textContent = botMessageText;
        
        // Scroll to bottom during streaming
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      }
    } catch (error) {
      removeTypingIndicator();
      addMessage('Error: Unable to connect to the backend. Try again later.', 'bot');
      console.error(error);
    }
  }
});