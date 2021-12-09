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
                <img src="./images/assets/calendar.png" alt="">
                <p>${detail.date}</p>
            </div>
            <div class="time-card">
                <img src="./images/assets/time.png" alt="">
                <p>${detail.time}</p>
            </div>
            <div class="price-card">
                <img src="./images/assets/ticket.png" alt="">
                <p>${detail.ticket_price}</p>
            </div>
            <div class="place-card">
                <img src="./images/assets/place.png" alt="">
                <p>${detail.place}</p>
            </div>
            <div class="link-card">
                <img src="./images/assets/link.png" alt="">
                <p>
                    <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseRegisterLink" role="button" aria-expanded="false" aria-controls="collapseRegisterLink">
                        Register Link
                    </a>
                </p>
                <div class="collapse" id="collapseRegisterLink">
                    <div class="card card-body">
                    ${detail.register_link}
                    </div>
                </div>
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
            <div class="d-flex justify-content-between align-items-lg-start">
                <h5 class="card-title">
                    <a href="#/detail/${event.id}">${event.name}</a>
                </h5>
                <button class="btn-like" style="border: none; background-color: white">
                    <img src="./images/assets/like.png" style="width: 30px; height: 30px;" alt="">
                </button>
            </div>
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

const createTableEventTemplate = (event, index) => `
    <tr>
        <th scope="row">${index++}</th>
        <td>${event.name}</td>
        <td>${event.category.category_name}</td>
        <td>
            <a href="#/detail/${event.id}" class="badge btn-sign-up">Detail</a>        
            <a href="#" id="delete" data-value="${event.id}" class="badge btn-danger text-decoration-none">Hapus</a>
            <a data-bs-toggle="modal" class="badge btn-success" data-bs-target="#myModal${event.id}">Edit
            </a>
        </td>
    </tr>


    <!-- Modal -->
    <div class="modal fade" id="myModal${event.id}" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="myModalLabel">${event.name}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            ${createUpdateEventTemplate(event)}
        </div>
        </div>
    </div>
    </div>
`;

const createUpdateEventTemplate = (event) => `
    <div class="upload-event">
            <br>
            <input type="hidden" id="id-event" name="id-event" value="${event.id}"><br><br>
            <label for="image-input"><h6>Image:</h6></label><br>
            <img id="preview-image" src="${event.poster.match('https://') ? event.poster : CONFIG.BASE_IMAGE_POSTER_URL+event.poster}" class="img-thumbnail w-50">
            <input type="file" id="image-input" accept="image/png, image/jpg, image/jpeg" name="image-input"><br><br>

            <label for="category-event"><h6>Category Of Event:</h6></label><br>
            <select name="category-event" id="category-event" required>
                <option value="5" ${event.category_id == 5 ? 'selected' : ''}>Lain-lain</option>
                <option value="1" ${event.category_id == 1 ? 'selected' : ''}>Webinar</option>
                <option value="2" ${event.category_id == 2 ? 'selected' : ''}>Contest</option>
                <option value="4" ${event.category_id == 4 ? 'selected' : ''}>Concert</option>
                <option value="3" ${event.category_id == 3 ? 'selected' : ''}>Scholarship</option>
            </select><br><br>

            <label for="name-event"><h6>Name Of Event:</h6></label><br>
            <input type="text" id="name-event" name="name-event" required min="5" value="${event.name}"><br><br>

            <label for="date-event"><h6>Date Of Event:</h6></label><br>
            <input type="date" id="date-event" name="date-event" required value="${event.date}"><br><br>

            <label for="time-event"><h6>Time Of Event:</h6></label><br>
            <input type="time" id="time-event" name="time-event" required value="${event.time}"><br><br>

            <label for="place-event"><h6>Place Of Event:</h6></label><br>
            <input type="text" id="place-event" name="place-event" required value="${event.place}"><br><br>

            <label for="register-link"><h6>Register Link:</h6></label><br>
            <input type="text" id="register-link" name="register-link" required value="${event.register_link}"><br><br>

            <label for="ticket-price"><h6>Ticket Price:</h6></label><br>
            <input type="number" id="ticket-price" name="ticket-price" required value="${event.ticket_price}"><br><br>

            <label for="description-event"><h6>Description:</h6></label><br>
            <textarea id="description-event" name="description-event" required>${event.description}</textarea><br><br>

            <button class="btn-submit-sme submit-edit" type="submit">Submit</button>
    </div>
`;

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
        <ul class="pagination justify-content-center align-items-center">
            <li class="page-item ${page.current_page == 1 ? 'disabled' : ''}">
                <a class="page-link" href="#/${pageOrigin}/${page.current_page - 1}">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <div class="inner-page-number d-flex flex-row flex-wrap justify-content-center">
                
            </div>
            <li class="page-item ${page.current_page == page.last_page ? 'disabled' : ''}">
                <a class="page-link next" href="#/${pageOrigin}/${page.current_page + 1}">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </div>
`
const createPageNumber = (pageOrigin, number) => `
    <li class="page-number"><a class="page-link" href="#/${pageOrigin}/${number}">${number}</a></li>
`;

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
        createTableEventTemplate, 
        createPaginationItemTemplate,
        createCategoryTemplate, 
        createDetailTemplate,
        createMyAccountTemplate,
        createUploadEventTemplate,
        createUpdateEventTemplate,
        createPageNumber, 
    };