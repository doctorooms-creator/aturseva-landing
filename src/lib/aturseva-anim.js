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
 *
 * Lifecycle (File 11 Batch 3):
 *   - B12: all media-preference evaluation (reduced-motion, Connection
 *     breakpoint) lives inside ONE gsap.matchMedia() context, so changes
 *     while the page is mounted re-evaluate modes live — no reload needed.
 *   - B13: initAtursevaAnimations() RETURNS a dispose() that kills every
 *     ScrollTrigger, reverts every media context, removes listeners and
 *     resets the boot guard, so unmount is clean and re-mount boots once.
 *     The single-init guard `window.__atursevaAnimBooted` is preserved.
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
    var prevDefaults = gsap.defaults();
    gsap.defaults({ ease: "power3.out" });

    var reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    var mobileMQ = window.matchMedia("(max-width: 767px)");
    var disposed = false;

    /* ───────────────────────── nav state ───────────────────────── */
    /* Handler hoisted to init scope so dispose() can remove it (B13). */
    var nav = document.getElementById("site-nav");
    var onScroll = function () {
      if (!nav) return;
      nav.classList.toggle("nav-scrolled", window.scrollY > 48);
    };
    if (nav) {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    /* ───────────── overlay alignment (viewBox → pixels) ───────────── */
    function positionOverlay() {
      if (disposed) return;
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
        /* Remember the markup's own path so leaving reduced-motion can
           restore it before the animated builders re-prep everything. */
        if (!l.__atursevaOrigD) l.__atursevaOrigD = l.getAttribute("d");
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

    /* B12 — mirror of setConnectionStatic: removes the inline styles and
       restores the markup's own lane paths, so the transition back to an
       animated mode starts from the pristine DOM state. */
    function clearConnectionStatic() {
      var t = connTargets();
      t.lanes.forEach(function (l) {
        if (!l) return;
        if (l.__atursevaOrigD) l.setAttribute("d", l.__atursevaOrigD);
        l.style.strokeDasharray = "";
        l.style.strokeDashoffset = "";
      });
      if (t.unified) {
        t.unified.style.strokeDasharray = "";
        t.unified.style.strokeDashoffset = "";
        t.unified.style.opacity = "";
      }
      ["#dot-booking", "#dot-doctor", "#dot-hospital", "#dot-sevika"].forEach(
        function (id) {
          var el = document.querySelector(id);
          if (el) el.style.opacity = "";
        }
      );
      t.caps.forEach(function (c) {
        c.style.opacity = "";
      });
    }

    /* ───────────────────────── hero intro ───────────────────────── */
    function buildHero() {
      var fades = gsap.utils.toArray("[data-hero-fade]");
      if (!fades.length) return; /* legacy hero absent (hero v2 active) */
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
    var overlayTimer = setTimeout(function () {
      if (!disposed) positionOverlay();
    }, 350);
    window.addEventListener("resize", positionOverlay);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        if (disposed) return;
        positionOverlay();
        ScrollTrigger.refresh();
      });
    }

    /* ─────────────── HERO v2 — "Aturseva ka din" (Files 18/20) ───────────────
       Phase 0/1 primitives: entrance choreography (M-E-01…06), chat replay,
       suggestion chips with canned product-true replies (I-T-01), the orb
       state machine (O-01…05), the cursor layer (I-C-03/04/05) and the
       hero parallax (M-P-01). Markup ships in its final state — this engine
       only enhances, so crawlers / no-JS / reduced-motion see everything. */

    var ORB_STATE_CLASSES = ["orb--idle", "orb--listening", "orb--speaking", "orb--alert", "orb--night"];
    var hero2Listeners = [];

    function on2(el, type, fn, opts) {
      el.addEventListener(type, fn, opts);
      hero2Listeners.push({ el: el, type: type, fn: fn, opts: opts });
    }

    function setOrb(orb, state) {
      if (!orb) return;
      ORB_STATE_CLASSES.forEach(function (c) { orb.classList.remove(c); });
      orb.classList.add("orb--" + state);
    }

    function orbAlert(orb, tilt) {
      if (!orb || !tilt) return;
      setOrb(orb, "alert");
      gsap
        .timeline()
        .to(tilt, { y: -24, duration: 0.28, ease: "back.out(2)" })
        .to(tilt, { y: 0, scaleY: 0.92, duration: 0.2, ease: "power1.in" })
        .to(tilt, { scaleY: 1, duration: 0.2, ease: "power1.out" });
      setTimeout(function () {
        if (disposed) return;
        if (orb.classList.contains("orb--alert")) setOrb(orb, "idle");
      }, 1000);
    }

    /* Split a bot paragraph into word spans for the stagger reveal. */
    function splitWords(p) {
      if (!p || p.getAttribute("data-split") === "1") return [];
      var words = (p.textContent || "").split(/\s+/).filter(Boolean);
      p.innerHTML = words
        .map(function (w) { return '<span class="h2b-w">' + w + "</span>"; })
        .join(" ");
      p.setAttribute("data-split", "1");
      return Array.prototype.slice.call(p.querySelectorAll(".h2b-w"));
    }

    function appendBubble(thread, kind, text) {
      var el = document.createElement("div");
      el.className = "h2b h2b--" + kind + " h2b-extra";
      if (kind === "bot") {
        var av = document.createElement("span");
        av.className = "h2b-avatar";
        av.setAttribute("aria-hidden", "true");
        var pEl = document.createElement("p");
        pEl.textContent = text;
        el.appendChild(av);
        el.appendChild(pEl);
      } else {
        var pU = document.createElement("p");
        pU.textContent = text;
        el.appendChild(pU);
      }
      thread.appendChild(el);
      return el;
    }

    function trimExtras(thread) {
      var extras = thread.querySelectorAll(".h2b-extra");
      while (extras.length > 4) {
        thread.removeChild(extras[0]);
        extras = thread.querySelectorAll(".h2b-extra");
      }
    }

    function scrollThread(thread) {
      thread.scrollTo({
        top: thread.scrollHeight,
        behavior: reduceMQ.matches ? "auto" : "smooth",
      });
    }

    /* Chip taps — interaction, so these are attached OUTSIDE the media
       context: they work under reduced-motion too (instant replies). */
    function wireHero2Chips() {
      var orb = document.querySelector("[data-orb]");
      var thread = document.querySelector("[data-hero2-thread]");
      var chips = document.querySelectorAll(".hero2-chip");
      if (!thread || !chips.length) return;

      chips.forEach(function (chip) {
        on2(chip, "click", function () {
          if (chip.disabled) return;
          chip.disabled = true;
          setTimeout(function () { chip.disabled = false; }, 2600);

          var reply = chip.getAttribute("data-chip-reply") || "";
          var label = (chip.textContent || "").trim();
          trimExtras(thread);

          var userB = appendBubble(thread, "user", label);
          var typingEl = thread.querySelector("[data-h2b-typing]");
          var botB = appendBubble(thread, "bot", reply);

          if (reduceMQ.matches) {
            /* Instant, no animation — content only (B12 parity). */
            typingEl.classList.remove("is-typing");
            scrollThread(thread);
            return;
          }

          var words = splitWords(botB.querySelector("p"));
          gsap.set([userB, botB], { autoAlpha: 0, y: 12 });
          gsap.set(words, { autoAlpha: 0, y: 6 });
          if (typingEl) typingEl.classList.add("is-typing");
          if (orb) setOrb(orb, "speaking");
          scrollThread(thread);

          gsap
            .timeline()
            .to(userB, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, 0.05)
            .call(function () {
              if (typingEl) typingEl.classList.remove("is-typing");
            }, null, 0.85)
            .to(botB, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, 0.95)
            .to(words, { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.04 }, 1.05)
            .call(function () { orbAlert(orb, orb && orb.querySelector("[data-orb-tilt]")); }, null, 1.9)
            .call(function () {
              if (orb && orb.classList.contains("orb--alert")) setOrb(orb, "idle");
            }, null, 3.2);
        });
      });
    }

    function buildHeroV2() {
      var section = document.querySelector("[data-hero2]");
      if (!section) return;

      var orb = section.querySelector("[data-orb]");
      var tilt = section.querySelector("[data-orb-tilt]");
      var spot = section.querySelector("[data-hero2-spot]");
      var dotsZone = section.querySelector(".hero2-dots-zone");
      var thread = section.querySelector("[data-hero2-thread]");
      var typingEl = thread ? thread.querySelector("[data-h2b-typing]") : null;
      var botBubble = thread ? thread.querySelector("[data-h2b-bot]") : null;
      var userBubble = thread ? thread.querySelector("[data-h2b-user]") : null;
      var replayBtn = section.querySelector("[data-hero2-replay]");
      var leftStack = section.querySelector("[data-hero2-left]");
      var rightCluster = section.querySelector("[data-hero2-right]");

      var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

      /* ── Entrance choreography (M-E-01…06, ≤2.2s total) ── */
      var fades = gsap.utils.toArray("[data-hero2-fade]", section);
      var h1lines = gsap.utils.toArray("[data-hero2-h1line]", section);
      var chips = gsap.utils.toArray(".hero2-chip", section);
      var dots = section.querySelector(".hero2-dots");

      if (typingEl) typingEl.classList.remove("is-typing");

      gsap.set(fades, { autoAlpha: 0, y: 24 });
      gsap.set(h1lines, { autoAlpha: 0, y: 24 });
      gsap.set(chips, { scale: 0.8, autoAlpha: 0 });
      if (orb) gsap.set(orb, { scale: 0.6, autoAlpha: 0 });

      var tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      if (dots) tl.fromTo(dots, { autoAlpha: 0 }, { autoAlpha: 0.4, duration: 0.5 }, 0);
      tl.to(h1lines, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12 }, 0.15);
      tl.to(fades, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 }, 0.45);
      if (orb) tl.to(orb, { scale: 1, autoAlpha: 1, duration: 0.7, ease: "back.out(1.4)" }, 0.55);
      tl.to(chips, { scale: 1, autoAlpha: 1, duration: 0.4, ease: "back.out(2)", stagger: 0.08 }, 1.15);

      /* ── Chat replay (M-E-05): re-plays the completed conversation ── */
      function playReplay() {
        if (disposed || !thread || !userBubble || !botBubble) return;
        if (typingEl) typingEl.classList.remove("is-typing");
        var words = splitWords(botBubble.querySelector("[data-h2b-bottext]") || botBubble.querySelector("p"));
        gsap.set([userBubble, botBubble], { autoAlpha: 0, y: 14 });
        if (words.length) gsap.set(words, { autoAlpha: 0, y: 6 });
        trimExtras(thread);

        var tl2 = gsap
          .timeline()
          .to(userBubble, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.1)
          .call(function () {
            if (typingEl) typingEl.classList.add("is-typing");
            if (orb) setOrb(orb, "speaking");
          }, null, 0.75)
          .call(function () {
            if (typingEl) typingEl.classList.remove("is-typing");
          }, null, 1.7)
          .to(botBubble, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, 1.75);
        if (words.length) {
          tl2.to(words, { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.045 }, 1.85);
        }
        tl2
          .call(function () { orbAlert(orb, tilt); }, null, 2.7)
          .call(function () {
            if (orb && orb.classList.contains("orb--alert")) setOrb(orb, "idle");
          }, null, 4.0);
      }
      /* First replay starts just after the entrance settles. */
      setTimeout(playReplay, 1700);
      if (replayBtn) {
        on2(replayBtn, "click", function () {
          if (reduceMQ.matches) return; /* already complete in markup */
          playReplay();
        });
      }

      /* ── Cursor layer (desktop only; touch never ships dead zones) ── */
      if (finePointer.matches) {
        /* I-C-03 spotlight — CSS vars drive the mask; rAF-throttled.
           The zone itself is pointer-events:none, so the hover state is
           toggled here from the section's own enter/leave. */
        if (dotsZone && spot) {
          on2(section, "pointerenter", function () {
            if (!disposed) dotsZone.classList.add("is-hover");
          });
          on2(section, "pointerleave", function () {
            if (!disposed) dotsZone.classList.remove("is-hover");
          });
          var spotTick = false;
          on2(dotsZone.ownerDocument, "pointermove", function (e) {
            if (spotTick || disposed) return;
            spotTick = true;
            requestAnimationFrame(function () {
              spotTick = false;
              var r = dotsZone.getBoundingClientRect();
              if (!r.width) return;
              dotsZone.style.setProperty("--mx", e.clientX - r.left + "px");
              dotsZone.style.setProperty("--my", e.clientY - r.top + "px");
            });
          });
        }

        /* I-C-05 orb listening tilt (max ±8°). */
        if (orb && tilt) {
          var qx = gsap.quickTo(tilt, "rotationX", { duration: 0.6, ease: "power2.out" });
          var qy = gsap.quickTo(tilt, "rotationY", { duration: 0.6, ease: "power2.out" });
          on2(section, "pointermove", function (e) {
            if (disposed) return;
            var r = section.getBoundingClientRect();
            var dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
            var dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
            qy(Math.max(-1, Math.min(1, dx)) * 8);
            qx(Math.max(-1, Math.min(1, -dy)) * 8);
            if (orb.classList.contains("orb--idle")) setOrb(orb, "listening");
          });
          on2(section, "pointerleave", function () {
            if (disposed) return;
            qx(0);
            qy(0);
            if (orb.classList.contains("orb--listening")) setOrb(orb, "idle");
          });
        }

        /* I-C-04 magnetic CTAs (≤10px drift, spring return). */
        gsap.utils.toArray("[data-magnetic]", section).forEach(function (el) {
          var mx = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
          var my = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
          on2(el, "pointermove", function (e) {
            if (disposed) return;
            var r = el.getBoundingClientRect();
            var dx = e.clientX - (r.left + r.width / 2);
            var dy = e.clientY - (r.top + r.height / 2);
            mx(Math.max(-10, Math.min(10, dx * 0.22)));
            my(Math.max(-10, Math.min(10, dy * 0.22)));
          });
          on2(el, "pointerleave", function () {
            if (disposed) return;
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
          });
        });
      }

      /* ── Parallax scroll-away (M-P-01, transforms only, no CLS) ── */
      if (leftStack && rightCluster) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
            },
          })
          .to(leftStack, { y: "-8%", autoAlpha: 0 }, 0)
          .to(rightCluster, { y: "6%", autoAlpha: 0 }, 0);
        if (orb) {
          gsap.to(orb, {
            scale: 0.85,
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        }
      }
    }

    /* B12+B13 — ONE gsap.matchMedia() owns every conditional builder.
       GSAP re-evaluates the conditions live when the media state changes
       while the page is mounted (reverting the old context and running the
       new one), and mm.revert() gives dispose() complete teardown. */
    var mm = gsap.matchMedia();

    /* Non-connection motion — runs only without reduced motion. When the
       preference flips to reduce, GSAP reverts this context (elements
       return to their stylesheet-visible state); when it flips back, the
       builders re-run. Content is never left hidden. */
    mm.add("(prefers-reduced-motion: no-preference)", function () {
      if (disposed) return;
      buildHero();
      buildHeroV2();
      buildReveals();
      buildJourneyLanes();
      buildProductTilt();
      buildSevika();
    });

    /* HERO v2 chips are interaction, not motion — they stay live in every
       media state (instant replies under reduced-motion, B12 parity). */
    wireHero2Chips();

    /* Connection — fully media-conditioned: static finale under reduced
       motion, pinned scrub on desktop, choreographed auto-play on mobile.
       The three conditions are mutually exclusive, so exactly one mode is
       active in every state, and every mode keeps all content visible. */
    mm.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      },
      function (context) {
        if (disposed) return;
        var c = context.conditions;
        if (c.reduce) {
          setConnectionStatic();
          /* Leaving reduced-motion: restore the markup's own state before
             the animated builders re-prep and re-draw everything. */
          return function () {
            clearConnectionStatic();
          };
        }
        if (c.desktop) buildConnectionPinned();
        if (c.mobile) buildConnectionAuto();
      }
    );

    /* B13 — full teardown for unmount: kill every trigger, revert every
       media context (restoring elements to their pre-animation state),
       remove listeners, restore globals, and reset the boot guard so a
       later mount initialises cleanly exactly once. */
    function dispose() {
      if (disposed) return;
      disposed = true;
      mm.revert();
      ScrollTrigger.getAll().forEach(function (st) {
        st.kill();
      });
      hero2Listeners.forEach(function (L) {
        L.el.removeEventListener(L.type, L.fn, L.opts);
      });
      hero2Listeners.length = 0;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", positionOverlay);
      clearTimeout(overlayTimer);
      gsap.defaults(prevDefaults);
      window.__atursevaAnimBooted = false;
      window.__atursevaAnimDispose = null;
    }

    window.__atursevaAnimDispose = dispose;
    return dispose;
  }

  window.initAtursevaAnimations = initAtursevaAnimations;
})();
