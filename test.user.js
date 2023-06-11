// ==UserScript==
// @name         Apink加場
// @version      試用
// @author       TechTickBot
// @namespace    https://t.me/techtickbot_channel
// @run-at       document-idle
// @match        *://*.hkticketing.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hkticketing.com
// ==/UserScript==
(function () {
    "use strict";
    // change below
  
    function addTestingBar() {
      // Create the testing bar
      var testingBar = document.createElement("div");
      testingBar.innerHTML = "~~見此句即BOT正常運作中 不用再問客服~~";
      testingBar.style.position = "fixed";
      testingBar.style.top = "0";
      testingBar.style.left = "0";
      testingBar.style.width = "100%";
      testingBar.style.background = "black";
      testingBar.style.color = "white";
      testingBar.style.padding = "10px";
      testingBar.style.zIndex = "9999";
  
      // Get the navbar height
      var navbarHeight = 0;
      var navbar = document.querySelector("nav");
      if (navbar) {
        navbarHeight = navbar.offsetHeight;
      }
  
      // Adjust the top position to avoid covering the navbar
      testingBar.style.top = navbarHeight + "px";
  
      // Add the testing bar to the document body
      document.body.appendChild(testingBar);
  
      // Create custom styles for the testing bar
      var customStyle = document.createElement("style");
      customStyle.innerHTML =
        "body { padding-top: " + (navbarHeight + 30) + "px !important; }";
  
      // Append the custom styles to the document head
      document.head.appendChild(customStyle);
    }
  
    // Call the function to add the testing bar
    addTestingBar();
  
    const end = "2099-01-01";
    const eventName = "test";
    const hotshow = "https://entry-hotshow.hkticketing.com/";
    // change above
  
    const getTimeApi = async () => {
      const resp = await fetch(
        "https://worldtimeapi.org/api/timezone/Asia/Hong_Kong"
      ).then((response) => response.json());
      return resp;
    };
  
    function appendHeadingToInnerContent() {
      var innerContentElement = document.querySelector(".inner-content");
  
      if (innerContentElement) {
        // Create the second paragraph element
        var paragraph = document.createElement("p");
        paragraph.textContent = "如果直接進入event page是正常";
  
        // Create another paragraph element
        var paragraph2 = document.createElement("p");
        paragraph2.textContent =
          "如開賣一天/當天在此頁面畫面不停閃 進入不到event page是正常";
  
        // Create a third paragraph element
        var paragraph3 = document.createElement("p");
        paragraph3.textContent = "開賣時跳到白畫面或倒數到0沒反即server問題";
        paragraph3.style.color = "red";
  
        // Prepend the elements to the inner content
        innerContentElement.prepend(paragraph, paragraph2, paragraph3);
      }
    }
  
    // Usage
    appendHeadingToInnerContent();
  
    function updateEventPricingHeader() {
      var currentUrl = window.location.href;
      var pricingHeader =
        document.getElementsByClassName("eventPricingHeader")[0];
  
      if (currentUrl.includes("shows/show.aspx") && pricingHeader) {
        var heading = pricingHeader.querySelector("h2");
        if (heading) {
          heading.textContent = "下一頁先有自動重試揀位";
          heading.style.setProperty("color", "red", "important");
          heading.style.setProperty("font-size", "25px", "important");
          heading.style.setProperty("font-weight", "bold", "important");
        }
      }
    }
  
    updateEventPricingHeader();
  
    function updateActionBlockContent() {
      var currentUrl = window.location.href;
      var actionBlock = document.getElementsByClassName("copy")[0];
  
      if (
        currentUrl.includes("performances") &&
        currentUrl.includes("tickets") &&
        actionBlock
      ) {
        var noteHeading = actionBlock.querySelector("h5");
        var noteParagraph = actionBlock.querySelector("div > p");
  
        if (noteHeading && noteParagraph) {
          noteParagraph.textContent = "先揀好價位數量 再click自動重試揀位";
          noteParagraph.style.color = "red";
          noteParagraph.style.fontSize = "25px";
          noteParagraph.style.fontWeight = "bold";
          // Add an additional note paragraph
          var noteParagraph2 = document.createElement("p");
          noteParagraph2.textContent =
            "* 如該演唱會沒有票價選擇即未開售，請到其他演唱會測試";
          noteParagraph2.style.color = "red";
          noteParagraph2.style.fontSize = "25px";
          noteParagraph2.style.fontWeight = "bold";
  
          // Append the additional note paragraph after the first note paragraph
          noteParagraph.parentNode.insertBefore(
            noteParagraph2,
            noteParagraph.nextSibling
          );
        }
      }
    }
  
    // Usage
    updateActionBlockContent();
  
    async function validtion() {
      let currentLocation = window.location.href;
      if (currentLocation == "https://busy.hkticketing.com/") {
        location.replace("https://queue.hkticketing.com/hotshow.html");
      }
      if (
        currentLocation == "https://queue.hkticketing.com/hotshow.html" ||
        currentLocation == "https://busy.hkticketing.com/"
      ) {
        console.log("refresh");
  
        function replace_queue() {
          location.replace(hotshow);
        }
        setTimeout(replace_queue, 500);
      } else if (currentLocation == "https://entry-hotshow.hkticketing.com/") {
        try {
          let iframes = document.getElementsByTagName("iframe");
          for (let i = 0; i < iframes.length; i++) {
            await delay(1000);
            let iframeContent = iframes[i].contentDocument.body.textContent;
            if (
              iframeContent.includes("系統現正繁忙 請稍後再試") &&
              !iframeContent.includes("Why")
            ) {
              console.log("搵到!");
              await delay(300);
              location.replace(hotshow);
            }
          }
        } catch (error) {
          let iframes = document.getElementsByTagName("iframe");
          if (iframes) {
            console.log("testinside");
            window.open("https://entry-hotshow.hkticketing.com/", "_blank");
          }
        }
      } else {
      }
  
      if (currentLocation.match(eventName)) {
        const now = await getTimeApi();
        const endtime = new Date(end);
        if (new Date(now.datetime) > endtime) {
          // clear all cookies and close window
          document.cookie.split(";").forEach(function (c) {
            document.cookie = c
              .replace(/^ +/, "")
              .replace(
                /=.*/,
                "=;expires=" + new Date().toUTCString() + ";path=/"
              );
          });
          // replace to blank page
          alert("已過使用時間");
          window.location.replace("about:blank");
          return;
        }
      }
  
      // get system time not api
      const systemTime = new Date();
  
      if (systemTime > new Date(end)) {
        // clear all cookies and close window
        document.cookie.split(";").forEach(function (c) {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        // replace to blank page
        alert("已過使用時間");
        window.location.replace("about:blank");
        return;
      }
  
      if (currentLocation.includes("/shows/show.aspx?sh")) {
        // Get all the <strong> elements on the page
        const strongElements = document.getElementsByTagName("strong");
  
        // Iterate over the <strong> elements
        for (let i = 0; i < strongElements.length; i++) {
          const strongElement = strongElements[i];
  
          // Check if the element contains the specific text
          if (
            strongElement.textContent.trim() === "日期:" ||
            strongElement.textContent.trim() === "Date:"
          ) {
            // Update the styles of the element
            strongElement.style.fontSize = "24px";
            strongElement.style.color = "red";
            strongElement.style.fontWeight = "bold";
  
            // Update the content of the element
            strongElement.innerHTML =
              "<strong><span style='font-size: 24px; color: red; font-weight: bold;'>快啲揀日期(如需要)!!!!!</span></strong>";
  
            break; // Stop iterating once the element is found and modified
          }
        }
      }
  
      if (currentLocation.includes("secure/viewbasket.aspx")) {
        waitForElm("#ctl00_uiContent_uiVerifyPurchase_uiAgree").then(
          (element) => {
            document
              .getElementById("ctl00_uiContent_uiVerifyPurchase_uiAgree")
              .click();
          }
        );
      }
  
      waitForElm(".detailModuleCopy").then((elm) => {
        console.log("shown");
        main();
      });
  
      console.log("end: " + end); // check obfuscated code
      var showend = document.createElement("font");
      showend.setAttribute("class", "selected");
      showend.setAttribute("size", "5");
      showend.innerHTML = "Bot過期時間: " + end;
  
      var button1 = document.createElement("button");
      button1.setAttribute("class", "redButton");
  
      var link1 = document.createElement("a");
      link1.setAttribute("href", "https://t.me/TechTickHK");
      link1.text = "客服";
      button1.append(link1);
  
      var button2 = document.createElement("button");
      button2.setAttribute("class", "redButton");
  
      var link2 = document.createElement("a");
      link2.setAttribute("href", "https://t.me/techtickbot_channel");
      link2.text = "Channel";
      button2.append(link2);
  
      var container = document.getElementById("headerGrey");
      try {
        container.append(showend);
        container.append(button1);
        container.append("或");
        container.append(button2);
      } catch {}
    }
    // GM_xmlhttpRequest({
    //   method: "GET",
    //   url: "http://worldtimeapi.org/api/timezone/Asia/Hong_Kong",
    //   onload: function (responseDetails) {
    //     const endtime = new Date(end);
    //     const now = new Date(
    //       JSON.parse(responseDetails.responseText)["datetime"]
    //     );
  
    //   },
    // });
  
    function delay(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }
  
    function waitForElm(selector) {
      return new Promise((resolve) => {
        if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
        }
  
        const observer = new MutationObserver((mutations) => {
          if (document.querySelector(selector)) {
            resolve(document.querySelector(selector));
            observer.disconnect();
          }
        });
  
        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
      });
    }
  
    function main() {
      var r = $(
        '<input type="button" class="yellowGradientButton" id="test" value="自動重試揀位"/>'
      );
      $(".ticketSelectionDDLElement").eq(1).append(r);
      $(document).on("click", "#test", start);
    }
  
    var isAutoClicking = false; // Track if the automatic clicking loop is running
  
    async function start() {
      var btn = document.querySelectorAll("[type=submit]")[0];
      var testButton = document.getElementById("test");
  
      if (isAutoClicking) {
        // Stop the automatic clicking loop
        isAutoClicking = false;
        testButton.value = "自動重試揀位";
        testButton.className = "yellowGradientButton"; // Reset the class name
        console.log("停止自動重試揀位");
      } else {
        // Start the automatic clicking loop
        isAutoClicking = true;
        testButton.value = "停止自動重試揀位";
        testButton.className = "redButton"; // Set the class name to "redButton"
        console.log("開始自動揀位");
  
        while (isAutoClicking) {
          btn.click();
          console.log("揀位中");
          await delay(500);
        }
  
        // Change button text to "停止中..." for 2 seconds
        testButton.value = "停止中...";
        await delay(1500);
        testButton.value = "自動重試揀位";
      }
  
      console.log(isAutoClicking);
    }
  
    validtion();
  })();
  