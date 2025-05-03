// Variáveis globais
let lookAtual = 0;
let looks = document.querySelectorAll('#produtos-disponiveis .look-container');
let maisVendidosAtual = 0;
let maisVendidos = document.querySelectorAll('#mais-vendidos .look-container');
let intervalos = [];
let feedbackInterval;

// Carrossel de feedbacks
let currentFeedbackSlide = 0;
const feedbackSlides = document.querySelectorAll('.feedback-slide');
const feedbackSlideCount = feedbackSlides.length;
const feedbackCarousel = document.querySelector('.feedback-carousel');
const feedbackDotsContainer = document.querySelector('.feedback-dots');

// Mostra apenas a seção selecionada
function mostrarSecao(idSecao) {
  // Esconde todas as seções
  document.querySelectorAll('section').forEach(sec => {
    sec.classList.remove('ativo');
  });
  
  // Mostra apenas a seção selecionada
  document.getElementById(idSecao).classList.add('ativo');
  
  // Rola para o topo da página
  window.scrollTo({ top: 100, behavior: 'smooth' });
  
  // Se for a seção de feedbacks, reinicia o carrossel
  if (idSecao === 'feedbacks') {
    goToFeedbackSlide(0);
    startFeedbackCarousel();
  }
}

// Inicializa os carrosséis
function inicializarCarrosseis() {
  // Carrossel produtos disponíveis
  looks.forEach((look, index) => {
    let imagens = look.querySelectorAll('.carrossel-imagens img');
    if (imagens.length > 1) {
      let imgAtual = 0;
      intervalos[index] = setInterval(() => {
        imagens[imgAtual].classList.remove('ativo');
        imgAtual = (imgAtual + 1) % imagens.length;
        imagens[imgAtual].classList.add('ativo');
      }, 5000);
    }
  });
  
  // Carrossel mais vendidos
  maisVendidos.forEach((look, index) => {
    let imagens = look.querySelectorAll('.carrossel-imagens img');
    if (imagens.length > 1) {
      let imgAtual = 0;
      intervalos[index + looks.length] = setInterval(() => {
        imagens[imgAtual].classList.remove('ativo');
        imgAtual = (imgAtual + 1) % imagens.length;
        imagens[imgAtual].classList.add('ativo');
      }, 5000);
    }
  });
  
  // Inicializa o carrossel de feedbacks
  initFeedbackCarousel();
}

// Muda o look principal
function mudarLook(direcao) {
  // Para o intervalo do look atual
  clearInterval(intervalos[lookAtual]);
  
  // Esconde o look atual
  looks[lookAtual].classList.remove('ativo');
  
  // Calcula o novo índice
  lookAtual += direcao;
  if (lookAtual >= looks.length) lookAtual = 0;
  if (lookAtual < 0) lookAtual = looks.length - 1;
  
  // Mostra o novo look
  looks[lookAtual].classList.add('ativo');
  
  // Se tiver apenas uma imagem, não precisa de intervalo
  let imagens = looks[lookAtual].querySelectorAll('.carrossel-imagens img');
  if (imagens.length > 1) {
    // Reinicia o carrossel do novo look
    imagens.forEach((img, i) => {
      img.classList.remove('ativo');
      if (i === 0) img.classList.add('ativo');
    });
    
    let imgAtual = 0;
    intervalos[lookAtual] = setInterval(() => {
      imagens[imgAtual].classList.remove('ativo');
      imgAtual = (imgAtual + 1) % imagens.length;
      imagens[imgAtual].classList.add('ativo');
    }, 5000);
  }
}

// Muda os mais vendidos
function mudarMaisVendidos(direcao) {
  // Para o intervalo do look atual
  clearInterval(intervalos[maisVendidosAtual + looks.length]);
  
  // Esconde o look atual
  maisVendidos[maisVendidosAtual].classList.remove('ativo');
  
  // Calcula o novo índice
  maisVendidosAtual += direcao;
  if (maisVendidosAtual >= maisVendidos.length) maisVendidosAtual = 0;
  if (maisVendidosAtual < 0) maisVendidosAtual = maisVendidos.length - 1;
  
  // Mostra o novo look
  maisVendidos[maisVendidosAtual].classList.add('ativo');
  
  // Se tiver apenas uma imagem, não precisa de intervalo
  let imagens = maisVendidos[maisVendidosAtual].querySelectorAll('.carrossel-imagens img');
  if (imagens.length > 1) {
    // Reinicia o carrossel do novo look
    imagens.forEach((img, i) => {
      img.classList.remove('ativo');
      if (i === 0) img.classList.add('ativo');
    });
    
    let imgAtual = 0;
    intervalos[maisVendidosAtual + looks.length] = setInterval(() => {
      imagens[imgAtual].classList.remove('ativo');
      imgAtual = (imgAtual + 1) % imagens.length;
      imagens[imgAtual].classList.add('ativo');
    }, 5000);
  }
}

// FUNÇÕES PARA O CARROSSEL DE FEEDBACKS
function initFeedbackCarousel() {
  // Cria os dots de navegação
  feedbackSlides.forEach((slide, index) => {
    const dot = document.createElement('div');
    dot.classList.add('feedback-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToFeedbackSlide(index);
    });
    feedbackDotsContainer.appendChild(dot);
  });
  
  // Adiciona eventos aos botões de navegação
  document.querySelector('.feedback-prev').addEventListener('click', () => {
    prevFeedbackSlide();
  });
  
  document.querySelector('.feedback-next').addEventListener('click', () => {
    nextFeedbackSlide();
  });
  
  // Inicia o carrossel automático
  startFeedbackCarousel();
  
  // Pausa o carrossel quando o mouse está sobre ele
  const carouselContainer = document.querySelector('.feedback-carousel-container');
  carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(feedbackInterval);
  });
  
  carouselContainer.addEventListener('mouseleave', () => {
    startFeedbackCarousel();
  });
}

function goToFeedbackSlide(index) {
  currentFeedbackSlide = (index + feedbackSlideCount) % feedbackSlideCount;
  const offset = -currentFeedbackSlide * 100;
  feedbackCarousel.style.transform = `translateX(${offset}%)`;
  
  // Atualiza os dots ativos
  document.querySelectorAll('.feedback-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentFeedbackSlide);
  });
}

function nextFeedbackSlide() {
  goToFeedbackSlide(currentFeedbackSlide + 1);
}

function prevFeedbackSlide() {
  goToFeedbackSlide(currentFeedbackSlide - 1);
}

function startFeedbackCarousel() {
  clearInterval(feedbackInterval);
  feedbackInterval = setInterval(() => {
    nextFeedbackSlide();
  }, 5000); // Muda a cada 5 segundos
}

// Inicializa quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
  inicializarCarrosseis();
  
  // Mostra a primeira seção por padrão
  document.querySelector('section').classList.add('ativo');
});