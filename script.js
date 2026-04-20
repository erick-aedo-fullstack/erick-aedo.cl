  /* header sticky */

document.addEventListener("DOMContentLoaded", () => {
  const headers = [
    document.querySelector(".header-desktop"),
    document.querySelector(".header-tablet"),
    document.querySelector(".header-mobile")
  ].filter(Boolean);

  if (!headers.length) return;

  let spacer = document.querySelector(".header-spacer");

  if (!spacer) {
    spacer = document.createElement("div");
    spacer.className = "header-spacer";
    const headerWrap = document.querySelector(".header-wrap");
    if (headerWrap) {
      headerWrap.after(spacer);
    }
  }

  function getVisibleHeader() {
    return headers.find((header) => getComputedStyle(header).display !== "none");
  }

  function updateSticky() {
    const activeHeader = getVisibleHeader();
    if (!activeHeader) return;

    const shouldStick = window.scrollY > 24;
    const headerHeight = activeHeader.offsetHeight;
    const stickyTop = 0;

    headers.forEach((header) => {
      header.classList.toggle("header--sticky", shouldStick);
    });

    spacer.style.height = shouldStick ? `${headerHeight + stickyTop}px` : "0px";
  }

  updateSticky();
  window.addEventListener("scroll", updateSticky, { passive: true });
  window.addEventListener("resize", updateSticky);
});




/* slder proyectos*/

document.addEventListener("DOMContentLoaded", () => {

  const track = document.querySelector(".proyectos__track");
  const slides = document.querySelectorAll(".proyecto-slide");
  const dots = document.querySelectorAll(".proyectos__dot");

  if (track && slides.length && dots.length) {
    let currentIndex = 0;
    let autoplay = null;

    function goToSlide(index) {
      track.style.transform = `translateX(-${index * 100}%)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle("proyectos__dot--activo", i === index);
      });

      currentIndex = index;
    }

    function nextSlide() {
      const nextIndex = currentIndex + 1 >= slides.length ? 0 : currentIndex + 1;
      goToSlide(nextIndex);
    }

    function startAutoplay() {
      stopAutoplay();
      autoplay = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
      if (autoplay) clearInterval(autoplay);
    }

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goToSlide(index);
        startAutoplay();
      });
    });

    goToSlide(0);
    startAutoplay();
  }

  /* modal */
  const botonesAbrirModal = document.querySelectorAll("[data-modal]");
  const botonesCerrarModal = document.querySelectorAll("[data-cerrar-modal]");
  let modalActiva = null;

  function abrirModal(idModal) {
    const modal = document.getElementById(idModal);
    if (!modal) return;

    modal.classList.add("modal-proyecto--abierta");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modalActiva = modal;
  }

  function cerrarModal() {
    if (!modalActiva) return;

    modalActiva.classList.remove("modal-proyecto--abierta");
    modalActiva.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    modalActiva = null;
  }

  botonesAbrirModal.forEach((boton) => {
    boton.addEventListener("click", () => {
      abrirModal(boton.dataset.modal);
    });
  });

  botonesCerrarModal.forEach((boton) => {
    boton.addEventListener("click", cerrarModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      cerrarModal();
    }
  });
});


  /* preguntas */

  document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const trigger = item.querySelector(".faq-item__trigger");

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("faq-item--abierto");

      faqItems.forEach((faq) => {
        faq.classList.remove("faq-item--abierto");
        faq.querySelector(".faq-item__trigger").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("faq-item--abierto");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });
});


