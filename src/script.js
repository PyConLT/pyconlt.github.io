const pretalxSpeakers =
  "https://pretalx.com/api/events/pycon-lt-2022/speakers/";

const parseResponse = (data) => {
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

window.addEventListener("DOMContentLoaded", (event) => {
  fetch(pretalxSpeakers)
    .then((response) => response.json())
    .then((data) => parseResponse(data));
});
