// ==================== Navbar Menu ====================
const menubar = document.getElementById('menu-btn');
const mobilemenu = document.getElementById('mobile-menu');

menubar.addEventListener('click', () => {
  mobilemenu.classList.toggle('hidden');
});











// ==================== Slider ====================
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const slider = document.getElementById('slider');

const images = [
  "images/slider-1.jpeg",
  "images/slider-2.jpeg",
  "images/slider-3.jpeg",
];
let currentSlide = 0;

function showSlide(index) {
  setTimeout(()=>{
  slider.style.backgroundImage = `url('${images[index]}')`;

  

  },300);

}

nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % images.length;
  showSlide(currentSlide);
});

prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + images.length) % images.length;
  showSlide(currentSlide);
});


setInterval(() => {
  currentSlide = (currentSlide + 1) % images.length;
  showSlide(currentSlide);
}, 3000); 







// ==================== FAQ ====================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const toggle = item.querySelector('.row-faq');
  const answer = item.querySelector('.faq-answer');
  toggle.addEventListener('click', () => {
    answer.classList.toggle('max-h-0');
    answer.classList.toggle('opacity-0');
  });
});






// ==================== Filter Buttons ====================
const filterItems = document.querySelectorAll('[data-filter]');
const productCards = document.querySelectorAll('.product-card');

filterItems.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    productCards.forEach(card => {
      if (filter === "all" || card.classList.contains(filter)) {
         card.classList.add('scale-100', 'opacity-100');
         card.classList.remove('scale-0', 'opacity-0');


      } else {
         card.classList.add('scale-0', 'opacity-0');
         card.classList.remove('scale-100', 'opacity-100');

      }
    });

    filterItems.forEach(b => b.classList.remove("text-purple-600"));
    btn.classList.add("text-purple-600");
  });
});





// ==================== Cart System ====================
const addCartButtons = document.querySelectorAll('.add-cart-btn');
const cartCount = document.getElementById('cart-count');
const cartToast = document.getElementById('cart-toast');

let cart = [];
let count = 0;

addCartButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    const card = btn.closest('.product-card');
    const name = card.querySelector('h3').textContent;
    const price = card.querySelector('p:nth-of-type(2)').textContent;
    const imgSrc = card.querySelector('img').src;

    cart.push({ name, price, imgSrc });
    count++;
    cartCount.textContent = count;

    cartToast.classList.remove('hidden');
    cartToast.style.opacity = 1;

    setTimeout(() => {
      cartToast.style.opacity = 0;
      setTimeout(() => {
        cartToast.classList.add('hidden');
      }, 500);
    }, 1500);
  });
});


// //////////////////closebtn/////////
const Cart = document.getElementById('cart');
const closeBtn = document.getElementById('close');
const openBtn = document.getElementById('cart-icon');

openBtn.addEventListener('click', () => {
  Cart.classList.remove('translate-x-full');
  Cart.classList.add('translate-x-0');
});

closeBtn.addEventListener('click', () => {
  Cart.classList.add('translate-x-full');
  Cart.classList.remove('translate-x-0');
});





// cart  

const cartContainer = document.querySelector('#cart .cart-items'); 
const totalEl = document.getElementById('total');

function updateTotal() {
  let total = 0;
  const items = cartContainer.querySelectorAll('.cart-item');
  items.forEach(item => {
    const price = parseFloat(item.querySelector('.item-price').textContent.replace('$',''));
    const quantity = parseInt(item.querySelector('.quantity').textContent);
    total += price * quantity;
  });
  totalEl.textContent = `$${total.toFixed(2)}`;
}

addCartButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const card = btn.closest('.product-card');
    const name = card.querySelector('h3').textContent;
    const price = card.querySelector('p:nth-of-type(2)').textContent.replace('$$','$');
    const imgSrc = card.querySelector('img').src;

    const item = document.createElement('div');
    item.className = 'cart-item flex gap-3 p-3 bg-white rounded-lg shadow items-center';
    item.innerHTML = `
      <img class="h-24 w-24 rounded" src="${imgSrc}" alt="${name}">
      <div class="flex flex-col justify-between w-full">
        <div>
          <span class="font-serif font-semibold">${name}</span>
          <p class="font-serif text-sm text-gray-700">Product</p>
        </div>
        <div class="flex items-center gap-3 mt-2">
          <div class="cursor-pointer p-1 shadow rounded hover:shadow-lg minus">
            <img src="images/icon-minus.svg" alt="Minus" class="w-4 h-4">
          </div>
          <div class="quantity"><span>1</span></div>
          <div class="cursor-pointer p-1 shadow rounded hover:shadow-lg plus">
            <img src="images/icon-plus.svg" alt="Plus" class="w-4 h-4">
          </div>
        </div>
        <p class="text-lg font-medium bg-yellow-50 rounded text-center text-gray-900 mt-2 item-price">${price.replace('$$','$')}</p>
      </div>
    `;
    cartContainer.appendChild(item);

    const minusBtn = item.querySelector('.minus');
    const plusBtn = item.querySelector('.plus');
    const quantityEl = item.querySelector('.quantity span');

    minusBtn.addEventListener('click', () => {
      let q = parseInt(quantityEl.textContent);
      if(q > 1) {
        quantityEl.textContent = q - 1;
        updateTotal();
      }
    });

    plusBtn.addEventListener('click', () => {
      let q = parseInt(quantityEl.textContent);
      quantityEl.textContent = q + 1;
      updateTotal();
    });

    
    updateTotal();
  });
});





// ================= Scroll Animation =================
const scrollElements = document.querySelectorAll(".scroll-element");

const elementInView = (el, offset = 100) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
};

const displayScrollElement = (element) => {
  element.classList.add("show");
};

const hideScrollElement = (element) => {
  element.classList.remove("show");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 100)) {
      displayScrollElement(el);
    } else {
      hideScrollElement(el);
    }
  });
};

window.addEventListener("scroll", handleScrollAnimation);

handleScrollAnimation();
