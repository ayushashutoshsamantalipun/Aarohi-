document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // ⚙️ SETTINGS
    // ==========================================
    const isTesting = false; 

    // --- MUSIC PLAYER ---
    const audio = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    let isPlaying = false; 

    function playMusic() {
        if (!isPlaying && audio) {
            audio.volume = 0.5;
            audio.play().then(() => {
                isPlaying = true;
                musicBtn.innerText = "⏸ Pause Song";
            }).catch(e => console.log("Waiting for interaction..."));
        }
    }

    if (musicBtn) {
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
                musicBtn.innerText = "🎵 Play Our Song";
            } else {
                playMusic();
            }
        });
    }

    // --- TOAST NOTIFICATION SYSTEM ---
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-msg');

    function showToast(message) {
        if (!toast) return;
        toastMsg.innerText = message;
        toast.classList.remove('hidden');
        
        // Hide automatically after 3 seconds
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }

    // --- NAVIGATION ---
    const screens = document.querySelectorAll('.screen');
    const nextBtns = document.querySelectorAll('.next-btn');
    const backBtns = document.querySelectorAll('.back-btn');
    let currentScreen = 0;
    let currentEmoji = "❤️"; 

    const unlockDates = [
        null, new Date(2026, 1, 7), new Date(2026, 1, 8), new Date(2026, 1, 9),      
        new Date(2026, 1, 10), new Date(2026, 1, 11), new Date(2026, 1, 12),     
        new Date(2026, 1, 13), new Date(2026, 1, 14)      
    ];

    function showScreen(index) {
        screens.forEach(screen => screen.classList.remove('active'));
        screens[index].classList.add('active');
        const emoji = screens[index].getAttribute('data-emoji');
        if (emoji) currentEmoji = emoji;
        playMusic(); 
    }

    function checkLock(nextIndex) {
        if (isTesting) return true; 
        const today = new Date();
        const unlockDate = unlockDates[nextIndex];
        if (today < unlockDate) {
            const dateString = unlockDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            showToast(`🔒 Sabar kar meri jaan! This unlocks on ${dateString}.`);
            return false; 
        }
        return true; 
    }

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const nextIndex = currentScreen + 1;
            if (nextIndex < screens.length) {
                if (checkLock(nextIndex)) {
                    currentScreen++;
                    showScreen(currentScreen);
                }
            }
        });
    });

    backBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentScreen > 0) {
                currentScreen--;
                showScreen(currentScreen);
            }
        });
    });

    // --- LOVE TIMER ---
    const startDate = new Date("2025-11-23");
    const timerElement = document.getElementById('timer');

    function updateTimer() {
        const now = new Date();
        const diff = now - startDate;
        if (diff < 0) {
            if (timerElement) timerElement.innerText = "Soon... ❤️";
            return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        if (timerElement) {
            timerElement.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }
    setInterval(updateTimer, 1000);
    updateTimer(); 

    // --- DYNAMIC QUOTES ---
    const quotes = [
        "You’re my favorite notification.",
        "I feel lucky every single day.",
        "You’re not hard to love. You’re easy.",
        "Being with you feels like home.",
        "I’d still choose you in every lifetime."
    ];
    let quoteIndex = 0;
    const quoteElement = document.getElementById('dynamic-quote');

    if (quoteElement) {
        setInterval(() => {
            quoteElement.classList.add('fade-out');
            setTimeout(() => {
                quoteIndex = (quoteIndex + 1) % quotes.length;
                quoteElement.innerText = quotes[quoteIndex];
                quoteElement.classList.remove('fade-out');
            }, 1000);
        }, 4000);
    }

    // --- SECRET BUTTON LOGIC ---
    const secretBtn = document.getElementById('secret-btn');
    const secretModal = document.getElementById('secret-modal');
    const closeSecret = document.querySelector('.close-secret');
    
    const passModal = document.getElementById('password-modal');
    const closePass = document.querySelector('.close-pass');
    const passInput = document.getElementById('pass-input');
    const submitPassBtn = document.getElementById('submit-pass-btn');
    const passError = document.getElementById('pass-error');

    if (secretBtn) {
        secretBtn.addEventListener('click', () => {
            passModal.classList.remove('hidden');
            passInput.value = ""; 
            passError.style.display = "none";
        });
    }

    if (submitPassBtn) {
        submitPassBtn.addEventListener('click', () => {
            const password = passInput.value;
            if (password === "1898") {
                passModal.classList.add('hidden');
                secretModal.classList.remove('hidden'); 
            } else {
                passError.style.display = "block";
                passInput.classList.add('shake-anim');
                setTimeout(() => passInput.classList.remove('shake-anim'), 500);
            }
        });
    }

    if (closePass) closePass.addEventListener('click', () => passModal.classList.add('hidden'));
    if (closeSecret) closeSecret.addEventListener('click', () => secretModal.classList.add('hidden'));

    // --- ROSE DAY ---
    let roseClicks = 0;
    const roseInteract = document.getElementById('rose-interact');
    const roseTitle = document.getElementById('rose-title');
    const roseText = document.getElementById('rose-text');
    const roseNote = document.getElementById('rose-note');
    const roseCounter = document.getElementById('rose-counter');
    const roseReasonBtn = document.getElementById('rose-reason-btn');
    const roseNextBtn = document.getElementById('rose-next-btn');

    const petalWords = [
        "1898", "Beautiful", "Mine", "Cutie", "Wifeyy", 
        "Smart", "Jaan", "Forever", "Love", "Pookie", 
        "Gorgeous", "Soulmate", "Queen", "Precious", "My World", 
        "Happiness", "Bestie", "Sunshine", "Angel", "Perfect", 
        "Adorable", "Sweetheart", "Everything", "Destiny", "Home", 
        "My Life", "Blessing", "Dream", "Sparkle", "Magic"
    ];

    if (roseInteract) {
        roseInteract.addEventListener('click', (e) => {
            e.stopPropagation();
            roseClicks++;

            // Phase 1: Watering
            if (roseClicks < 3) {
                roseInteract.classList.add('shake-anim');
                setTimeout(() => roseInteract.classList.remove('shake-anim'), 500);
                roseNote.innerText = "Keep growing... 🌱";
                createFallingElement("💧");
            
            // Phase 2: Bloom
            } else if (roseClicks === 3) {
                roseInteract.innerText = "🌹";
                roseInteract.classList.add('pulse-anim');
                roseTitle.innerText = "My Beautiful Rose 🌹";
                roseText.innerHTML = "Happy Rose Day, <b>Jaaannnnuuuuuu!</b><br><br>Listen… roses are beautiful, yeah.<br>But they fade. They dry. They lose color.<br><b>You don’t.</b><br><br>You make my ordinary days feel special<br>and my bad days feel survivable.<br><br>My whole world looks dull without you in it.<br>You’re not just my rose.<br>You’re the reason I smile without trying.";
                roseNote.innerText = "Now tap the rose to collect love! 👆";
                roseCounter.style.display = "inline-block";
                roseReasonBtn.style.display = "inline-block";
                roseNextBtn.style.display = "inline-block";
                for(let i=0; i<20; i++) setTimeout(() => createFallingElement("🌹"), i*100);
            
            // Phase 3: Collecting
            } else {
                roseInteract.classList.add('pulse-anim');
                setTimeout(() => roseInteract.classList.remove('pulse-anim'), 100); 
                
                let count = parseInt(roseCounter.innerText.split(": ")[1]) || 0;
                count++; 
                roseCounter.innerText = `Roses Collected: ${count}`;
                
                const randomWord = petalWords[Math.floor(Math.random() * petalWords.length)];
                createFallingText(randomWord); 
                createFallingElement("🌹");   

                // MILESTONES
                if (count === 10) showToast("Woah! You collected a whole bouquet! 💐");
                else if (count === 20) showToast("Okay, my garden is overflowing! 🏡");
                else if (count === 30) showToast("You are obsessed with roses! (I love it) 💖");
                else if (count === 40) showToast("My love for you is infinite! ♾️");
                else if (count === 50) {
                    showToast("OKAY STOP! My heart is full! 😂❤️");
                    roseNote.innerText = "Okay, you have all the roses now! 😂";
                }
            }
        });
    }

    // --- PROPOSE DAY ---
    const proposeInteract = document.getElementById('propose-interact');
    const proposeTitle = document.getElementById('propose-title');
    const proposeInitialText = document.getElementById('propose-initial-text');
    const proposeMessage = document.getElementById('propose-message');
    const proposeNote = document.getElementById('propose-note');
    const proposeReasonBtn = document.getElementById('propose-reason-btn');
    const proposeNextBtn = document.getElementById('propose-next-btn');
    let boxOpened = false;

    if (proposeInteract) {
        proposeInteract.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!boxOpened) {
                boxOpened = true;
                proposeInteract.innerText = "💍"; 
                proposeInteract.classList.add('bounce-anim');
                proposeTitle.innerText = "Will You Be My Wifeyy? 💍";
                proposeInitialText.style.display = 'none'; 
                proposeMessage.style.display = 'block'; 
                proposeNote.innerText = "Tap the ring to say yes! 💍";
                proposeReasonBtn.style.display = "inline-block";
                proposeNextBtn.style.display = "inline-block";
                for(let i=0; i<30; i++) setTimeout(() => createFallingElement("✨"), i*100);
            } else {
                proposeInteract.classList.add('pulse-anim');
                setTimeout(() => proposeInteract.classList.remove('pulse-anim'), 500);
                createFallingElement("💍");
                createFallingText("Yes!");
            }
        });
    }

    // --- CHOCOLATE DAY ---
    const chocoInteract = document.getElementById('choco-interact');
    const chocoNote = document.getElementById('choco-note');
    const chocoInstruction = document.getElementById('choco-instruction');
    const chocoMessage = document.getElementById('choco-message');
    const chocoReasonBtn = document.getElementById('choco-reason-btn');
    const chocoNextBtn = document.getElementById('choco-next-btn');
    let chocoBites = 0;

    if (chocoInteract) {
        chocoInteract.addEventListener('click', (e) => {
            e.stopPropagation();
            chocoBites++;
            if (chocoBites < 5) {
                let scale = 1.2 - (chocoBites * 0.2); 
                chocoInteract.style.transform = `scale(${scale}) rotate(${Math.random() * 20 - 10}deg)`;
                chocoNote.innerText = `Crunch! 😋 (${5 - chocoBites} bites left)`;
                createFallingElement("🍫");
            } else {
                chocoInteract.style.display = 'none'; 
                if(chocoInstruction) chocoInstruction.style.display = 'none';
                chocoNote.innerText = "You found the secret message! ❤️";
                chocoMessage.style.display = 'block'; 
                chocoReasonBtn.style.display = 'inline-block';
                chocoNextBtn.style.display = 'inline-block';
                for(let i=0; i<30; i++) setTimeout(() => createFallingElement("❤️"), i*100);
            }
        });
    }

    // --- TEDDY DAY ---
    const teddyInteract = document.getElementById('teddy-interact');
    const teddyGameContainer = document.getElementById('teddy-game-container');
    const teddyReveal = document.getElementById('teddy-reveal');
    const hugAyushBtn = document.getElementById('hug-ayush-btn');
    const teddyFinalMsg = document.getElementById('teddy-final-msg');
    const teddyNavContainer = document.getElementById('teddy-nav-container');
    const teddyInitialNav = document.getElementById('teddy-initial-nav');

    if (teddyInteract) {
        teddyInteract.addEventListener('click', (e) => {
            e.stopPropagation();
            teddyGameContainer.style.display = 'none';
            teddyInitialNav.style.display = 'none';
            teddyReveal.style.display = 'block'; 
            createFallingElement("❓");
        });

        hugAyushBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            teddyReveal.style.display = 'none';
            teddyFinalMsg.style.display = 'block';
            teddyNavContainer.style.display = 'block';
            for(let i=0; i<50; i++) setTimeout(() => createFallingElement("🫂"), i*50);
            for(let i=0; i<30; i++) setTimeout(() => createFallingElement("❤️"), i*80);
        });
    }

    // --- PROMISE DAY (FLASHLIGHT EFFECT) ---
    const promiseSection = document.querySelector('.screen.promise-bg');
    const flashlightOverlay = document.getElementById('flashlight-overlay');
    const lightUpBtn = document.getElementById('light-up-btn');
    const promiseMsg = document.getElementById('promise-sealed-msg');
    const promiseNext = document.getElementById('promise-next-btn');

    if (promiseSection) {
        // Track mouse/touch everywhere to ensure light follows even if off-center
        document.addEventListener('mousemove', (e) => {
            if (promiseSection.classList.contains('active')) {
                flashlightOverlay.style.setProperty('--cursor-x', `${e.clientX}px`);
                flashlightOverlay.style.setProperty('--cursor-y', `${e.clientY}px`);
            }
        });

        document.addEventListener('touchmove', (e) => {
            if (promiseSection.classList.contains('active')) {
                const touch = e.touches[0];
                flashlightOverlay.style.setProperty('--cursor-x', `${touch.clientX}px`);
                flashlightOverlay.style.setProperty('--cursor-y', `${touch.clientY}px`);
            }
        });
    }

    if (lightUpBtn) {
        lightUpBtn.addEventListener('click', () => {
            flashlightOverlay.classList.add('bright-mode'); // Remove darkness
            lightUpBtn.style.display = 'none';
            promiseMsg.classList.remove('hidden');
            promiseNext.style.display = 'inline-block';
            for(let i=0; i<30; i++) setTimeout(() => createFallingElement("🤞"), i*50);
            showToast("Promise Sealed! 🔒");
        });
    }

    // --- HUG DAY (FIXED ARM ANIMATION) ---
    const hugBtn = document.getElementById('hug-btn');
    const hugSection = document.querySelector('.screen.hug-bg');
    const hugStatus = document.getElementById('hug-status');
    const hugSuccess = document.getElementById('hug-success');
    const hugNextBtn = document.getElementById('hug-next-btn');
    
    let hugTimer;

    if (hugBtn) {
        // Start Hugging
        const startHug = (e) => {
            e.preventDefault();
            hugSection.classList.add("hugging"); // Arms move in
            hugBtn.style.transform = "scale(0.9)";
            hugStatus.innerText = "Squeezing... 🤗";
            
            // Vibrate pattern
            if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

            hugTimer = setTimeout(() => {
                finishHug();
            }, 2000); // Hold for 2 seconds
        };

        // Stop Hugging
        const stopHug = () => {
            clearTimeout(hugTimer);
            if (!hugSuccess.classList.contains('hidden')) return; // Already finished
            
            hugSection.classList.remove("hugging"); // Arms go back
            hugBtn.style.transform = "scale(1)";
            hugStatus.innerText = "Don't let go yet! 🥺";
        };

        function finishHug() {
            hugBtn.style.display = "none";
            hugStatus.style.display = "none";
            hugSuccess.classList.remove('hidden');
            hugNextBtn.style.display = "inline-block";
            
            // Big vibration + Confetti
            if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
            for(let i=0; i<30; i++) setTimeout(() => createFallingElement("🫂"), i*50);
            showToast("Sent a warm hug! ❤️");
        }

        hugBtn.addEventListener('mousedown', startHug);
        hugBtn.addEventListener('mouseup', stopHug);
        hugBtn.addEventListener('mouseleave', stopHug);
        hugBtn.addEventListener('touchstart', startHug);
        hugBtn.addEventListener('touchend', stopHug);
    }

    // --- REASONS MODAL ---
    const reasons = [
        "Because you handle me even when I get cold or text dry 🥺",
        "Because I am obsessed with your eyes and lips 💋",
        "Because... 1898 🙈 (You know what I mean 😋)",
        "Because you stick with me even when I can't put in enough efforts ❤️",
        "Because you are simply Aarohi ❤️",
        "Because you are my future Mrs. Ayush 🏡",
        "Because 1898... okay I'll stop being naughty 🌚",
        "Because you are my safe place, my home 🏠"
    ];

    let availableReasons = [...reasons];
    const modal = document.getElementById('love-modal');
    const modalText = document.getElementById('modal-text');
    const closeModal = document.querySelector('.close-modal');
    const loveBtns = document.querySelectorAll('.love-reason-btn');

    loveBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (availableReasons.length === 0) availableReasons = [...reasons];
            const randomIndex = Math.floor(Math.random() * availableReasons.length);
            const selectedReason = availableReasons[randomIndex];
            availableReasons.splice(randomIndex, 1);
            modalText.innerText = selectedReason;
            modal.classList.remove('hidden');
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
        if (e.target === secretModal) secretModal.classList.add('hidden');
        if (e.target === passModal) passModal.classList.add('hidden');
    });

    // --- INTERACTIVE FEATURES ---
    function triggerAnimation(id, animClass, emoji) {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', (e) => {
                e.stopPropagation();
                element.classList.remove(animClass);
                void element.offsetWidth; 
                element.classList.add(animClass);
                if (emoji) {
                    for(let i=0; i<10; i++) setTimeout(() => createFallingElement(emoji), i*200);
                }
            });
        }
    }
    triggerAnimation('hug-interact', 'shake-anim', '🫂');

    const kissSection = document.getElementById('kiss-section');
    if (kissSection) {
        kissSection.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            const kiss = document.createElement('div');
            kiss.innerText = "💋";
            kiss.classList.add('kiss-mark');
            kiss.style.left = `${e.clientX}px`;
            kiss.style.top = `${e.clientY}px`;
            kiss.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
            document.body.appendChild(kiss);
            setTimeout(() => kiss.remove(), 2000);
        });
    }

    // ==========================================
    // 💌 VALENTINE'S DAY (CONTRACT LOGIC)
    // ==========================================
    const valEnvelope = document.getElementById('val-envelope');
    const valContent = document.getElementById('val-content');
    const officialStamp = document.getElementById('official-stamp');
    const postSignMsg = document.getElementById('post-sign-msg');
    
    // Open Envelope
    if (valEnvelope) {
        valEnvelope.addEventListener('click', (e) => {
            e.stopPropagation();
            valEnvelope.style.transform = "scale(0) rotate(360deg)";
            valEnvelope.style.opacity = "0";
            setTimeout(() => {
                valEnvelope.style.display = "none";
                valContent.style.display = "block";
                valContent.style.opacity = "1";
                valContent.style.transform = "scale(1)";
                for(let i=0; i<30; i++) setTimeout(() => createFallingElement("📜"), i*50);
            }, 500);
        });
    }

    // ✍️ CONTRACT SIGNING LOGIC
    const contractCheckbox = document.getElementById('contract-checkbox');
    const signatureInput = document.getElementById('signature-input');
    const signContractBtn = document.getElementById('sign-contract-btn');

    function checkContractStatus() {
        const isChecked = contractCheckbox.checked;
        const enteredName = signatureInput.value.trim().toLowerCase();
        // REQUIRE SHE TYPES "AAROHI"
        const isSignedCorrectly = enteredName === "aarohi";

        if (isChecked) {
            signatureInput.disabled = false; 
            signatureInput.style.borderBottom = "2px solid #d81b60";
        } else {
            signatureInput.disabled = true;
            signatureInput.style.borderBottom = "2px solid #333";
        }

        if (isChecked && isSignedCorrectly) {
            signContractBtn.disabled = false;
            signContractBtn.style.opacity = "1";
            signContractBtn.style.cursor = "pointer";
            signContractBtn.style.background = "#d81b60"; 
            signContractBtn.classList.add('pulse-anim'); 
        } else {
            signContractBtn.disabled = true;
            signContractBtn.style.opacity = "0.5";
            signContractBtn.style.cursor = "not-allowed";
            signContractBtn.style.background = "#333";
            signContractBtn.classList.remove('pulse-anim');
        }
    }

    if (contractCheckbox && signatureInput) {
        contractCheckbox.addEventListener('change', checkContractStatus);
        signatureInput.addEventListener('input', checkContractStatus); 
    }

    // Sign Contract Logic
    if (signContractBtn) {
        signContractBtn.addEventListener('click', () => {
            // 1. Disable interactions
            signContractBtn.style.display = 'none';
            contractCheckbox.parentElement.style.display = 'none';
            signatureInput.disabled = true;
            
            // 2. Show Stamp
            officialStamp.classList.remove('hidden');
            officialStamp.classList.add('stamp-animation');
            
            // 3. Show confetti
            for(let i=0; i<100; i++) {
                setTimeout(() => createFallingElement("❤️"), i*30);
                setTimeout(() => createFallingElement("🎉"), i*40);
            }

            // 4. Show Success Message
            setTimeout(() => {
                postSignMsg.classList.remove('hidden');
                showToast("AGREEMENT SEALED! 💍");
            }, 800);
        });
    }

    function createFallingElement(specificEmoji) {
        const container = document.getElementById('hearts-container');
        const el = document.createElement('div');
        el.classList.add('heart');
        el.innerText = specificEmoji || (Math.random() > 0.8 ? '✨' : currentEmoji); 
        el.style.left = Math.random() * 100 + 'vw';
        el.style.fontSize = Math.random() * 20 + 15 + 'px';
        el.style.animationDuration = Math.random() * 3 + 2 + 's'; 
        container.appendChild(el);
        setTimeout(() => el.remove(), 5000);
    }

    function createFallingText(text) {
        const container = document.getElementById('hearts-container');
        const el = document.createElement('div');
        el.classList.add('text-petal');
        el.innerText = text;
        el.style.left = Math.random() * 80 + 10 + 'vw';
        el.style.animationDuration = Math.random() * 3 + 3 + 's';
        container.appendChild(el);
        setTimeout(() => el.remove(), 6000);
    }

    setInterval(() => createFallingElement(), 300);
});