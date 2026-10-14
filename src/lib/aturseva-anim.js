/**
 * Aturseva landing animations — vanilla JS + GSAP. No imports.
 *
 * Loaded two ways, always from THIS file so behaviour stays identical:
 *   1. Next.js: side-effect import from AnimationProvider (gsap + ScrollTrigger
 *      are passed in, keeping GSAP out of the initial bundle).
 *   2. Self-contained preview artifact: inlined as a classic <script> after
 *      gsap.min.js + ScrollTrigger.min.js, then booted on DOMContentLoaded.
 *
 * Signature moments: the "Connection" section — three separate lanes draw,
 * converge into the Aturseva hub, and one booking travels through the
 * doctor's and hospital's workflows — and (Phase 3, File 21 §4) the BAARI
 * pinned queue countdown: the panel pins, the token scrubs #12 → #8 → #3,
 * and at 100% the alert moment fires ("Baari! Ab niklo.") — and (Phase 4,
 * File 21 §5–§8) the day's close: beat 5's dusk scrub with the sun arc
 * and the orb's night onset, beat 6's slow boundary line and doctor-ring
 * mirror, and the 01/06…06/06 rail that remembers beat 4's token.
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
    var b3TypingTimer = null; /* beat-3 typing→stamp delay (cleared on dispose) */

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

    var ORB_STATE_CLASSES = ["orb--idle", "orb--listening", "orb--speaking", "orb--alert", "orb--night", "orb--scanning"];
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

    /* The day rail's QUEUE LIVE mini-token mirrors beat 4's live state
       (File 21 §8 — "the page remembering its own story"). Markup ships
       the final state; beat 4's segment machine re-syncs it live. */
    function updateRailToken(text) {
      var els = document.querySelectorAll("[data-rail-token]");
      Array.prototype.forEach.call(els, function (el) {
        if (el.textContent !== text) el.textContent = text;
      });
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
       context: they work under reduced-motion too (instant replies).
       Scoped to the hero2 section so the beat-section orbs are never
       driven by hero chips (multiple [data-orb] now live on the page). */
    function wireHero2Chips() {
      var root = document.querySelector("[data-hero2]");
      var orb = root ? root.querySelector("[data-orb]") : null;
      var thread = root ? root.querySelector("[data-hero2-thread]") : null;
      var chips = root ? root.querySelectorAll(".hero2-chip") : [];
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

    /* ─────────────── BEATS 1–2 — "Aturseva ka din" (File 21 §1–§2) ───────────────
       Phase 2: Beat 1 SUBAH (dose timeline + reminder bubble + adherence
       flips) and Beat 2 Rx PHOTO (photo drop → orb scan → DRAFT rows →
       confirm rail). Markup ships each beat's FINAL state — these builders
       replay it, so crawlers / no-JS / reduced-motion see the complete beat. */

    /* Split a beat headline's [data-line] spans into masked words for the
       mask-reveal (File 21 §global entrance grammar). Idempotent. */
    function splitBeatH2(h2) {
      if (!h2 || h2.getAttribute("data-split") === "1") return [];
      var out = [];
      Array.prototype.forEach.call(h2.querySelectorAll("[data-line]"), function (line) {
        if (line.children.length) return;
        var words = (line.textContent || "").split(/\s+/).filter(Boolean);
        if (!words.length) return;
        line.innerHTML = words
          .map(function (w) {
            return '<span class="beat-w"><span class="beat-wi">' + w + "</span></span>";
          })
          .join(" ");
        out.push.apply(out, Array.prototype.slice.call(line.querySelectorAll(".beat-wi")));
      });
      h2.setAttribute("data-split", "1");
      return out;
    }

    /* Shared section-entrance grammar (File 21 §global): kicker fade (0.3s)
       → headline mask-reveal → body fade-up (0.6s). once: true. */
    function beatEntrance(section) {
      var kicker = section.querySelector(".beat-kicker");
      var h2words = splitBeatH2(section.querySelector(".beat-h2"));
      var fades = gsap.utils.toArray("[data-beat-fade]", section);

      if (kicker) gsap.set(kicker, { autoAlpha: 0, y: 10 });
      if (h2words.length) gsap.set(h2words, { yPercent: 112 });
      if (fades.length) gsap.set(fades, { autoAlpha: 0, y: 22 });

      var tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
      });
      if (kicker) tl.to(kicker, { autoAlpha: 1, y: 0, duration: 0.3 }, 0);
      if (h2words.length)
        tl.to(h2words, { yPercent: 0, duration: 0.55, stagger: 0.05, ease: "power3.out" }, 0.12);
      if (fades.length) tl.to(fades, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 }, 0.3);
      return tl;
    }

    /* A beat's cameo orb lives inside its hook wrapper ([data-b1-orb] etc.). */
    function cameoOrb(section, hook) {
      var wrap = section.querySelector("[" + hook + "]");
      return wrap ? wrap.querySelector("[data-orb]") : null;
    }

    function buildBeat1() {
      var section = document.querySelector("[data-beat1]");
      if (!section) return;
      beatEntrance(section);

      var card = section.querySelector("[data-b1-card]");
      var rows = gsap.utils.toArray("[data-b1-row]", section);
      var bubble = section.querySelector("[data-b1-bubble]");
      var chips = gsap.utils.toArray("[data-b1-flip]", section);
      var orb = cameoOrb(section, "data-b1-orb");

      /* M-E-11 — dose rows slide in from the left (stagger 0.15s), then
         the adherence chips settle in. */
      if (card) {
        gsap.set(rows, { autoAlpha: 0, x: -28 });
        gsap.set(chips, { autoAlpha: 0, y: 10 });
        gsap
          .timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: { trigger: card, start: "top 80%", once: true },
          })
          .to(rows, { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.15 }, 0.1)
          .to(chips, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.06 }, 0.45);
      }

      /* M-L-10 — the reminder bubble pops when the 9:00 row reaches the
         centre of the viewport; O-10 — the orb cameo ripples along. */
      if (bubble) {
        gsap.set(bubble, { autoAlpha: 0, scale: 0.8, transformOrigin: "20% 90%" });
        ScrollTrigger.create({
          trigger: rows[0] || card,
          start: "top 62%",
          once: true,
          onEnter: function () {
            gsap.to(bubble, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" });
            if (orb) {
              setOrb(orb, "speaking");
              setTimeout(function () {
                if (disposed) return;
                if (orb.classList.contains("orb--speaking")) setOrb(orb, "idle");
              }, 1200);
            }
          },
        });
      }
    }

    function buildBeat2() {
      var section = document.querySelector("[data-beat2]");
      if (!section) return;
      beatEntrance(section);

      var photoWrap = section.querySelector("[data-b2-photo-wrap]");
      var photo = section.querySelector("[data-b2-photo]");
      var rows = gsap.utils.toArray("[data-b2-row]", section);
      var rail = section.querySelector("[data-b2-rail]");
      var finalLine = section.querySelector("[data-b2-final]");
      var orb = cameoOrb(section, "data-b2-orb");
      var cursorLabel = section.querySelector("[data-b2-cursor]");

      /* Replay reset: markup ships the final (all-confirmed) state — motion
         users watch the beat build itself, then confirm for real. */
      rows.forEach(function (r) { r.classList.remove("is-confirmed"); });
      section.querySelectorAll("[data-b2-confirm]").forEach(function (b) {
        b.setAttribute("aria-pressed", "false");
      });

      if (photo) gsap.set(photo, { y: -40, rotation: 4, autoAlpha: 0 });
      if (rows.length) gsap.set(rows, { autoAlpha: 0, x: -44 });
      if (rail) gsap.set(rail, { autoAlpha: 0, y: 16 });
      if (finalLine) gsap.set(finalLine, { autoAlpha: 0 });

      if (photoWrap) {
        var seq = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: { trigger: photoWrap, start: "top 78%", once: true },
        });
        /* M-E-20 — photo card drops in from -40px with 4° rotate settle. */
        if (photo)
          seq.to(photo, { y: 0, rotation: 0, autoAlpha: 1, duration: 0.7, ease: "bounce.out" }, 0);
        /* O-20 — the scan-line sweeps the core (2 passes, 1.2s) while the
           rows generate. */
        if (orb) {
          seq.call(
            function () {
              setOrb(orb, "scanning");
              setTimeout(function () {
                if (disposed) return;
                if (orb.classList.contains("orb--scanning")) setOrb(orb, "idle");
              }, 1250);
            },
            null,
            0.8
          );
        }
        /* M-E-21 — DRAFT rows slide out of the photo (stagger 0.18s). */
        if (rows.length)
          seq.to(rows, { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.18 }, 1.0);
        if (rail) seq.to(rail, { autoAlpha: 1, y: 0, duration: 0.5 }, 1.7);
      }

      /* I-C-21 — "Chhoo ke dekho" cursor label follows the mouse over the
         photo zone (desktop only; touch never ships dead zones). Wired once
         per element so media re-entry never stacks duplicate listeners. */
      var finePointer2 = window.matchMedia("(hover: hover) and (pointer: fine)");
      if (finePointer2.matches && cursorLabel && photoWrap &&
          photoWrap.getAttribute("data-cursor-wired") !== "1") {
        photoWrap.setAttribute("data-cursor-wired", "1");
        var lx = gsap.quickTo(cursorLabel, "x", { duration: 0.3, ease: "power3.out" });
        var ly = gsap.quickTo(cursorLabel, "y", { duration: 0.3, ease: "power3.out" });
        on2(photoWrap, "pointerenter", function () {
          if (!disposed) cursorLabel.classList.add("is-on");
        });
        on2(photoWrap, "pointerleave", function () {
          if (!disposed) cursorLabel.classList.remove("is-on");
        });
        on2(photoWrap, "pointermove", function (e) {
          if (disposed) return;
          var r = photoWrap.getBoundingClientRect();
          lx(e.clientX - r.left + 16);
          ly(e.clientY - r.top + 18);
        });
      }
    }

    function buildBeat3() {
      var section = document.querySelector("[data-beat3]");
      if (!section) return;
      beatEntrance(section);

      var card = section.querySelector("[data-b3-card]");
      var doc = section.querySelector("[data-b3-doc]");
      var userB = section.querySelector("[data-b3-user]");
      var botB = section.querySelector("[data-b3-bot]");
      var chips = gsap.utils.toArray("[data-b3-slot]", section);
      var booked = section.querySelector("[data-b3-booked]");
      var typing = section.querySelector("[data-b3-typing]");
      var orb = cameoOrb(section, "data-b3-orb");
      var orbCore = orb ? orb.querySelector("[data-orb-core]") : null;
      var orbLabel = orb ? orb.querySelector(".orb-core-label") : null;

      /* Replay reset — markup ships the booked FINAL state (first chip
         selected, ticket visible, orb showing the booked slot). Motion
         users watch the beat book itself, then booking is genuinely
         theirs to tap (I-T-30 wiring lives in wireBeatInteractions). */
      chips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
      if (booked)
        gsap.set(booked, {
          autoAlpha: 0,
          scale: 0.92,
          rotation: -2,
          transformOrigin: "50% 62%",
        });
      if (typing) typing.classList.remove("is-typing");
      if (orbCore) orbCore.textContent = "3";
      if (orbLabel) orbLabel.textContent = "open slots";

      /* M-E-30 — the entrance: doctor card slides in first, the
         conversation assembles, the slot chips settle (panel itself
         rides the shared beatEntrance fade). */
      if (card) {
        var bubbles = [userB, botB].filter(Boolean);
        if (doc) gsap.set(doc, { autoAlpha: 0, x: -26 });
        if (bubbles.length) gsap.set(bubbles, { autoAlpha: 0, y: 14 });
        if (chips.length) gsap.set(chips, { autoAlpha: 0, scale: 0.8, y: 10 });

        var tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: { trigger: card, start: "top 80%", once: true },
        });
        if (doc) tl.to(doc, { autoAlpha: 1, x: 0, duration: 0.5 }, 0.1);
        if (userB) tl.to(userB, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.4);
        if (botB) tl.to(botB, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.6);
        if (chips.length)
          tl.to(
            chips,
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.35, ease: "back.out(1.8)", stagger: 0.08 },
            0.85
          );
      }
    }

    function buildBeat4() {
      var section = document.querySelector("[data-beat4]");
      if (!section) return;
      beatEntrance(section);

      var strip = section.querySelector("[data-b4-static]");
      var stage = section.querySelector("[data-b4-pin]");
      var panel = section.querySelector("[data-b4-panel]");
      if (!stage || !panel) return;

      var tokenEl = section.querySelector("[data-b4-token]");
      var aheadNum = section.querySelector("[data-b4-aheadnum]");
      var aheadText = section.querySelector("[data-b4-aheadtext]");
      var railFill = section.querySelector("[data-b4-railfill]");
      var bubble = section.querySelector("[data-b4-bubble]");
      var orb = cameoOrb(section, "data-b4-orb");
      var orbCore = orb ? orb.querySelector("[data-orb-core]") : null;
      var dots = gsap.utils.toArray("[data-b4-dot]", section);
      var youDot = section.querySelector("[data-b4-you]");
      var cursorBadge = section.querySelector("[data-b4-cursor]");
      var cursorNum = section.querySelector("[data-b4-cursor-num]");
      var cursorLabel = section.querySelector("[data-b4-cursor-label]");

      /* Two renderings, one markup: the static strip serves RM/no-JS;
         motion users get the pinned stage. Both flips are gsap.set, so a
         live media change reverts them (B12) — exactly one representation
         is ever visible. */
      if (strip) gsap.set(strip, { display: "none" });
      gsap.set(stage, { display: "block" });

      /* Full state reset — also covers re-entry after a live media flip
         (textContent/class changes are not auto-reverted by mm). */
      if (tokenEl) tokenEl.textContent = "#12";
      if (aheadNum) aheadNum.textContent = "12";
      if (aheadText) aheadText.textContent = "log aage hain";
      if (orbCore) orbCore.textContent = "#12";
      if (cursorNum) cursorNum.textContent = "#12";
      if (cursorLabel) cursorLabel.textContent = "aap ka token";
      if (panel) panel.classList.remove("is-alert");
      if (youDot) gsap.set(youDot, { autoAlpha: 0, scale: 0.4 });
      dots.forEach(function (d) { gsap.set(d, { autoAlpha: 1, scale: 1 }); });
      if (bubble)
        gsap.set(bubble, { autoAlpha: 0, scale: 0.7, y: 10, transformOrigin: "12% 90%" });

      /* M-P-40/M-E-42 — the discrete countdown segments (12 / 8 / 3 /
         alert), applied from the scrubbed timeline's own progress so the
         token swaps stay in lockstep with the rail. */
      var SEGS = [
        { token: "#12", ahead: "12", text: "log aage hain", core: "#12", cursor: "#12", dots: 12 },
        { token: "#8", ahead: "8", text: "log aage hain", core: "#8", cursor: "#8", dots: 8 },
        { token: "#3", ahead: "3", text: "log aage hain", core: "#3", cursor: "#3", dots: 3 },
      ];
      var cur = -1;

      function setDots(count) {
        dots.forEach(function (d, i) {
          gsap.to(d, {
            autoAlpha: i < count ? 1 : 0.12,
            scale: i < count ? 1 : 0.7,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      }

      function popToken() {
        if (tokenEl)
          gsap.fromTo(tokenEl, { scale: 1.16 }, { scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
        if (orbCore)
          gsap.fromTo(orbCore, { scale: 1.25 }, { scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
      }

      function applySeg(idx) {
        if (idx === cur) return;
        var was = cur;
        cur = idx;

        if (idx <= 2) {
          var s = SEGS[idx];
          if (tokenEl) tokenEl.textContent = s.token;
          if (aheadNum) aheadNum.textContent = s.ahead;
          if (aheadText) aheadText.textContent = s.text;
          if (orbCore) orbCore.textContent = s.core;
          if (cursorNum) cursorNum.textContent = s.cursor;
          if (cursorLabel) cursorLabel.textContent = "aap ka token";
          updateRailToken(s.core + " · aap ka token");
          setDots(s.dots);
          if (youDot)
            gsap.to(youDot, { autoAlpha: 0, scale: 0.4, duration: 0.25, overwrite: "auto" });
          if (panel) panel.classList.remove("is-alert");
          if (bubble)
            gsap.to(bubble, {
              autoAlpha: 0,
              scale: 0.7,
              y: 10,
              duration: 0.3,
              ease: "power2.in",
              overwrite: "auto",
            });
          if (orb) setOrb(orb, "idle");
          /* token slam on each swap (skip the initial set) */
          if (was !== -1) popToken();
        } else {
          /* M-E-42 — the alert moment: token 0, bubble slams, panel
             flashes, orb holds its alert pose, "you" joins the room. */
          if (tokenEl) tokenEl.textContent = "0";
          if (aheadNum) aheadNum.textContent = "0";
          if (aheadText) aheadText.textContent = "log — sirf aap";
          if (orbCore) orbCore.textContent = "YOUR TURN";
          if (cursorNum) cursorNum.textContent = "#0";
          if (cursorLabel) cursorLabel.textContent = "aap ki baari";
          updateRailToken("0 · aap ki baari");
          setDots(0);
          if (panel) {
            panel.classList.remove("is-alert");
            void panel.offsetWidth; /* restart the flash animation */
            panel.classList.add("is-alert");
          }
          if (bubble)
            gsap.to(bubble, {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              duration: 0.35,
              ease: "back.out(2)",
              overwrite: "auto",
            });
          if (youDot)
            gsap.to(youDot, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(2.2)", overwrite: "auto" });
          popToken();
          if (orb) {
            setOrb(orb, "alert");
            var tilt = orb.querySelector("[data-orb-tilt]");
            if (tilt)
              gsap
                .timeline()
                .to(tilt, { y: -18, duration: 0.26, ease: "back.out(2)" })
                .to(tilt, { y: 0, duration: 0.32, ease: "power1.inOut" });
          }
        }
      }

      /* ── The pin + scrub (M-P-40/M-P-41): ~150vh, bidirectional ── */
      var tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });
      /* The rail fills ink-700 → ink-200 (M-P-40). */
      if (railFill) tl.to(railFill, { scaleX: 1, duration: 1 }, 0);
      /* M-P-41 — the waiting room shuffles: three parallax layers, ±6px. */
      var layerFront = section.querySelectorAll(".b4-wdot--front");
      var layerMid = section.querySelectorAll(".b4-wdot--mid");
      var layerBack = section.querySelectorAll(".b4-wdot--back");
      if (layerFront.length) tl.to(layerFront, { x: 6, y: -3, duration: 1, stagger: 0.02 }, 0);
      if (layerMid.length) tl.to(layerMid, { x: -6, y: 2, duration: 1, stagger: 0.02 }, 0);
      if (layerBack.length) tl.to(layerBack, { x: 5, y: 3, duration: 1, stagger: 0.02 }, 0);

      /* Segment swaps ride the timeline's own (smoothed) progress so the
         token, rail and silhouettes never desync under scrub. The alert
         threshold (0.98) is deliberately generous so fast scroll jumps
         land the climax even when the scrub catch-up settles just shy of
         the pin end. */
      tl.eventCallback("onUpdate", function () {
        var p = tl.progress();
        applySeg(p < 0.34 ? 0 : p < 0.67 ? 1 : p < 0.98 ? 2 : 3);
      });
      applySeg(0);

      /* M-P-43 — the handoff peel: after the unpin, the next section peels
         the panel away (y -60, fade). Scrubbed, so scrolling back restores. */
      gsap.to(panel, {
        y: -60,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "bottom bottom",
          end: "bottom 35%",
          scrub: true,
        },
      });

      /* I-C-42 — cursor counter badge: follows the pointer within the
         pinned stage and syncs to the scrub value (desktop only; touch
         never ships dead zones). Wired once so media re-entry never
         stacks duplicate listeners. */
      var finePointer4 = window.matchMedia("(hover: hover) and (pointer: fine)");
      if (finePointer4.matches && cursorBadge && stage.getAttribute("data-cursor-wired") !== "1") {
        stage.setAttribute("data-cursor-wired", "1");
        var bx = gsap.quickTo(cursorBadge, "x", { duration: 0.35, ease: "power3.out" });
        var by = gsap.quickTo(cursorBadge, "y", { duration: 0.35, ease: "power3.out" });
        on2(stage, "pointerenter", function () {
          if (!disposed) cursorBadge.classList.add("is-on");
        });
        on2(stage, "pointerleave", function () {
          if (!disposed) cursorBadge.classList.remove("is-on");
        });
        on2(stage, "pointermove", function (e) {
          if (disposed) return;
          var r = panel.getBoundingClientRect();
          bx(e.clientX - r.left + 18);
          by(e.clientY - r.top + 20);
        });
      }
    }

    /* ─────────────── BEATS 5–6 — the day's close (File 21 §5–§6) ───────────────
       Phase 4: Beat 5 CLINIC+SHAAM (QR kiosk check-in, the day→dusk scrub
       with the sun arc and the orb's night onset, the evening diet nudge)
       and Beat 6 BOUNDARY (the slow boundary line, the doctor adherence-
       ring mirror, the day rail). Markup ships each beat's FINAL state —
       these builders replay it, so crawlers / no-JS / reduced-motion see
       the complete beats. */

    function buildBeat5() {
      var section = document.querySelector("[data-beat5]");
      if (!section) return;
      beatEntrance(section);

      var kiosk = section.querySelector("[data-b5-kiosk]");
      var screenEl = section.querySelector("[data-b5-screen]");
      var status = section.querySelector("[data-b5-status]");
      var tokenline = section.querySelector("[data-b5-tokenline]");
      var checkin = section.querySelector("[data-b5-checkin]");
      var diet = section.querySelector("[data-b5-diet]");
      var bubble = section.querySelector("[data-b5-bubble]");
      var rows = gsap.utils.toArray("[data-b5-row]", section);
      var dusk = section.querySelector("[data-b5-dusk]");
      var arc = section.querySelector("[data-b5-arc]");
      var sun = section.querySelector("[data-b5-sun]");
      var orb = cameoOrb(section, "data-b5-orb");

      /* Replay reset — markup ships the checked-in FINAL state (status
         flipped, final token line, dusk complete, orb already night). */
      if (status) status.classList.remove("is-in");
      if (checkin) checkin.setAttribute("aria-pressed", "false");
      if (tokenline) tokenline.textContent = "QR check-in — ek tap ka kaam.";
      if (orb) setOrb(orb, "idle");

      /* Kiosk entrance: the screen, status and button settle in. */
      if (kiosk) {
        var bits = [screenEl, status, checkin, tokenline].filter(Boolean);
        if (bits.length) {
          gsap.set(bits, { autoAlpha: 0, y: 16 });
          gsap
            .timeline({
              defaults: { ease: "power2.out" },
              scrollTrigger: { trigger: kiosk, start: "top 80%", once: true },
            })
            .to(bits, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.09 }, 0);
        }
      }

      /* M-E-51 — the evening bubble slides in, the diet rows assemble. */
      if (diet) {
        if (bubble) gsap.set(bubble, { autoAlpha: 0, x: -18 });
        if (rows.length) gsap.set(rows, { autoAlpha: 0, x: -24 });
        var dtl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: { trigger: diet, start: "top 80%", once: true },
        });
        if (bubble) dtl.to(bubble, { autoAlpha: 1, x: 0, duration: 0.5 }, 0);
        if (rows.length)
          dtl.to(rows, { autoAlpha: 1, x: 0, duration: 0.45, stagger: 0.14 }, 0.25);
      }

      /* M-E-50 — the day→dusk scrub: the ivory overlay fades in, the sun
         dot arcs across the horizon (getPointAtLength on the dashed path)
         and dims as it settles — and O-50, the orb dims to its night
         state as the dusk completes (bidirectional: scrolling back wakes
         it, so the day genuinely belongs to the scroll). */
      if (dusk) {
        gsap.set(dusk, { autoAlpha: 0 });
        var arcLen = arc ? arc.getTotalLength() : 0;
        if (sun && arc && arcLen) {
          sun.setAttribute("cx", 60);
          sun.setAttribute("cy", 110);
          gsap.set(sun, { opacity: 1 });
        }
        var nightOn = false;
        var sunPos = { p: 0 };
        var duskTl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top 45%",
            end: "bottom 88%",
            scrub: 0.5,
          },
          onUpdate: function () {
            var pr = duskTl.progress();
            if (orb) {
              if (pr >= 0.8 && !nightOn) {
                nightOn = true;
                setOrb(orb, "night");
              } else if (pr < 0.8 && nightOn) {
                nightOn = false;
                setOrb(orb, "idle");
              }
            }
          },
        });
        duskTl.to(dusk, { autoAlpha: 1, duration: 1 }, 0);
        if (sun && arc && arcLen) {
          duskTl.to(
            sunPos,
            {
              p: 1,
              duration: 1,
              onUpdate: function () {
                var pt = arc.getPointAtLength(arcLen * sunPos.p);
                sun.setAttribute("cx", pt.x);
                sun.setAttribute("cy", pt.y);
              },
            },
            0
          );
          duskTl.to(sun, { opacity: 0.3, duration: 0.3 }, 0.7);
        }
      }
    }

    function buildBeat6() {
      var section = document.querySelector("[data-beat6]");
      if (!section) return;
      beatEntrance(section);

      /* M-E-60 — THE BOUNDARY LINE: word-by-word fade, 0.8s each, 0.25s
         stagger — the slowest, most deliberate moment on the page. Plain
         fades with a slight rise (no mask grammar here); markup ships the
         line fully readable, so RM / no-JS get the whole statement. */
      var lines = section.querySelectorAll("[data-b6-bw]");
      var words = [];
      Array.prototype.forEach.call(lines, function (line) {
        if (line.getAttribute("data-split") === "1") return;
        var ws = (line.textContent || "").split(/\s+/).filter(Boolean);
        if (!ws.length) return;
        line.innerHTML = ws
          .map(function (w) { return '<span class="b6-w">' + w + "</span>"; })
          .join(" ");
        line.setAttribute("data-split", "1");
        Array.prototype.push.apply(
          words,
          Array.prototype.slice.call(line.querySelectorAll(".b6-w"))
        );
      });
      if (words.length) {
        gsap.set(words, { autoAlpha: 0, y: 10 });
        gsap.to(words, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.25,
          ease: "power1.inOut",
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        });
      }

      /* M-E-61 — the doctor-screen mirror: the adherence ring draws
         itself 0→72% with a counting centre (markup ships the drawn
         final state; labelled representative, never real data). */
      var doc = section.querySelector("[data-b6-doc]");
      var segs = gsap.utils.toArray(".b6-seg--on", section);
      var pct = section.querySelector("[data-b6-pct]");
      if (doc) {
        segs.forEach(function (p) {
          var len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len + " " + len, strokeDashoffset: len });
        });
        if (pct) gsap.set(pct, { innerText: 0 });
        var tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: doc, start: "top 78%", once: true },
        });
        if (segs.length)
          tl.to(segs, { strokeDashoffset: 0, duration: 0.55, stagger: 0.14 }, 0.2);
        if (pct)
          tl.fromTo(
            pct,
            { innerText: 0 },
            { innerText: 72, duration: 1.1, snap: { innerText: 1 }, ease: "power1.inOut" },
            0.25
          );
      }

      /* The day rail — the cards stagger in when the rail block arrives
         (their entrance is their own: the section is tall, so the shared
         [data-beat-fade] grammar only carries the rail's header row). */
      var rail = section.querySelector("[data-b6-rail]");
      var cards = gsap.utils.toArray(".rail-card", section);
      if (rail && cards.length) {
        gsap.set(cards, { autoAlpha: 0, y: 18 });
        gsap.to(cards, {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: { trigger: rail, start: "top 88%", once: true },
        });
      }
    }

    /* Beats interactions — like the hero chips, these are interaction, not
       motion: they stay live in every media state (instant under RM). */
    function wireBeatInteractions() {
      var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

      /* I-H-10 — adherence flips (tap toggles; hover previews on desktop). */
      gsap.utils.toArray("[data-b1-flip]").forEach(function (chip) {
        on2(chip, "click", function () {
          var on = chip.getAttribute("aria-pressed") === "true";
          chip.setAttribute("aria-pressed", on ? "false" : "true");
          chip.classList.remove("is-peek");
        });
        if (finePointer.matches) {
          on2(chip, "pointerenter", function () {
            if (chip.getAttribute("aria-pressed") !== "true") chip.classList.add("is-peek");
          });
          on2(chip, "pointerleave", function () {
            chip.classList.remove("is-peek");
          });
        }
      });

      /* I-H-20 — the confirm rail: DRAFT → ✓ morph per row; all-confirmed
         reveals the final line (+ a quiet orb ripple, motion only). */
      gsap.utils.toArray("[data-beat2]").forEach(function (section) {
        var rows = Array.prototype.slice.call(section.querySelectorAll("[data-b2-row]"));
        var finalLine = section.querySelector("[data-b2-final]");
        var orb = cameoOrb(section, "data-b2-orb");

        function checkAll() {
          if (!finalLine) return;
          var all =
            rows.length > 0 &&
            rows.every(function (r) { return r.classList.contains("is-confirmed"); });
          if (reduceMQ.matches) {
            finalLine.style.opacity = all ? "1" : "0";
            finalLine.style.visibility = all ? "visible" : "hidden";
            return;
          }
          if (all) {
            gsap.to(finalLine, { autoAlpha: 1, duration: 0.45, ease: "power2.out" });
            if (orb) {
              setOrb(orb, "speaking");
              setTimeout(function () {
                if (disposed) return;
                if (orb.classList.contains("orb--speaking")) setOrb(orb, "idle");
              }, 1100);
            }
          } else {
            gsap.to(finalLine, { autoAlpha: 0, duration: 0.3, ease: "power1.in" });
          }
        }

        rows.forEach(function (row) {
          var btn = row.querySelector("[data-b2-confirm]");
          if (!btn) return;
          on2(btn, "click", function () {
            var on = row.classList.toggle("is-confirmed");
            btn.setAttribute("aria-pressed", on ? "true" : "false");
            if (on && !reduceMQ.matches) {
              var done = row.querySelector("[data-b2-done]");
              if (done)
                gsap.fromTo(
                  done,
                  { scale: 0.3, autoAlpha: 0 },
                  { scale: 1, autoAlpha: 1, duration: 0.3, ease: "back.out(2)" }
                );
            }
            checkAll();
          });
        });
      });

      /* I-T-30 — booking chips (beat 3): tap → selected → typing dots
         (0.8s) → the booked ticket stamps in with quiet confetti + the
         orb's alert-hop (O-30). Under reduced-motion the swap is instant
         (B12 parity). Re-tapping another slot re-books — the ticket
         re-stamps and the slot line + orb core update. */
      gsap.utils.toArray("[data-beat3]").forEach(function (section) {
        var chips = Array.prototype.slice.call(section.querySelectorAll("[data-b3-slot]"));
        if (!chips.length) return;
        var booked = section.querySelector("[data-b3-booked]");
        var typing = section.querySelector("[data-b3-typing]");
        var slotLine = section.querySelector("[data-b3-slotline]");
        var orb = cameoOrb(section, "data-b3-orb");
        var orbCore = orb ? orb.querySelector("[data-orb-core]") : null;
        var orbLabel = orb ? orb.querySelector(".orb-core-label") : null;
        var bits = Array.prototype.slice.call(section.querySelectorAll(".b3-conf"));

        chips.forEach(function (chip) {
          on2(chip, "click", function () {
            if (chip.getAttribute("aria-pressed") === "true") return;
            chips.forEach(function (c) {
              c.setAttribute("aria-pressed", c === chip ? "true" : "false");
            });
            var line = chip.getAttribute("data-b3-line") || "";
            var time = chip.getAttribute("data-b3-time") || "";
            if (slotLine) slotLine.textContent = line;
            if (orbCore) orbCore.textContent = time;
            if (orbLabel) orbLabel.textContent = "booked slot";

            if (reduceMQ.matches || !booked) {
              /* Instant, no animation — content only (B12 parity). */
              if (booked) {
                booked.style.opacity = "1";
                booked.style.visibility = "visible";
              }
              if (typing) typing.classList.remove("is-typing");
              return;
            }

            if (typing) typing.classList.add("is-typing");
            clearTimeout(b3TypingTimer);
            b3TypingTimer = setTimeout(function () {
              if (disposed) return;
              if (typing) typing.classList.remove("is-typing");
              /* I-T-30 finale — the ticket stamps in (scale 0.9→1 + rotate
                 -2°→0, back.out(1.8)); O-30 orb alert-hop. */
              gsap
                .timeline()
                .fromTo(
                  booked,
                  { autoAlpha: 0, scale: 0.92, rotation: -2 },
                  { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.8)" }
                )
                .call(
                  function () {
                    orbAlert(orb, orb && orb.querySelector("[data-orb-tilt]"));
                  },
                  null,
                  0.18
                );
              /* M-L-31 — quiet confetti: six tiny squares drift up + fade,
                 staggered (monochrome celebration, not confetti-noise). */
              if (bits.length) {
                gsap.fromTo(
                  bits,
                  { autoAlpha: 1, y: 12, rotation: 0 },
                  {
                    autoAlpha: 0,
                    y: -48,
                    x: function (i) { return i % 2 ? 10 : -10; },
                    rotation: function (i) { return i % 2 ? 90 : -70; },
                    duration: 1.2,
                    stagger: 0.08,
                    ease: "power1.out",
                    delay: 0.12,
                  }
                );
              }
            }, 800);
          });
        });
      });

      /* I-T-50 — the QR kiosk check-in (beat 5, one-way): status flips
         WAITING → CHECKED IN (the 0.5s Y-flip), the token line updates,
         and the scan line sweeps down the QR (motion only). Under
         reduced-motion the swap is instant (B12 parity). */
      gsap.utils.toArray("[data-b5-checkin]").forEach(function (btn) {
        var section = btn.closest("[data-beat5]");
        if (!section) return;
        var status = section.querySelector("[data-b5-status]");
        var tokenline = section.querySelector("[data-b5-tokenline]");
        var scan = section.querySelector("[data-b5-scan]");
        var qrcard = section.querySelector("[data-b5-qrcard]");

        on2(btn, "click", function () {
          if (btn.getAttribute("aria-pressed") === "true") return;
          btn.setAttribute("aria-pressed", "true");
          if (status) status.classList.add("is-in");
          if (tokenline)
            tokenline.textContent = "Check-in ho gaya — Dr. S. ki live list par aa gaye.";
          if (reduceMQ.matches || !scan || !qrcard) return;
          /* The scan sweep — one pass down the QR card (motion only). */
          gsap.fromTo(
            scan,
            { autoAlpha: 0.9, y: 0 },
            {
              y: qrcard.offsetHeight * 0.82,
              autoAlpha: 0,
              duration: 0.65,
              ease: "power1.inOut",
            }
          );
        });
      });

      /* I-H-61 — the adherence ring (beat 6): hover (desktop) or tap
         (any pointer) a day chip and its ring segment highlights while
         the others recede. Pure class toggles — identical under
         reduced-motion. */
      gsap.utils.toArray("[data-b6-doc]").forEach(function (doc) {
        var ring = doc.querySelector(".b6-ring");
        var chips = Array.prototype.slice.call(doc.querySelectorAll("[data-b6-day]"));
        var segs = Array.prototype.slice.call(doc.querySelectorAll(".b6-seg"));
        if (!chips.length || !segs.length) return;

        function setHot(i) {
          segs.forEach(function (s, j) { s.classList.toggle("is-hot", i === j); });
          chips.forEach(function (c, j) { c.classList.toggle("is-hot", i === j); });
          if (ring) ring.classList.toggle("is-focused", i !== -1);
        }

        chips.forEach(function (chip, i) {
          if (finePointer.matches) {
            on2(chip, "pointerenter", function () {
              if (!disposed) setHot(i);
            });
          }
          on2(chip, "click", function () {
            setHot(chip.classList.contains("is-hot") ? -1 : i);
          });
        });
        on2(doc, "pointerleave", function () {
          if (!disposed) setHot(-1);
        });
      });
    }

    /* I-C-04 (site-wide) — magnetic drift for [data-magnetic] elements
       outside the hero (the hero wires its own inside buildHeroV2).
       Wired once per element, outside the media context, so the
       interaction stays live in every state; the drift itself sits out
       under reduced-motion. */
    function wireGlobalMagnetics() {
      var fine = window.matchMedia("(hover: hover) and (pointer: fine)");
      if (!fine.matches) return;
      gsap.utils.toArray("[data-magnetic]").forEach(function (el) {
        if (el.closest("[data-hero2]") || el.getAttribute("data-mag-wired") === "1") return;
        el.setAttribute("data-mag-wired", "1");
        var mx = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
        var my = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
        on2(el, "pointermove", function (e) {
          if (disposed || reduceMQ.matches) return;
          var r = el.getBoundingClientRect();
          var dx = e.clientX - (r.left + r.width / 2);
          var dy = e.clientY - (r.top + r.height / 2);
          mx(Math.max(-10, Math.min(10, dx * 0.22)));
          my(Math.max(-10, Math.min(10, dy * 0.22)));
        });
        on2(el, "pointerleave", function () {
          if (disposed || reduceMQ.matches) return;
          gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
        });
      });
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
      buildBeat1();
      buildBeat2();
      buildBeat3();
      buildBeat4();
      buildBeat5();
      buildBeat6();
      buildReveals();
      buildJourneyLanes();
      buildProductTilt();
      buildSevika();
    });

    /* HERO v2 chips, beats interactions and site-wide magnetics are
       interaction, not motion — they stay live in every media state
       (instant under reduced-motion, B12 parity; magnetic drift sits
       itself out while the preference is reduced). */
    wireHero2Chips();
    wireBeatInteractions();
    wireGlobalMagnetics();

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
      clearTimeout(b3TypingTimer);
      gsap.defaults(prevDefaults);
      window.__atursevaAnimBooted = false;
      window.__atursevaAnimDispose = null;
    }

    window.__atursevaAnimDispose = dispose;
    return dispose;
  }

  window.initAtursevaAnimations = initAtursevaAnimations;
})();
