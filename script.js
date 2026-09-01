function mondayOf(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay(); // 0 = Sunday ... 6 = Saturday
  const diffToMonday = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diffToMonday);
  return d;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function weeksBetween(fromMonday, toMonday) {
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  return Math.round((toMonday - fromMonday) / msPerWeek);
}

function formatRange(monday) {
  const sunday = addDays(monday, 6);
  const opts = { month: "short", day: "numeric" };
  return `${monday.toLocaleDateString(undefined, opts)} – ${sunday.toLocaleDateString(undefined, opts)}`;
}

function personForWeek(weekIndexFromStart) {
  const n = ORDER.length;
  return ORDER[((weekIndexFromStart % n) + n) % n];
}

function render() {
  const start = mondayOf(new Date(START_DATE + "T00:00:00"));
  const thisMonday = mondayOf(new Date());
  const currentWeekIndex = weeksBetween(start, thisMonday);

  const currentPerson = personForWeek(currentWeekIndex);
  document.getElementById("current-name").textContent = currentPerson;
  document.getElementById("current-range").textContent = formatRange(thisMonday);

  const lastWeekMonday = addDays(thisMonday, -7);
  const lastWeekPerson = personForWeek(currentWeekIndex - 1);
  document.getElementById("last-week").textContent =
    `Last week (${formatRange(lastWeekMonday)}): ${lastWeekPerson}`;

  const list = document.getElementById("upcoming-list");
  list.innerHTML = "";
  for (let i = 1; i <= ORDER.length; i++) {
    const weekMonday = addDays(thisMonday, i * 7);
    const li = document.createElement("li");
    li.innerHTML = `<span class="name">${personForWeek(currentWeekIndex + i)}</span><span class="range">${formatRange(weekMonday)}</span>`;
    list.appendChild(li);
  }
}

render();

// Recompute at the top of every minute so the page stays correct
// if it's left open across a Monday-midnight rollover.
setInterval(render, 60 * 1000);
