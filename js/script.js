/* =========================================================
   ELEMENTS
========================================================= */
document.body.classList.add("welcome-locked");

const openButton =
    document.getElementById("openInvitation");

const welcomeScreen =
    document.querySelector(".welcome-screen");

const mainInvitation =
    document.getElementById("mainInvitation");

const backgroundMusic =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");

const musicIcon =
    document.querySelector(".music-icon");

const floatingNav =
    document.getElementById("floatingNav");

const navItems =
    document.querySelectorAll(".nav-item");


/* =========================================================
   OPEN INVITATION
========================================================= */

if (openButton) {

    openButton.addEventListener(
        "click",
        function () {


            if (
                !welcomeScreen ||
                !mainInvitation
            ) {

                return;

            }


            /* Start the door animation immediately. */
            welcomeScreen.classList.add(
                "door-opening"
            );


            /* Falling leaves begin only after the invitation is opened. */
            if (typeof startFallingLeaves === "function") {
                startFallingLeaves();
            }


            setTimeout(
                function () {


                    welcomeScreen.classList.add(
                        "fade-out"
                    );

                     document.body.classList.remove("welcome-locked");
                   
                    setTimeout(function () {
                        welcomeScreen.style.display =
                            "none";
                    }, 350);


                    mainInvitation.style.display =
                        "block";


                    requestAnimationFrame(
                        function () {

                            mainInvitation.classList.add(
                                "show"
                            );

                        }
                    );


                    window.scrollTo({

                        top: 0,

                        behavior: "auto"

                    });


                    /* Show floating navigation */

                    if (floatingNav) {

                        floatingNav.classList.add(
                            "show"
                        );

                    }


                    /* Show music button */

                    if (musicButton) {

                        musicButton.classList.add(
                            "show"
                        );

                    }


                    /* Play music */

                    if (backgroundMusic) {

                        backgroundMusic
                            .play()
                            .then(
                                function () {


                                    if (musicButton) {

                                        musicButton.classList.add(
                                            "playing"
                                        );

                                    }


                                    if (musicIcon) {

                                        musicIcon.innerHTML =
                                            "♫";

                                    }

                                }
                            )
                            .catch(
                                function () {

                                    console.log(
                                        "Music autoplay was blocked."
                                    );

                                }
                            );

                    }


                    initialiseRevealAnimations();

                    animateWords();


                },
                800
            );

        }
    );

}


/* =========================================================
   MUSIC
========================================================= */

if (
    musicButton &&
    backgroundMusic
) {

    musicButton.addEventListener(
        "click",
        function () {


            if (
                backgroundMusic.paused
            ) {


                backgroundMusic
                    .play()
                    .then(
                        function () {


                            musicButton.classList.add(
                                "playing"
                            );


                            if (musicIcon) {

                                musicIcon.innerHTML =
                                    "♫";

                            }

                        }
                    )
                    .catch(
                        function () {

                            console.log(
                                "Unable to play music."
                            );

                        }
                    );


            } else {


                backgroundMusic.pause();


                musicButton.classList.remove(
                    "playing"
                );


                if (musicIcon) {

                    musicIcon.innerHTML =
                        "♪";

                }

            }

        }
    );

}


/* =========================================================
   NAVIGATION CLICK
   Smoothly scroll selected section to the middle
========================================================= */

navItems.forEach(function (item) {

    item.addEventListener("click", function (event) {

        event.preventDefault();

        const targetId = item.getAttribute("href");
        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        navItems.forEach(function (nav) {
            nav.classList.remove("active");
        });

        item.classList.add("active");


        /* Open HUBUNGI KAMI accordion */
        if (targetId === "#hubungi") {

            const hubungi =
                document.getElementById("hubungi");

            if (hubungi) {
                hubungi.open = true;
            }
        }


        /* Scroll section toward center */
        setTimeout(function () {

            const rect =
                target.getBoundingClientRect();

            const targetPosition =
                window.scrollY +
                rect.top -
                (window.innerHeight / 2) +
                (rect.height / 2);

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        }, 100);

    });

});


/* =========================================================
   ACTIVE SECTION DETECTION
========================================================= */

function initialiseNavigationObserver() {

    const sections =
        document.querySelectorAll(
            "#majlis, #countdown, #rsvp, #hubungi, #pesanan-tetamu, #terima-kasih"
        );


    if (!sections.length) {

        return;

    }


    const observer =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            const id =
                                entry.target.id;


                            navItems.forEach(
                                function (item) {

                                    item.classList.toggle(

                                        "active",

                                        item.getAttribute(
                                            "href"
                                        ) ===
                                        "#" + id

                                    );

                                }
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.35
            }

        );


    sections.forEach(
        function (section) {

            observer.observe(
                section
            );

        }
    );

}


/* =========================================================
   COUNTDOWN
========================================================= */

const weddingDate =
    new Date(
        "October 18, 2026 11:00:00"
    ).getTime();


function updateCountdown() {


    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {

        return;

    }


    const now =
        new Date().getTime();


    const distance =
        weddingDate - now;


    if (
        distance <= 0
    ) {


        daysElement.innerHTML =
            "00";


        hoursElement.innerHTML =
            "00";


        minutesElement.innerHTML =
            "00";


        secondsElement.innerHTML =
            "00";


        return;

    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                distance %
                (1000 * 60)
            ) /
            1000
        );


    daysElement.innerHTML =
        days;


    hoursElement.innerHTML =
        hours
            .toString()
            .padStart(
                2,
                "0"
            );


    minutesElement.innerHTML =
        minutes
            .toString()
            .padStart(
                2,
                "0"
            );


    secondsElement.innerHTML =
        seconds
            .toString()
            .padStart(
                2,
                "0"
            );

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   COPY ACCOUNT
========================================================= */

function copyAccount() {


    const accountNumber =
        "164687074021";


    const button =
        document.querySelector(
            ".copy-account"
        );


    if (!button) {

        return;

    }


    if (
        navigator.clipboard &&
        window.isSecureContext
    ) {


        navigator.clipboard
            .writeText(
                accountNumber
            )
            .then(
                function () {

                    showCopySuccess(
                        button
                    );

                }
            )
            .catch(
                function () {

                    fallbackCopy(
                        accountNumber,
                        button
                    );

                }
            );


        return;

    }


    fallbackCopy(
        accountNumber,
        button
    );

}


function showCopySuccess(
    button
) {


    button.innerText =
        "NOMBOR AKAUN DISALIN ✓";


    setTimeout(
        function () {

            button.innerText =
                "SALIN NOMBOR AKAUN";

        },
        2000
    );

}


function fallbackCopy(
    text,
    button
) {


    const textarea =
        document.createElement(
            "textarea"
        );


    textarea.value =
        text;


    textarea.style.position =
        "fixed";


    textarea.style.opacity =
        "0";


    document.body.appendChild(
        textarea
    );


    textarea.select();


    try {


        document.execCommand(
            "copy"
        );


        showCopySuccess(
            button
        );


    } catch (error) {


        console.log(
            "Copy failed.",
            error
        );


    }


    document.body.removeChild(
        textarea
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initialiseRevealAnimations() {


    const revealElements =
        document.querySelectorAll(
            ".reveal-on-scroll"
        );


    if (
        !revealElements.length
    ) {

        return;

    }


    const observer =
        new IntersectionObserver(

            function (entries) {


                entries.forEach(
                    function (entry) {


                        if (
                            entry.isIntersecting
                        ) {


                            entry.target.classList.add(
                                "active"
                            );


                            observer.unobserve(
                                entry.target
                            );


                        }

                    }
                );


            },

            {

                threshold: 0.12

            }

        );


    revealElements.forEach(
        function (element) {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   WORD ANIMATION
========================================================= */

function animateWords() {


    const elements =
        document.querySelectorAll(
            ".section-title, .closing-title"
        );


    elements.forEach(
        function (element) {


            if (
                element.dataset.wordsAnimated ===
                "true"
            ) {

                return;

            }


            element.dataset.wordsAnimated =
                "true";


            const text =
                element.textContent.trim();


            if (!text) {

                return;

            }


            const words =
                text.split(/\s+/);


            element.innerHTML =
                "";


            words.forEach(
                function (
                    word,
                    index
                ) {


                    const span =
                        document.createElement(
                            "span"
                        );


                    span.classList.add(
                        "word"
                    );


                    span.textContent =
                        word;


                    span.style.animationDelay =
                        (
                            index * 0.12
                        ) + "s";


                    element.appendChild(
                        span
                    );


                    if (
                        index <
                        words.length - 1
                    ) {


                        element.appendChild(

                            document.createTextNode(
                                " "
                            )

                        );


                    }

                }
            );


        }
    );

}


/* =========================================================
   INFINITE FALLING LEAVES
========================================================= */

function createFallingLeaf() {


    const container =
        document.getElementById(
            "fallingLeaves"
        );


    if (!container) {

        return;

    }


    const leaf =
        document.createElement(
            "div"
        );


    leaf.classList.add(
        "falling-leaf"
    );


    /* Starting X */

    const startX =
        Math.random() * 100;


    /* Random movement */

    const driftA =
        (
            Math.random() * 140
        ) - 70;


    const driftB =
        (
            Math.random() * 180
        ) - 90;


    const driftC =
        (
            Math.random() * 180
        ) - 90;


    const driftD =
        (
            Math.random() * 220
        ) - 110;


    /* Falling speed */

    const duration =
        9 +
        Math.random() * 9;


    /* Size */

    const size =
        10 +
        Math.random() * 13;


    /* Opacity */

    const opacity =
        0.16 +
        Math.random() * 0.25;


    /* CSS variables */

    leaf.style.setProperty(
        "--start-x",
        startX + "vw"
    );


    leaf.style.setProperty(
        "--drift-a",
        driftA + "px"
    );


    leaf.style.setProperty(
        "--drift-b",
        driftB + "px"
    );


    leaf.style.setProperty(
        "--drift-c",
        driftC + "px"
    );


    leaf.style.setProperty(
        "--drift-d",
        driftD + "px"
    );


    leaf.style.setProperty(
        "--leaf-opacity",
        opacity
    );


    leaf.style.width =
        size + "px";


    leaf.style.height =
        (
            size * 1.6
        ) + "px";


    leaf.style.animationDuration =
        duration + "s";


    /* Add */

    container.appendChild(
        leaf
    );


    /* Start */

    requestAnimationFrame(
        function () {

            leaf.classList.add(
                "animate"
            );

        }
    );


    /* Remove */

    setTimeout(
        function () {

            if (
                leaf.parentNode
            ) {

                leaf.remove();

            }

        },
        (
            duration * 1000
        ) + 1000
    );

}


/* =========================================================
   START FALLING LEAVES
========================================================= */

let fallingLeavesStarted = false;


function startFallingLeaves() {


    if (fallingLeavesStarted) {
        return;
    }


    fallingLeavesStarted = true;


    const container = document.getElementById("fallingLeaves");

    if (container) {
        container.classList.add("started");
    }


    /* Initial leaves */

    for (
        let i = 0;
        i < 12;
        i++
    ) {


        setTimeout(
            function () {

                createFallingLeaf();

            },
            i * 450
        );


    }


    /* New leaf forever */

    setInterval(
        function () {

            createFallingLeaf();

        },
        850
    );

}


/* =========================================================
   START
========================================================= */

initialiseNavigationObserver();

/* Falling leaves are started after the door is opened. */

