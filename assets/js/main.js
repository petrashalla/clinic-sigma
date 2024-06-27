let scrollWidthFunc = () => {
    let scrollWidth = window.innerWidth - document.body.clientWidth;
    document.querySelector('html').style.paddingRight = scrollWidth + 'px';
    document.querySelector('header').style.paddingRight = scrollWidth + 'px';
}
const scrollTop = document.querySelector('.scroll-top');
if (scrollTop)
    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

['load', 'resize'].forEach((event) => {
    window.addEventListener(event, function () {
        let headerHeight = header.clientHeight;
        const plashka = header.querySelector('.header__plashka');
        if (plashka) {
            var originalHeightPlashka = plashka.offsetHeight;
        }
        window.onscroll = function (e) {
            if (window.scrollY > headerHeight) {
                if (!plashka.classList.contains('hide')) {
                    plashka.classList.add('hide');
                    plashka.style.height = '0px';
                }
            }
            else {
                plashka.style.height = originalHeightPlashka + 'px';
                plashka.classList.remove('hide');
            }
        };
    })
})


document.addEventListener("DOMContentLoaded", function () {
    /*  burger menu  */
    const burgerMenu = document.querySelector('.burger__menu');
    if (burgerMenu) {
        const headerMobile = document.querySelector('.header__bottom');
        const header = document.querySelector('.header');
        const plashka = document.querySelector('.header__plashka');
        burgerMenu.addEventListener("click", () => {
            if (burgerMenu.classList.contains('burger__menu--active')) {
                plashka.style.display = 'block';
                document.body.classList.remove('lock');                  
            }
            else {
                plashka.style.display = 'none';
            }
            headerMobile.classList.toggle("header__bottom--active");
            burgerMenu.classList.toggle("burger__menu--active");
            header.classList.toggle("header--active");

            document.querySelector('html').classList.toggle('burger-lock');
        });
    }
    /*  end burger menu  */


    /* Mask phone */
    [].forEach.call(document.querySelectorAll('input[type=tel]'), function (input) {
        let keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            let matrix = "+7 (___) ___ ____",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type == "blur" && this.value.length < 5) this.value = ""
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)

    });
    /* End Mask phone */


    /*  Popups  */
    function popupClose(popupActive) {
        popupActive.classList.remove('open');
        document.body.classList.remove('lock');
        document.querySelector('html').removeAttribute('style');
        document.querySelector('html').classList.remove('lock');
        document.querySelector('header').removeAttribute('style');
    }

    const popupOpenBtns = document.querySelectorAll('.popup-btn');
    const popups = document.querySelectorAll('.popup');
    const closePopupBtns = document.querySelectorAll('.close-popup, .popup__btn--good');
    closePopupBtns.forEach(function (el) {
        el.addEventListener('click', function (e) {
            popupClose(e.target.closest('.popup'));
        });
    });

    popupOpenBtns.forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            const path = e.currentTarget.dataset.path;
            const currentPopup = document.querySelector(`[data-target="${path}"]`);
            if (currentPopup) {
                popups.forEach(function (popup) {
                    popupClose(popup);
                    popup.addEventListener('click', function (e) {
                        if (!e.target.closest('.popup__content')) {
                            popupClose(e.target.closest('.popup'));
                        }
                    });
                });
                currentPopup.classList.add('open');
                document.querySelector('html').classList.add('lock');
            }
        });
    });
    /*  end popups  */



    /* Select  */
    const selectSingle = document.querySelectorAll('.__select');
    for (let i = 0; i < selectSingle.length; i++) {
        const selectSingle_title = selectSingle[i].querySelector('.__select__title');
        selectSingle_title.addEventListener('click', () => {
            if ('active' === selectSingle[i].getAttribute('data-state')) {
                selectSingle[i].setAttribute('data-state', '');
            } else {
                selectSingle[i].setAttribute('data-state', 'active');
            }
        });
        const selectSingle_labels = selectSingle[i].querySelectorAll('.__select__label');
        for (let j = 0; j < selectSingle_labels.length; j++) {
            selectSingle_labels[j].addEventListener('click', (evt) => {
            selectSingle_title.textContent = evt.target.textContent;
            selectSingle_title.style.color = "#292929";
            selectSingle[i].setAttribute('data-state', '');
            });
        }
    }
    /* End select  */


    /*  Slaider  */
    const commentsSwiper = new Swiper(".commentsSwiper", {
        slidesPerView: 1,
        spaceBetween: 15,
        navigation: {
            nextEl: ".comments__swiper-button-next",
            prevEl: ".comments__swiper-button-prev",
        },
        breakpoints: {
            850: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
        }
    });
    
    const licenseSwiper = new Swiper(".licenseSwiper", {
        slidesPerView: 1.4,
        spaceBetween: 10,
        freeMode: true,
        pagination: {
            el: ".license__swiper-pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: ".license__swiper-button-next",
            prevEl: ".license__swiper-button-prev",
        },
        breakpoints: {
            1200: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            950: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            740: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            510: {
                slidesPerView: 2.2,
                spaceBetween: 20,
            },
        }
    });
    
    const doctorsSwiper = new Swiper(".doctorsSwiper", {
        slidesPerView: 1.3,
        spaceBetween: 20,
        freeMode: true,
        navigation: {
            nextEl: ".doctors__swiper-button-next",
            prevEl: ".doctors__swiper-button-prev",
        },
        breakpoints: {
            1050: {
                slidesPerView: 4,
                spaceBetween: 35,
            },
            820: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            500: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
        }
    });
    /*  End slaider  */


    /*  comment show/hide  */
    const commentCards = document.querySelectorAll('.comment__card');
    commentCards.forEach(card => {
        const commentText = card.querySelector('.comment__text');
        const commentMoreButton = card.querySelector('.comment__more');
        if (commentText.scrollHeight <= commentText.clientHeight) {
            commentMoreButton.style.visibility = 'hidden';
        }
        commentMoreButton.addEventListener('click', function () {
            commentText.classList.toggle('comment__text--active');
            if (commentText.classList.contains('comment__text--active')) {
                this.textContent = 'Скрыть';
            } else {
                this.textContent = 'Читать полностью';
            }
        });
    });
    /*  end comment show/hide  */


    /*  header menu  */
    const list = document.querySelectorAll('.hide-item');
    function accordion(e){
        e.stopPropagation(); 
        if(this.classList.contains('hide-item--active')){
            this.classList.remove('hide-item--active');
        }
        else if(this.parentElement.parentElement.classList.contains('hide-item--active')){
            this.classList.add('hide-item--active');
        }
        else{
            for(i=0; i < list.length; i++){
                list[i].classList.remove('hide-item--active');
            }
                this.classList.add('hide-item--active');
            }
    }
    for(i = 0; i < list.length; i++ ){
        list[i].addEventListener('click', accordion);
    }
    /*  end header menu  */


        // animation 
        const animationItems = document.querySelectorAll('.animation-item');
        if (animationItems.length > 0) {
            function onEntry(e) {
                e.forEach(e => {
                    e.isIntersecting && e.target.classList.add("animation-active");
                }
                )
            }
            let options = {
                threshold: [.5]
            }, observer = new IntersectionObserver(onEntry, options)
            for (let e of animationItems)
                observer.observe(e);
        }
})







