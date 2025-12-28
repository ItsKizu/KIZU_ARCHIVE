document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SOUND UI (#14) - Synthetic Clicks
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const playClickSound = (freq = 400, type = 'sine') => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    };

    // 2. TYPEWRITER EFFECT (#15)
    const typeTarget = document.getElementById('typewriter');
    const fullText = "KIZU_ARCHIVE";
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < fullText.length) {
            typeTarget.innerHTML += fullText.charAt(charIndex);
            charIndex++;
            playClickSound(150, 'square'); // Sound on type
            setTimeout(typeWriter, 150);
        }
    }
    typeWriter();

    // 3. THEME TOGGLE (#4)
    const btn = document.getElementById('theme-toggle');
    btn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        playClickSound(800, 'sine');
    });

    // 4. DAILY MANIFEST (#30)
    const manifests = [
    "MUSIC IS MINE / MUSIC IS YOURS",
    "IN ALL ARTS AND SCIENCES, RHYTHM IS NOT TO BE IGNORED",
    "WHETHER A TREE LIVES TO SEE THE END OF CENTURIES / OR A RANDOM HAND PICKS IT INSTANTLY / LIFE IS ART, A MIRACLE FOR ALL TO SEE / I MUST TELL YOU THAT YOU LIVED BEAUTIFULLY",
    "ALL FORMULAS EQUALIZE UNDER THE SUN",
    "BUT YO, I THOUGHT I KNEW WHAT A LOVE SONG SOUND LIKE BUT I FELT A WARMER TUNE IN THE SUNLIGHT",
];
    document.getElementById('daily-quote').innerText = manifests[Math.floor(Math.random() * manifests.length)];

    // 5. ATTACH SOUND TO ELEMENTS
    document.querySelectorAll('.snd-hover').forEach(el => {
        el.addEventListener('mouseenter', () => playClickSound(600, 'sine'));
    });
    
    document.querySelectorAll('.snd-click, .sticker-item').forEach(el => {
        el.addEventListener('click', () => playClickSound(300, 'square'));
    });
});

// Sound logic for reaching the bottom signature
let playedSignatureSound = false;
window.addEventListener('scroll', () => {
    const footer = document.querySelector('.main-footer');
    const position = footer.getBoundingClientRect();

    // If footer is visible
    if(position.top < window.innerHeight && !playedSignatureSound) {
        playClickSound(100, 'sine'); // A deeper, low-frequency hum
        playedSignatureSound = true; 
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const introOverlay = document.getElementById('intro-overlay');
    const introLogo = document.querySelector('.intro-logo');
    const loaderBar = document.querySelector('.loader-bar');
    const ambientAudio = document.getElementById('ambient-loop'); // Assuming you have the audio tag from before

    startBtn.addEventListener('click', () => {
        // 1. Hide Button, start Loader
        startBtn.style.display = 'none';
        loaderBar.style.width = '100%';

        // 2. Play Start Sound (if you have one) or Ambient
        if(ambientAudio) {
            ambientAudio.volume = 0;
            ambientAudio.play();
            // Gentle volume fade-in
            let vol = 0;
            const fadeIn = setInterval(() => {
                if (vol < 0.2) {
                    vol += 0.01;
                    ambientAudio.volume = vol;
                } else {
                    clearInterval(fadeIn);
                }
            }, 100);
        }

        // 3. Trigger Netflix Animation
        setTimeout(() => {
            introLogo.classList.add('animate');
        }, 500);

        // 4. Remove Overlay after animation ends
        setTimeout(() => {
            introOverlay.classList.add('fade-out');
            // Allow the main page typewriter to start now
            typeWriter(); 
        }, 3000);
    });
});