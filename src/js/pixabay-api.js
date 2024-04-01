export function getImages(query) {
    const BASE_URL = "https://pixabay.com/api/";
    const params = new URLSearchParams({
        key: "43019776-35548046cc937008d4e9556be",
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    });
    const url = `${BASE_URL}?${params}`;

    return fetch(url).then(response => {
        if (!response) {
            throw new Error("error");
        }
        return response.json();
    })
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => console.log("error"));
    
}
