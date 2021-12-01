const createDetailTemplate = () => `
    <div class="all-info-detail d-flex flex-row justify-content-evenly flex-wrap">
        <div class="image-detail">
            <img src="https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/haifoto/original/81932_foto-kebetulan-yang-keren-abis.jpg" style="width: 20rem;" alt="">
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
`

const createCardEventTemplate = () => `
    <div class="myCard">
        <img src="https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/haifoto/original/81932_foto-kebetulan-yang-keren-abis.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
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

    export { createCardEventTemplate, createPaginationItemTemplate, createDetailTemplate };