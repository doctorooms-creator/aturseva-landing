/**
 * Aturseva landing animations — vanilla JS + GSAP. No imports.
 *
 * Loaded two ways, always from THIS file so behaviour stays identical:
 *   1. Next.js: side-effect import from AnimationProvider (gsap + ScrollTrigger
 *      are passed in, keeping GSAP out of the initial bundle).
 *   2. Self-contained preview artifact: inlined as a classic <script> after
 *      gsap.min.js + ScrollTrigger.min.js, then booted on DOMContentLoaded.
 *
 * Signature moment: the "Connection" section — three separate lanes draw,
 * converge into the Aturseva hub, and one booking travels through the
 * doctor's and hospital's workflows before Sevika joins the patient.
 */
(function () {
  "use strict";

  var CONVERGED = {
    patient: "M 30,110 C 150,110 220,190 380,300",
    doctor: "M 30,300 C 150,300 220,300 380,300",
    hospital: "M 30,490 C 150,490 220,410 380,300",
  };
  var LANE_KEYS = ["patient", "doctor", "hospital"];

  function initAtursevaAnimations(gsap, ScrollTrigger) {
    if (!gsap || !ScrollTrigger) return;
    if (window.__atursevaAnimBooted) return;
    window.__atursevaAnimBooted = true;

    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: "power3.out" });

    var reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    var mobileMQ = window.matchMedia("(max-width: 767px)");

    /* ───────────────────────── nav state ───────────────────────── */
    var nav = document.getElementById("site-nav");
    if (nav) {
      var onScroll = function () {
        nav.classList.toggle("nav-scrolled", window.scrollY > 48);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    /* ───────────── overlay alignment (viewBox → pixels) ───────────── */
    function positionOverlay() {
      var svg = document.getElementById("conn-svg");
      if (!svg) return;
      var r = svg.getBoundingClientRect();
      if (!r.width || !r.height) return;
      var sx = Math.min(r.width / 1200, r.height / 600);
      var ox = (r.width - 1200 * sx) / 2;
      var oy = (r.height - 600 * sx) / 2;
      function place(el) {
        var x = parseFloat(el.getAttribute("data-vx"));
        var y = parseFloat(el.getAttribute("data-vy"));
        if (isNaN(x) || isNaN(y)) return;
        el.style.left = Math.round(ox + x * sx) + "px";
        el.style.top = Math.round(oy + y * sx) + "px";
      }
      var overlay = document.getElementById("conn-overlay");
      if (overlay) overlay.querySelectorAll("[data-vx]").forEach(place);
      var cardsBox = document.getElementById("conn-cards");
      if (!cardsBox) return;
      var cards = cardsBox.querySelectorAll(".conn-card");
      if (mobileMQ.matches) {
        cards.forEach(function (el) {
          el.style.left = "";
          el.style.top = "";
        });
      } else {
        cards.forEach(place);
      }
    }

    /* ───────────────── shared connection state ───────────────── */
    function connTargets() {
      return {
        lanes: LANE_KEYS.map(function (k) {
          return document.getElementById("lane-" + k);
        }),
        unified: document.getElementById("lane-unified"),
        caps: gsap.utils.toArray(".conn-caption"),
      };
    }

    function prepConnState(t) {
      t.lanes.forEach(function (l) {
        if (!l) return;
        var len = l.getTotalLength();
        gsap.set(l, {
          strokeDasharray: len + " " + len,
          strokeDashoffset: len,
        });
      });
      if (t.unified) {
        var uLen = t.unified.getTotalLength();
        gsap.set(t.unified, {
          strokeDasharray: uLen + " " + uLen,
          strokeDashoffset: uLen,
          autoAlpha: 0,
        });
      }
      gsap.set(["#comet-p", "#comet-d", "#comet-h"], { autoAlpha: 1 });
      gsap.set(".conn-hub-inner", { autoAlpha: 0, scale: 0.5 });
      gsap.set(".conn-card-inner", { autoAlpha: 0, y: 18, scale: 0.94 });
      gsap.set(
        ["#dot-booking", "#dot-doctor", "#dot-hospital", "#dot-sevika"],
        { autoAlpha: 0, scale: 0.4, transformOrigin: "50% 50%" }
      );
      if (t.caps.length > 1) {
        gsap.set(t.caps.slice(1), { autoAlpha: 0, y: 16 });
      }
    }

    /* ─────────── Connection: desktop pinned scrub (signature) ─────────── */
    function buildConnectionPinned() {
      var t = connTargets();
      if (!t.lanes[0] || !t.unified || !t.caps.length) return;
      prepConnState(t);

      var tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: "#connection",
          start: "top top",
          end: "+=260%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onRefresh: positionOverlay,
        },
      });

      /* Phase A — three journeys draw apart */
      function laneDraw(laneEl, cometId, at) {
        tl.to(
          laneEl,
          {
            strokeDashoffset: 0,
            duration: 10,
            onUpdate: function () {
              var comet = document.getElementById(cometId);
              if (!comet || !laneEl) return;
              var len = laneEl.getTotalLength();
              var pt = laneEl.getPointAtLength(len * this.progress());
              comet.setAttribute(
                "transform",
                "translate(" + pt.x + "," + pt.y + ")"
              );
            },
          },
          at
        );
      }
      laneDraw(t.lanes[0], "comet-p", 0);
      laneDraw(t.lanes[1], "comet-d", 0.6);
      laneDraw(t.lanes[2], "comet-h", 1.2);
      tl.fromTo(
        ".conn-label",
        { autoAlpha: 0, x: -14 },
        { autoAlpha: 1, x: 0, duration: 4, stagger: 1, ease: "power2.out" },
        1
      );

      /* Phase B — converge into the Aturseva hub */
      tl.to(["#comet-p", "#comet-d", "#comet-h"], { autoAlpha: 0, duration: 3 }, 12);
      t.lanes.forEach(function (l, i) {
        if (!l) return;
        tl.to(l, { attr: { d: CONVERGED[LANE_KEYS[i]] }, duration: 10 }, 13);
      });
      tl.fromTo(
        ".conn-hub-inner",
        { autoAlpha: 0, scale: 0.5 },
        { autoAlpha: 1, scale: 1, duration: 5, ease: "back.out(2)" },
        19
      );

      /* Phase C — one unified flow */
      tl.set(t.unified, { autoAlpha: 1 }, 22);
      tl.to(t.unified, { strokeDashoffset: 0, duration: 20 }, 22);

      /* Phase D — the booking travels */
      function pop(sel, at) {
        tl.fromTo(
          sel,
          { autoAlpha: 0, y: 16, scale: 0.92 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 5, ease: "back.out(1.7)" },
          at
        );
      }
      tl.fromTo("#dot-booking", { autoAlpha: 0 }, { autoAlpha: 1, duration: 2 }, 33);
      pop("#card-booking .conn-card-inner", 34);
      tl.fromTo("#dot-doctor", { autoAlpha: 0 }, { autoAlpha: 1, duration: 2 }, 41);
      pop("#card-doctor .conn-card-inner", 42);
      tl.fromTo("#dot-hospital", { autoAlpha: 0 }, { autoAlpha: 1, duration: 2 }, 49);
      pop("#card-hospital .conn-card-inner", 50);
      var counter = document.getElementById("token-counter");
      if (counter) {
        tl.fromTo(
          counter,
          { innerText: 0 },
          { innerText: 42, duration: 6, snap: { innerText: 1 }, ease: "power1.inOut" },
          50
        );
      }

      /* Phase E — Sevika joins the patient */
      tl.fromTo("#dot-sevika", { autoAlpha: 0 }, { autoAlpha: 1, duration: 2 }, 61);
      pop("#sevika-bubble-1 .conn-card-inner", 62);
      pop("#sevika-bubble-2 .conn-card-inner", 68);

      /* captions crossfade */
      tl.to(t.caps[0], { autoAlpha: 0, y: -14, duration: 3 }, 13);
      tl.to(t.caps[1], { autoAlpha: 1, y: 0, duration: 4 }, 15);
      tl.to(t.caps[1], { autoAlpha: 0, y: -14, duration: 3 }, 36);
      tl.to(t.caps[2], { autoAlpha: 1, y: 0, duration: 4 }, 40);
      tl.to(t.caps[2], { autoAlpha: 0, y: -14, duration: 3 }, 57);
      tl.to(t.caps[3], { autoAlpha: 1, y: 0, duration: 4 }, 61);
    }

    /* ─────────── Connection: mobile choreographed auto-play ─────────── */
    function buildConnectionAuto() {
      var t = connTargets();
      if (!t.lanes[0] || !t.unified || !t.caps.length) return;
      prepConnState(t);

      var tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: "#connection",
          start: "top 72%",
          once: true,
        },
      });

      t.lanes.forEach(function (l, i) {
        if (!l) return;
        tl.to(l, { strokeDashoffset: 0, duration: 0.9 }, i * 0.18);
      });
      tl.to(["#comet-p", "#comet-d", "#comet-h"], { autoAlpha: 0, duration: 0.3 }, 1.1);
      t.lanes.forEach(function (l, i) {
        if (!l) return;
        tl.to(l, { attr: { d: CONVERGED[LANE_KEYS[i]] }, duration: 0.9 }, 1.2);
      });
      tl.fromTo(
        ".conn-hub-inner",
        { autoAlpha: 0, scale: 0.5 },
        { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2)" },
        2.1
      );
      tl.set(t.unified, { autoAlpha: 1 }, 2.3);
      tl.to(t.unified, { strokeDashoffset: 0, duration: 1.3 }, 2.3);

      function pop(sel, at) {
        tl.fromTo(
          sel,
          { autoAlpha: 0, y: 14, scale: 0.92 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.7)" },
          at
        );
      }
      tl.set(["#dot-booking", "#dot-doctor", "#dot-hospital", "#dot-sevika"], { autoAlpha: 1 }, 2.6);
      pop("#card-booking .conn-card-inner", 2.7);
      pop("#card-doctor .conn-card-inner", 3.15);
      pop("#card-hospital .conn-card-inner", 3.6);
      pop("#sevika-bubble-1 .conn-card-inner", 4.05);
      pop("#sevika-bubble-2 .conn-card-inner", 4.35);
      var counter = document.getElementById("token-counter");
      if (counter) {
        tl.fromTo(
          counter,
          { innerText: 0 },
          { innerText: 42, duration: 0.7, snap: { innerText: 1 } },
          3.6
        );
      }

      tl.to(t.caps[0], { autoAlpha: 0, y: -10, duration: 0.35 }, 1.2);
      tl.to(t.caps[1], { autoAlpha: 1, y: 0, duration: 0.4 }, 1.55);
      tl.to(t.caps[1], { autoAlpha: 0, y: -10, duration: 0.35 }, 2.6);
      tl.to(t.caps[2], { autoAlpha: 1, y: 0, duration: 0.4 }, 2.95);
      tl.to(t.caps[2], { autoAlpha: 0, y: -10, duration: 0.35 }, 4.0);
      tl.to(t.caps[3], { autoAlpha: 1, y: 0, duration: 0.4 }, 4.35);
    }

    /* ─────────── Connection: reduced-motion static finale ─────────── */
    function setConnectionStatic() {
      var t = connTargets();
      t.lanes.forEach(function (l, i) {
        if (!l) return;
        l.setAttribute("d", CONVERGED[LANE_KEYS[i]]);
        l.style.strokeDasharray = "none";
        l.style.strokeDashoffset = "0";
      });
      if (t.unified) {
        t.unified.style.strokeDasharray = "none";
        t.unified.style.strokeDashoffset = "0";
        t.unified.style.opacity = "1";
      }
      ["#dot-booking", "#dot-doctor", "#dot-hospital", "#dot-sevika"].forEach(
        function (id) {
          var el = document.querySelector(id);
          if (el) el.style.opacity = "1";
        }
      );
      t.caps.forEach(function (c, i) {
        if (i < t.caps.length - 1) c.style.opacity = "0";
      });
      positionOverlay();
    }

    /* ───────────────────────── hero intro ───────────────────────── */
    function buildHero() {
      var fades = gsap.utils.toArray("[data-hero-fade]");
      var journey = document.getElementById("hero-journey");
      gsap.set(fades, { autoAlpha: 0, y: 26 });
      var tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(fades, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.09 }, 0.15);
      if (journey) {
        var len = journey.getTotalLength();
        gsap.set(journey, {
          strokeDasharray: len + " " + len,
          strokeDashoffset: len,
        });
        tl.to(journey, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 0.55);
        tl.fromTo(
          ".hero-milestone",
          { autoAlpha: 0, scale: 0.4, transformOrigin: "50% 50%" },
          { autoAlpha: 1, scale: 1, duration: 0.45, stagger: 0.16, ease: "back.out(2.2)" },
          1.2
        );
      }
    }

    /* ───────────────────── generic reveals ───────────────────── */
    function buildReveals() {
      gsap.utils.toArray("[data-reveal]").forEach(function (el) {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });
    }

    /* ─────────────────── broken journey lanes ─────────────────── */
    function buildJourneyLanes() {
      gsap.utils.toArray(".journey-lane").forEach(function (path) {
        var len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len + " " + len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.1,
          ease: "power2.inOut",
          scrollTrigger: { trigger: path, start: "top 92%", once: true },
        });
      });
    }

    /* ─────────────────── product window tilt ─────────────────── */
    function buildProductTilt() {
      var win = document.querySelector(".ui-window");
      if (!win) return;
      gsap.set(win, { transformPerspective: 1200 });
      gsap.fromTo(
        win,
        { rotateX: 10, y: 44, scale: 0.96, autoAlpha: 0 },
        {
          rotateX: 0,
          y: 0,
          scale: 1,
          autoAlpha: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: win, start: "top 90%", end: "top 42%", scrub: 1 },
        }
      );
    }

    /* ─────────────────── Sevika message thread ─────────────────── */
    function buildSevika() {
      var line = document.querySelector(".sevika-line");
      var thread = document.querySelector(".sevika-thread");
      if (line && thread) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: thread,
              start: "top 78%",
              end: "bottom 55%",
              scrub: 1,
            },
          }
        );
      }
      if (thread) {
        gsap.utils.toArray(".sevika-msg").forEach(function (el, i) {
          gsap.fromTo(
            el,
            { autoAlpha: 0, x: 36, scale: 0.97 },
            {
              autoAlpha: 1,
              x: 0,
              scale: 1,
              duration: 0.6,
              delay: i * 0.14,
              ease: "power3.out",
              scrollTrigger: { trigger: thread, start: "top 74%", once: true },
            }
          );
        });
      }
    }

    /* ───────────────────────── boot ───────────────────────── */
    positionOverlay();
    setTimeout(positionOverlay, 350);
    window.addEventListener("resize", positionOverlay);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        positionOverlay();
        ScrollTrigger.refresh();
      });
    }

    if (reduceMQ.matches) {
      setConnectionStatic();
      return; /* everything else stays visible & static */
    }

    buildHero();
    buildReveals();
    buildJourneyLanes();
    buildProductTilt();
    buildSevika();

    var mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", buildConnectionPinned);
    mm.add("(max-width: 767px)", buildConnectionAuto);
  }

  window.initAtursevaAnimations = initAtursevaAnimations;
})();
