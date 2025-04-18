function setupTimeline({
  scrollAreaId,
  dotNavSelector,
  dotSelector,
  progressLineSelector,
  cardSelector,
  nextBtnSelector,
  prevBtnSelector,
}) {
  const scrollArea = document.getElementById(scrollAreaId);
  const dotNav = document.querySelector(dotNavSelector);
  const dots = document.querySelectorAll(dotSelector);
  const progressLine = document.querySelector(progressLineSelector);
  const cards = document.querySelectorAll(cardSelector);
  const nextBtn = document.querySelector(nextBtnSelector);
  const prevBtn = document.querySelector(prevBtnSelector);

  if (!scrollArea) return;

  scrollArea.addEventListener("scroll", () => {
    const scrollLeft = scrollArea.scrollLeft;
    const maxScroll = scrollArea.scrollWidth - scrollArea.clientWidth;
    const scrollPercent = (scrollLeft / maxScroll) * 100;
    progressLine.style.width = scrollPercent + "%";

    cards.forEach((card, index) => {
      const cardLeft = card.offsetLeft - scrollArea.offsetLeft;
      const cardCenter = cardLeft + card.offsetWidth / 2;
      const areaCenter = scrollArea.scrollLeft + scrollArea.offsetWidth / 2;

      if (Math.abs(cardCenter - areaCenter) < card.offsetWidth / 2) {
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
      }
    });
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", e => {
      e.preventDefault();
      const targetId = dot.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    });
  });

  nextBtn?.addEventListener("click", () => {
    const cardWidth = cards[0].offsetWidth;
    scrollArea.scrollBy({ left: cardWidth, behavior: "smooth" });
  });

  prevBtn?.addEventListener("click", () => {
    const cardWidth = cards[0].offsetWidth;
    scrollArea.scrollBy({ left: -cardWidth, behavior: "smooth" });
  });
}

// Setup for Work Experience timeline
setupTimeline({
  scrollAreaId: "timelineScrollArea",
  dotNavSelector: ".dot-nav",
  dotSelector: ".dot-label",
  progressLineSelector: ".dot-progress-line",
  cardSelector: "#timelineScrollArea .timeline-card",
  nextBtnSelector: ".timeline-btn.next",
  prevBtnSelector: ".timeline-btn.prev",
});

// Setup for Education timeline
setupTimeline({
  scrollAreaId: "eduTimelineScrollArea",
  dotNavSelector: ".edu-dot-nav",
  dotSelector: ".edu-dot-label",
  progressLineSelector: ".edu-progress-line",
  cardSelector: "#eduTimelineScrollArea .timeline-card",
  nextBtnSelector: ".edu-next",
  prevBtnSelector: ".edu-prev",
});