document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.getElementById("primary-navigation");
    if (menuButton && navigation) {
        menuButton.hidden = false;
        function closeMenu() {
            menuButton.setAttribute("aria-expanded", "false");
        }
        menuButton.addEventListener("click", function () {
            const expanded = menuButton.getAttribute("aria-expanded") === "true";
            menuButton.setAttribute("aria-expanded", String(!expanded));
        });
        navigation.addEventListener("click", function (event) {
            if (event.target.closest("a")) closeMenu();
        });
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
                closeMenu();
                menuButton.focus();
            }
        });
        document.addEventListener("click", function (event) {
            if (!event.target.closest(".site-header")) closeMenu();
        });
        const mobileLayout = window.matchMedia("(max-width: 760px)");
        mobileLayout.addEventListener("change", closeMenu);
    }

    const projects = Array.from(document.querySelectorAll(".research-project[data-category]"));
    const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
    const toolbar = document.querySelector(".work-toolbar");
    const filterStatus = document.querySelector(".filter-status");
    function applyFilter(category) {
        let count = 0;
        projects.forEach(function (project) {
            project.hidden = category !== "all" && project.dataset.category !== category;
            if (!project.hidden) count++;
        });
        filterButtons.forEach(function (button) {
            button.setAttribute("aria-pressed", String(button.dataset.filter === category));
        });
        if (filterStatus) filterStatus.textContent = count + (count === 1 ? " project" : " projects");
    }
    if (toolbar && projects.length) {
        toolbar.hidden = false;
        filterButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                applyFilter(button.dataset.filter);
            });
        });
    }

    // A direct project link must work even after a visitor has filtered it out.
    function revealLinkedProject() {
        const project = projects.find(function (item) {
            return "#" + item.id === window.location.hash;
        });
        if (project && project.hidden) {
            applyFilter("all");
            requestAnimationFrame(function () {
                project.scrollIntoView({ block: "start", behavior: "instant" });
            });
        }
    }
    window.addEventListener("hashchange", revealLinkedProject);
    document.addEventListener("click", function (event) {
        const link = event.target.closest('a[href^="#"]');
        if (!link) return;
        const project = projects.find(function (item) {
            return "#" + item.id === link.getAttribute("href");
        });
        if (project && project.hidden) applyFilter("all");
    });
    revealLinkedProject();

    const newsList = document.getElementById("news-list");
    if (newsList) {
        const recentNews = Array.from(newsList.children).slice(0, 6);
        function sizeNewsList() {
            const height = recentNews.reduce(function (total, item) {
                return total + item.getBoundingClientRect().height;
            }, 0);
            if (height > 0) newsList.style.setProperty("--news-visible-height", Math.ceil(height) + "px");
        }
        sizeNewsList();
        if (typeof ResizeObserver !== "undefined") {
            const newsObserver = new ResizeObserver(sizeNewsList);
            recentNews.forEach(function (item) { newsObserver.observe(item); });
        } else {
            window.addEventListener("resize", sizeNewsList);
        }
    }

    const navLinks = Array.from(document.querySelectorAll('#primary-navigation a[href^="#"]'));
    const pageSections = Array.from(document.querySelectorAll("main > section[id]"));
    let updatePending = false;
    function updateNavigation() {
        updatePending = false;
        const headerHeight = document.querySelector(".site-header").getBoundingClientRect().height;
        let active = pageSections[0];
        pageSections.forEach(function (section) {
            if (section.getBoundingClientRect().top <= headerHeight + 120) active = section;
        });
        navLinks.forEach(function (link) {
            const isActive = !!active && link.getAttribute("href") === "#" + active.id;
            link.classList.toggle("is-active", isActive);
            if (isActive) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
        });
    }
    window.addEventListener("scroll", function () {
        if (!updatePending) {
            updatePending = true;
            requestAnimationFrame(updateNavigation);
        }
    }, { passive: true });
    window.addEventListener("resize", updateNavigation);
    updateNavigation();
});
