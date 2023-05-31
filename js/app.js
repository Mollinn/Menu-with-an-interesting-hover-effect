(() => {
    "use strict";
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    const menuLinksWrappers = document.querySelectorAll("[data-line-effect]");
    menuLinksWrappers.length ? menuEffect() : null;
    function menuEffect() {
        menuLinksWrappers.forEach((menuLinksWrapper => {
            const menuLinks = menuLinksWrapper.querySelectorAll("a");
            const effectSpeed = menuLinksWrapper.dataset.lineEffect ? menuLinksWrapper.dataset.lineEffect : 200;
            menuLinks.length ? menuEffectItem(menuLinks, effectSpeed) : null;
        }));
        function menuEffectItem(menuLinks, effectSpeed) {
            const effectTransition = `transition: transform ${effectSpeed}ms ease;`;
            const effectHover = `transform: translate3d(0px, 0%, 0px);`;
            const effectTop = `transform: translate3d(0px, -100%, 0px);`;
            const effectBottom = `transform: translate3d(0px, 100%, 0px);`;
            menuLinks.forEach((menuLink => {
                menuLink.insertAdjacentHTML("beforeend", `\n            <span style="transform: translate3d(0px, 100%, 0px);" class="hover">\n                <span style="transform: translate3d(0px, -100%, 0px);" class="hover__text">${menuLink.textContent}</span>\n            </span>\n            `);
                menuLink.onmouseenter = menuLink.onmouseleave = menuLinkActions;
            }));
            function menuLinkActions(e) {
                const menuLink = e.target;
                const menuLinkItem = menuLink.querySelector(".hover");
                const menuLinkText = menuLink.querySelector(".hover__text");
                const menuLinkHeight = menuLink.offsetHeight / 2;
                const menuLinkPos = e.pageY - (menuLink.getBoundingClientRect().top + scrollY);
                if ("mouseenter" === e.type) {
                    menuLinkItem.style.cssText = menuLinkPos > menuLinkHeight ? effectBottom : effectTop;
                    menuLinkText.style.cssText = menuLinkPos > menuLinkHeight ? effectTop : effectBottom;
                    setTimeout((() => {
                        menuLinkItem.style.cssText = effectHover + effectTransition;
                        menuLinkText.style.cssText = effectHover + effectTransition;
                    }), 5);
                }
                if ("mouseleave" === e.type) {
                    menuLinkItem.style.cssText = menuLinkPos > menuLinkHeight ? effectBottom + effectTransition : effectTop + effectTransition;
                    menuLinkText.style.cssText = menuLinkPos > menuLinkHeight ? effectTop + effectTransition : effectBottom + effectTransition;
                }
            }
        }
    }
    window["FLS"] = true;
    menuInit();
})();