const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => t.classList.remove('active'));
  panels.forEach(p => { p.hidden = true; p.classList.remove('active'); });
  tab.classList.add('active');
  const panel = document.getElementById(tab.dataset.panel);
  panel.hidden = false;
  panel.classList.add('active');
}));
document.getElementById('year').textContent = new Date().getFullYear();
