const openButton = document.getElementById("openInvitation");

const welcomeScreen = document.querySelector(".welcome-screen");

const mainInvitation = document.getElementById("mainInvitation");


// ========================================
// BACKGROUND MUSIC
// ========================================

const backgroundMusic = document.getElementById("backgroundMusic");

const musicButton = document.getElementById("musicButton");

const musicIcon = document.querySelector(".music-icon");


// ========================================
// OPEN INVITATION
// ========================================

openButton.addEventListener("click", function () {

    // Start music when visitor opens invitation

    backgroundMusic.play().catch(function (error) {

        console.log("Music autoplay blocked:", error);

    });


    // Show music button

    musicButton.classList.add("show");

    musicButton.classList.add("playing");


    // Start fading out cover

    welcomeScreen.classList.add("fade-out");


    // Wait for fade animation

    setTimeout(function () {

        // Remove cover completely

        welcomeScreen.style.display = "none";


        // Show main invitation

        mainInvitation.style.display = "block";

        mainInvitation.classList.add("show");


        // Scroll to top

        window.scrollTo({

            top: 0,

            behavior: "instant"

        });


    }, 800);

});


// ========================================
// MUSIC PLAY / PAUSE BUTTON
// ========================================

musicButton.addEventListener("click", function () {

    if (backgroundMusic.paused) {

        // Play music

        backgroundMusic.play();

        musicButton.classList.add("playing");

        musicIcon.innerHTML = "♫";

    }

    else {

        // Pause music

        backgroundMusic.pause();

        musicButton.classList.remove("playing");

        musicIcon.innerHTML = "♪";

    }

});


// ========================================
// WEDDING COUNTDOWN
// ========================================

const weddingDate = new Date("October 18, 2026 11:00:00").getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const distance = weddingDate - now;


    // Time calculations

    const days = Math.floor(

        distance / (1000 * 60 * 60 * 24)

    );


    const hours = Math.floor(

        (distance % (1000 * 60 * 60 * 24)) /

        (1000 * 60 * 60)

    );


    const minutes = Math.floor(

        (distance % (1000 * 60 * 60)) /

        (1000 * 60)

    );


    const seconds = Math.floor(

        (distance % (1000 * 60)) /

        1000

    );


    // Display countdown

    document.getElementById("days").innerHTML = days;

    document.getElementById("hours").innerHTML =

        hours.toString().padStart(2, "0");

    document.getElementById("minutes").innerHTML =

        minutes.toString().padStart(2, "0");

    document.getElementById("seconds").innerHTML =

        seconds.toString().padStart(2, "0");


    // When wedding day arrives

    if (distance < 0) {

        document.getElementById("days").innerHTML = "00";

        document.getElementById("hours").innerHTML = "00";

        document.getElementById("minutes").innerHTML = "00";

        document.getElementById("seconds").innerHTML = "00";

    }

}


// Update immediately

updateCountdown();


// Update every second

setInterval(updateCountdown, 1000);


// ========================================
// COPY ACCOUNT NUMBER
// ========================================

function copyAccount() {

    const accountNumber = "164687074021";

    navigator.clipboard.writeText(accountNumber);


    const button = document.querySelector(".copy-account");


    button.innerText = "NOMBOR AKAUN DISALIN ✓";


    setTimeout(() => {

        button.innerText = "SALIN NOMBOR AKAUN";

    }, 2000);

}
