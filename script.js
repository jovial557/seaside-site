console.log("Seaside Shop JavaScript loaded");

document.addEventListener("DOMContentLoaded", () => {

  /* ==================================================
     SUPABASE
  ================================================== */

  const SUPABASE_URL =
    "https://mwsxzapkfsswsnveojlk.supabase.co";

  const SUPABASE_KEY =
    "sb_publishable_DvWNKV1ZeAFBcWgb8VlukQ_p7xu9aom";

  const db =
    window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_KEY
    );


  /* ==================================================
     ELEMENTS
  ================================================== */

  const welcomePopup =
    document.getElementById("welcomePopup");

  const seeGiftButton =
    document.getElementById("seeGiftButton");


  /* RECEIVED GIFT */

  const giftPopup =
    document.getElementById("giftPopup");

  const giftBackButton =
    document.getElementById("giftBackButton");

  const giftItem =
    document.getElementById("giftItem");

  const giftNoteBottle =
    document.getElementById("giftNoteBottle");


  /* RECEIVED NOTE */

  const notePopup =
    document.getElementById("notePopup");

  const noteMessage =
    document.getElementById("noteMessage");

  const wanderButton =
    document.getElementById("wanderButton");

  const leaveOneButton =
    document.getElementById("leaveOneButton");


  /* FOOD MENU */

  const leavePopup =
    document.getElementById("leavePopup");

  const laterButton =
    document.getElementById("laterButton");

  const orderButton =
    document.getElementById("orderButton");

  const shelfItems =
    document.querySelectorAll(".shelf-item");


  /* MESSAGE WRITER */

  const messagePopup =
    document.getElementById("messagePopup");

  const messageInput =
    document.getElementById("messageInput");

  const messageBackButton =
    document.getElementById("messageBackButton");

  const messageSendButton =
    document.getElementById("messageSendButton");


  /* SCENE OBJECTS */

  const coolerButton =
    document.getElementById("coolerButton");

  const forYouButton =
    document.getElementById("forYouButton");

  const messageBottleBoxButton =
    document.getElementById("messageBottleBoxButton");

  const shopSignButton =
    document.getElementById("shopSignButton");


  /* ABOUT */

  const aboutPopup =
    document.getElementById("aboutPopup");

  const aboutBackButton =
    document.getElementById("aboutBackButton");


  /* MUSIC */

  const backgroundBgm =
    document.getElementById("backgroundBgm");

  const soundToggle =
    document.getElementById("soundToggle");


  /* CLOCK */

  const digitalClock =
    document.getElementById("digitalClock");


  /* SIDE MENU */

  const menuToggle =
    document.getElementById("menuToggle");

  const slideMenu =
    document.getElementById("slideMenu");


  /* TV */

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

  let pendingGift = null;

  let tvIsPlaying = false;


  /* ==================================================
     DEFAULT GIFT
  ================================================== */

  const defaultGift = {
    name: "Stingray omelette",
    image: "assets/stingray-omelette.png",
    message:
      "I hope something unexpectedly nice happens to you today."
  };


  /* ==================================================
     LOAD LATEST SHARED GIFT
  ================================================== */

  async function getLatestGift() {

    const { data, error } =
      await db
        .from("wanderer_gifts")
        .select(
          "gift_name, gift_image, message, created_at"
        )
        .order(
          "created_at",
          {
            ascending: false
          }
        )
        .limit(1)
        .maybeSingle();


    if (error) {

      console.error(
        "Could not load shared gift:",
        error
      );

      return defaultGift;
    }


    if (!data) {

      return defaultGift;
    }


    return {
      name:
        data.gift_name ||
        defaultGift.name,

      image:
        data.gift_image ||
        defaultGift.image,

      message:
        data.message ||
        defaultGift.message
    };

  }


  async function loadReceivedGift() {

    const latestGift =
      await getLatestGift();


    if (giftItem) {

      giftItem.src =
        latestGift.image;

      giftItem.alt =
        latestGift.name;

    }


    if (noteMessage) {

      noteMessage.textContent =
        latestGift.message;

    }


    console.log(
      "Latest shared gift:",
      latestGift
    );

  }


  loadReceivedGift();


  /* ==================================================
     SAVE COMPLETE GIFT + MESSAGE
  ================================================== */

  async function saveSharedGift(
    giftName,
    giftImage,
    message
  ) {

    const { error } =
      await db
        .from("wanderer_gifts")
        .insert({
          gift_name:
            giftName,

          gift_image:
            giftImage,

          message:
            message
        });


    if (error) {

      console.error(
        "Could not save shared gift:",
        error
      );

      return false;
    }


    console.log(
      "Shared gift saved!"
    );


    return true;

  }


  /* ==================================================
     CLOSE ALL POPUPS

     Does not stop TV.
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
     MESSAGE POPUP
  ================================================== */

  function openMessagePopup() {

    if (!messagePopup) {
      return;
    }


    closeAllPopups();


    if (messageInput) {
      messageInput.value = "";
    }


    updateSendButtonState();


    messagePopup.style.display =
      "flex";


    setTimeout(() => {

      if (messageInput) {
        messageInput.focus();
      }

    }, 100);

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
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
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
     INTRO → GIFT
  ================================================== */

  if (
    seeGiftButton &&
    giftPopup
  ) {

    seeGiftButton.addEventListener(
      "click",
      async () => {

        if (welcomePopup) {
          welcomePopup.style.display =
            "none";
        }


        await loadReceivedGift();


        giftPopup.style.display =
          "flex";

      }
    );

  }


  /* ==================================================
     FOR YOU → LATEST SHARED GIFT
  ================================================== */

  if (
    forYouButton &&
    giftPopup
  ) {

    forYouButton.addEventListener(
      "click",
      async () => {

        closeAllPopups();


        await loadReceivedGift();


        giftPopup.style.display =
          "flex";

      }
    );

  }


  /* ==================================================
     GIFT BOTTLE → READ MESSAGE
  ================================================== */

  if (
    giftNoteBottle &&
    giftPopup &&
    notePopup
  ) {

    giftNoteBottle.addEventListener(
      "click",
      async () => {

        giftPopup.style.display =
          "none";


        await loadReceivedGift();


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
     FOOD MENU
  ================================================== */

  function updateOrderButtonState() {

    if (!orderButton) {
      return;
    }


    orderButton.disabled =
      selectedShelfItem === null;

  }


  function resetMenuSelection() {

    shelfItems.forEach(
      (item) => {

        item.classList.remove(
          "is-selected"
        );

      }
    );


    selectedShelfItem = null;

    updateOrderButtonState();

  }


  updateOrderButtonState();


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
     Store food temporarily,
     then ask for message.
  ================================================== */

  if (orderButton) {

    orderButton.addEventListener(
      "click",
      () => {

        if (!selectedShelfItem) {
          return;
        }


        const selectedImage =
          selectedShelfItem.querySelector(
            "img"
          );


        if (!selectedImage) {
          return;
        }


        pendingGift = {

          name:
            selectedImage.alt ||
            "A seaside treat",

          image:
            selectedImage.getAttribute(
              "src"
            )

        };


        console.log(
          "Pending gift:",
          pendingGift
        );


        resetMenuSelection();


        openMessagePopup();

      }
    );

  }


  /* ==================================================
     MESSAGE BOTTLE BOX
  ================================================== */

  if (messageBottleBoxButton) {

    messageBottleBoxButton.addEventListener(
      "click",
      () => {

        /*
          If they didn't select food,
          this becomes a message-only action.

          We'll pair it with the latest gift.
        */

        pendingGift = null;

        openMessagePopup();

      }
    );

  }


  /* ==================================================
     SEND BUTTON STATE
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
      updateSendButtonState
    );

  }


  updateSendButtonState();


  /* ==================================================
     MESSAGE BACK
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


        pendingGift = null;

      }
    );

  }


  /* ==================================================
     SEND MESSAGE

     This is where the shared row
     actually gets created.
  ================================================== */

  if (
    messageSendButton &&
    messageInput &&
    messagePopup
  ) {

    messageSendButton.addEventListener(
      "click",
      async () => {

        const message =
          messageInput.value.trim();


        if (!message) {
          return;
        }


        messageSendButton.disabled =
          true;


        let giftToSave =
          pendingGift;


        /*
          If message bottle was clicked
          directly without choosing food,
          attach the message to the
          current latest gift.
        */

        if (!giftToSave) {

          const latestGift =
            await getLatestGift();


          giftToSave = {

            name:
              latestGift.name,

            image:
              latestGift.image

          };

        }


        const success =
          await saveSharedGift(
            giftToSave.name,
            giftToSave.image,
            message
          );


        if (!success) {

          messageSendButton.disabled =
            false;

          return;
        }


        messageInput.value = "";

        pendingGift = null;

        updateSendButtonState();


        messagePopup.style.display =
          "none";


        await loadReceivedGift();

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
     TV
  ================================================== */

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


      setTvButtonState(false);

      return;
    }


    tvVideoWindow.innerHTML = "";


    if (tvError) {

      tvError.textContent = "";

    }


    if (info.type === "video") {

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
              "Unable to play video:",
              error
            );


            setTvButtonState(false);

          }
        );


      return;
    }


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

            setTvButtonState(true);

          }
        )
        .catch(
          (error) => {

            console.error(error);

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


      if (type === "youtube") {

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


      if (type === "vimeo") {

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

      setTvButtonState(false);

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


    if (type === "youtube") {

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


    if (type === "vimeo") {

      iframe.contentWindow.postMessage(
        {
          method:
            "pause"
        },
        "*"
      );

    }


    setTvButtonState(false);

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

        } else {

          playTvVideo();

        }

      }
    );

  }


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