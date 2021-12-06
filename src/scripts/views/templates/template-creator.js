import CONFIG from '../../globals/config';

const createDetailTemplate = (detail) => `
    <div class="all-info-detail d-flex flex-row justify-content-evenly flex-wrap">
        <div class="image-detail">
            <button data-bs-toggle="modal" data-bs-target="#myModal">
                <img src="${detail.poster.match('https://') ? detail.poster : CONFIG.BASE_IMAGE_POSTER_URL+detail.poster}" alt="">
            </button>
            <p>*click to enlarge image</p>
        </div>
        <div class="info-detail">
            <h2>${detail.name}</h2>
            <div class="category-card">
                <img src="./images/assets/category.png" alt="">
                <p>${detail.category.category_name}</p>
            </div>
            <div class="date-card">
                <img src="./images/assets/time.png" alt="">
                <p>${detail.date}</p>
            </div>
            <div class="place-card">
                <img src="./images/assets/place.png" alt="">
                <p>${detail.place}</p>
            </div>
        </div>
    </div>
    <div class="description-detail">
        <h2>Description</h2>
        <p>${detail.description}</p>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="myModal" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="myModalLabel">${detail.name}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <img src="${detail.poster.match('https://') ? detail.poster : CONFIG.BASE_IMAGE_POSTER_URL+detail.poster}" class="card-img-top" alt="...">
        </div>
        </div>
    </div>
    </div>
`

const createCardEventTemplate = (event) => `
    <div class="myCard">
        <img src="${event.poster.match('https://') ? event.poster : CONFIG.BASE_IMAGE_POSTER_URL+event.poster}" class="card-img-top" alt="${event.name}">
        <div class="card-body">
            <a class="card-title" href="#/detail/${event.id}">
                <h5>${event.name}</h5>
            </a>
            <div class="category-card">
                <img src="./images/assets/category.png" alt="">
                <p>${event.category.category_name}</p>
            </div>
            <div class="date-card">
                <img src="./images/assets/time.png" alt="">
                <p>${event.date}</p>
            </div>
            <div class="place-card">
                <img src="./images/assets/place.png" alt="">
                <p>${event.place}</p>
            </div>
        </div>
    </div>
`
const createCategoryTemplate = (category) => `
            <div class="${category.category_name.toLowerCase()}">
              <a href="#/event-category/${category.id}/1">
                <div>
                  <img src="./images/assets/${category.category_name.toLowerCase()}.png" alt=""> 
                </div>
                <p>${category.category_name}</p>
              </a>
            </div>
`;
const createPaginationItemTemplate = (page, pageOrigin) => `
    <div aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
            <li class="page-item ${page.current_page == 1 ? 'disabled' : ''}">
                <a class="page-link" href="#/${pageOrigin}/${page.current_page - 1}">Previous</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item ${page.current_page == page.last_page ? 'disabled' : ''}">
                <a class="page-link next" href="#/${pageOrigin}/${page.current_page + 1}">Next</a>
            </li>
        </ul>
    </div>
`
const createMyAccountTemplate = (myAccount) => `
    <div class="img-account" style="margin: 30px;">
        <img src="${CONFIG.BASE_IMAGE_USER_URL + myAccount.poster ? './images/assets/account.png' : CONFIG.BASE_IMAGE_USER_URL + myAccount.poster}" alt="">
    </div>
    <div class="data-account" style="margin: 30px;">
        <p>Nama :</p>
        <p>${myAccount.name}</p>
        <p>Email :</p>
        <p>${myAccount.email}</p>
        <p>Password :</p>
        <p>****</p>
    </div>
`

const createUploadEventTemplate = () => `
    <div class="upload-event">
        <form action="#" id="add-event">
            <br>
            <label for="image-input"><h6>Image:</h6></label><br>
            <img id="preview-image">
            <input type="file" id="image-input" accept="image/png, image/jpg, image/jpeg" name="image-input"><br><br>

            <label for="category-event"><h6>Category Of Event:</h6></label><br>
            <select name="category-event" id="category-event" required>
                <option value="5">Lain-lain</option>
                <option value="1">Webinar</option>
                <option value="2">Contest</option>
                <option value="4">Concert</option>
                <option value="3">Scholarship</option>
            </select><br><br>

            <label for="name-event"><h6>Name Of Event:</h6></label><br>
            <input type="text" id="name-event" name="name-event" required min="5"><br><br>

            <label for="date-event"><h6>Date Of Event:</h6></label><br>
            <input type="date" id="date-event" name="date-event" required><br><br>

            <label for="time-event"><h6>Time Of Event:</h6></label><br>
            <input type="time" id="time-event" name="time-event" required><br><br>

            <label for="place-event"><h6>Place Of Event:</h6></label><br>
            <input type="text" id="place-event" name="place-event" required><br><br>

            <label for="register-link"><h6>Register Link:</h6></label><br>
            <input type="text" id="register-link" name="register-link" required><br><br>

            <label for="ticket-price"><h6>Ticket Price:</h6></label><br>
            <input type="number" id="ticket-price" name="ticket-price" required><br><br>

            <label for="description-event"><h6>Description:</h6></label><br>
            <textarea id="description-event" name="description-event" required></textarea><br><br>

            <button class="btn-submit-sme" type="submit">Submit</button>
        </form>
    </div>
`

    export {
        createCardEventTemplate, 
        createPaginationItemTemplate,
        createCategoryTemplate, 
        createDetailTemplate,
        createMyAccountTemplate,
        createUploadEventTemplate, 
    };