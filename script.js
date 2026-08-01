document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector("#nav-links");
    const revealItems = document.querySelectorAll(".reveal");
    const navAnchors = document.querySelectorAll(".main-nav ul a");

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", function () {
            const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
            menuButton.setAttribute("aria-expanded", String(!isExpanded));
            navLinks.classList.toggle("open");
        });

        navAnchors.forEach(function (anchor) {
            anchor.addEventListener("click", function () {
                menuButton.setAttribute("aria-expanded", "false");
                navLinks.classList.remove("open");
            });
        });
    }

    const revealObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealItems.forEach(function (item) {
        revealObserver.observe(item);
    });

    const sections = document.querySelectorAll("main section[id]");
    const activeObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                navAnchors.forEach(function (anchor) {
                    anchor.classList.toggle(
                        "active",
                        anchor.getAttribute("href") === "#" + entry.target.id
                    );
                });
            });
        },
        {
            rootMargin: "-35% 0px -45% 0px",
            threshold: 0
        }
    );

    sections.forEach(function (section) {
        activeObserver.observe(section);
    });
});
