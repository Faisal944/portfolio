var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");
function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab")
}



var sidemenu =document.getElementById("sidemenu");
function openmenu(){
    sidemenu.style.right= "0";
}
function closemenu(){
    sidemenu.style.right= "-200px";
}



const scriptURL = 'https://script.google.com/macros/s/AKfycbxnMw7mOAs2_hHe_0d_p21st9ZzRvlO_dZ27RZlRa57EnaVuZb0lEFvHdgz-QKJej9K/exec'
const form = document.forms['submit-to-google-sheet']
const msg= document.getElementById("msg")
// Znoy iyki hirpskv xs Logyo
form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msg.innerHTML="Message sent successfully"
        setTimeout(function(){
            msg.innerHTML = ""
        }, 4000)
        form.reset()
    })
    .catch(error => console.error('Error!', error.message))
})


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
        } else {
            entry.target.classList.remove('show')
        }
    })
})


const hiddenElements = document.querySelectorAll('.hidden, .hidden1');
hiddenElements.forEach((el) => observer.observe(el));



const parallax_el = document.querySelectorAll(".parallax");

let xValue = 0, yValue = 0;

let rotateDegree = 0;

function update(cursorPosition) {
    parallax_el.forEach(el => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotationSpeed = el.dataset.rotation;

        let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
  
        let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

        el.style.transform = ` perspective(2300px) translateZ(${
            zValue * speedz
        }px) rotateY(${rotateDegree * rotationSpeed}deg) translateX(calc(-50% + ${
            -xValue * speedx
        }px)) translateY(calc(-50% + ${
            yValue * speedy
        }px))`;

    })
} 
update(0);

window.addEventListener("mousemove", (e) => {

    
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    rotateDegree = (xValue / (window.innerWidth / 2)) * 20;
    update(e.clientX);
});

let timeline = gsap.timeline();

Array.from(parallax_el)
.filter((el) => !el.classList.contains("text"))
.forEach((el) => {
    timeline.from(el, {
        top:`${el.offsetHeight / 2 + +el.dataset.distance
    }px`,
    duration:3.5,
    ease:"power3.out"
},
 "1");
})

timeline.from(
    ".text h1",
    {
        y:
        window.innerHeight - 
        document.querySelector(".text h1").getBoundingClientRect().top +
        200,
        duration: 2,
    },
    "2.5"
)
.from(
    ".text h2",
    {
        y: -150,
        opacity:0,
        duration:1.5,
    },
    "3"
)
.from(".hide", {
    opacity: 0,
    duration:1.5,
}, "3");

