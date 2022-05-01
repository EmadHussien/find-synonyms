const searchedForm = document.getElementById("form-input");
const spinner = document.getElementById("spin");
const wordsBody = document.getElementById("words-list");

function takeInput() {
  searchedForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let wordToFind = searchedForm.searched_word.value;
    wordsBody.style.display = "none";
    fetchSynWords(wordToFind);
  });
}

takeInput();

async function fetchSynWords(word) {
  let url = `https://api.datamuse.com//words?rel_syn=${word}`;
  try {
    spinner.style.display = "flex";
    let response = await fetch(url);
    const fetchedData = await response.json();
    spinner.style.display = "none";
    renderWords(fetchedData);
    console.log(fetchedData);
  } catch (error) {
    console.log(error);
  }
}

function renderWords(data) {
  let htmlCode = "";
  if (data.length > 0) {
    htmlCode = data
      .map((item) => {
        return `<span class="words-item">${item.word}</span>`;
      })
      .join(" ");
    wordsBody.innerHTML = htmlCode;
  } else {
    htmlCode = "No search results found!";
    wordsBody.innerHTML = htmlCode;
  }
  wordsBody.style.display = "block";
}
