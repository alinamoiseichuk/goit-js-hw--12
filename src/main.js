import { getImages } from "./js/pixabay-api";
import { templateImg } from "./js/render-functions";
import { gallery } from "./js/render-functions";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");


form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    gallery.innerHTML = '<div class="loader"></div>';
    const value = form.elements.searchQuery.value.trim().toLowerCase();  
    
    getImages(value).then(data => {
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
            })
        } else {
            gallery.innerHTML = "";
            templateImg(data.hits);
        }
        form.reset();
    })
        .catch(error => console.log("error"));
}


