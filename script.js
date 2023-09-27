function init() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ("#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
init();
var crsr = document.querySelector(".cursor");
document.addEventListener("mousemove", (dets) => {
  crsr.style.left = dets.x + 20 + "px";
  crsr.style.top = dets.y - 20 + "px";
});
gsap.from("#page1 h1,#page1 h2", {
  y: 10,
  rotate: 10,
  opacity: 0,
  delay: 0.3,
  duration: 0.7,
});
var t1 = gsap.timeline({
  scrollTrigger: {
    trigger: "#page1 h1",
    scroller: "#main",
    // markers:true,
    start: "top 27%",
    end: "top 0",
    scrub: 0,
  },
});
t1.to(
  "#page1 h1",
  {
    x: -100,
  },
  "anim"
);
t1.to(
  "#page1 h2",
  {
    x: 100,
  },
  "anim"
);
t1.to(
  "#page1 video",
  {
    width: "94%",
  },
  "anim"
);
// Page2

var t2 = gsap.timeline({
  scrollTrigger: {
    trigger: "#page1 h1",
    scroller: "#main",

    start: "top -120%",
    end: "top -130%",
    scrub: 2,
  },
});
t2.to("#main", {
  backgroundColor: "#fff",
});

var t3 = gsap.timeline({
  scrollTrigger: {
    trigger: "#page1 h1",
    scroller: "#main",
    start: "top -280%",
    end: "top -300%",
    scrub: 2,
  },
});
t3.to("#main", {
  backgroundColor: "#000",
});
var boxes = document.querySelectorAll(".box");
boxes.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    var add = element.getAttribute("data-image");
    crsr.style.height = "300px";
    crsr.style.width = "450px";
    crsr.style.borderRadius = "0";
    crsr.style.backgroundImage = `url("${add}")`;
  });
  element.addEventListener("mouseleave", () => {
    var add = element.getAttribute("data-image");
    crsr.style.height = "20px";
    crsr.style.width = "20px";
    crsr.style.borderRadius = "50%";
    crsr.style.backgroundImage = "none";
  });
});
var discover = document.querySelector(".discover");
discover.addEventListener("mouseenter", () => {
  crsr.style.transform = "scale(6)";
});
discover.addEventListener("mouseleave", () => {
  crsr.style.transform = "scale(1)";
});
// var nav = document.querySelectorAll("#nav h4");
// var marque = document.querySelector("#marque");
// nav.forEach((elem) => {
//   elem.addEventListener("mouseenter", () => {
//     console.log("enter");
//     marque.style.display = "block";
//     marque.style.opacity = "1";
//   });
//   elem.addEventListener("mouseleave", () => {
//     console.log("leave");
//     marque.style.display = "none";
//     marque.style.opacity = "0";
//   });
// });
