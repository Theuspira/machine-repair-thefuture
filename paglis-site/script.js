/*
  =========================
  ENTRADA DO SITE
  =========================
*/

const introScreen = document.getElementById("introScreen");
const homeScreen = document.getElementById("homeScreen");
const enterButton = document.getElementById("enterButton");

enterButton.addEventListener("click", () => {
  introScreen.classList.add("fade-out");

  setTimeout(() => {
    introScreen.style.display = "none";
    homeScreen.classList.add("is-visible");
  }, 1200);
});

/*
  =========================
  DADOS DOS PRODUTOS
  =========================
*/

const products = [
  {
    name: "Saint Form",
    type: "Blackwork Tee",
    price: "R$169,90",
    image: "assets/products/camiseta-01.png",
  },
  {
    name: "Ritual Shape",
    type: "Oversized Tee",
    price: "R$179,90",
    image: "assets/products/camiseta-02.png",
  },
  {
    name: "Dark Relic",
    type: "Hoodie",
    price: "R$249,90",
    image: "assets/products/camiseta-03.png",
  },
  {
    name: "Sacred Ink",
    type: "Black Tee",
    price: "R$159,90",
    image: "assets/products/camiseta-01.png",
  },
  {
    name: "Night Vessel",
    type: "Oversized Hoodie",
    price: "R$279,90",
    image: "assets/products/camiseta-02.png",
  },
];

let currentProductIndex = 0;

/*
  =========================
  ELEMENTOS DO CARROSSEL
  =========================
*/

const productNumber = document.querySelector(".carousel-card__number");
const productName = document.querySelector(".carousel-card__name");
const productType = document.querySelector(".carousel-card__type");
const productPrice = document.querySelector(".carousel-card__price");
const productImage = document.querySelector(".carousel-card__product");
const productCounter = document.querySelector(".carousel-card__counter");
const previewImage = document.querySelector(".carousel-card__previewImage");

const prevButton = document.getElementById("prevProduct");
const nextButton = document.getElementById("nextProduct");

const mainCard = document.querySelector(".carousel-card--main");
const previewCard = document.querySelector(".carousel-card--preview");
const carouselDots = document.getElementById("carouselDots");
const carouselArea = document.querySelector(".featured__carousel");

function renderDots() {
  if (!carouselDots) return;

  carouselDots.innerHTML = "";

  products.forEach((product, index) => {
    const dot = document.createElement("button");

    dot.classList.add("carousel-dot");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir para produto ${index + 1}`);

    if (index === currentProductIndex) {
      dot.classList.add("is-active");
    }

    dot.addEventListener("click", () => {
      currentProductIndex = index;
      renderCarousel();
    });

    carouselDots.appendChild(dot);
  });
}



/*
  =========================
  FUNÇÕES AUXILIARES
  =========================
*/

function formatNumber(index) {
  return String(index + 1).padStart(2, "0");
}

function getNextIndex() {
  return (currentProductIndex + 1) % products.length;
}

function getPrevIndex() {
  return (currentProductIndex - 1 + products.length) % products.length;
}

/*
  =========================
  RENDERIZAÇÃO DO CARROSSEL
  =========================
*/

function renderCarousel() {
  const currentProduct = products[currentProductIndex];
  const nextProduct = products[getNextIndex()];
  
  productNumber.textContent = formatNumber(currentProductIndex);
  productName.textContent = currentProduct.name;
  productType.textContent = currentProduct.type;
  productPrice.textContent = currentProduct.price;
 
  productImage.src = currentProduct.image;
  productImage.alt = currentProduct.name;
 
  productCounter.textContent = `${formatNumber(currentProductIndex)} / ${formatNumber(products.length - 1)}`;

  previewImage.src = nextProduct.image;
  previewImage.alt = nextProduct.name;
  renderDots();
}

let isCarouselAnimating = false;

function changeProduct(direction) {
  if (isCarouselAnimating) return;

  isCarouselAnimating = true;

  mainCard.classList.add("is-changing");
  previewCard.classList.add("is-changing");

  setTimeout(() => {
    if (direction === "next") {
      currentProductIndex = getNextIndex();
    } else {
      currentProductIndex = getPrevIndex();
    }

    renderCarousel();

    setTimeout(() => {
      mainCard.classList.remove("is-changing");
      previewCard.classList.remove("is-changing");
      isCarouselAnimating = false;
    }, 50);
  }, 280);
}/*
  =========================
  EVENTOS DAS SETAS
  =========================
*/

nextButton.addEventListener("click", () => {
  changeProduct("next");
});

prevButton.addEventListener("click", () => {
  changeProduct("prev");
});
/*
  Inicializa o carrossel quando a página carrega.
*/
renderCarousel();


/*
  =========================
  SWIPE MOBILE DO CARROSSEL
  =========================
*/

let touchStartX = 0;
let touchEndX = 0;

carouselArea.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
});

carouselArea.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;
  const minimumSwipeDistance = 50;

  if (swipeDistance > minimumSwipeDistance) {
    changeProduct("prev");
  }

  if (swipeDistance < -minimumSwipeDistance) {
    changeProduct("next");
  }
}