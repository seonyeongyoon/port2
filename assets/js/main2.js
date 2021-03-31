window.addEventListener("wheel", infiniteScroll);


function infiniteScroll(){

    let browser = browserDetection();
    let slideOne = document.getElementsByClassName('section1')[0]
    let slideTwo = document.getElementsByClassName('section2')[0]
    let slideThree = document.getElementsByClassName('section3')[0]
    let slideFour = document.getElementsByClassName('section4')[0]
    let slideFive = document.getElementsByClassName('section5')[0]
    let slideSix = document.getElementsByClassName('section6')[0]
    let slideSeven = document.getElementsByClassName('section7')[0]

    let scrollSpeed = (browser=='Mozilla Firefox' || browser == 'Apple Safari')?10:0.5;
    let scrollValue = event.deltaX+event.deltaY;



    
    function getNewPositionAfterScroll (slide){
        return slide.getBoundingClientRect().left+(scrollValue*(-1)*scrollSpeed);
    }


    //console.log(scrollValue)
    if(screen.width >= 1100 || !is_touch_device()){
        slideOne.style.transform = 'translate3d('+getNewPositionAfterScroll (slideOne)+'px, 0px,1px)';
        slideTwo.style.transform = 'translate3d('+getNewPositionAfterScroll (slideTwo)+'px, 0px,1px)';
        slideThree.style.transform = 'translate3d('+getNewPositionAfterScroll (slideThree)+'px, 0px,1px)';
        slideFour.style.transform = 'translate3d('+getNewPositionAfterScroll (slideFour)+'px, 0px,1px)';
        slideFive.style.transform = 'translate3d('+getNewPositionAfterScroll (slideFive)+'px, 0px,1px)';
        slideSix.style.transform = 'translate3d('+getNewPositionAfterScroll (slideSix)+'px, 0px,1px)';
        slideSeven.style.transform = 'translate3d('+getNewPositionAfterScroll (slideSeven)+'px, 0px,1px)';

        if(scrollValue >0){
            if(slideOne.getBoundingClientRect().left<=1){
                slideTwo.style.transform = 'translate3d('+slideOne.getBoundingClientRect().right+'px, 0px,1px)';
            } 
            if(slideTwo.getBoundingClientRect().left<=1){
                slideThree.style.transform = 'translate3d('+slideTwo.getBoundingClientRect().right+'px, 0px,1px)';
            } 
            if(slideThree.getBoundingClientRect().left<=1){
                slideFour.style.transform = 'translate3d('+slideThree.getBoundingClientRect().right+'px, 0px,1px)';
            } 
            if(slideFour.getBoundingClientRect().left<=1){
                slideFive.style.transform = 'translate3d('+slideFour.getBoundingClientRect().right+'px, 0px,1px)';
            }
            if(slideFive.getBoundingClientRect().left<=1){
                slideSix.style.transform = 'translate3d('+slideFive.getBoundingClientRect().right+'px, 0px,1px)';
            }
            if(slideSix.getBoundingClientRect().left<=1){
                slideSeven.style.transform = 'translate3d('+slideSix.getBoundingClientRect().right+'px, 0px,1px)';
            }
            if(slideSeven.getBoundingClientRect().left<=1){
                slideOne.style.transform = 'translate3d('+slideSeven.getBoundingClientRect().right+'px, 0px,1px)';
            }
        }
        if(scrollValue<0){
          if(slideOne.getBoundingClientRect().right>=innerWidth && slideOne.getBoundingClientRect().right<innerWidth*2 ){
                slideSeven.style.transform = 'translate3d('+(slideOne.getBoundingClientRect().left-innerWidth)+'px, 0px,1px)';
            }
            else if(slideSeven.getBoundingClientRect().right>=innerWidth && slideSeven.getBoundingClientRect().right<innerWidth*2 ){
                slideSix.style.transform = 'translate3d('+(slideSeven.getBoundingClientRect().left-innerWidth)+'px, 0px,1px)';
            }
            else if(slideSix.getBoundingClientRect().right>=innerWidth && slideSix.getBoundingClientRect().right<innerWidth*2 ){
                slideFive.style.transform = 'translate3d('+(slideSix.getBoundingClientRect().left-innerWidth)+'px, 0px,1px)';
            }
            else if(slideFive.getBoundingClientRect().right>=innerWidth && slideFive.getBoundingClientRect().right<innerWidth*2 ){
                slideFour.style.transform = 'translate3d('+(slideFive.getBoundingClientRect().left-innerWidth)+'px, 0px,1px)';
            }
            else if(slideFour.getBoundingClientRect().right>=innerWidth && slideFour.getBoundingClientRect().right<innerWidth*2 ){
                slideThree.style.transform = 'translate3d('+(slideFour.getBoundingClientRect().left-innerWidth)+'px, 0px,1px)';
            }
            else if(slideThree.getBoundingClientRect().right>=innerWidth && slideThree.getBoundingClientRect().right<innerWidth*2 ){
                slideTwo.style.transform = 'translate3d('+(slideThree.getBoundingClientRect().left-innerWidth)+'px, 0px,1px)';
            }
            else if(slideTwo.getBoundingClientRect().right>=innerWidth && slideTwo.getBoundingClientRect().right<innerWidth*2 ){
                slideOne.style.transform = 'translate3d('+(slideTwo.getBoundingClientRect().left-innerWidth)+'px, 0px,1px)';
            }
        }
    }


}
function is_touch_device() {
    return !!('ontouchstart' in window || navigator.maxTouchPoints);       // works on IE10/11 and Surface
};

window.addEventListener("resize", focusOnNearestElementIfResized);

function focusOnNearestElementIfResized(){
    //console.log("hi")
    let prevElem, nearestElem, nextElem, ind;
    let list = document.getElementsByClassName('section')

   for(let i=0; i<list.length;i++){
       let sum = list[i].getBoundingClientRect().left+list[i].getBoundingClientRect().right ;
      
       if(sum >=0  & sum<=innerWidth*2){
        nearestElem=list[i];
        ind = i;
       }
   }

   //console.log(nearestElem)
 
   prevElem = (ind>0)?list[ind-1]:list[6];
   nextElem = (ind<6)?list[ind+1]:list[0];

        

    /*nearestElem.style.transform = 'translate3d(0px, 0px,1px)';
    nextElem.style.transform = 'translate3d(0px, 0px,1px)';
    prevElem.style.transform = 'translate3d(0px, 0px,1px)';*/

    //(ind+2<list.length)?list[ind+2].style.transform = 'translate3d(200vw, 0px,1px)':list[ind-2].style.transform = 'translate3d(-200vw, 0px,1px)';
 
    for(let i=0; i<list.length;i++){
        if(!list[i]==prevElem||nearestElem||nextElem){
            'translate3d(1000vw, 0px,1px)'
        }
    }
}

function browserDetection(){
    var sUsrAg = navigator.userAgent;

        
    if (sUsrAg.indexOf("Firefox") > -1) {
        return "Mozilla Firefox";
        // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
    } else if (sUsrAg.indexOf("SamsungBrowser") > -1) {
        return "Samsung Internet";
        // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
    } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
        return "Opera";
        // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
    } else if (sUsrAg.indexOf("Trident") > -1) {
        return  "Microsoft Internet Explorer";
        // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
    } else if (sUsrAg.indexOf("Edge") > -1) {
        return "Microsoft Edge";
        // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
    } else if (sUsrAg.indexOf("Chrome") > -1) {
        return  "Google Chrome or Chromium";
        // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
    } else if (sUsrAg.indexOf("Safari") > -1) {
        return  "Apple Safari";
        // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
    } else {
        return  "unknown";
    }
}


// The order matters here, and this may report false positives for unlisted browsers.