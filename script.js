// DOM Elements
const startScreen = document.getElementById('start-screen');
const birthdayScreen = document.getElementById('birthday-screen');
const openBtn = document.getElementById('open-btn');
const messageBtn = document.getElementById('message-btn');
const messageOverlay = document.getElementById('message-overlay');
const closeBtn = document.querySelector('.close-btn');
const birthdaySong = document.getElementById('birthday-song');
const musicToggle = document.getElementById('music-toggle');
const musicIcon = document.querySelector('.music-icon');
const confettiContainer = document.querySelector('.confetti-container');

// Create confetti elements
function createConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const delay = Math.random() * 5;
        const rotation = Math.random() * 360;
        const duration = Math.random() * 5 + 5;
        
        // Apply styles
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.background = color;
        confetti.style.position = 'absolute';
        confetti.style.top = '-50px';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.transform = `rotate(${rotation}deg)`;
        confetti.style.animation = `confettiFall ${duration}s linear infinite`;
        confetti.style.animationDelay = `${delay}s`;
        
        confettiContainer.appendChild(confetti);
    }

    // Loading screen functionality
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.getElementById('progress-text');
    const loadingScreen = document.getElementById('loading-screen');
    const startScreen = document.getElementById('start-screen');
    
    let progress = 0;
    const loadingInterval = setInterval(() => {
        if (progress < 100) {
            progress += Math.floor(Math.random() * 10) + 1;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = progress + '%';
            progressText.textContent = progress;
            
            if (progress === 100) {
                clearInterval(loadingInterval);
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    startScreen.classList.remove('hidden');
                }, 500);
            }
        }
    }, 200);
    
    // Add CSS animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes confettiFall {
            0% {
                top: -50px;
                transform: rotate(0deg) translateX(0);
            }
            25% {
                transform: rotate(${Math.random() * 360}deg) translateX(${Math.random() * 100 - 50}px);
            }
            50% {
                transform: rotate(${Math.random() * 360}deg) translateX(${Math.random() * 100 - 50}px);
            }
            75% {
                transform: rotate(${Math.random() * 360}deg) translateX(${Math.random() * 100 - 50}px);
            }
            100% {
                top: 100%;
                transform: rotate(${Math.random() * 360}deg) translateX(${Math.random() * 100 - 50}px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Create sparkles in message popup
function createSparkles() {
    const sparklesContainer = document.querySelector('.sparkles');
    
    for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Random properties
        const size = Math.random() * 8 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 2 + 1;
        
        // Apply styles
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.position = 'absolute';
        sparkle.style.background = 'rgba(255, 215, 0, 0.8)';
        sparkle.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.5)';
        sparkle.style.borderRadius = '50%';
        sparkle.style.top = `${posY}%`;
        sparkle.style.left = `${posX}%`;
        sparkle.style.animation = `twinkle ${duration}s infinite ease-in-out alternate`;
        sparkle.style.animationDelay = `${delay}s`;
        
        sparklesContainer.appendChild(sparkle);
    }
    
    // Add CSS animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes twinkle {
            0% {
                transform: scale(0.5);
                opacity: 0.3;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Create animations
    createConfetti();
    createSparkles();
    
    // Add GSAP animations for birthday content
    gsap.set(".birthday-title", { 
        opacity: 0, 
        y: -50 
    });
    
    gsap.set(".birthday-name", { 
        opacity: 0, 
        y: -50 
    });
    
    gsap.set("#message-btn", { 
        opacity: 0, 
        y: 50 
    });
    
    gsap.set(".cake", { 
        opacity: 0, 
        scale: 0.5 
    });
    
    // Handle music state
    let isMusicPlaying = false;
    
    function toggleMusic() {
        if (isMusicPlaying) {
            birthdaySong.pause();
            musicIcon.textContent = "🔇";
        } else {
            birthdaySong.play();
            musicIcon.textContent = "🔊";
        }
        isMusicPlaying = !isMusicPlaying;
    }
    
    // Event Listeners
    openBtn.addEventListener('click', () => {
        // Hide start screen with animation
        startScreen.classList.add("animate__animated", "animate__fadeOut");
        
        setTimeout(() => {
            startScreen.classList.add("hidden");
            birthdayScreen.classList.remove("hidden");
            
            // Start birthday animations
            setTimeout(() => {
                // Play GSAP animations
                const timeline = gsap.timeline();
                
                timeline.to(".birthday-title", {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "bounce.out"
                });
                
                timeline.to(".birthday-name", {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "bounce.out"
                }, "-=0.5");
                
                timeline.to(".cake", {
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    ease: "elastic.out(1, 0.3)"
                }, "-=0.5");
                
                timeline.to("#message-btn", {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "back.out(1.7)"
                }, "-=0.5");
                
                // Start music
                toggleMusic();
            }, 500);
        }, 1000);
    });
    
    messageBtn.addEventListener('click', () => {
        // Show message overlay with animation
        messageOverlay.classList.remove("hidden");
        
        // Add animate.css classes for popup animation
        const messagePopup = document.getElementById('message-popup');
        messagePopup.classList.add("animate__animated", "animate__zoomIn");
        
        // Add floating hearts animation
        addFloatingHearts();
    });
    
    closeBtn.addEventListener('click', () => {
        // Hide message overlay with animation
        const messagePopup = document.getElementById('message-popup');
        messagePopup.classList.remove("animate__zoomIn");
        messagePopup.classList.add("animate__zoomOut");
        
        setTimeout(() => {
            messageOverlay.classList.add("hidden");
            messagePopup.classList.remove("animate__zoomOut");
        }, 500);
    });
    
    musicToggle.addEventListener('click', toggleMusic);
    
    // Add floating hearts animation in message popup
    function addFloatingHearts() {
        const messagePopup = document.getElementById('message-popup');
        
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            
            // Random properties
            const size = Math.random() * 15 + 10;
            const posX = Math.random() * 80 + 10;
            const delay = Math.random() * 5;
            const duration = Math.random() * 6 + 4;
            const opacity = Math.random() * 0.6 + 0.3;
            
            // Apply styles
            heart.style.position = 'absolute';
            heart.style.fontSize = `${size}px`;
            heart.style.left = `${posX}%`;
            heart.style.bottom = '-20px';
            heart.style.color = '#e91e63';
            heart.style.opacity = opacity;
            heart.style.animation = `floatHeart ${duration}s linear infinite`;
            heart.style.animationDelay = `${delay}s`;
            heart.innerHTML = '❤';
            
            messagePopup.appendChild(heart);
        }
        
        // Add CSS animation
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes floatHeart {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: ${Math.random() * 0.6 + 0.3};
                }
                100% {
                    transform: translateY(-${window.innerHeight}px) rotate(${Math.random() * 360}deg);
                    opacity: 0;
                }
            }
            
            .floating-heart {
                position: absolute;
                z-index: -1;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add 3D effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (centerY - y) / 15;
            const angleY = (x - centerX) / 15;
            
            this.style.transform = `perspective(800px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
            this.style.boxShadow = `0 10px 25px rgba(0, 0, 0, 0.3), ${angleY * -1}px ${angleX}px 15px rgba(0, 0, 0, 0.2)`;
        });
        
        button.addEventListener('mouseout', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Add typewriter effect to message
    function typewriterEffect() {
        const messageText = document.querySelector('.message-text');
        const originalHTML = `
            To the amazing Fikri Adnan 💙<br><br>

            On this special day, I want you to know that your presence has been deeply meaningful in my life.. because you were my first love.<br><br>

            Though we’ve gone our separate paths, a part of me still wishes we could be together.
            Yet I realize life must move forward... you have your own journey, and I have mine.<br><br>

            If fate allows our paths to cross again, may it be when we’ve both grown into the best versions of ourselves.<br><br>

            May this new year of your life be filled with incredible adventures, meaningful moments, and all the happiness you deserve!<br><br>
            
            Love.. forever,<br>
            Center of the universe, 💖
        `;
        
        // First clear the existing content
        messageText.innerHTML = '';
        
        // Parse the HTML to split it into nodes (text and HTML elements)
        const parser = new DOMParser();
        const doc = parser.parseFromString(`<div>${originalHTML}</div>`, 'text/html');
        const container = doc.querySelector('div');
        
        // Function to get all text nodes and elements in order
        function getNodesAndElements(parent) {
            const items = [];
            parent.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    // For text nodes, split them into characters
                    const text = node.textContent;
                    for (let i = 0; i < text.length; i++) {
                        items.push({
                            type: 'text',
                            content: text[i]
                        });
                    }
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    // For HTML elements (like <br>), add them whole
                    items.push({
                        type: 'element',
                        content: node.outerHTML
                    });
                }
            });
            return items;
        }
        
        const items = getNodesAndElements(container);
        let index = 0;
        
        // Add the typing animation when the message button is clicked
        messageBtn.addEventListener('click', () => {
            setTimeout(() => {
                // Initialize an empty string to build our output
                let displayText = '';
                
                // Start the typing effect
                function type() {
                    if (index < items.length) {
                        const item = items[index];
                        if (item.type === 'text') {
                            // Add character by character for text
                            displayText += item.content;
                        } else {
                            // Add HTML elements whole
                            displayText += item.content;
                        }
                        
                        // Update the display with current content
                        messageText.innerHTML = displayText;
                        index++;
                        
                        // Delay less for HTML elements, more for text characters
                        const delay = item.type === 'element' ? 1 : 50;
                        setTimeout(type, delay);
                    }
                }
                
                // Start the typing process
                type();
            }, 1000);
        }, { once: true });
    }
    
    typewriterEffect();
    
    // Create Background Stars
    function createStars() {
        const birthdayScreen = document.getElementById('birthday-screen');
        
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random properties
            const size = Math.random() * 3 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 3 + 2;
            
            // Apply styles
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.position = 'absolute';
            star.style.background = 'white';
            star.style.borderRadius = '50%';
            star.style.top = `${posY}%`;
            star.style.left = `${posX}%`;
            star.style.boxShadow = '0 0 10px white, 0 0 20px white';
            star.style.animation = `twinkleStar ${duration}s infinite ease-in-out alternate`;
            star.style.animationDelay = `${delay}s`;
            star.style.zIndex = '1';
            
            birthdayScreen.appendChild(star);
        }
        
        // Add CSS animation
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes twinkleStar {
                0% {
                    opacity: 0.3;
                    transform: scale(0.8);
                }
                100% {
                    opacity: 1;
                    transform: scale(1.2);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    createStars();
    
    // Add shake effect to cake on hover
    const cake = document.querySelector('.cake');
    cake.addEventListener('mouseenter', () => {
        cake.classList.add('animate__animated', 'animate__tada');
    });
    
    cake.addEventListener('mouseleave', () => {
        setTimeout(() => {
            cake.classList.remove('animate__animated', 'animate__tada');
        }, 1000);
    });
    
    // Create an animated cursor trail
    function createCursorTrail() {
        document.addEventListener('mousemove', function(e) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            
            trail.style.left = e.pageX + 'px';
            trail.style.top = e.pageY + 'px';
            
            document.body.appendChild(trail);
            
            setTimeout(() => {
                trail.remove();
            }, 1000);
        });
        
        // Add CSS styles
        const style = document.createElement('style');
        style.innerHTML = `
            .cursor-trail {
                position: absolute;
                width: 10px;
                height: 10px;
                background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
                border-radius: 50%;
                pointer-events: none;
                transform: translate(-50%, -50%);
                z-index: 9999;
                animation: cursorTrail 1s forwards;
            }
            
            @keyframes cursorTrail {
                0% {
                    opacity: 0.8;
                    width: 5px;
                    height: 5px;
                }
                100% {
                    opacity: 0;
                    width: 50px;
                    height: 50px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    createCursorTrail();
});