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
    const apiUrl = await fetch(`https://cleanuri.com/api/v1/shorten?url=${link}`);
    const data = await apiUrl.json();
    shortenLink = await data.result_url;

    console.log(data.result_url);
    return data.result_url;
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
    shortenList.innerHTML = `
    <li class="shorten__item">
        <small class="link">${link}</small>
        <div class="shorten__flex">
            <a href="${shortLink}" target="_blank" class="shorten__a" id="short__link">${shortLink}</a>
            <a href="#" class="shorten__a--cyan button" id="button__copy">Copy</a>
        </div>
    </li>`;

    document.querySelector('#button__copy').addEventListener('click', async e => {
        e.preventDefault();
        if (e.target.textContent === "Copy") {
            await navigator.clipboard.writeText(shortLink);
            e.target.textContent = "Copied";
        }
    });
}

shortenForm.addEventListener('submit', submitLink);
