document.addEventListener("DOMContentLoaded", () => {

    const loadingScreen =
        document.querySelector(".loading-screen");

    const loadingName =
        document.querySelector(".loading-name");

    const header =
        document.querySelector("#header");

    const hamburger =
        document.querySelector(".hamburger");

    const nav =
        document.querySelector(".nav");

    const navLinks =
        document.querySelectorAll(".nav a");

    const isWorksReturn =
        window.location.hash === "#works";


    /*=========================================
    GSAP CHECK
    =========================================*/

    if (typeof gsap === "undefined") {

        if (loadingScreen) {
            loadingScreen.remove();
        }

        document.body.classList.remove("is-loading");

        return;
    }


    if (typeof ScrollTrigger !== "undefined") {

        gsap.registerPlugin(ScrollTrigger);

    }


    /*=========================================
    HEADER
    =========================================*/

    function updateHeader() {

        if (!header) return;

        header.classList.toggle(
            "is-scrolled",
            window.scrollY > 30
        );

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();


    /*=========================================
    HAMBURGER MENU
    =========================================*/

    if (hamburger && nav) {

        hamburger.addEventListener("click", () => {

            const isOpen =
                hamburger.classList.toggle("active");

            nav.classList.toggle(
                "active",
                isOpen
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

            hamburger.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            hamburger.setAttribute(
                "aria-label",
                isOpen
                    ? "メニューを閉じる"
                    : "メニューを開く"
            );

        });


        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                hamburger.classList.remove("active");

                nav.classList.remove("active");

                document.body.classList.remove("menu-open");

                hamburger.setAttribute(
                    "aria-expanded",
                    "false"
                );

                hamburger.setAttribute(
                    "aria-label",
                    "メニューを開く"
                );

            });

        });

    }


    /*=========================================
    FIRST VIEW INITIAL STATE
    =========================================*/

    if (!isWorksReturn) {

        gsap.set(
            ".fv-illustration img",
            {
                x: -35,
                opacity: 0
            }
        );

        gsap.set(
            ".graphic-copy",
            {
                y: 10,
                opacity: 0
            }
        );

        gsap.set(
            ".portfolio-title span",
            {
                y: 16,
                opacity: 0
            }
        );

        gsap.set(
            ".designer-name",
            {
                y: 10,
                opacity: 0
            }
        );

        gsap.set(
            ".scroll-down",
            {
                opacity: 0
            }
        );

        gsap.set(
            ".fv-ball",
            {
                opacity: 0
            }
        );

    } else {

        /*
        WORKSから戻る場合は
        FVを最初から完成状態にしておく
        */

        gsap.set(
            ".fv-illustration img",
            {
                x: 0,
                opacity: 1
            }
        );

        gsap.set(
            ".graphic-copy",
            {
                y: 0,
                opacity: 1
            }
        );

        gsap.set(
            ".portfolio-title span",
            {
                y: 0,
                opacity: 1
            }
        );

        gsap.set(
            ".designer-name",
            {
                y: 0,
                opacity: 1
            }
        );

        gsap.set(
            ".scroll-down",
            {
                opacity: 1
            }
        );

        gsap.set(
            ".fv-ball",
            {
                opacity: 0.48
            }
        );

    }


    /*=========================================
    LOADING
    =========================================*/

    const introTimeline =
        gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        });


    if (loadingName && loadingScreen) {

        introTimeline

            .fromTo(
                loadingName,
                {
                    opacity: 0,
                    y: 18
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8
                }
            )

            .to(
                loadingName,
                {
                    opacity: 0,
                    y: -14,
                    duration: 0.6,
                    delay: 0.5
                }
            )

            /*
            WORKSから戻る場合のみ
            白いローディング画面の裏で移動
            */
            .call(() => {

                if (!isWorksReturn) return;


                const worksSection =
                    document.querySelector("#works");


                if (!worksSection) return;


                const html =
                    document.documentElement;

                const body =
                    document.body;


                const oldHtmlBehavior =
                    html.style.scrollBehavior;

                const oldBodyBehavior =
                    body.style.scrollBehavior;


                html.style.scrollBehavior =
                    "auto";

                body.style.scrollBehavior =
                    "auto";


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const worksPosition =
                    worksSection
                        .getBoundingClientRect()
                        .top
                    + window.scrollY
                    - headerHeight;


                window.scrollTo(
                    0,
                    Math.max(
                        0,
                        worksPosition
                    )
                );


                html.style.scrollBehavior =
                    oldHtmlBehavior;

                body.style.scrollBehavior =
                    oldBodyBehavior;


                updateHeader();

            })

            .to(
                loadingScreen,
                {
                    opacity: 0,
                    duration: 0.7,

                    onComplete: () => {

                        loadingScreen.remove();

                        document.body
                            .classList
                            .remove(
                                "is-loading"
                            );


                        if (
                            typeof ScrollTrigger
                            !== "undefined"
                        ) {

                            ScrollTrigger.refresh();

                        }

                    }

                }
            );

    } else {

        document.body.classList.remove(
            "is-loading"
        );

    }


    /*=========================================
    FIRST VIEW ANIMATION
    通常アクセスのみ
    =========================================*/

    if (!isWorksReturn) {

        introTimeline

            .to(
                ".fv-illustration img",
                {
                    x: 0,
                    opacity: 1,
                    duration: 1
                },
                "-=0.15"
            )

            .to(
                ".fv-ball",
                {
                    opacity: 0.48,
                    duration: 0.45,
                    stagger: 0.1
                },
                "-=0.7"
            )

            .to(
                ".graphic-copy",
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.45
                },
                "-=0.3"
            )

            .to(
                ".portfolio-title span",
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.45,
                    stagger: 0.08
                },
                "-=0.15"
            )

            .to(
                ".designer-name",
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5
                },
                "-=0.05"
            )

            .to(
                ".scroll-down",
                {
                    opacity: 1,
                    duration: 0.4
                },
                "-=0.1"
            );

    }


    /*=========================================
    BALL ANIMATION
    =========================================*/

    gsap.to(
        ".fv-ball01",
        {
            x: 5,
            y: -10,
            duration: 5.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        }
    );


    gsap.to(
        ".fv-ball02",
        {
            y: 8,
            duration: 4.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        }
    );


    gsap.to(
        ".fv-ball03",
        {
            x: -4,
            y: -8,
            duration: 5.7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        }
    );


    /*=========================================
    SCROLL LINE
    =========================================*/

    gsap.to(
        ".scroll-line",
        {
            y: 10,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        }
    );


    /*=========================================
    SCROLLTRIGGER CHECK
    =========================================*/

    if (
        typeof ScrollTrigger
        === "undefined"
    ) {

        return;

    }


    /*=========================================
    WORKSから戻ったとき
    WORKSは完全静止状態
    =========================================*/

    if (isWorksReturn) {

        gsap.set(
            "#works .section-heading",
            {
                opacity: 1,
                y: 0,
                clearProps: "transform"
            }
        );


        gsap.set(
            "#works .works-category-title",
            {
                opacity: 1,
                y: 0,
                clearProps: "transform"
            }
        );


        gsap.set(
            "#works .work-card",
            {
                opacity: 1,
                y: 0,
                scale: 1,
                clearProps: "transform"
            }
        );

    }


    /*=========================================
    SECTION HEADINGS
    =========================================*/

    gsap.utils
        .toArray(".section-heading")
        .forEach((heading) => {

            /*
            WORKSから戻った場合、
            WORKS見出しにはアニメーションを付けない
            */

            if (
                isWorksReturn &&
                heading.closest("#works")
            ) {

                return;

            }


            gsap.fromTo(
                heading,
                {
                    opacity: 0,
                    y: 45
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,

                    ease:
                        "power3.out",

                    scrollTrigger: {

                        trigger:
                            heading,

                        start:
                            "top 88%",

                        end:
                            "bottom 15%",

                        toggleActions:
                            "play none none reverse"

                    }

                }
            );

        });


    /*=========================================
    PROFILE
    =========================================*/

    gsap.fromTo(
        ".profile-image",
        {
            opacity: 0,
            y: 55,
            scale: 0.98
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,

            duration: 1.1,

            ease:
                "power3.out",

            scrollTrigger: {

                trigger:
                    "#profile",

                start:
                    "top 80%",

                end:
                    "bottom 15%",

                toggleActions:
                    "play none none reverse"

            }

        }
    );


    /*=========================================
    WORKS CATEGORY TITLE
    =========================================*/

    if (!isWorksReturn) {

        gsap.utils
            .toArray(
                ".works-category-title"
            )
            .forEach((title) => {

                gsap.fromTo(
                    title,
                    {
                        opacity: 0,
                        y: 35
                    },
                    {
                        opacity: 1,
                        y: 0,

                        duration: 0.9,

                        ease:
                            "power3.out",

                        scrollTrigger: {

                            trigger:
                                title,

                            start:
                                "top 88%",

                            end:
                                "bottom 15%",

                            toggleActions:
                                "play none none reverse"

                        }

                    }
                );

            });

    }


    /*=========================================
    WORK CARDS
    通常アクセス時のみアニメーション
    =========================================*/

    if (!isWorksReturn) {

        gsap.utils
            .toArray(
                ".works-grid"
            )
            .forEach((grid) => {

                const cards =
                    grid.querySelectorAll(
                        ".work-card"
                    );


                gsap.fromTo(
                    cards,
                    {
                        opacity: 0,
                        y: 50,
                        scale: 0.98
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,

                        duration: 0.9,

                        stagger: 0.14,

                        ease:
                            "power3.out",

                        scrollTrigger: {

                            trigger:
                                grid,

                            start:
                                "top 84%",

                            end:
                                "bottom 15%",

                            toggleActions:
                                "play none none reverse"

                        }

                    }
                );

            });

    }


    /*=========================================
    FOOTER
    =========================================*/

    gsap.fromTo(
        "#footer",
        {
            opacity: 0,
            y: 40
        },
        {
            opacity: 1,
            y: 0,

            duration: 0.9,

            ease:
                "power3.out",

            scrollTrigger: {

                trigger:
                    "#footer",

                start:
                    "top 92%",

                end:
                    "bottom 10%",

                toggleActions:
                    "play none none reverse"

            }

        }
    );


    /*=========================================
    LOAD
    =========================================*/

    window.addEventListener(
        "load",
        () => {

            ScrollTrigger.refresh();

        }
    );


    /*=========================================
    RESIZE
    =========================================*/

    window.addEventListener(
        "resize",
        () => {

            ScrollTrigger.refresh();

        }
    );

});