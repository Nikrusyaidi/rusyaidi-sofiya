/* ========================================
   ELEMENTS
======================================== */

const openButton = document.getElementById("openInvitation");

const welcomeScreen = document.querySelector(".welcome-screen");

const mainInvitation = document.getElementById("mainInvitation");

const backgroundMusic = document.getElementById("backgroundMusic");

const musicButton = document.getElementById("musicButton");

const musicIcon = document.querySelector(".music-icon");


/* ========================================
   OPEN INVITATION
======================================== */

openButton.addEventListener("click", function () {


    /* Fade welcome screen */

    welcomeScreen.classList.add("fade-out");


    setTimeout(function () {


        /* Hide welcome screen */

        welcomeScreen.style.display = "none";


        /* Show invitation */

        mainInvitation.style.display = "block";


        setTimeout(function () {

            mainInvitation.classList.add("show");

        }, 50);


        /* Scroll to top */

        window.scrollTo({

            top: 0,

            behavior: "instant"

        });


        /* Show music button */

        musicButton.classList.add("show");


        /* Play music */

        backgroundMusic.play()

            .then(function () {

                musicButton.classList.add("playing");

                musicIcon.innerHTML = "♫";

            })

            .catch(function () {

                console.log("Music autoplay blocked.");

            });


        /* Start animations */

        initialiseRevealAnimations();


        animateWords();


    }, 800);


});


/* ========================================
   MUSIC BUTTON
======================================== */

musicButton.addEventListener("click", function () {


    if (backgroundMusic.paused) {


        backgroundMusic.play();


        musicButton.classList.add("playing");


        musicIcon.innerHTML = "♫";


    } else {


        backgroundMusic.pause();


        musicButton.classList.remove("playing");


        musicIcon.innerHTML = "♪";


    }


});


/* ========================================
   COUNTDOWN
======================================== */

const weddingDate = new Date(

    "October 18, 2026 11:00:00"

).getTime();


function updateCountdown() {


    const now = new Date().getTime();


    const distance = weddingDate - now;


    if (distance < 0) {


        document.getElementById("days").innerHTML = "00";

        document.getElementById("hours").innerHTML = "00";

        document.getElementById("minutes").innerHTML = "00";

        document.getElementById("seconds").innerHTML = "00";


        return;


    }


    const days = Math.floor(

        distance /

        (1000 * 60 * 60 * 24)

    );


    const hours = Math.floor(

        (distance %

            (1000 * 60 * 60 * 24))

        /

        (1000 * 60 * 60)

    );


    const minutes = Math.floor(

        (distance %

            (1000 * 60 * 60))

        /

        (1000 * 60)

    );


    const seconds = Math.floor(

        (distance %

            (1000 * 60))

        /

        1000

    );


    document.getElementById("days").innerHTML = days;


    document.getElementById("hours").innerHTML =

        hours.toString().padStart(2, "0");


    document.getElementById("minutes").innerHTML =

        minutes.toString().padStart(2, "0");


    document.getElementById("seconds").innerHTML =

        seconds.toString().padStart(2, "0");


}


/* Update immediately */

updateCountdown();


/* Update every second */

setInterval(updateCountdown, 1000);


/* ========================================
   COPY ACCOUNT NUMBER
======================================== */

function copyAccount() {


    const accountNumber = "164687074021";


    navigator.clipboard.writeText(accountNumber);


    const button = document.querySelector(".copy-account");


    button.innerText = "NOMBOR AKAUN DISALIN ✓";


    setTimeout(function () {


        button.innerText = "SALIN NOMBOR AKAUN";


    }, 2000);


}


/* ========================================
   SCROLL REVEAL ANIMATION
======================================== */

function initialiseRevealAnimations() {


    const revealElements =

        document.querySelectorAll(".reveal-on-scroll");


    const observer = new IntersectionObserver(

        function (entries) {


            entries.forEach(function (entry) {


                if (entry.isIntersecting) {


                    entry.target.classList.add("active");


                    observer.unobserve(entry.target);


                }


            });


        },

        {

            threshold: 0.15

        }

    );


    revealElements.forEach(function (element) {


        observer.observe(element);


    });


}


/* ========================================
   WORD ANIMATION
======================================== */

function animateWords() {


    const elements = document.querySelectorAll(

        ".section-title, .closing-title"

    );


    elements.forEach(function (element) {


        const text = element.textContent.trim();


        const words = text.split(" ");


        element.innerHTML = "";


        words.forEach(function (word, index) {


            const span = document.createElement("span");


            span.classList.add("word");


            span.textContent = word;


            span.style.animationDelay =

                (index * 0.12) + "s";


            element.appendChild(span);


            element.appendChild(

                document.createTextNode(" ")

            );


        });


    });


}
