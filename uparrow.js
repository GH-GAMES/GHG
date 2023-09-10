const ToTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
        ToTop.classList.add("active");
    } else {
        ToTop.classList.remove("active");
    }
})

const listElements = document.querySelectorAll('body *')
const width = window.innerWidth
const elemetsUncorectWidth = []
for(let i = 0; i < listElements.length; i++){
  if(listElements[i].getBoundingClientRect().width > width){
    elemetsUncorectWidth.push(listElements[i])
  }
  
}
console.log(elemetsUncorectWidth);