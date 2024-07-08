window.addEventListener("DOMContentLoaded", function () {
  document.documentElement.classList.remove("no-interaction");

  initHeader();
  initLazy();
  initRoomsVideo();
  initSliders();
  initWebpCheck();
  initVideos();
  initSelects();
  initFilters();
  initSchedule();
  initTips();
  initCounters();
  initCalendar();
  initMuiSelects();
  initAddGameModal();

  function initRoomsVideo() {
    const roomsWithVideo = document.querySelectorAll(".has_video_teaser");

    roomsWithVideo.forEach((item) => {
      const video = item.querySelector(".video_teaser");

      if (!video) return;

      item.addEventListener("mouseover", (e) => {
        item.classList.add("video_playing");
        video.classList.add("playing");
        video.play();
      });

      item.addEventListener("mouseleave", (e) => {
        item.classList.remove("video_playing");
        video.classList.remove("playing");
        video.pause();
      });
    });
  }

  function initLazy() {
    const lazySrcItems = document.querySelectorAll("[data-src]");
    const lazySrcsetItems = document.querySelectorAll("[data-srcset]");

    lazySrcItems.forEach((item) => {
      const src = item.dataset.src;
      if (!src) return;
      item.src = src;
    });
    lazySrcsetItems.forEach((item) => {
      const srcset = item.dataset.srcset;
      if (!srcset) return;
      item.srcset = srcset;
    });
  }

  function initHeader() {
    const header = document.querySelector(".layout_header");

    window.addEventListener("scroll", (e) => {
      if (window.scrollY > 20) {
        header.classList.add("repainted");
      } else {
        header.classList.remove("repainted");
      }
    });

    const menuOffcanvas = document.querySelector(".offcanvas_navigation");
    const menuOffcanvasContent = document.querySelector(".off-canvas-content");

    if (!menuOffcanvas) return;

    const openMenuButton = document.querySelector(".open_menu_button");
    const closeMenuButton = menuOffcanvas.querySelector(".close_button");

    openMenuButton.addEventListener("click", openMenu);
    closeMenuButton.addEventListener("click", closeMenu);
    document.body.addEventListener("click", (e) => {
      if (e.target.closest(".open_menu_button")) {
        openMenu();
        return;
      }
      if (
        !e.target.closest(".offcanvas_navigation") ||
        e.target.closest(".close_button")
      ) {
        closeMenu();
        return;
      }
    });

    function openMenu() {
      document.body.classList.add("is-off-canvas-open");
      menuOffcanvas.classList.add("is-open");
      menuOffcanvasContent.classList.add("is-open-right");
      menuOffcanvas.ariaHidden = false;
    }

    function closeMenu() {
      document.body.classList.remove("is-off-canvas-open");
      menuOffcanvas.classList.remove("is-open");
      menuOffcanvasContent.classList.remove("is-open-right");
      menuOffcanvas.ariaHidden = true;
    }
  }

  function initSliders() {
    const bannerSlider = document.querySelector(".promotions_slider");
    if (bannerSlider) {
      const bannerSplide = new Splide(bannerSlider, {
        pagination: false,
        arrows: false,
      }).mount();
    }

    const reviewsSlider = document.querySelector(
      ".reviews_carousel:not(.without_rating) .reviews_list"
    );
    if (reviewsSlider) {
      const reviewsSplide = new Splide(reviewsSlider, {
        pagination: false,
        perPage: 4,
        perMove: 1,
        gap: 30,
        breakpoints: {
          1440: {
            perPage: 2,
          },
          1024: {
            autoWidth: true,
            perPage: 1,
            gap: 20,
          },
          768: {
            gap: 10,
          },
        },
      }).mount();
    }

    const reviewsSliderWithoutRating = document.querySelector(
      ".reviews_carousel.without_rating .reviews_list"
    );
    if (reviewsSliderWithoutRating) {
      const reviewsSplide = new Splide(reviewsSliderWithoutRating, {
        pagination: false,
        perPage: 5,
        perMove: 1,
        gap: 30,
        breakpoints: {
          1440: {
            perPage: 4,
          },
          1024: {
            perPage: 2,
            gap: 20,
          },
          768: {
            perPage: 1,
            gap: 10,
          },
        },
      }).mount();
    }

    const mediaSlider = document.querySelector(".media_slider");
    if (mediaSlider) {
      const mediaSplide = new Splide(mediaSlider, {
        arrows: false,
      }).mount();

      const videoItems = mediaSlider.querySelectorAll(".video");
      mediaSplide.on("move", function (e) {
        videoItems.forEach((video) => {
          const videoElement = video.querySelector("video");
          video.classList.remove("play");
          videoElement.pause();
        });
      });
    }

    const roomsSlider = document.querySelector(".rooms_list");
    if (roomsSlider) {
      const roomsSplide = new Splide(roomsSlider, {
        pagination: false,
        perPage: 5,
        perMove: 1,
        gap: 30,
        breakpoints: {
          1440: {
            perPage: 4,
          },
          1280: {
            perPage: 3,
          },
          768: {
            gap: 10,
            perPage: 2,
          },
          430: {
            perPage: 1,
          },
        },
      }).mount();
    }
  }

  function initVideos() {
    const videoWrappers = document.querySelectorAll(".video");

    videoWrappers.forEach((video) => {
      const videoElement = video.querySelector("video");
      videoElement.controls = false;
      video.addEventListener("click", (e) => {
        if (video.classList.contains("play")) {
          videoElement.pause();
          video.classList.remove("play");
        } else {
          videoElement.play();
          video.classList.add("play");
        }
      });
    });
  }

  function initWebpCheck() {
    function supportsWebP(callback) {
      var webP = new Image();
      webP.onload = webP.onerror = function () {
        callback(webP.height === 2);
      };
      webP.src =
        "data:image/webp;base64,UklGRh4AAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbRm2mkBGCp0fU6DX/ua1fsv5g4ECsVoqJ07qqd71u7l5Ko/6AdpZjKX//M4zWhlgKZlP/9jIf9cAQ==";
    }

    supportsWebP(function (supported) {
      if (supported) {
        document.documentElement.classList.add("webp-lossy");
      } else {
        document.documentElement.classList.remove("webp-lossy");
        document.documentElement.classList.add("no-webp-lossy");
      }
    });
  }

  function initSelects() {
    document.body.addEventListener("click", (e) => {
      const select = e.target.closest(".Select");
      const selectOption = e.target.closest(".Select-option");

      if (selectOption) {
        const placeholder = select.querySelector(".Select-placeholder");
        placeholder.textContent = selectOption.textContent;
      }

      if (select) {
        select.classList.toggle("is-open");
      } else {
        const openedSelects = document.querySelectorAll(".Select.is-open");
        openedSelects.forEach((item) => {
          item.classList.remove("is-open");
        });
      }
    });
  }

  function initFilters() {
    const buttons = document.querySelectorAll(".players_count_button");

    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        buttons.forEach((item) => item.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  }

  function initSchedule() {
    const slots = document.querySelectorAll(".schedule_slot:not(.unavailable)");

    slots.forEach((item) => {
      item.addEventListener("click", (e) => {
        slots.forEach((el) => el.classList.remove("active"));
        item.classList.add("active");
      });
    });
  }

  function initTips() {
    const triggers = document.querySelectorAll("[data-yeti-box][data-toggle]");

    triggers.forEach((item) => {
      const dropdown = document.getElementById(item.dataset.toggle);

      if (!dropdown) return;

      const closeBtn = dropdown.querySelector(".close-button");
      if (closeBtn) {
        closeBtn.addEventListener("click", (e) =>
          closeDropdown(item, dropdown)
        );
      }

      item.addEventListener("click", (e) => {
        console.log(dropdown.classList.contains("is-open"));
        if (dropdown.classList.contains("is-open")) {
          closeDropdown(item, dropdown);
        } else {
          openDropdown(item, dropdown);
        }
      });
    });

    function openDropdown(trigger, dropdown) {
      dropdown.classList.add("is-open");
      trigger.classList.add("hover");
      dropdown.ariaHidden = false;
    }

    function closeDropdown(trigger, dropdown) {
      trigger.classList.remove("hover");
      dropdown.classList.remove("is-open");
      dropdown.ariaHidden = true;
    }
  }

  function initCounters() {
    const counters = document.querySelectorAll(".players_count_input");

    counters.forEach((item) => {
      const input = item.querySelector("input");
      const plusBtn = item.querySelector(".plus");
      const minusBtn = item.querySelector(".minus");
      const max = +input.max;
      const min = +input.min;

      input.value = min;

      plusBtn.addEventListener("click", (e) => {
        if (input.value >= max) return;
        input.value = +input.value + 1;
      });

      minusBtn.addEventListener("click", (e) => {
        if (input.value <= min) return;
        input.value = +input.value - 1;
      });
    });
  }

  function initCalendar() {
    const dropdownCalendar = document.querySelector("#dropdown_calendar");
    const dropdownCalendarDatepicker = new Datepicker(dropdownCalendar, {
      min: getYesterday(new Date()),
      max: getLastDayAfterThreeMonths(new Date()),
      onChange: (date) => {
        dropdownCalendar.textContent = formatDate(new Date(date));
      },
      openOn: "today",
      classNames: {
        node: "datepicker dropdown-datepicker",
      },
      templates: {
        container: [
          '<div class="datepicker__container">',
          "<% for (var i = 0; i <= 3; i++) { %>",
          '<div class="datepicker__pane">',
          "<%= renderHeader(i) %>",
          "<%= renderCalendar(i) %>",
          "</div>",
          "<% } %>",
          "</div>",
        ].join(""),
      },
    });
    dropdownCalendar.textContent = formatDate(new Date());

    const calendar = new Datepicker("#calendar-datepicker", {
      inline: true,
      min: getYesterday(new Date()),
      max: getLastDayAfterThreeMonths(new Date()),
      classNames: {
        node: "datepicker calendar-datepicker",
      },
      openOn: "today",
      templates: {
        container: [
          '<div class="datepicker__container">',
          "<% for (var i = 0; i <= 3; i++) { %>",
          '<div class="datepicker__pane">',
          "<%= renderHeader(i) %>",
          "<%= renderCalendar(i) %>",
          "</div>",
          "<% } %>",
          "</div>",
        ].join(""),
      },
    });

    function formatDate(date) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const month = months[date.getMonth()]; // Получаем название месяца
      const day = date.getDate(); // Получаем число

      return `${month} ${day}`;
    }

    function getYesterday(date) {
      // Создаем новый объект Date, чтобы не изменять исходную дату
      let yesterday = new Date(date);

      // Уменьшаем значение дня на 1
      yesterday.setDate(yesterday.getDate() - 1);

      return yesterday;
    }

    function getLastDayAfterThreeMonths(date) {
      // Получаем текущий месяц и год
      let currentMonth = date.getMonth();
      let currentYear = date.getFullYear();

      // Считаем месяц через три месяца
      let targetMonth = currentMonth + 3;

      // Проверяем, если месяц больше 11 (декабрь), увеличиваем год и уменьшаем месяц
      if (targetMonth > 11) {
        targetYear = currentYear + 1;
        targetMonth = targetMonth - 12;
      } else {
        targetYear = currentYear;
      }

      // Получаем последний день целевого месяца
      let lastDay = new Date(targetYear, targetMonth + 1, 0);

      return lastDay;
    }
  }

  function initMuiSelects() {
    const selects = document.querySelectorAll(".MuiSelect-wrapper");

    document.body.addEventListener("click", (e) => {
      const select = e.target.closest(".MuiSelect-wrapper");
      const option = e.target.closest(".MuiSelect-dropdown-list li");

      if (select) {
        select.classList.toggle("is-open");

        if (option) {
          const value = select.querySelector(".MuiSelect-root");

          value.textContent = option.textContent;
          const activeOption = select.querySelector(
            ".MuiSelect-dropdown-list li.is-selected"
          );
          if (activeOption) activeOption.classList.remove("is-selected");
          option.classList.add("is-selected");
        }
      } else {
        document.querySelectorAll(".MuiSelect-wrapper").forEach((item) => {
          item.classList.remove("is-open");
        });
      }
    });
  }

  function initAddGameModal() {
    const buttons = document.querySelectorAll(".add_new_game");
    const modal = document.querySelector("#actin-modal");
    const overlay = document.querySelector(".reveal-overlay");

    buttons.forEach((btn) => {
      btn.addEventListener("click", openModal);
    });

    overlay.addEventListener("click", (e) => {
      if (!e.target.closest("#actin-modal") || e.target.closest('.return_button')) {
        closeModal();
      }
    });

    function openModal() {
      overlay.style.display = "block";
      modal.style.display = "block";
      modal.ariaHidden = false;
      document.documentElement.classList.add("zf-has-scroll");
      document.documentElement.classList.add("is-reveal-open");
    }

    function closeModal() {
      overlay.style.display = "";
      modal.style.display = "";
      modal.ariaHidden = true;
      document.documentElement.classList.remove("zf-has-scroll");
      document.documentElement.classList.remove("is-reveal-open");
    }
  }
});
