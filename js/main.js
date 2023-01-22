const fileWrapper = document.querySelector(".custom__file-input");
const searchInput = document.getElementById("search");
const searchWrapper = document.querySelector(".search__wrapper");
const resultView = document.getElementById("result");

let arr = [];

fileWrapper.querySelector("#file").addEventListener("change", (e) => {
  const userFile = e.target.files[0];
  const nameFile = fileWrapper.querySelector(".name-file");

  if (userFile) {
    nameFile.textContent =
      userFile.name.length < 30
        ? userFile.name
        : userFile.name.slice(0, 30) + "...";

    readXlsxFile(userFile).then((data) => {
      arr = data.map((item) => item[0]);
    }).catch(console.log);


    searchWrapper.classList.add("active");
  } else {
    nameFile.textContent = "";
    searchWrapper.classList.remove("active");
    fileWrapper.querySelector(".wrapper__name-file").classList.remove("active");
  }
});

search.addEventListener("input", (e) => {
  const value = e.target.value;
  if (value.length >= 3) {
    const res = arr.some((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );

    resultView.textContent = res ? "номер найден" : "номер не найден";
    resultView.classList.add(res ? "done" : "danger");
    resultView.classList.remove(!res ? "done" : "danger");
  } else {
    resultView.textContent = "";
    resultView.classList.remove("done", "danger");
  }
});
