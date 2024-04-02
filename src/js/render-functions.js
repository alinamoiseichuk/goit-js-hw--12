import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export const gallery = document.querySelector(".gallery");

export function templateImg(data) {
    const markup = data.map((photo) => {
        return `<li class="photos-list-item">
        <a class="photos-list-link" href="${photo.largeImageURL}">
        <img
        loading="lazy"
        class="photo"
        src="${photo.webformatURL}" 
        alt="${photo.tags}"/>
        </a>
        <ul class="photo-information-container">
        <li class="item-photo-information-container"><p><span class="accent">Likes</span></br>${photo.likes}</p></li>
        <li class="item-photo-information-container"><p><span class="accent">Views</span></br>${photo.views}</p></li>
        <li class="item-photo-information-container"><p><span class="accent">Comments</span></br>${photo.comments}</p></li>
        <li class="item-photo-information-container"><p><span class="accent">Downloads</span></br>${photo.downloads}</p></li>
        </ul>
        </li>`;
    })
        .join("");
        gallery.insertAdjacentHTML("beforeend", markup);
    lightbox.refresh();
};

 const lightbox = new SimpleLightbox('.photos-list-link', {
        captionsData: 'alt',
        captionDelay: 250,
 });
