import axios from "axios";

export async function getImages(query, currentPage) {
const BASE_URL = "https://pixabay.com/api/";
const params = new URLSearchParams({
    key: "43019776-35548046cc937008d4e9556be",
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: 15,
    page: currentPage,
});

    try {
        const res = await axios.get(BASE_URL, { params });
        return res.data;
    } catch (error) {
        console.log("error");
    };
};

