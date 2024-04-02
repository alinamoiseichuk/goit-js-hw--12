import { getImages } from "./js/pixabay-api";
import { templateImg } from "./js/render-functions";
import { gallery } from "./js/render-functions";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const loader = document.querySelector(".loader")
const btnLoadMore = document.querySelector(".btn-load");
let value;
let currentPage;
let maxPage = 0;
const perPage = 15;

form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();
    showLoader();   
    value = form.elements.searchQuery.value.trim().toLowerCase();  
    
    currentPage = 1;

    try {
        const data = await getImages(value, currentPage)
        maxPage = Math.ceil(data.totalHits / perPage);
        if (value === "") {
            gallery.innerHTML = "";
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                theme: 'dark',
                progressBarColor: '#FFFFFF',
                color: '#EF4040',
                position: 'topRight',
                width: '432px',
                height: '88px',
            });
        } else {
            gallery.innerHTML = "";
            templateImg(data.hits);
            checkBtnStatus();
        }
        form.reset();  
    } catch(error) {
        console.error(error);
    }; 
    hideLoader();
};

btnLoadMore.addEventListener("click", onLoadMoreClick);

async function onLoadMoreClick() {
    currentPage += 1;
    showLoader();
try {
    const data = await getImages(value, currentPage);
    templateImg(data.hits);

    myScroll();
    checkBtnStatus();

} catch (error) {
    console.error(error);
    };
    hideLoader();
};

function myScroll() {
    const height = gallery.firstChild.getBoundingClientRect().height;
    window.scrollBy({
        top: height * 2,
        behavior: "smooth",
    });
};

function showLoader() {
    loader.classList.remove("hidden");
};

function hideLoader() {
    loader.classList.add("hidden");
};

function showLoadMore() {
    btnLoadMore.classList.remove("hidden");
};

function hideLoadMore() {
    btnLoadMore.classList.add("hidden");
};

function checkBtnStatus() {
    if (currentPage >= maxPage) {
        hideLoadMore();
        iziToast.info({
            message: "We're sorry, but you've reached the end of search results",
            color: "blue",
            position: "topRight",
            theme: "light",
            progressBarColor: '#FFFFFF',
        });
    } else {
        showLoadMore();
    };
};


