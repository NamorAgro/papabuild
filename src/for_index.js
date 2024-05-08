var articlesTitle = document.querySelectorAll('.project-title');
var outputText = document.querySelector('#insert-text'); 
var link = document.querySelector('.blog-link')

articlesTitle.forEach((title) => {
    title.addEventListener('click', () => {
        
        var paragraph = title.nextElementSibling; 
        var neededLink = paragraph.nextElementSibling
        if (paragraph && paragraph.tagName === 'P') { 
            outputText.innerText = paragraph.innerText; 
            link.href = neededLink.href
            link.style.display = "inline";
            link.style.color = "red";
        }
        articlesTitle.forEach((button) => {
            button.style.backgroundColor = 'transparent'; 
            button.style.color = 'white'
        })
        title.style.backgroundColor = 'white'; 
        title.style.color = 'black'
    });
});

var desktopText = document.querySelector('.project-main-text');
var mainDesktopText = document.querySelector('.wrapper__hello-text');
function handleSize(){
    if (window.innerWidth < 740){
        desktopText.style.display = 'none'
        mainDesktopText.style.display = 'none'
    }
    else{
        desktopText.style.display = 'block'
        mainDesktopText.style.display = 'block'

    }
}


window.addEventListener('resize', handleSize);
