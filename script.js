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


    /* Fade out welcome screen */

    welcomeScreen.classList.add("fade-out");


    setTimeout(function () {


        /* Hide welcome screen */

        welcomeScreen.style.display = "none";


        /* Show invitation */

        mainInvitation.classList.add("show");


        /* Show music button */

        musicButton.classList.add("show");


        /* Scroll to top */

        window.scrollTo({

            top: 0,

            behavior: "instant"

        });


        /* Try playing music */

        backgroundMusic.play()
            .then(function () {

                musicButton.classList.add("playing");

                musicIcon.innerHTML = "♫";

            })
            .catch(function () {

                console.log("Music autoplay blocked by browser.");

            });


        /* Start animations */

        setTimeout(function () {

            initialiseRevealAnimations();

        }, 300);


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

        hours
            .toString()
            .padStart(2, "0");


    document.getElementById("minutes").innerHTML =

        minutes
            .toString()
            .padStart(2, "0");


    document.getElementById("seconds").innerHTML =

        seconds
            .toString()
            .padStart(2, "0");


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


    const button =
        document.querySelector(".copy-account");


    button.innerText =
        "NOMBOR AKAUN DISALIN ✓";


    setTimeout(function () {


        button.innerText =
            "SALIN NOMBOR AKAUN";


    }, 2000);


}


/* ========================================
   WORD ANIMATION
======================================== */

function animateWords() {


    const elements = document.querySelectorAll(
        ".animate-words"
    );


    elements.forEach(function (element) {


        if (element.dataset.animated === "true") {

            return;

        }


        element.dataset.animated = "true";


        const walker = document.createTreeWalker(

            element,

            NodeFilter.SHOW_TEXT,

            null,

            false

        );


        const textNodes = [];


        let node;


        while (node = walker.nextNode()) {


            if (
                node.nodeValue.trim().length > 0
            ) {

                textNodes.push(node);

            }

        }


        let delay = 0;


        textNodes.forEach(function (textNode) {


            const words =
                textNode.nodeValue.split(/(\s+)/);


            const fragment =
                document.createDocumentFragment();


            words.forEach(function (word) {


                if (word.trim() === "") {


                    fragment.appendChild(

                        document.createTextNode(word)

                    );


                } else {


                    const span =
                        document.createElement("span");


                    span.classList.add("word");


                    span.textContent = word;


                    span.style.animationDelay =
                        delay + "s";


                    delay += 0.06;


                    fragment.appendChild(span);

                }


            });


            textNode.parentNode.replaceChild(

                fragment,

                textNode

            );


        });


    });


}


/* ========================================
   SCROLL REVEAL
======================================== */

function initialiseRevealAnimations() {


    animateWords();


    const sections = document.querySelectorAll(
        ".reveal-section"
    );


    const observer =
        new IntersectionObserver(

            function (entries) {


                entries.forEach(function (entry) {


                    if (entry.isIntersecting) {


                        entry.target.classList.add(
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );


                    }


                });


            },


            {

                threshold: 0.12

            }

        );


    sections.forEach(function (section) {


        observer.observe(section);


    });


}
