console.log("Seaside Shop JavaScript loaded");

document.addEventListener("DOMContentLoaded", () => {

  /* ==================================================
     ELEMENTS
  ================================================== */

  const welcomePopup =
    document.getElementById("welcomePopup");

  const seeGiftButton =
    document.getElementById("seeGiftButton");


  /* =========================
     RECEIVED GIFT
  ========================== */

  const giftPopup =
    document.getElementById("giftPopup");

  const giftBackButton =
    document.getElementById("giftBackButton");

  const giftItem =
    document.getElementById("giftItem");

  const giftNoteBottle =
    document.getElementById("giftNoteBottle");


  /* =========================
     RECEIVED NOTE
  ========================== */

  const notePopup =
    document.getElementById("notePopup");

  const noteMessage =
    document.getElementById("noteMessage");

  const wanderButton =
    document.getElementById("wanderButton");

  const leaveOneButton =
    document.getElementById("leaveOneButton");


  /* =========================
     FOOD MENU
  ========================== */

  const leavePopup =
    document.getElementById("leavePopup");

  const laterButton =
    document.getElementById("laterButton");

  const orderButton =
    document.getElementById("orderButton");

  const shelfItems =
    document.querySelectorAll(".shelf-item");


  /* =========================
     MESSAGE WRITER
  ========================== */

  const messagePopup =
    document.getElementById("messagePopup");

  const messageInput =
    document.getElementById("messageInput");

  const messageBackButton =
    document.getElementById("messageBackButton");

  const messageSendButton =
    document.getElementById("messageSendButton");


  /* =========================
     SCENE OBJECTS
  ========================== */

  const coolerButton =
    document.getElementById("coolerButton");

  const forYouButton =
    document.getElementById("forYouButton");

  const messageBottleBoxButton =
    document.getElementById("messageBottleBoxButton");

  const shopSignButton =
    document.getElementById("shopSignButton");


  /* =========================
     ABOUT
  ========================== */

  const aboutPopup =
    document.getElementById("aboutPopup");

  const aboutBackButton =
    document.getElementById("aboutBackButton");


  /* =========================
     BACKGROUND MUSIC
  ========================== */

  const backgroundBgm =
    document.getElementById("backgroundBgm");

  const soundToggle =
    document.getElementById("soundToggle");


  /* =========================
     CLOCK
  ========================== */

  const digitalClock =
    document.getElementById("digitalClock");


  /* =========================
     SIDE MENU
  ========================== */

  const menuToggle =
    document.getElementById("menuToggle");

  const slideMenu =
    document.getElementById("slideMenu");


  /* =========================
     TV
  ========================== */

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


  /* ==================================================
     STATE
  ================================================== */

  let selectedShelfItem = null;

  let tvIsPlaying = false;


  const SAVED_ORDER_KEY =
    "seasideShopPreviousOrder";


  /* ==================================================
     DEFAULT GIFT
  ================================================== */

  const defaultGift = {

    name:
      "Stingray omelette",

    image:
      "assets/stingray-omelette.png",

    message:
      "I hope something unexpectedly nice happens to you today."

  };


  /* ==================================================
     GET SAVED ORDER
  ================================================== */

  function getPreviousOrder() {

    const saved =
      localStorage.getItem(
        SAVED_ORDER_KEY
      );


    if (!saved) {

      return {
        ...defaultGift
      };

    }


    try {

      const parsed =
        JSON.parse(saved);


      return {

        name:
          parsed.name ||
          defaultGift.name,

        image:
          parsed.image ||
          defaultGift.image,

        message:
          parsed.message ||
          defaultGift.message

      };

    }

    catch (error) {

      console.error(
        "Could not read saved order:",
        error
      );


      return {
        ...defaultGift
      };

    }

  }


  /* ==================================================
     SAVE ORDER
  ================================================== */

  function savePreviousOrder(order) {

    try {

      localStorage.setItem(
        SAVED_ORDER_KEY,
        JSON.stringify(order)
      );

    }

    catch (error) {

      console.error(
        "Could not save order:",
        error
      );

    }

  }


  /* ==================================================
     LOAD RECEIVED GIFT
  ================================================== */

  function loadReceivedGift() {

    const previousOrder =
      getPreviousOrder();


    if (giftItem) {

      giftItem.src =
        previousOrder.image;


      giftItem.alt =
        previousOrder.name;

    }


    if (noteMessage) {

      noteMessage.textContent =
        previousOrder.message;

    }

  }


  loadReceivedGift();


  /* ==================================================
     CLOSE POPUPS

     IMPORTANT:
     TV playback keeps running.
  ================================================== */

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


    if (messagePopup) {

      messagePopup.style.display =
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


  /* ==================================================
     OPEN MESSAGE POPUP

     Used by BOTH:
     - bottle box
     - order button
  ================================================== */

  function openMessagePopup() {

    console.log(
      "Opening message popup"
    );


    if (!messagePopup) {

      console.error(
        "messagePopup not found"
      );

      return;

    }


    /*
      Close anything that could
      still be showing.
    */

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


    /*
      Clear previous typing.
    */

    if (messageInput) {

      messageInput.value =
        "";

    }


    updateSendButtonState();


    /*
      OPEN MESSAGE POPUP
    */

    messagePopup.style.display =
      "flex";


    /*
      Focus textarea.
    */

    setTimeout(
      () => {

        if (messageInput) {

          messageInput.focus();

        }

      },
      100
    );

  }


  /* ==================================================
     CLOCK
  ================================================== */

  function updateClock() {

    if (!digitalClock) {

      return;

    }


    digitalClock.textContent =
      new Date().toLocaleTimeString(
        [],
        {

          hour:
            "2-digit",

          minute:
            "2-digit",

          second:
            "2-digit"

        }
      );

  }


  updateClock();


  setInterval(
    updateClock,
    1000
  );


  /* ==================================================
     SIDE MENU
  ================================================== */

  if (
    menuToggle &&
    slideMenu
  ) {

    menuToggle.addEventListener(
      "click",
      () => {

        const open =
          slideMenu.classList.toggle(
            "is-open"
          );


        menuToggle.setAttribute(
          "aria-expanded",
          open
            ? "true"
            : "false"
        );


        slideMenu.setAttribute(
          "aria-hidden",
          open
            ? "false"
            : "true"
        );

      }
    );

  }


  /* ==================================================
     INTRO → RECEIVED GIFT
  ================================================== */

  if (
    seeGiftButton &&
    giftPopup
  ) {

    seeGiftButton.addEventListener(
      "click",
      () => {

        if (welcomePopup) {

          welcomePopup.style.display =
            "none";

        }


        loadReceivedGift();


        giftPopup.style.display =
          "flex";

      }
    );

  }


  /* ==================================================
     FOR YOU → RECEIVED GIFT
  ================================================== */

  if (
    forYouButton &&
    giftPopup
  ) {

    forYouButton.addEventListener(
      "click",
      () => {

        closeAllPopups();


        loadReceivedGift();


        giftPopup.style.display =
          "flex";

      }
    );

  }


  /* ==================================================
     GIFT BOTTLE → READ NOTE
  ================================================== */

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


        loadReceivedGift();


        notePopup.style.display =
          "flex";

      }
    );

  }


  /* ==================================================
     GIFT EXIT
  ================================================== */

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


  /* ==================================================
     NOTE → WANDER
  ================================================== */

  if (wanderButton) {

    wanderButton.addEventListener(
      "click",
      () => {

        closeAllPopups();

      }
    );

  }


  /* ==================================================
     NOTE → LEAVE ONE TOO

     Goes to food menu.
  ================================================== */

  if (
    leaveOneButton &&
    leavePopup
  ) {

    leaveOneButton.addEventListener(
      "click",
      () => {

        closeAllPopups();


        resetMenuSelection();


        leavePopup.style.display =
          "flex";

      }
    );

  }


  /* ==================================================
     COOLER → FOOD MENU
  ================================================== */

  if (
    coolerButton &&
    leavePopup
  ) {

    coolerButton.addEventListener(
      "click",
      () => {

        closeAllPopups();


        resetMenuSelection();


        leavePopup.style.display =
          "flex";

      }
    );

  }


  /* ==================================================
     FOOD MENU STATE
  ================================================== */

  function updateOrderButtonState() {

    if (!orderButton) {

      return;

    }


    orderButton.disabled =
      selectedShelfItem ===
      null;

  }


  function resetMenuSelection() {

    shelfItems.forEach(
      (item) => {

        item.classList.remove(
          "is-selected"
        );

      }
    );


    selectedShelfItem =
      null;


    updateOrderButtonState();

  }


  updateOrderButtonState();


  /* ==================================================
     FOOD SELECTION
  ================================================== */

  shelfItems.forEach(
    (item) => {

      item.addEventListener(
        "click",
        () => {

          shelfItems.forEach(
            (otherItem) => {

              otherItem.classList.remove(
                "is-selected"
              );

            }
          );


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


  /* ==================================================
     I'LL DO IT LATER
  ================================================== */

  if (
    laterButton &&
    leavePopup
  ) {

    laterButton.addEventListener(
      "click",
      () => {

        leavePopup.style.display =
          "none";


        resetMenuSelection();

      }
    );

  }


  /* ==================================================
     ORDER

     SAVE FOOD
     ↓
     OPEN MESSAGE POPUP
  ================================================== */

  if (orderButton) {

    orderButton.addEventListener(
      "click",
      () => {

        console.log(
          "Order button clicked"
        );


        if (!selectedShelfItem) {

          console.log(
            "No food selected"
          );

          return;

        }


        const selectedImage =
          selectedShelfItem.querySelector(
            "img"
          );


        if (!selectedImage) {

          console.error(
            "Selected item has no image"
          );

          return;

        }


        const currentOrder =
          getPreviousOrder();


        const updatedOrder = {

          name:
            selectedImage.alt ||
            "A seaside treat",

          image:
            selectedImage.getAttribute(
              "src"
            ),

          /*
            Keep existing message
            temporarily.
          */

          message:
            currentOrder.message

        };


        savePreviousOrder(
          updatedOrder
        );


        console.log(
          "Food saved:",
          updatedOrder
        );


        /*
          Reset selected item.
        */

        resetMenuSelection();


        /*
          Update received gift.
        */

        loadReceivedGift();


        /*
          OPEN THE SAME MESSAGE
          POPUP AS THE BOTTLE BOX.
        */

        openMessagePopup();

      }
    );

  }


  /* ==================================================
     MESSAGE BOTTLE BOX → MESSAGE POPUP
  ================================================== */

  if (messageBottleBoxButton) {

    messageBottleBoxButton.addEventListener(
      "click",
      () => {

        openMessagePopup();

      }
    );

  }


  /* ==================================================
     MESSAGE SEND BUTTON STATE
  ================================================== */

  function updateSendButtonState() {

    if (
      !messageSendButton ||
      !messageInput
    ) {

      return;

    }


    messageSendButton.disabled =
      messageInput.value
        .trim()
        .length === 0;

  }


  if (messageInput) {

    messageInput.addEventListener(
      "input",
      () => {

        updateSendButtonState();

      }
    );

  }


  updateSendButtonState();


  /* ==================================================
     MESSAGE → BACK
  ================================================== */

  if (
    messageBackButton &&
    messagePopup
  ) {

    messageBackButton.addEventListener(
      "click",
      () => {

        messagePopup.style.display =
          "none";

      }
    );

  }


  /* ==================================================
     MESSAGE → SEND

     Keep food.
     Replace saved message.
  ================================================== */

  if (
    messageSendButton &&
    messageInput &&
    messagePopup
  ) {

    messageSendButton.addEventListener(
      "click",
      () => {

        const message =
          messageInput.value.trim();


        if (!message) {

          return;

        }


        const currentOrder =
          getPreviousOrder();


        const updatedOrder = {

          name:
            currentOrder.name,

          image:
            currentOrder.image,

          message:
            message

        };


        savePreviousOrder(
          updatedOrder
        );


        console.log(
          "Message saved:",
          updatedOrder
        );


        messageInput.value =
          "";


        updateSendButtonState();


        messagePopup.style.display =
          "none";


        loadReceivedGift();

      }
    );

  }


  /* ==================================================
     SHOP SIGN → ABOUT
  ================================================== */

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


  /* ==================================================
     ABOUT → BACK
  ================================================== */

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


  /* ==================================================
     TV BUTTON STATE
  ================================================== */

  function setTvButtonState(
    isPlaying
  ) {

    tvIsPlaying =
      isPlaying;


    if (!tvPlayPauseButton) {

      return;

    }


    tvPlayPauseButton.textContent =
      isPlaying
        ? "pause"
        : "play";

  }


  /* ==================================================
     TV → OPEN
  ================================================== */

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


  /* ==================================================
     TV → GO BACK

     DOES NOT STOP VIDEO.
  ================================================== */

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


  /* ==================================================
     VIDEO URL PARSER
  ================================================== */

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


    /* Direct video */

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


  /* ==================================================
     LOAD TV VIDEO
  ================================================== */

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


      setTvButtonState(
        false
      );


      return;

    }


    tvVideoWindow.innerHTML =
      "";


    if (tvError) {

      tvError.textContent =
        "";

    }


    /* =========================
       DIRECT VIDEO
    ========================== */

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

            setTvButtonState(
              true
            );

          }
        )
        .catch(
          (error) => {

            console.error(
              "Unable to play video:",
              error
            );


            setTvButtonState(
              false
            );

          }
        );


      return;

    }


    /* =========================
       EMBEDDED VIDEO
    ========================== */

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


    setTvButtonState(
      true
    );

  }


  /* ==================================================
     PLAY TV
  ================================================== */

  function playTvVideo() {

    if (!tvVideoWindow) {

      return;

    }


    const video =
      tvVideoWindow.querySelector(
        "video"
      );


    if (video) {

      video.play()
        .then(
          () => {

            setTvButtonState(
              true
            );

          }
        )
        .catch(
          (error) => {

            console.error(
              "Unable to resume video:",
              error
            );

          }
        );


      return;

    }


    const iframe =
      tvVideoWindow.querySelector(
        "iframe"
      );


    if (iframe) {

      const type =
        iframe.dataset.videoType;


      /* YouTube */

      if (
        type ===
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


        setTvButtonState(
          true
        );


        return;

      }


      /* Vimeo */

      if (
        type ===
        "vimeo"
      ) {

        iframe.contentWindow.postMessage(
          {

            method:
              "play"

          },
          "*"
        );


        setTvButtonState(
          true
        );


        return;

      }

    }


    /*
      No video loaded yet.
    */

    loadTvVideo();

  }


  /* ==================================================
     PAUSE TV
  ================================================== */

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


      setTvButtonState(
        false
      );


      return;

    }


    const iframe =
      tvVideoWindow.querySelector(
        "iframe"
      );


    if (!iframe) {

      return;

    }


    const type =
      iframe.dataset.videoType;


    /* YouTube */

    if (
      type ===
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

    }


    /* Vimeo */

    if (
      type ===
      "vimeo"
    ) {

      iframe.contentWindow.postMessage(
        {

          method:
            "pause"

        },
        "*"
      );

    }


    setTvButtonState(
      false
    );

  }


  /* ==================================================
     TV PLAY / PAUSE
  ================================================== */

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


  /* ==================================================
     ENTER URL → PLAY
  ================================================== */

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


  /* ==================================================
     BACKGROUND MUSIC
  ================================================== */

  if (
    backgroundBgm &&
    soundToggle
  ) {

    backgroundBgm.volume =
      0.35;


    soundToggle.addEventListener(
      "click",
      async () => {

        if (
          backgroundBgm.paused
        ) {

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