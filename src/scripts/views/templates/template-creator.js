const createDetailTemplate = () => `
    <div class="all-info-detail d-flex flex-row justify-content-evenly flex-wrap">
        <div class="image-detail">
            <button data-bs-toggle="modal" data-bs-target="#myModal">
                <img src="https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/haifoto/original/81932_foto-kebetulan-yang-keren-abis.jpg" alt="">
            </button>
            <p>*click to enlarge image</p>
        </div>
        <div class="info-detail">
            <h2>This is Title</h2>
            <div class="category-card">
                <img src="./images/assets/category.png" alt="">
                <p>Lain - Lain</p>
            </div>
            <div class="date-card">
                <img src="./images/assets/time.png" alt="">
                <p>16 - 18 Sep 2021</p>
            </div>
            <div class="place-card">
                <img src="./images/assets/place.png" alt="">
                <p>Online</p>
            </div>
        </div>
    </div>
    <div class="description-detail">
        <h2>Description</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis molestias suscipit nemo! Et explicabo eveniet fugit doloribus, doloremque aliquam commodi voluptatibus ab, necessitatibus dolores quo. Quia, obcaecati. Labore, necessitatibus velit.</p>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="myModal" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="myModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <img src="https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/haifoto/original/81932_foto-kebetulan-yang-keren-abis.jpg" class="card-img-top" alt="...">
        </div>
        </div>
    </div>
    </div>
`

const createCardEventTemplate = () => `
    <div class="myCard">
        <img src="https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/haifoto/original/81932_foto-kebetulan-yang-keren-abis.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <a class="card-title" href="#/detail/1">
                <h5>Card title</h5>
            </a>
            <div class="category-card">
                <img src="./images/assets/category.png" alt="">
                <p>Lain - Lain</p>
            </div>
            <div class="date-card">
                <img src="./images/assets/time.png" alt="">
                <p>16 - 18 Sep 2021</p>
            </div>
            <div class="place-card">
                <img src="./images/assets/place.png" alt="">
                <p>Online</p>
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
const createMyAccountTemplate = () => `
    <div class="img-account" style="margin: 30px;">
        <img src="./images/assets/account.png" alt="">
    </div>
    <div class="data-account" style="margin: 30px;">
        <p>Nama :</p>
        <p>M Muzayyid Al Hakim</p>
        <p>Email :</p>
        <p>mochamadzayyid@gmail.com</p>
        <p>Password :</p>
        <p>inipasswordsayay</p>
    </div>
`

const createUploadEventTemplate = () => `
    <form action="#">
        <br>
        <label for="image-input">Image:</label><br>
        <input type="file" id="image-input" name="image-input"><br><br>

        <label for="name-event">Name Of Event:</label><br>
        <input type="text" id="name-event" name="name-event"><br><br>

        <label for="category-event">Category Of Event:</label><br>
        <select name="category-event" id="category-event">
            <option value="lain-lain">lain-lain</option>
            <option value="webinar">webinar</option>
            <option value="contest">contest</option>
            <option value="scolarship">scolarship</option>
        </select><br><br>

        <label for="date-event">Date Of Event:</label><br>
        <input type="date" id="date-event" name="date-event"><br><br>

        <label for="time-event">Time Of Event:</label><br>
        <input type="time" id="time-event" name="time-event"><br><br>

        <label for="place-event">Place Of Event:</label><br>
        <input type="text" id="place-event" name="place-event"><br><br>

        <label for="description-event">Description:</label><br>
        <textarea id="description-event" name="description-event"></textarea><br><br>

        <button class="btn-submit-sme" type="submit">Submit</button>
    </form>
`

    export {
        createCardEventTemplate, 
        createPaginationItemTemplate, 
        createDetailTemplate,
        createMyAccountTemplate,
        createUploadEventTemplate, 
    };