const accessKey = "pmB8dOAJ4cYTsGXwqZ30X5BDkkRD-PH9_OhZJV6QfZM";
const Imgdata = document.getElementById("image_des");
const root = document.getElementById("root");
const formEl = document.getElementById("f1");
const showMoreButtonEl = document.getElementById("show-more-button");

let keyword;
let page = 1;

async function fetchImages() {
    keyword = Imgdata.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;
  
    const response = await fetch(url);
    const data = await response.json();
    if (page === 1) {
      root.innerHTML = "";
    }

    const results = data.results;

    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("root");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        root.appendChild(imageWrapper);
    });

    page++;

    if (page > 1) {
    showMoreButtonEl.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  fetchImages();
});

showMoreButtonEl.addEventListener("click", () => {
  fetchImages();
});