document.addEventListener("DOMContentLoaded", function () {
    const newsList = document.getElementById("news-list");
    const newsToggle = document.querySelector(".news-toggle");

    if (newsList && newsToggle) {
        const olderNews = Array.from(newsList.children).slice(6);

        if (olderNews.length > 0) {
            olderNews.forEach(function (item) {
                item.hidden = true;
            });
            newsToggle.hidden = false;
            newsToggle.addEventListener("click", function () {
                const expanded = newsToggle.getAttribute("aria-expanded") !== "true";
                olderNews.forEach(function (item) {
                    item.hidden = !expanded;
                });
                newsToggle.setAttribute("aria-expanded", String(expanded));
                newsToggle.textContent = expanded ? "See less" : "See more";
            });
        }
    }

    const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
    const sections = navLinks
        .map(function (link) {
            const targetId = link.getAttribute("href");
            return targetId ? document.querySelector(targetId) : null;
        })
        .filter(Boolean);

    if (!navLinks.length || !sections.length) {
        return;
    }

    function setActiveLink(id) {
        navLinks.forEach(function (link) {
            const isActive = link.getAttribute("href") === "#" + id;
            link.classList.toggle("is-active", isActive);
            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    const observer = new IntersectionObserver(
        function (entries) {
            const visibleEntries = entries
                .filter(function (entry) {
                    return entry.isIntersecting;
                })
                .sort(function (first, second) {
                    return second.intersectionRatio - first.intersectionRatio;
                });

            if (visibleEntries.length > 0) {
                setActiveLink(visibleEntries[0].target.id);
            }
        },
        {
            rootMargin: "-22% 0px -55% 0px",
            threshold: [0.15, 0.3, 0.5]
        }
    );

    sections.forEach(function (section) {
        observer.observe(section);
    });

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            const targetId = link.getAttribute("href");
            if (targetId) {
                setActiveLink(targetId.slice(1));
            }
        });
    });

    const initialHash = window.location.hash ? window.location.hash.slice(1) : sections[0].id;
    setActiveLink(initialHash);
});
