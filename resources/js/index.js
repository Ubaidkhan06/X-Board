async function fetchnews(link) {
  try {
    let res = await (await fetch(link)).json()
    return res
  } catch (e) {
    console.log(e)
    return null
  }
}

const addAccordion = (title, id) => {
  return `
  <div class="accordion-item">
  <h2 class="accordion-header" id="heading${id}">
    <button class="accordion-button collapsed" id='news-heading' type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}"  aria-expanded="true" aria-controls="collapse${id}">
      ${title}
    </button>
  </h2>
  <div id="collapse${id}" class="accordion-collapse collapse" aria-labelledby="heading${id}" data-bs-parent="#accordionExample">

  </div>
</div>
  `
}


const createCarousel = (id, innerId) => {
  return `
  <div id="${id}" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner" id="${innerId}">

  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#${id}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `
}

const createCard = (data) => {
  return `
  <div class = "carousel-item">
  <a href="${data.link}">
  <div class="card border border-0">
  <img src="${data.enclosure.link}" class="card-img-top img-fluid" alt="${data.title}">
    <div class="card-body">
      <h5 class="card-title">${data.title}</h5>
      <p class="card-text" id="author">${data.author} &#x2022 ${data.pubDate}</p>
      <p class="card-text">${data.description}</p>

    </div>

  </div>
  </a>
</div>

`

}




(function () {
  let parentElem = document.getElementById('accordionExample')

  magazines.forEach(async (item, index) => {
    // fetching the data 
    let url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(item)}`
    let data = await fetchnews(url)

    // adding accordion 
    let accordion = addAccordion(data.feed.title, index)
    parentElem.innerHTML += accordion

    let body = document.createElement('div')
    body.classList = 'accordion-body p-0'

    // collapsing first accordion by default
    let temp = document.getElementById('collapse0')
    temp.classList.add('show')

    let elem = document.getElementById(`collapse${index}`)
    elem.append(body)
    let carousel = createCarousel(`carousel${index}`, `inner${index}`)
    body.innerHTML += carousel

    // addind cards
    let cards = data.items
    let cardParent = document.getElementById(`inner${index}`)
    cards.forEach((element) => {
      let card = createCard(element)
      cardParent.innerHTML += card
    })

    cardParent.firstElementChild.classList.add('active')

  })



})()
