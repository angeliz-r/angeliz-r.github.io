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
  const dotLabels = dotNav.querySelectorAll(dotSelector);
  const dots = dotNav.querySelectorAll(`${dotSelector} .dot`);
  const progressLine = dotNav.querySelector(progressLineSelector);
  const cards = scrollArea.querySelectorAll(cardSelector);
  const nextBtn = document.querySelector(nextBtnSelector);
  const prevBtn = document.querySelector(prevBtnSelector);

  if (!scrollArea || cards.length === 0) return;

  let currentIndex = 0;

  function updateActiveDot(index) {
    dotLabels.forEach(dl => dl.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    dotLabels[index].classList.add("active");
    dots[index].classList.add("active");

    const activeDot = dots[index];
    const navRect = dotNav.getBoundingClientRect();
    const dotRect = activeDot.getBoundingClientRect();
    const progressWidth = dotRect.left + dotRect.width / 2 - navRect.left;

    progressLine.style.width = `${progressWidth}px`;

    currentIndex = index;
  }

  // Default active state
  updateActiveDot(0);

  scrollArea.addEventListener("scroll", () => {
    const areaCenter = scrollArea.scrollLeft + scrollArea.offsetWidth / 2;

    cards.forEach((card, index) => {
      const cardLeft = card.offsetLeft - scrollArea.offsetLeft;
      const cardCenter = cardLeft + card.offsetWidth / 2;

      if (Math.abs(cardCenter - areaCenter) < card.offsetWidth / 2) {
        updateActiveDot(index);
      }
    });
  });

  dotLabels.forEach((dot, index) => {
    dot.addEventListener("click", e => {
      e.preventDefault();
      const targetId = dot.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        updateActiveDot(index);
      }
    });
  });

  nextBtn?.addEventListener("click", () => {
    const nextIndex = (currentIndex + 1) % cards.length;
    cards[nextIndex].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    updateActiveDot(nextIndex);
  });

  prevBtn?.addEventListener("click", () => {
    const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
    cards[prevIndex].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    updateActiveDot(prevIndex);
  });
}

// Setup for Work Experience timeline
setupTimeline({
  scrollAreaId: "timelineScrollArea",
  dotNavSelector: ".dot-nav",
  dotSelector: ".dot-label",
  progressLineSelector: ".dot-progress-line",
  cardSelector: ".timeline-card",
  nextBtnSelector: ".timeline-btn.next",
  prevBtnSelector: ".timeline-btn.prev",
});

// Setup for Education timeline
setupTimeline({
  scrollAreaId: "eduTimelineScrollArea",
  dotNavSelector: ".edu-dot-nav",
  dotSelector: ".edu-dot-label",
  progressLineSelector: ".edu-progress-line",
  cardSelector: ".timeline-card",
  nextBtnSelector: ".edu-next",
  prevBtnSelector: ".edu-prev",
});