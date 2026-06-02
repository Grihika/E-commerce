// mobile navbar - SIMPLIFIED AND BULLETPROOF
function initializeMobileNavbar() {
    console.log("🔧 Initializing mobile navbar...");
    
    const bar = document.getElementById("mobile-menu-btn");
    const closeBtn = document.getElementById("mobile-close-btn");
    const navLinks = document.getElementById("navbar-links");
    const authLink = document.getElementById("auth-link");
    const profileDropdown = document.getElementById("profile-dropdown");

    console.log("Found elements:", {
        bar: !!bar,
        closeBtn: !!closeBtn,
        navLinks: !!navLinks,
        authLink: !!authLink,
        profileDropdown: !!profileDropdown
    });

    if (!bar || !navLinks) {
        console.warn("❌ Navbar elements not found! Retrying...");
        return false;
    }

    // Check if already initialized
    if (bar.dataset.initialized === "true") {
        console.log("✅ Already initialized, skipping");
        return true;
    }

    console.log("✅ All navbar elements found!");

    // 1. Hamburger Button Click - Open Menu
    bar.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("🍔 Hamburger clicked!");
        navLinks.classList.add("active");
        console.log("✅ Menu opened, navbar classes:", navLinks.className);
    };

    console.log("✅ Hamburger button listener attached");

    // 2. Cross Button Click - Close Menu
    if (closeBtn) {
        closeBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log("❌ Close button clicked!");
            navLinks.classList.remove("active");
            console.log("✅ Menu closed");
        };
        
        console.log("✅ Close button listener attached");
    }

    // 3. Profile Link Click
    if (authLink && profileDropdown) {
        authLink.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            profileDropdown.classList.toggle("active");
            console.log("👤 Profile dropdown toggled");
        };
    }

    // 4. Close menu when clicking navigation links
    const links = navLinks.querySelectorAll("a");
    for (let i = 0; i < links.length; i++) {
        if (links[i].id === "auth-link") continue;
        links[i].onclick = function() {
            navLinks.classList.remove("active");
            console.log("🔗 Navigation link clicked, menu closed");
        };
    }

    // 5. Outside Click Auto-Close System
    document.onclick = function(e) {
        // Close dropdown
        if (profileDropdown && profileDropdown.classList.contains("active") && 
            !profileDropdown.contains(e.target) && e.target !== authLink) {
            profileDropdown.classList.remove("active");
        }
        
        // Close mobile menu
        if (navLinks.classList.contains("active") && 
            !navLinks.contains(e.target) && !bar.contains(e.target)) {
            navLinks.classList.remove("active");
            console.log("🖱️ Clicked outside, menu closed");
        }
    };
    
    // Mark as initialized
    bar.dataset.initialized = "true";
    navLinks.dataset.initialized = "true";
    
    console.log("✅ Mobile navbar initialization complete!");
    return true;
}





// sticky header
function initializeStickyHeader() {
    const header =
        document.getElementById(
            "header"
        );

    if (
        !header
    ) {
        return;
    }

    let ticking =
        false;

    window.addEventListener(
        "scroll",
        () => {
            if (
                !ticking
            ) {
                window.requestAnimationFrame(
                    () => {

                        header.style.boxShadow =
                            window.scrollY > 80
                                ? "0 5px 25px rgba(0,0,0,0.15)"
                                : "0 5px 15px rgba(0,0,0,0.06)";

                        ticking =
                            false;
                    }
                );

                ticking =
                    true;
            }
        }
    );
}

// ripple effect
function initializeRippleEffect() {
    document.addEventListener(
        "click",
        (event) => {
            const btn =
                event.target.closest(
                    "button"
                );

            if (
                !btn
            ) {
                return;
            }

            const ripple =
                document.createElement(
                    "span"
                );

            ripple.style.cssText =
                `
                    position:absolute;
                    width:10px;
                    height:10px;
                    background:rgba(255,255,255,0.7);
                    border-radius:50%;
                    transform:scale(0);
                    animation:ripple 0.6s linear;
                    pointer-events:none;
                    top:${event.offsetY}px;
                    left:${event.offsetX}px;
                `;

            if (
                getComputedStyle(
                    btn
                ).position ===
                "static"
            ) {

                btn.style.position =
                    "relative";
            }

            btn.style.overflow =
                "hidden";

            btn.appendChild(
                ripple
            );

            setTimeout(
                () => {

                    ripple.remove();

                },
                600
            );
        }
    );
}

// global cart count badge
function updateCartCount() {
    const cart =
        AppUtils.getCart();

    const total =
        cart.reduce(
            (
                sum,
                item
            ) => {
                return (
                    sum +
                    (
                        parseInt(
                            item.qty
                        ) || 0
                    )
                );
            },
            0
        );

    let badge =
        document.getElementById(
            "cart-count"
        );

    const cartIcon =
        document.querySelector(
            ".fa-shopping-bag"
        )?.parentElement;

    if (
        !cartIcon
    ) {
        return;
    }

    if (
        !badge
    ) {
        badge =
            document.createElement(
                "span"
            );

        badge.id =
            "cart-count";

        badge.style.cssText =
            `
                position:absolute;
                top:-8px;
                right:-10px;
                background:red;
                color:white;
                font-size:12px;
                padding:2px 6px;
                border-radius:50%;
                min-width:20px;
                text-align:center;
            `;

        if (
            getComputedStyle(
                cartIcon
            ).position ===
            "static"
        ) {

            cartIcon.style.position =
                "relative";
        }

        cartIcon.appendChild(
            badge
        );
    }

    badge.innerText =
        total;

    badge.style.display =
        total > 0
            ? "block"
            : "none";

    // Update mobile cart badge
    const mobileBadge = document.getElementById('mobile-cart-badge');
    if (mobileBadge) {
        mobileBadge.innerText = total;
        mobileBadge.style.display = total > 0 ? 'inline-block' : 'none';
    }

    // Update desktop cart badge
    const desktopBadge = document.getElementById('cart-badge');
    if (desktopBadge) {
        desktopBadge.innerText = total;
        desktopBadge.style.display = total > 0 ? 'inline-block' : 'none';
    }
}

// initialize ui
function initializeUI() {
    console.log("🎯 InitializeUI called");
    const success = initializeMobileNavbar();
    if (!success) {
        console.log("⚠️ First attempt failed, retrying...");
        setTimeout(() => {
            initializeMobileNavbar();
        }, 100);
        setTimeout(() => {
            initializeMobileNavbar();
        }, 500);
        setTimeout(() => {
            initializeMobileNavbar();
        }, 1000);
    }
    initializeStickyHeader();
    initializeRippleEffect();
    updateCartCount();
}

// init after components load - PRIMARY METHOD
document.addEventListener(
    "componentsLoaded",
    () => {
        console.log("🎊 componentsLoaded event fired!");
        initializeUI();
    }
);

// fallback init with aggressive retry mechanism
document.addEventListener(
    "DOMContentLoaded",
    () => {
        console.log("📄 DOMContentLoaded fired");
        setTimeout(initializeUI, 300);
        setTimeout(initializeUI, 800);
        setTimeout(initializeUI, 1500);
    }
);

// ABSOLUTE FALLBACK - force init after 2 seconds
setTimeout(() => {
    console.log("⏰ 2-second fallback timer fired");
    const navLinks = document.getElementById("navbar-links");
    if (navLinks && !navLinks.dataset.initialized) {
        console.log("🔄 Force initializing navbar...");
        const success = initializeMobileNavbar();
        if (success) {
            navLinks.dataset.initialized = "true";
        }
    }
}, 2000);

// ULTIMATE FALLBACK - window.onload
window.addEventListener('load', () => {
    console.log("🪟 Window load event fired");
    setTimeout(() => {
        const navLinks = document.getElementById("navbar-links");
        if (navLinks && !navLinks.dataset.initialized) {
            console.log("🚨 Ultimate fallback - initializing navbar NOW");
            const success = initializeMobileNavbar();
            if (success) {
                navLinks.dataset.initialized = "true";
            }
        }
    }, 100);
});

// expose globally
window.updateCartCount =
    updateCartCount;