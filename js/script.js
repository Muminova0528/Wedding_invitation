
/* =========================
   ELEMENTS
========================= */

const envelope = document.getElementById("envelope");
const openButton = document.getElementById("openButton");

const intro = document.getElementById("intro");
const mainContent = document.getElementById("mainContent");

const music = document.getElementById("weddingMusic");
const musicButton = document.getElementById("musicButton");
const musicLabel = document.getElementById("musicLabel");

let invitationOpened = false;


/* =========================
   OPEN INVITATION
========================= */

function openInvitation() {

    // Prevent repeated clicks
    if (invitationOpened) return;

    invitationOpened = true;

    // Open envelope animation
    envelope.classList.add("open");

    // Start music after user's click
    music.play()
        .then(() => {
            updateMusicButton(true);
        })
        .catch((error) => {
            console.log("Music autoplay blocked:", error);
            updateMusicButton(false);
        });

    // Disable repeated clicks
    openButton.disabled = true;
    openButton.textContent = "TAKLIFNOMA OCHILMOQDA...";

    // Show main invitation after envelope animation
    setTimeout(() => {

        intro.style.opacity = "0";
        intro.style.visibility = "hidden";

        mainContent.style.display = "block";

        // Allow display:block to apply before opacity transition
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                mainContent.classList.add("visible");
            });
        });

        // Enable music control
        musicButton.hidden = false;

        // Activate scroll animations
        observeSections();

    }, 1900);

}


// Event listeners
envelope.addEventListener("click", openInvitation);
openButton.addEventListener("click", openInvitation);


/* =========================
   MUSIC CONTROL
========================= */

function updateMusicButton(isPlaying) {

    if (isPlaying) {

        musicButton.classList.add("playing");
        musicLabel.textContent = "MUSIQA YOQILGAN";

    } else {

        musicButton.classList.remove("playing");
        musicLabel.textContent = "MUSIQA O‘CHIRILGAN";

    }

}


musicButton.addEventListener("click", async () => {

    if (music.paused) {

        try {

            await music.play();
            updateMusicButton(true);

        } catch (error) {

            console.error("Musiqani ijro etib bo'lmadi:", error);
            updateMusicButton(false);

        }

    } else {

        music.pause();
        updateMusicButton(false);

    }

});


/* =========================
   COUNTDOWN TIMER
   Andijon time: UTC +5
========================= */

// Wedding date: November 16, 2026
// Wedding time: 11:00 (Andijan time, UTC+5)

const weddingDate = new Date(
    "2026-11-16T06:00:00Z"
).getTime();


const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");


function updateCountdown() {

    const now = Date.now();

    const difference = weddingDate - now;

    // If wedding date has arrived
    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;
    }


    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    daysElement.textContent = String(days).padStart(2, "0");

    hoursElement.textContent = String(hours).padStart(2, "0");

    minutesElement.textContent = String(minutes).padStart(2, "0");

    secondsElement.textContent = String(seconds).padStart(2, "0");

}


// Start countdown
updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================
   SCROLL REVEAL ANIMATION
========================= */

function observeSections() {

    const sections = document.querySelectorAll(".section-reveal");

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px"
        }
    );


    sections.forEach(section => {
        observer.observe(section);
    });

}
