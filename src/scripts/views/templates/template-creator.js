import CONFIG from '../../globals/config';

const createDetailTemplate = (detail) => `
    <div class="all-info-detail d-flex flex-row justify-content-evenly flex-wrap">
        <div class="image-detail">
            <button data-bs-toggle="modal" data-bs-target="#myModal">
                <img src="${detail.poster}" alt="">
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
            <img src="${detail.poster}" class="card-img-top" alt="...">
        </div>
        </div>
    </div>
    </div>
`

const createCardEventTemplate = (event) => `
    <div class="myCard">
        <img src="${event.poster}" class="card-img-top" alt="${event.name}">
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
const createPaginationItemTemplate = () => `
    <div aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
            <li class="page-item disabled">
                <a class="page-link">Previous</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
                <a class="page-link" href="#">Next</a>
            </li>
        </ul>
    </div>
`
const createMyAccountTemplate = (myAccount) => `
    <div class="img-account" style="margin: 30px;">
        <img src="${CONFIG.BASE_IMAGE_USER_URL + myAccount.poster == undefined ? CONFIG.BASE_IMAGE_USER_URL + myAccount.poster : './images/assets/account.png'}" alt="">
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
        <form action="#">
            <br>
            <label for="image-input"><h6>Image:</h6></label><br>
            <input type="file" id="image-input" name="image-input"><br><br>

            <label for="category-event"><h6>Category Of Event:</h6></label><br>
            <select name="category-event" id="category-event">
                <option value="lain-lain">lain-lain</option>
                <option value="webinar">webinar</option>
                <option value="contest">contest</option>
                <option value="scolarship">scolarship</option>
            </select><br><br>

            <label for="name-event"><h6>Name Of Event:</h6></label><br>
            <input type="text" id="name-event" name="name-event"><br><br>

            <label for="date-event"><h6>Date Of Event:</h6></label><br>
            <input type="date" id="date-event" name="date-event"><br><br>

            <label for="time-event"><h6>Time Of Event:</h6></label><br>
            <input type="time" id="time-event" name="time-event"><br><br>

            <label for="place-event"><h6>Place Of Event:</h6></label><br>
            <input type="text" id="place-event" name="place-event"><br><br>

            <label for="description-event"><h6>Description:</h6></label><br>
            <textarea id="description-event" name="description-event"></textarea><br><br>

            <button class="btn-submit-sme" type="submit">Submit</button>
        </form>
    </div>
`

    export {
        createCardEventTemplate, 
        createPaginationItemTemplate, 
        createDetailTemplate,
        createMyAccountTemplate,
        createUploadEventTemplate, 
    };