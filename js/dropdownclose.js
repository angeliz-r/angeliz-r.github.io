window.addEventListener('scroll', function () {
    const dropdown = document.getElementById('portfolio-toggle');
    if (dropdown && dropdown.checked) {
      dropdown.checked = false;
    }
  });
  document.addEventListener('click', function (e) {
  const toggle = document.getElementById('portfolio-toggle');
  const dropdown = document.querySelector('.dropdown');

  if (toggle && !dropdown.contains(e.target)) {
      toggle.checked = false;
  }
  });
  window.addEventListener('scroll', () => {
  const input = document.getElementById('portfolio-toggle');
  if (input) input.checked = false;
  });