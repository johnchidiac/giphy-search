// const constructQueryString = (params) => {
//   // Simple way of getting key/value pairs of an object
//   let queryString = "";
//   for (let [key, value] of Object.entries(params)) {
//     queryString += `${key}=${encodeURIComponent(value)}&`;
//   }
//   // console.log(queryString);
//   return queryString;
// };

const randomNumber = (max) => {
  return Math.floor(Math.random(max) * 100);
};

const searchGiphy = async (search, offset) => {
  const params = {
    api_key: "NBgs0qBG3yxuGj7gh1g4pUTyoUdUfTbj",
    q: search,
    limit: 1,
    offset: offset,
  };
  try {
    const res = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
      params: params,
    });
    return res.data.data[0].images.original.url;
  } catch (e) {
    console.log(`Dagnabit! ${e}`);
  }
};

const addGifToPage = (img) => {
  $("#results").append(`<img src="${img}">`);
  const $newImage = $("#results img");
  $newImage.on("click", (e) => {
    console.log(e.target);
    e.target.remove();
  });
};

$("#search-form").on("submit", async (e) => {
  e.preventDefault();
  if ($("#search").val() != "") {
    const searchResult = await searchGiphy(
      $("#search").val(),
      randomNumber(4999)
    );
    await addGifToPage(searchResult);
    $("#search").val("");
  } else {
    $("#search").focus();
  }
});

$("#clear-results").on("click", (e) => {
  console.log(e, e.target);
  $("#results").empty("img");
});
