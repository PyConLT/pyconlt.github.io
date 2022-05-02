const pretalxSpeakers =
  "https://pretalx.com/api/events/pycon-lt-2022/speakers/";
const pretalxTalks = "https://pretalx.com/api/events/pycon-lt-2022/talks/";
const keynoteCodes = ["BGNNHY", "ADBT7H"];

const parseSpeakers = (data) => {
  const container = document.querySelector("div.speaker-container");

  const speakers = data.results.filter((speaker) => {
    if (keynoteCodes.includes(speaker.code)) {
      return false;
    } else {
      return true;
    }
  });

  const lis = speakers.map((speaker) => {
      const divCard = document.createElement("div");
      divCard.classList.add("card", "border-0", "m-3");
      const image = document.createElement("img");    
      image.classList.add("photo-fit");
      if (speaker.avatar) {
        image.src = speaker.avatar;
        image.height = "300";
      } else {
        image.src = "src/img/icons/no-avatar.png";
      }
      divCard.appendChild(image);

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      const nameHeader = document.createElement("h5");
      nameHeader.classList.add("card-title");
      nameHeader.innerHTML += speaker.name;
      cardBody.appendChild(nameHeader);
      const bio = document.createElement("p");
      bio.classList.add("card-text");
      bio.innerHTML += speaker.biography;
      cardBody.appendChild(bio);
      divCard.appendChild(cardBody);
      return divCard;
  });
  lis.forEach((divCard) => container.appendChild(divCard));
};

const parseTalks = (data) => {
  const container = document.querySelector("div.talk-container");
  const table = document.createElement("table");
  table.classList.toggle("table");
  table.classList.add("table", "table-striped");
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
