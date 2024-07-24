let menuBtn = document.querySelector(".nav__hamburger")
let shortenInput = document.querySelector('#shorten__input');
let shortenList = document.querySelector('.shorten__list');
let shortenForm = document.querySelector('.shorten__form');
let shortenLink = null;

menuBtn.addEventListener('click', function () {
    let menuList = document.querySelector(".nav__list");
    if (menuList.style.display == "none") {
        menuList.style.display = "grid";
    } else {
        menuList.style.display = "none";
    }
});

async function linkShortenCut(link) {
    const apiUrl = 'https://api.tinyurl.com/create';
    const apiKey = 'unUMTf9xC71CCIOFzZ1l4GURHiorFJpg1EwZSp9hKNvNFoK8EAMHAOvWqf5G';
    
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            url: link,
            domain: "tiny.one"
        })
    });

    const data = await response.json();
    console.log(data)
    return data.data.tiny_url;
}

const submitLink = async (event) => {
    event.preventDefault();

    if (shortenInput.value) {
        const shortLink = await linkShortenCut(shortenInput.value);
        addLinkShort(shortenInput.value, shortLink);
        shortenInput.value = "";
        return;
    }
}

const addLinkShort = (link, shortLink) => {
    shortenList.innerHTML += `
    <li class="shorten__item">
        <p class="link">${link}</p>
        <div class="shorten__flex">
            <a href="${shortLink}" target="_blank" class="shorten__a short__link">${shortLink}</a>
            <a href="#" class="shorten__a--cyan button button__copy">Copy</a>
        </div>
    </li>`;

    let buttonCopy = document.querySelectorAll('.button__copy');
    
    buttonCopy.forEach((button) => {
        button.addEventListener('click', async e => {
            if(e.target.textContent === "Copy"){
                await navigator.clipboard.writeText(shortLink);
            e.target.textContent = "Copied!";
            e.target.style.backgroundColor = "hsl(257, 27%, 26%)";
            e.target.style.color = "white";
            }
        });
    });
}

shortenForm.addEventListener('submit', submitLink);
