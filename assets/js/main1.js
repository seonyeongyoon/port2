//글짜 쪼개기
let jsTit = document.querySelectorAll(".js-tit");
let sec3Tit = document.querySelectorAll("#section3 h4");
let ch1 = document.querySelectorAll(".chapter.ch1 > p");
document.querySelector(".chapter.ch2 > p").classList.add("split");
document.querySelector(".chapter.ch5 > p").classList.add("split");
document.querySelector(".chapter.ch6 > p").classList.add("split");
document.querySelector(".chapter.ch7 > p").classList.add("split");
document.querySelector(".chapter.ch10 > p").classList.add("split");
for (let i = 0; i < ch1.length; i++) {
    ch1[i].classList.add('split');
}
for (let i = 0; i < jsTit.length; i++) {
    jsTit[i].classList.add('split');
}
for (let i = 0; i < sec3Tit.length; i++) {
    sec3Tit[i].classList.add('split');
}
document.querySelectorAll(".split").forEach(elem => {
    let splitText = elem.innerText;
    let splitWrap = splitText.split("").join("</span><span aria-hidden:'true'>");
    splitWrap = "<span aria-hidden:'true'>" + splitWrap + "</span>";

    elem.innerHTML = splitWrap;
    elem.setAttribute("aria-label", splitText);
});


//loading
function loading() {
    const progress = $(".progress"),
        progressText = progress.find(".progress-text");

    let imgLoad = imagesLoaded("body"),
        imgTotal = imgLoad.images.length,
        imgLoaded = 0,
        imgCurrent = 0,
        progressTimer = setInterval(updateProgress, 800 / 60);
    imgLoad.on("progress", function () {
        imgLoaded++;
    })

    function updateProgress() {
        let target = (imgLoaded / imgTotal) * 100;
        imgCurrent += (target - imgCurrent) * 0.1;
        progressText.text(Math.floor(imgCurrent) + "%");
        if (imgCurrent >= 0 && imgCurrent < 99) {
            document.body.style.overflow = "hidden";
        }
        if (imgCurrent >= 100) {
            clearInterval(progressTimer)
            progress.delay(1300).fadeOut(1000)
            setTimeout(function () {
                let tl = gsap.timeline();
                document.body.style.overflow = "auto";
                tl.to("#contents", {
                    duration: 1,
                    top: 0,
                })
                tl.to(".chapter", {
                    duration: 0.3,
                    opacity: 1
                });
                tl.to(".chapter.ch1 > p span", {
                    duration: 0.4,
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    ease: Power0.easeOut
                })
                tl.to(".sec1-1 nav.gnb", {
                    duration: 0.5,
                    opacity: 1,
                    y: 0
                })
                tl.to(".main", {
                    duration: 0.6,
                    opacity: 1
                });
            }, 2500)
        }
        if (imgCurrent > 99) {
            imgCurrent = 100;
        }
    }
}
loading();


/*------------------------------
SupahScroll
------------------------------*/
class SupahScroll {
    constructor(options) {
        this.opt = options || {}
        this.el = this.opt.el ? this.opt.el : '.supah-scroll'
        this.speed = this.opt.speed ? this.opt.speed : 0.1
        this.init()
    }

    init() {
        this.scrollY = 0
        this.supahScroll = document.querySelectorAll(this.el)[0]
        this.supahScroll.classList.add('supah-scroll')
        this.mw1 = document.querySelector(".mw1");
        this.mw2 = document.querySelector(".mw2");
        this.mw3 = document.querySelector(".mw3");
        this.js_mw1 = document.querySelector(".js-main-word.mw1");
        this.js_mw2 = document.querySelector(".js-main-word.mw2");
        this.js_mw3 = document.querySelector(".js-main-word.mw3");
        /*this.simg1 = document.querySelector(".site.s1 .site-img");
        this.simg2 = document.querySelector(".site.s2 .site-img");
        this.simg3 = document.querySelector(".site.s3 .site-img");
        this.simg4 = document.querySelector(".site.s4 .site-img");
        this.simg5 = document.querySelector(".site.s5 .site-img");*/
        this.events()
        this.update()
        this.animate()
    }

    update() {
        if (this.supahScroll === null) return
        document.body.style.height = `${this.supahScroll.getBoundingClientRect().width / 2.12}px`
    }

    pause() {
        document.body.style.overflow = 'hidden'
        cancelAnimationFrame(this.raf)
    }

    play() {
        document.body.style.overflow = 'inherit'
        this.raf = requestAnimationFrame(this.animate.bind(this))
    }

    destroy() {
        this.supahScroll.classList.remove('supah-scroll')
        this.supahScroll.style.transform = 'none'
        document.body.style.overflow = 'inherit'
        window.removeEventListener('resize', this.update)
        cancelAnimationFrame(this.raf)
        delete this.supahScroll
    }

    animate() {
        this.scrollY += (window.scrollY - this.scrollY) * this.speed
        this.supahScroll.style.transform = `translate3d(${-this.scrollY}px,0,0)`
        this.mw1.style.transform = `translate3d(${-this.scrollY * 0.07}px,0,0)`
        this.mw2.style.transform = `translate3d(${-this.scrollY * 0.3}px,0,0)`
        this.mw3.style.transform = `translate3d(${-this.scrollY * 0.1}px,0,0)`
        this.js_mw1.style.transform = `translate3d(${-this.scrollY * 0.03}px,0,0)`
        this.js_mw2.style.transform = `translate3d(${-this.scrollY * 0.06}px,0,0)`
        this.js_mw3.style.transform = `translate3d(${-this.scrollY * 0.03}px,0,0)`
        /* this.simg1.style.transform = `translate3d(${-this.scrollY * 0.04}px,0,0)`
         this.simg2.style.transform = `translate3d(${-this.scrollY * 0.04}px,0,0)`
         this.simg3.style.transform = `translate3d(${-this.scrollY * 0.04}px,0,0)`
         this.simg4.style.transform = `translate3d(${-this.scrollY * 0.04}px,0,0)`
         this.simg5.style.transform = `translate3d(${-this.scrollY * 0.01}px,0,0)`*/
        this.raf = requestAnimationFrame(this.animate.bind(this))
    }

    scrollTo(y) {
        window.scrollTo(0, y)
    }

    staticScrollTo(y) {
        cancelAnimationFrame(this.raf)
        this.scrollY = y
        window.scrollTo(0, y)
        this.supahScroll.style.transform = `translate3d(0,${-y}px,0)`
        this.play()
    }

    events() {
        window.addEventListener('load', this.update.bind(this))
        window.addEventListener('resize', this.update.bind(this))
    }
}


/*------------------------------
Initialize
------------------------------*/
const supahscroll = new SupahScroll({
    el: 'main',
    speed: 0.05
})





/* 가로 스크롤, 스크롤 애니메이션 */
window.addEventListener("scroll", () => {
    let scrollYoffset = (window.pageYOffset || document.documentElement.scrollTop)
    let offset2 = document.getElementById("section2").offsetTop + 400;
    let offset3 = document.getElementById("section3");
    let offset7 = document.getElementById("section7").offsetLeft;
    let offset8 = document.getElementById("section8");
    document.getElementById("contents").style.left = -scrollYoffset + "px";
    if (scrollYoffset > offset2) {
        document.querySelector(".about-img").style.filter = `grayscale(0)`;
    } else {
        document.querySelector(".about-img").style.filter = `grayscale(1)`;
    }

    if (offset3.getBoundingClientRect().left - window.innerWidth / 4 <= 0) {
        document.querySelector(".sec3-2").classList.add("show");
    }
    if (offset8.getBoundingClientRect().left - window.innerWidth / 2 <= 0) {
        document.querySelector(".about-img.js").style.filter = `grayscale(0)`;
    } else {
        document.querySelector(".about-img.js").style.filter = `grayscale(1)`;
    }

})

/* time_clock */
const clockContainer = document.querySelector(".time_message"),
    clockTitle = clockContainer.querySelector(".time_clock");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds}`;
    //10보다 작으면 앞에 0붙이고 그렇지 않으면(:=else) 초 그대로 반환 
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();

//tab menu
let $tab_list = $(".sec3-1");
$tab_list.find("ul li > div").fadeOut(500);
$tab_list.find("li.active > div").fadeIn(500);

function tabMenu(e) {
    e.preventDefault();
    let $this = $(this);
    $this.next("div").show().parent("li").addClass("active").siblings("li").removeClass("active").find(">div").fadeOut(500);
}
$tab_list.find("ul>li>a").click(tabMenu).focus(tabMenu);

/* reveal 효과 */
/*function scrollReveal() {
    
}
window.addEventListener("scroll", scrollReveal);*/


/* skill animation */

/* gsap animation */

$(window).scroll(function () {
    let scroll = window.pageYOffset;
    let offset2 = $("#section2").offset().left;
    let offset3 = document.getElementById("section3");
    let offset5_1 = $("#section5 .site.s1").offset().left + 500;
    let offset5_2 = $("#section5 .site.s2").offset().left + 500;
    let offset5_3 = $("#section5 .site.s3").offset().left + 500;
    let offset5_4 = $("#section5 .site.s4").offset().left + 500;
    let offset5_5 = $("#section5 .site.s5").offset().left + 500;
    let offset8 = $("#section8").offset().left;
    let offset9_1 = $("#section9 .js.js1").offset().left;
    let offset9_2 = $("#section9 .js.js2").offset().left;
    let offset9_3 = $("#section9 .js.js3").offset().left;
    let offset9_4 = $("#section9 .js.js4").offset().left;
    let offset9_5 = $("#section9 .js.js5").offset().left;
    let tl2 = gsap.timeline();
    let tl3 = gsap.timeline();
    let tl4 = gsap.timeline();
    let tl5 = gsap.timeline();
    let tl6 = gsap.timeline();
    let tl7 = gsap.timeline();
    let tl8 = gsap.timeline();
    //let tl9 = new TimelineMax();
    let tl9_1 = gsap.timeline();
    let tl9_2 = gsap.timeline();
    let tl9_3 = gsap.timeline();
    let tl9_4 = gsap.timeline();
    let tl9_5 = gsap.timeline();
    let tl10 = gsap.timeline();

    /* reveal 효과 */
    /*const reveal = document.querySelectorAll(".reveal");
    reveal.forEach(elem => {
        let scrollLeft = document.documentElement.scrollTop + window.innerWidth / 2;
        let offsetLeft = elem.offsetLeft + elem.parentElement.offsetLeft + 500;
        console.log(scrollLeft);
        console.log(offsetLeft);

        if (scroll > offsetLeft) {
            elem.classList.add("show");
        }
    })*/

    //section2 
    if (scroll > offset2) {
        tl2.to("#section2 .about-img", {
            duration: 0.5,
            filter: 0
        });
        tl2.to("#section2 .about-cont p", {
            duration: 1,
            height: `24vh`,
            opacity: 1
        })
        tl2.to("#section2 .about-desc p", {
            duration: 0.4,
            opacity: 1,
            y: 0
        })
        tl2.to("#section2 .scroll-down-wrap", {
            duration: 0.5,
            opacity: 1,
            y: 0
        })
    }
    if (offset3.getBoundingClientRect().left - window.innerWidth <= 0) {
        tl3.to(".sec3-1 h4 span", {
            duration: 0.3,
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: Power0.easeOut
        })
        tl3.to(".sec3-2 h4 span", {
            duration: 0.3,
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: Power0.easeOut
        })
    }
    let chapter = document.querySelectorAll(".chapter");
    let chapterSplit = document.querySelectorAll(".chapter > p");
    let ch = document.querySelectorAll(".chapter > p span");
    for (let i = 0; i < chapter.length; i++) {
        if (chapter[i].getBoundingClientRect().left - window.innerWidth / 2 <= 0) {
            let tl_ch = gsap.timeline();
            tl_ch.to(chapter[i], {
                duration: 0.3,
                opacity: 1,
            })
            tl_ch.to(`chapterSplit[i] "span"`, {
                duration: 0.4,
                opacity: 1,
                y: 0,
                stagger: 0.1,
                ease: Power0.easeOut
            })
        }
    }
    // animation animation
    let siteImgcont = document.querySelectorAll(".site .site-img-frame");
    let siteImg = document.querySelectorAll(".site .site-img");
    let siteTit = document.querySelectorAll(".site .site-tit");
    let siteDesc = document.querySelectorAll(".site .site-desc");
    for (let i = 0; i < siteImg.length; i++) {
        let tl5 = gsap.timeline();
        if (siteImgcont[i].getBoundingClientRect().left - window.innerWidth / 2 <= 0) {
            tl5.to(siteTit[i], {
                duration: .5,
                x: 0,
                y: 0
            })
            tl5.to(siteImg[i], {
                duration: .5,
                x: 0,
            })

        }
        if (siteDesc[i].getBoundingClientRect().left - window.innerWidth <= 0) {
            tl5.to(siteDesc[i], {
                duration: .5,
                y: 0,
                opacity: 1
            })
        }
    }
    if (scroll > offset8) {
        tl8.to("#section8 .about-img", {
            duration: 0.5,
            filter: 0
        });
        tl8.to("#section8 .about-cont p", {
            duration: 1,
            height: `24vh`,
            opacity: 1
        })
        tl8.to("#section8 .about-desc p", {
            duration: 0.4,
            opacity: 1,
            y: 0
        })
        tl8.to("#section8 .scroll-down-wrap", {
            duration: 0.5,
            opacity: 1,
            y: 0
        })
    }
    let jsCont = document.querySelectorAll("#section9 .js");
    let jsNum = document.querySelectorAll(".js-img h1");
    let jsTit = document.querySelectorAll(".js-tit.split");
    let jsdesc = document.querySelectorAll(".js-desc p");
    let CodeBtn = document.querySelectorAll('.code-btn');
    let codeBox = document.querySelectorAll('.code-box');
    for (let i = 0; i < jsCont.length; i++) {
        let tl9 = gsap.timeline();
        let jsTitSplit = jsTit[i].childNodes;
        if (jsCont[i].getBoundingClientRect().left - window.innerWidth <= 0) {
            tl9.to(jsNum[i], {
                duration: 0.5,
                delay: 0.3,
                opacity: 1,
                y: 0,
                ease: Power0.easeOut

            })

        }
        if (jsTit[i].getBoundingClientRect().left - window.innerWidth <= 0) {
            tl9.to(jsTitSplit, {
                duration: 0.4,
                opacity: 1,
                y: 0,
                stagger: 0.1,
                ease: Power0.easeOut
            })
            tl9.to(CodeBtn[i], {
                duration: 0.4,
                opacity: 1,
                y: 0,
            })
            tl9.to(jsdesc[i], {
                duration: 0.3,
                opacity: 1,
                y: 0
            })
        }
    }


});
// js code view
let CodeBtn = document.querySelectorAll('.code-btn');
let codeBox = document.querySelectorAll('.code-box');
CodeBtn.forEach(el => {
    el.addEventListener('click', function (e) {
        e.preventDefault();
    })
})
CodeBtn.forEach((el, index) => {
    el.addEventListener('click', function () {
        el.classList.toggle('active');
        if (el.classList.contains('active')) {
            CodeBtn[index].innerText = "</Close>";
            gsap.to(codeBox[index], {
                duration: .4,
                opacity: 1,
                display: "block",
            })
        } else {
            CodeBtn[index].innerText = "</View Code>";
            gsap.to(codeBox[index], {
                duration: .4,
                opacity: 0,
                display: "none",

            })
        }
    });

});
(function () {
    emailjs.init("user_xB2PpCzVZdp8rem3DuTyl"); // 바꿀 필요 없습니다. Account 에 User ID 랑 똑같습니다.
    $('input[name=submit]').click(function () {
        var templateParams = {
            name: $('input[name=name]').val(),
            email: $('input[name=email]').val(),
            message: $('textarea[name=message]').val()
        };
        emailjs.send('service_opiznxw', 'template_0eaupro', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('메일이 전송되었습니다.')
            }, function (error) {
                console.log('FAILED...', error);
                alert('메일 전송에 실패했습니다.')
            });
    });
})();


/*   emailjs.send("sun940204@naver.com", "template_0eaupro", {
               name: "윤선영",
               notes: "Check this out!"
           })
           .then(function (response) {
               console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
           }, function (err) {
               console.log("FAILED. error=", err);
           });*/

/*
YOUR SERVICE ID : Email Service 에서 등록한  Service ID
YOUR TEMPLATE ID : Email Template 에 들어가면 이미 하나 만들어져 있습니다. 거기 있는 Template ID 등록    
then 부터 콜백처리입니다. 성공하면 reponse 실패하면 error
*/