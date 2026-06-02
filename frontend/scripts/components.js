// load component
const loadComponent =
    async (
        id,
        file
    ) => {

        const element =
            document.getElementById(
                id
            );

        if (
            !element
        ) {
            return false;
        }

        element.innerHTML =
            `
                <div class="component-loading">
                    Loading...
                </div>
            `;

        try {
            const controller =
                new AbortController();

            const timeout =
                setTimeout(
                    () => {
                        controller.abort();
                    },
                    8000
                );

            const response =
                await fetch(
                    file,
                    {
                        signal:
                            controller.signal
                    }
                );

            clearTimeout(
                timeout
            );

            if (
                !response.ok
            ) {
                throw new Error(
                    `Failed to load ${file}`
                );
            }

            const data =
                await response.text();

            element.innerHTML =
                data;

            return true;

        } catch (error) {
            console.error(
                `Error loading component: ${file}`,
                error
            );

            element.innerHTML =
                `
                    <div class="component-error">
                        Failed to load component.
                    </div>
                `;

            return false;
        }
    };

// initialize components
async function initializeComponents() {
    await Promise.all([
        loadComponent(
            "navbar",
            "components/navbar.html"
        ),

        loadComponent(
            "footer",
            "components/footer.html"
        )
    ]);

    // notify components ready
    document.dispatchEvent(
        new CustomEvent(
            "componentsLoaded"
        )
    );

    // initialize mobile menu functionality
    initializeMobileMenu();
}

// mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileCloseBtn = document.getElementById('mobile-close-btn');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!mobileMenuBtn || !mobileMenuOverlay || !mobileCloseBtn) {
        console.warn('Mobile menu elements not found');
        return;
    }

    // open mobile menu
    mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        mobileMenuOverlay.classList.add('active');
        mobileMenuBtn.classList.add('hidden');
        document.body.style.overflow = 'hidden';
    });

    // close mobile menu via close button
    mobileCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeMobileMenu();
    });

    // close mobile menu when clicking on links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenuOverlay.classList.contains('active')) {
            if (!mobileMenuOverlay.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });

    // close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    if (mobileMenuBtn) {
        mobileMenuBtn.classList.remove('hidden');
    }
}

// init
document.addEventListener(
    "DOMContentLoaded",
    () => {
        initializeComponents();
    }
);