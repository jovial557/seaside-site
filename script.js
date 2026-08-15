console.log("Seaside Shop JavaScript loaded");

document.addEventListener("DOMContentLoaded", () => {

  /* ==============================
     ELEMENTS
  ============================== */

  const welcomePopup =
    document.getElementById("welcomePopup");

  const seeGiftButton =
    document.getElementById("seeGiftButton");


  const giftPopup =
    document.getElementById("giftPopup");

  const giftBackButton =
    document.getElementById("giftBackButton");

  const giftItem =
    document.getElementById("giftItem");

  const giftNoteBottle =
    document.getElementById("giftNoteBottle");


  const notePopup =
    document.getElementById("notePopup");

  const noteMessage =
    document.getElementById("noteMessage");

  const wanderButton =
    document.getElementById("wanderButton");

  const leaveOneButton =
    document.getElementById("leaveOneButton");


  const leavePopup =
    document.getElementById("leavePopup");

  const leaveMessageInput =
    document.getElementById("leaveMessageInput");

  const laterButton =
    document.getElementById("laterButton");

  const orderButton =
    document.getElementById("orderButton");


  const shelfItems =
    document.querySelectorAll(".shelf-item");


  const coolerButton =
    document.getElementById("coolerButton");

  const messageBottleBoxButton =
    document.getElementById("messageBottleBoxButton");


  const shopSignButton =
    document.getElementById("shopSignButton");

  const aboutPopup =
    document.getElementById("aboutPopup");

  const aboutBackButton =
    document.getElementById("aboutBackButton");


  const backgroundBgm =
    document.getElementById("backgroundBgm");

  const soundToggle =
    document.getElementById("soundToggle");


  const digitalClock =
    document.getElementById("digitalClock");


  const menuToggle =
    document.getElementById("menuToggle");

  const slideMenu =
    document.getElementById("slideMenu");


  /* ==============================
     TV ELEMENTS
  ============================== */

  const tvButton =
    document.getElementById("tvButton");

  const tvPopup =
    document.getElementById("tvPopup");

  const tvBackButton =
    document.getElementById("tvBackButton");

  const tvUrlInput =
    document.getElementById("tvUrlInput");

  const tvPlayPauseButton =
    document.getElementById("tvPlayPauseButton");

  const tvVideoWindow =
    document.getElementById("tvVideoWindow");

  const tvError =
    document.getElementById("tvError");


  /* ==============================
     STATE
  ============================== */

  let selectedShelfItem = null;

  let tvIsPlaying = false;


  const SAVED_ORDER_KEY =
    "seasideShopPreviousOrder";


  /* ==============================
     DEFAULT GIFT
  ============================== */

  const defaultGift = {

    name:
      "Stingray omelette",

    image:
      "assets/stingray-omelette.png",

    message:
      "I hope something unexpectedly nice happens to you today."

  };


  /* ==============================
     TV BUTTON STATE
  ============================== */

  function setTvButtonState(isPlaying) {

    tvIsPlaying = isPlaying;

    if (!tvPlayPauseButton) {
      return;
    }

    tvPlayPauseButton.textContent =
      isPlaying
        ? "pause"
        : "play";

  }


  /* ==============================
     CLOSE POPUPS
  ============================== */

  function closeAllPopups() {

    if (welcomePopup) {
      welcomePopup.style.display =
        "none";
    }

    if (giftPopup) {
      giftPopup.style.display =
        "none";
    }

    if (notePopup) {
      notePopup.style.display =
        "none";
    }

    if (leavePopup) {
      leavePopup.style.display =
        "none";
    }

    if (aboutPopup) {
      aboutPopup.style.display =
        "none";
    }

    if (tvPopup) {
      tvPopup.style.display =
        "none";
    }

  }


  /* ==============================
     PREVIOUS ORDER
  ============================== */

  function getPreviousOrder() {

    const savedOrder =
      localStorage.getItem(
        SAVED_ORDER_KEY
      );


    if (!savedOrder) {

      return defaultGift;

    }


    try {

      const parsedOrder =
        JSON.parse(savedOrder);


      if (
        !parsedOrder.image ||
        !parsedOrder.message
      ) {

        return defaultGift;

      }


      return parsedOrder;

    }

    catch (error) {

      console.error(
        "Could not read previous order:",
        error
      );


      return defaultGift;

    }

  }


  /* ==============================
     LOAD RECEIVED GIFT
  ============================== */

  function loadReceivedGift() {

    const previousOrder =
      getPreviousOrder();


    if (giftItem) {

      giftItem.src =
        previousOrder.image;


      giftItem.alt =
        previousOrder.name ||
        "Gift from a wanderer";

    }


    if (noteMessage) {

      noteMessage.textContent =
        previousOrder.message;

    }


    console.log(
      "Received gift:",
      previousOrder
    );

  }


  loadReceivedGift();


  /* ==============================
     CLOCK
  ============================== */

  function updateClock() {

    if (!digitalClock) {
      return;
    }


    const now =
      new Date();


    const time =
      now.toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }
      );


    digitalClock.textContent =
      time;

  }


  updateClock();


  setInterval(
    updateClock,
    1000
  );


  /* ==============================
     SLIDE MENU
  ============================== */

  if (
    menuToggle &&
    slideMenu
  ) {

    menuToggle.addEventListener(
      "click",
      () => {

        const isOpen =
          slideMenu.classList.toggle(
            "is-open"
          );


        menuToggle.setAttribute(
          "aria-expanded",
          isOpen
            ? "true"
            : "false"
        );


        slideMenu.setAttribute(
          "aria-hidden",
          isOpen
            ? "false"
            : "true"
        );

      }
    );

  }


  /* ==============================
     INTRO → GIFT
  ============================== */

  if (
    seeGiftButton &&
    welcomePopup &&
    giftPopup
  ) {

    seeGiftButton.addEventListener(
      "click",
      () => {

        welcomePopup.style.display =
          "none";


        loadReceivedGift();


        giftPopup.style.display =
          "flex";

      }
    );

  }


  /* ==============================
     GIFT BOTTLE → NOTE
  ============================== */

  if (
    giftNoteBottle &&
    giftPopup &&
    notePopup
  ) {

    giftNoteBottle.addEventListener(
      "click",
      () => {

        giftPopup.style.display =
          "none";


        notePopup.style.display =
          "flex";

      }
    );

  }


  /* ==============================
     GIFT → GO BACK
  ============================== */

  if (
    giftBackButton &&
    giftPopup
  ) {

    giftBackButton.addEventListener(
      "click",
      () => {

        giftPopup.style.display =
          "none";

      }
    );

  }


  /* ==============================
     WANDER AROUND
  ============================== */

  if (wanderButton) {

    wanderButton.addEventListener(
      "click",
      () => {

        closeAllPopups();

      }
    );

  }


  /* ==============================
     LEAVE ONE TOO
  ============================== */

  if (
    leaveOneButton &&
    notePopup &&
    leavePopup
  ) {

    leaveOneButton.addEventListener(
      "click",
      () => {

        notePopup.style.display =
          "none";


        leavePopup.style.display =
          "flex";


        updateOrderButtonState();

      }
    );

  }


  /* ==============================
     BOTTLE BOX → MENU
  ============================== */

  if (
    messageBottleBoxButton &&
    leavePopup
  ) {

    messageBottleBoxButton.addEventListener(
      "click",
      () => {

        closeAllPopups();


        leavePopup.style.display =
          "flex";


        updateOrderButtonState();

      }
    );

  }


  /* ==============================
     COOLER → GIFT
  ============================== */

  if (
    coolerButton &&
    giftPopup
  ) {

    coolerButton.addEventListener(
      "click",
      () => {

        closeAllPopups();


        loadReceivedGift();


        giftPopup.style.display =
          "flex";

      }
    );

  }


  /* ==============================
     SHOP SIGN → ABOUT
  ============================== */

  if (
    shopSignButton &&
    aboutPopup
  ) {

    shopSignButton.addEventListener(
      "click",
      () => {

        closeAllPopups();


        aboutPopup.style.display =
          "flex";

      }
    );

  }


  /* ==============================
     ABOUT → GO BACK
  ============================== */

  if (
    aboutBackButton &&
    aboutPopup
  ) {

    aboutBackButton.addEventListener(
      "click",
      () => {

        aboutPopup.style.display =
          "none";

      }
    );

  }


  /* ==============================
     TV → OPEN
  ============================== */

  if (
    tvButton &&
    tvPopup
  ) {

    tvButton.addEventListener(
      "click",
      () => {

        closeAllPopups();


        tvPopup.style.display =
          "flex";

      }
    );

  }


  /* ==============================
     TV → GO BACK
     
     IMPORTANT:
     We DO NOT pause the TV here.
     The music keeps playing.
  ============================== */

  if (
    tvBackButton &&
    tvPopup
  ) {

    tvBackButton.addEventListener(
      "click",
      () => {

        tvPopup.style.display =
          "none";

      }
    );

  }


  /* ==============================
     VIDEO URL PARSER
  ============================== */

  function getVideoInfo(rawUrl) {

    const url =
      rawUrl.trim();


    if (!url) {
      return null;
    }


    /* YouTube */

    const youtubePatterns = [

      /youtube\.com\/watch\?v=([^&]+)/,

      /youtu\.be\/([^?&]+)/,

      /youtube\.com\/shorts\/([^?&]+)/,

      /youtube\.com\/embed\/([^?&]+)/

    ];


    for (
      const pattern
      of youtubePatterns
    ) {

      const match =
        url.match(pattern);


      if (match) {

        return {

          type:
            "youtube",

          url:
            `https://www.youtube.com/embed/${match[1]}?autoplay=1&enablejsapi=1`

        };

      }

    }


    /* Vimeo */

    const vimeoMatch =
      url.match(
        /vimeo\.com\/(?:video\/)?(\d+)/
      );


    if (vimeoMatch) {

      return {

        type:
          "vimeo",

        url:
          `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`

      };

    }


    /* Direct file */

    if (
      /\.(mp4|webm|ogg)(\?.*)?$/i
        .test(url)
    ) {

      return {

        type:
          "video",

        url:
          url

      };

    }


    /* Generic iframe */

    return {

      type:
        "iframe",

      url:
        url

    };

  }


  /* ==============================
     LOAD TV VIDEO
  ============================== */

  function loadTvVideo() {

    if (
      !tvUrlInput ||
      !tvVideoWindow
    ) {

      return;

    }


    const info =
      getVideoInfo(
        tvUrlInput.value
      );


    if (!info) {

      if (tvError) {

        tvError.textContent =
          "paste a video url first";

      }


      setTvButtonState(false);

      return;

    }


    tvVideoWindow.innerHTML =
      "";


    if (tvError) {

      tvError.textContent =
        "";

    }


    /* Direct video */

    if (
      info.type ===
      "video"
    ) {

      const video =
        document.createElement(
          "video"
        );


      video.src =
        info.url;


      video.id =
        "activeTvVideo";


      video.controls =
        false;


      video.autoplay =
        true;


      video.playsInline =
        true;


      video.preload =
        "metadata";


      tvVideoWindow.appendChild(
        video
      );


      video.play()
        .then(
          () => {

            setTvButtonState(true);

          }
        )
        .catch(
          (error) => {

            console.error(
              "Unable to play direct video:",
              error
            );


            setTvButtonState(false);

          }
        );


      return;

    }


    /* Embedded player */

    const iframe =
      document.createElement(
        "iframe"
      );


    iframe.src =
      info.url;


    iframe.id =
      "activeTvIframe";


    iframe.dataset.videoType =
      info.type;


    iframe.allow =
      "autoplay; encrypted-media; picture-in-picture; fullscreen";


    iframe.allowFullscreen =
      true;


    iframe.setAttribute(
      "title",
      "Video playing on the seaside TV"
    );


    tvVideoWindow.appendChild(
      iframe
    );


    setTvButtonState(true);

  }


  /* ==============================
     PLAY / RESUME TV
  ============================== */

  function playTvVideo() {

    if (!tvVideoWindow) {
      return;
    }


    const existingVideo =
      tvVideoWindow.querySelector(
        "video"
      );


    if (existingVideo) {

      existingVideo
        .play()
        .then(
          () => {

            setTvButtonState(true);

          }
        )
        .catch(
          (error) => {

            console.error(
              "Unable to resume video:",
              error
            );


            setTvButtonState(false);

          }
        );


      return;

    }


    const iframe =
      tvVideoWindow.querySelector(
        "iframe"
      );


    if (iframe) {

      const videoType =
        iframe.dataset.videoType;


      /* YouTube */

      if (
        videoType ===
        "youtube"
      ) {

        iframe.contentWindow.postMessage(
          JSON.stringify({

            event:
              "command",

            func:
              "playVideo",

            args:
              []

          }),
          "*"
        );


        setTvButtonState(true);

        return;

      }


      /* Vimeo */

      if (
        videoType ===
        "vimeo"
      ) {

        iframe.contentWindow.postMessage(
          {
            method:
              "play"
          },
          "*"
        );


        setTvButtonState(true);

        return;

      }

    }


    /* No video yet */

    loadTvVideo();

  }


  /* ==============================
     PAUSE TV
  ============================== */

  function pauseTvVideo() {

    if (!tvVideoWindow) {
      return;
    }


    const video =
      tvVideoWindow.querySelector(
        "video"
      );


    if (video) {

      video.pause();


      setTvButtonState(false);

      return;

    }


    const iframe =
      tvVideoWindow.querySelector(
        "iframe"
      );


    if (!iframe) {

      setTvButtonState(false);

      return;

    }


    const videoType =
      iframe.dataset.videoType;


    /* YouTube */

    if (
      videoType ===
      "youtube"
    ) {

      iframe.contentWindow.postMessage(
        JSON.stringify({

          event:
            "command",

          func:
            "pauseVideo",

          args:
            []

        }),
        "*"
      );


      setTvButtonState(false);

      return;

    }


    /* Vimeo */

    if (
      videoType ===
      "vimeo"
    ) {

      iframe.contentWindow.postMessage(
        {
          method:
            "pause"
        },
        "*"
      );


      setTvButtonState(false);

      return;

    }


    setTvButtonState(false);

  }


  /* ==============================
     PLAY / PAUSE TOGGLE
  ============================== */

  if (tvPlayPauseButton) {

    tvPlayPauseButton.addEventListener(
      "click",
      () => {

        if (tvIsPlaying) {

          pauseTvVideo();

        }

        else {

          playTvVideo();

        }

      }
    );

  }


  /* ==============================
     ENTER → LOAD VIDEO
  ============================== */

  if (tvUrlInput) {

    tvUrlInput.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key ===
          "Enter"
        ) {

          event.preventDefault();


          loadTvVideo();

        }

      }
    );

  }


  /* ==============================
     ORDER BUTTON STATE
  ============================== */

  function updateOrderButtonState() {

    if (!orderButton) {
      return;
    }


    const hasSelectedItem =
      selectedShelfItem !== null;


    const hasMessage =
      leaveMessageInput &&
      leaveMessageInput.value
        .trim()
        .length > 0;


    orderButton.disabled =
      !(
        hasSelectedItem &&
        hasMessage
      );

  }


  updateOrderButtonState();


  /* ==============================
     FOOD SELECTION
  ============================== */

  shelfItems.forEach(
    (item) => {

      item.addEventListener(
        "click",
        () => {


          if (selectedShelfItem) {

            selectedShelfItem
              .classList
              .remove(
                "is-selected"
              );

          }


          item.classList.add(
            "is-selected"
          );


          selectedShelfItem =
            item;


          updateOrderButtonState();

        }
      );

    }
  );


  /* ==============================
     MESSAGE INPUT
  ============================== */

  if (leaveMessageInput) {

    leaveMessageInput.addEventListener(
      "input",
      () => {

        updateOrderButtonState();

      }
    );

  }


  /* ==============================
     I'LL DO IT LATER
  ============================== */

  if (
    laterButton &&
    leavePopup
  ) {

    laterButton.addEventListener(
      "click",
      () => {

        leavePopup.style.display =
          "none";

      }
    );

  }


  /* ==============================
     ORDER
  ============================== */

  if (orderButton) {

    orderButton.addEventListener(
      "click",
      () => {


        if (!selectedShelfItem) {
          return;
        }


        if (!leaveMessageInput) {
          return;
        }


        const message =
          leaveMessageInput.value
            .trim();


        if (!message) {
          return;
        }


        const selectedImage =
          selectedShelfItem.querySelector(
            "img"
          );


        if (!selectedImage) {
          return;
        }


        const selectedName =
          selectedImage.alt ||
          "A seaside treat";


        const selectedSource =
          selectedImage.getAttribute(
            "src"
          );


        const newOrder = {

          name:
            selectedName,

          image:
            selectedSource,

          message:
            message

        };


        /* SAVE */

        try {

          localStorage.setItem(
            SAVED_ORDER_KEY,
            JSON.stringify(
              newOrder
            )
          );


          console.log(
            "Saved for next wanderer:",
            newOrder
          );

        }

        catch (error) {

          console.error(
            "Could not save order:",
            error
          );

        }


        /* RESET */

        selectedShelfItem
          .classList
          .remove(
            "is-selected"
          );


        selectedShelfItem =
          null;


        leaveMessageInput.value =
          "";


        updateOrderButtonState();


        leavePopup.style.display =
          "none";

      }
    );

  }


  /* ==============================
     BACKGROUND MUSIC
  ============================== */

  if (
    backgroundBgm &&
    soundToggle
  ) {

    backgroundBgm.volume =
      0.35;


    soundToggle.addEventListener(
      "click",
      async () => {


        if (backgroundBgm.paused) {

          try {

            await backgroundBgm.play();


            soundToggle.classList.add(
              "is-playing"
            );


            soundToggle.setAttribute(
              "aria-label",
              "Turn sound off"
            );


            soundToggle.setAttribute(
              "aria-pressed",
              "true"
            );

          }

          catch (error) {

            console.error(
              "Unable to play background music:",
              error
            );

          }

        }

        else {

          backgroundBgm.pause();


          soundToggle.classList.remove(
            "is-playing"
          );


          soundToggle.setAttribute(
            "aria-label",
            "Turn sound on"
          );


          soundToggle.setAttribute(
            "aria-pressed",
            "false"
          );

        }

      }
    );

  }

});