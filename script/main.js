// Optimized particle creation
function createParticles() {
    const emojis = ['❤️', '🍓', '🍓', '🍓', '🍓', '💞'];
    const container = document.body;
    let lastTime = 0;

    function animate(timestamp) {
        if (!lastTime || timestamp - lastTime >= 500) {
            const particle = document.createElement('div');
            particle.className = 'love-particle';
            particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = Math.random() * 3 + 3 + 's';
            container.appendChild(particle);
            setTimeout(() => particle.remove(), 6000);
            lastTime = timestamp;
        }
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

// Optimized message animation
let currentMessage = 0;
const messages = document.querySelectorAll('.message');
const finalQuestion = document.querySelector('.final-question');

function showNextMessage() {
    requestAnimationFrame(() => {
        if (currentMessage > 0) {
            messages[currentMessage - 1].classList.add('exit');
        }

        if (currentMessage < messages.length) {
            messages[currentMessage].classList.add('active');
            currentMessage++;
            setTimeout(showNextMessage, 3000);
        } else {
            finalQuestion.style.display = 'block';
            finalQuestion.style.opacity = '1';
        }
    });
}

// Button interactions
document.querySelector('.yes-btn').addEventListener('click', function () {
    const celebration = document.querySelector('.celebration');
    celebration.style.display = 'block';

    requestAnimationFrame(() => {
        for (let i = 0; i < 50; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart-burst';
            heart.textContent = '❤️';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 0.5 + 's';
            celebration.appendChild(heart);
        }
    });

    finalQuestion.innerHTML =
        "<h2 lang='en'>🎉 I know you're my" + "<h2 lang='fa'> توت فرنگیییی 🍓❤️</h2>" +
        "<p lang='en'>You've made my heart explode with joy!</p>" +
        "<p lang='fa'>ماهگردمون مبارک باشه بوبووووو خیلی دوستت دارم❤️</p>" +
        "<div style='margin-top: 2rem; font-size: 3rem'>💞🌟</div>";
});

// Shared dodge logic for both mouse and touch
const noBtn = document.querySelector('.no-btn');
const yesBtn = document.querySelector('.yes-btn');
let dodgeCount = 0;

function dodge(e) {
    if (e.cancelable) e.preventDefault(); // stops the touch from also firing a click at the old spot

    yesBtn.classList.add('show');
    dodgeCount++;

    // Keep the offset within a sane range so it can't fly off small screens
    const maxOffset = Math.min(window.innerWidth, window.innerHeight) * 0.25;
    const offsetX = (Math.random() * 2 - 1) * maxOffset;
    const offsetY = (Math.random() * 2 - 1) * maxOffset;

    requestAnimationFrame(() => {
        noBtn.style.transform =
            `translate(${offsetX}px, ${offsetY}px) rotate(${Math.random() * 360}deg)`;
        noBtn.style.transition = 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
    });
}

noBtn.addEventListener('mouseover', dodge);
noBtn.addEventListener('touchstart', dodge, { passive: false });

// Initialize
createParticles();
setTimeout(showNextMessage, 1000);