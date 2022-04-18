const pretalxSpeakers =
  "https://pretalx.com/api/events/pycon-lt-2022/speakers/";
const pretalxTalks = "https://pretalx.com/api/events/pycon-lt-2022/talks/";
const parseSpeakers = (data) => {
  const container = document.querySelector("div.speaker-container");
  const ul = document.createElement("ul");
  container.appendChild(ul);

  // let lis = data.results.filter((speaker) => !speaker.name.includes("astian"));
  const lis = data.results.map((speaker) => {
    const li = document.createElement("li");
    li.textContent = speaker.name;
    return li;
  });
  lis.forEach((li) => ul.appendChild(li));
};

const parseTalks = (data) => {
  const container = document.querySelector("div.talk-container");
  const table = document.createElement("table");
  table.classList.toggle("table");
  table.classList.add("table");
  table.classList.add("table-striped");
  container.appendChild(table);
  const tbody = document.createElement("tbody");

  // let lis = data.results.filter((speaker) => !speaker.name.includes("astian"));
  const lis = data.results.map((talk) => {
    const { code, speakers, title, track, state, abstract, image } = talk;

    const row = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");

    td1.textContent = title;
    td2.textContent = speakers[0].name;
    row.appendChild(td1);
    row.appendChild(td2);
    return row;
  });
  lis.forEach((row) => tbody.appendChild(row));
  const row = document.createElement("tr");
  const td1 = document.createElement("td");
  td1.textContent = "Updated every day!";
  td1.setAttribute("colspan", "2");
  row.appendChild(td1);
  row.textContent
  tbody.appendChild(row);
  table.appendChild(tbody);
};

window.addEventListener("DOMContentLoaded", (event) => {
  // fetch(pretalxSpeakers)
  //   .then((response) => response.json())
  //   .then((data) => parseSpeakers(data));

  fetch(pretalxTalks)
    .then((response) => response.json())
    .then((data) => parseTalks(data));
});
