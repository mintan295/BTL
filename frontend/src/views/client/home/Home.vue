<template>
    <body>
        <nav class="navbar navbar-expand-lg navbar-light product_navbar">
            <div class="container-fluid">
                <a class="navbar-brand navbar-name" href="#">Navbar</a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link active" aria-current="page" href="#">
                            <router-link to="/">
                                <li :style="textHover">Trang chủ</li>
                            </router-link></a
                        >
                        <a class="nav-link active" aria-current="page" href="#"
                            ><router-link to="/books">
                                Tất cả sách
                            </router-link></a
                        >
                    </div>
                </div>

                <div class="acc" v-if="myUser.userId">
                    <div class="acc-item text-center" @click="myInfo()">
                        <i class="fa-regular fa-user mr-2"></i>
                    </div>
                    <div class="acc-item text-center" @click="borrowBook()">
                        <i class="fa-solid fa-clock-rotate-left"></i>
                    </div>
                    <div class="acc-item text-center" @click="logout()">
                        <i class="fa-solid fa-right-from-bracket mr-2"></i>
                    </div>
                </div>
                <div v-else class="inner-auth login-acc">
                    <button type="button" class="acc-btn btn btn-primary">
                        <router-link to="/auth/login"> Login </router-link>
                    </button>
                    <button type="button" class="acc-btn btn btn-primary">
                        <router-link to="/auth/register"> Sign up </router-link>
                    </button>
                </div>
            </div>
        </nav>
        <div class="top">
            <div class="container top_container">
                <div class="row">
                    <div class="col-6 top_left">
                        <h1>Mua những quyển sách yêu thích với giá tốt nhất</h1>
                        <p>
                            Tìm và đọc thêm nhiều cuốn sách bạn yêu thích, đồng
                            thời theo dõi những cuốn sách bạn muốn đọc. Hãy trở
                            thành một phần của cộng đồng những người yêu sách
                            lớn nhất thế giới trên Goodreads
                        </p>
                        <div class="search">
                            <form class="d-flex">
                                <input
                                    class="form-control me-2"
                                    type="search"
                                    placeholder="Tìm sách tại đây "
                                    aria-label="Search"
                                />
                                <button
                                    class="btn-all btn btn-primary"
                                    type="submit"
                                >
                                    Tìm
                                </button>
                            </form>
                        </div>
                    </div>
                    <div class="col-6 top_right">
                        <img src="../../../assets/Capture.png" />
                    </div>
                </div>
            </div>
        </div>
        <div class="best_seller_books">
            <h1 class="text-center title-seller">Sách bán chạy</h1>
            <div id="formList">
                <div id="list">
                    <div v-for="book in books">
                        <div
                            v-if="book.rate === 'good'"
                            class="item"
                            @click="sendDetail(book.slug)"
                        >
                            <div>
                                <img
                                    v-bind:src="book.thumbnail"
                                    v-bind:alt="book.bookName"
                                    class="avatar"
                                />
                                <div class="content">
                                    <h5>{{ book.bookName }}</h5>
                                    <p>{{ book.author }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="direction">
                <button id="next">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                <button id="prev">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </div>
        <div class="favorite">
            <div class="container favorite_book">
                <div class="row">
                    <div class="col-6">
                        <img src="../../../assets/Capture2.png" alt="" />
                    </div>
                    <div class="col-5">
                        <h1>Tìm sách yêu thích</h1>
                        <h1 class="text_primary">Tại đây!</h1>
                        <p class="label">
                            Lorum ipsum, dolor sit amet consectetur adipisicing
                            elit. Ipsum ut pariatur quia. Sint architecto
                            tempore sapiente quibusdam et aliquid impedit ullam
                        </p>
                        <div class="total_views">
                            <div class="total_item total_books">
                                <h2>800+</h2>
                                <p>Đầu sách</p>
                            </div>
                            <div class="total_item total_users">
                                <h2>500+</h2>
                                <p>Tài khoản</p>
                            </div>
                            <div class="total_item total_dowload">
                                <h2>1200+</h2>
                                <p>Lượt mượn</p>
                            </div>
                        </div>
                        <button type="button" class="btn-all btn btn-primary">
                            <router-link to="/books">
                                Khám phá ngay!
                            </router-link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="orther_books">
            <h1 class="title-seller text-center">Sách khác</h1>
            <div id="formList1">
                <div id="list1">
                    <div
                        v-for="book in books"
                        class="item"
                        @click="sendDetail(book.slug)"
                    >
                        <img
                            v-bind:src="book.thumbnail"
                            v-bind:alt="book.bookName"
                            class="avatar"
                        />
                        <div class="content">
                            <h5>{{ book.bookName }}</h5>
                            <p>{{ book.author }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="direction">
                <button id="next1">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                <button id="prev1">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </div>
    </body>
    <footer>
        <div class="footer">
            <div class="foot_item">
                <p>©2024 Library only</p>
                <p>
                    <i class="fa-brands fa-facebook"></i
                    ><i class="fa-brands fa-instagram"></i
                    ><i class="fa-brands fa-twitter"></i
                    ><i class="fa-brands fa-github"></i>
                </p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "ListBookUser",
    data() {
        return {
            textHover: {
                color: "#598cd9",
            },
            myStyle: {
                backgroundColor: "",
            },
            show: {
                display: "none",
            },
            myUser: {
                userId: "",
                fullName: "",
                avatar: "",
                birthYear: "",
                sex: "",
                address: "",
                phone: "",
                password: "",
                charName: "",
                bgc: "",
            },
            books: [],
        };
    },
    mounted() {
        this.$nextTick(() => {
            document.getElementById("prev").addEventListener("click", () => {
                const widthItem = document.querySelector(".item").offsetWidth;
                document.getElementById("formList").scrollLeft += widthItem;
            });

            document.getElementById("next").addEventListener("click", () => {
                const widthItem = document.querySelector(".item").offsetWidth;
                document.getElementById("formList").scrollLeft -= widthItem;
            });

            document.getElementById("prev1").addEventListener("click", () => {
                const widthItem = document.querySelector(".item").offsetWidth;
                document.getElementById("formList1").scrollLeft += widthItem;
            });

            document.getElementById("next1").addEventListener("click", () => {
                const widthItem = document.querySelector(".item").offsetWidth;
                document.getElementById("formList1").scrollLeft -= widthItem;
            });
        });
    },
    created() {
        const tokenUser = this.$cookies.get("tokenUser");
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        if (tokenUser) {
            this.getMyUser(tokenUser);
            this.myStyle.backgroundColor = "#" + randomColor;
        }
        this.getAllBook();
    },
    methods: {
        getAllBook() {
            this.$request.get("http://localhost:5268/api/books").then((res) => {
                if (res.data.success) {
                    this.books = res.data.books;
                }
            });
        },
        sendDetail(slugBook) {
            this.$router.push({ name: "books.detail", params: { slugBook } });
        },
        getMyUser(tokenUser) {
            this.$request
                .get(`http://localhost:5268/api/my-user/${tokenUser}`)
                .then((res) => {
                    if (res.data.success) {
                        this.myUser = res.data.user;
                        const arrName = res.data.user.fullName.split(" ");
                        const name = arrName[arrName.length - 1];

                        this.myUser.charName = name[0].toUpperCase();
                    }
                });
        },
        showUser() {
            if (this.show.display === "none") {
                this.show.display = "block";
            } else {
                this.show.display = "none";
            }
        },
        myInfo() {
            this.$router.push({ name: "user.info" });
        },
        logout() {
            this.$cookies.remove("tokenUser");
            this.$router.push({ name: "user.login" });
        },
        borrowBook() {
            this.$router.push({ name: "books.order" });
        },
    },
};
</script>

<style scoped>
.acc,
.login-acc {
    float: left;
    margin-right: 40px;
    display: flex;
    font-size: 20px;
    text-align: center;
}

.acc-btn {
    margin-left: 10px;
}

.acc-btn a {
    color: white;
    text-decoration: none;
}

.acc-item {
    width: 40px;
    height: 40px;
    background-color: white;
    border-radius: 50%;
    text-align: center;
    margin-left: 10px;
}

.acc-item:hover {
    background-color: #d5f5f5;
    cursor: pointer;
}

.acc-item i {
    text-align: center;
    margin: auto;
    margin-top: 10px;
    color: black;
}

.btn-acc {
    border-radius: 50%;
    background-color: #1b55d1;
    height: 35px;
    width: 35px;
    padding: 0px;
    text-align: center;
    border: none;
}

.btn-acc i {
    color: white;
    text-align: center;
    margin: auto;
}

.top {
    background-color: #d5f5f5;
    height: 80vh;
}

.product_navbar {
    background-color: #a6cafc;
}

.navbar-name {
    color: #1b55d1 !important;
    font-size: 40px;
}

.top_container {
    height: 80vh;
}

.top_left {
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
}

.top_left h1 {
    font-size: 70px;
}

.top_left p {
    margin: 30px 0;
}

.search {
    width: 50vh;
}

.top_right {
    background-color: #d5f5f5;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.top_right img {
    width: 35vh;
    margin-left: 50px;
}

.best_seller_books,
.orther_books {
    height: 100vh;
    /* display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column; */
}

.title-seller {
    margin-top: 10vh;
    margin-bottom: 7vh;
    font-size: 50px;
    font-weight: bold;
}

.card-title {
    font-size: 15px;
}

.card-text {
    color: #838383;
}

.favorite_book h1 {
    font-size: 60px;
}

.favorite_book .text_primary {
    color: #1b55d1;
}

.favorite_book h2 {
    font-size: 40px;
    font-weight: bold;
}

.favorite_book .label {
    margin: 20px 0px;
}

.total_views {
    display: flex;
    justify-self: start;
    align-items: start;
    justify-content: space-between;
}

/* footer */

.footer {
    background-color: #1b242f;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: end;
}

.foot_item {
    height: 5vh;
    background-color: #384152;
    width: 95vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 0;
    color: #6a7580;
}

.foot_item svg,
i {
    margin-left: 8px;
}

.btn-all {
    background-color: #1b55d1;
    font-size: 17px;
    font-weight: bold;
    text-decoration: none;
    color: white;
}

.btn-all a {
    background-color: #1b55d1;
    font-size: 17px;
    font-weight: bold;
    text-decoration: none;
    color: white;
}

/* slide product  */
.direction {
    text-align: center;
}

#next,
#prev {
    background-color: rgb(246, 247, 248);
}

#next:hover {
    opacity: 50%;
}

#prev:hover {
    opacity: 50%;
}

.direction button {
    font-family: cursive;
    font-weight: bold;
    background-color: #ffffff44;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    transition: 0.5s;
    margin: 0 10px;
}

.item {
    border-radius: 5px;
    width: 250px;
    height: 400px;
    background-color: white;
    overflow: hidden;
    transition: 0.5s;
    margin: 10px;
    scroll-snap-align: start;
}

.item .avatar {
    display: block;
    margin: 10px auto 0px;
    max-width: 250px;
    max-height: 310px;
    object-fit: cover;
    border-radius: 5px;
    box-shadow: 0 10px 15px #7e878d;
}

.item .content {
    margin-top: 16px;
    margin-left: 10px;
}

.item .content h5 {
    font-size: 17px;
    /* font-weight: bold; */
    margin: 0px;
}

.item .content p {
    color: #838383;
}

.item .content p {
    color: #838383;
}

.item .content table td {
    padding: 10px 0;
    border-bottom: 1px solid #aec0ce;
}

.item .content table td:nth-child(2) {
    text-align: right;
}

.item .nameGroup {
    text-align: center;
    border-bottom: none !important;
}

#list {
    display: flex;
    width: max-content;
}

#list1 {
    display: flex;
    width: max-content;
}

#formList {
    width: 70vw;
    max-width: 100%;
    overflow: auto;
    margin: 100px auto 50px;
    scroll-behavior: smooth;
    scroll-snap-type: both;
}

#formList1 {
    width: 70vw;
    max-width: 100%;
    overflow: auto;
    margin: 100px auto 50px;
    scroll-behavior: smooth;
    scroll-snap-type: both;
}

#formList::-webkit-scrollbar {
    display: none;
}

#formList1::-webkit-scrollbar {
    display: none;
}

@media screen and (max-width: 1024px) {
    .item {
        width: calc(33.3vw - 20px);
    }

    .direction {
        display: none;
    }
}

@media screen and (max-width: 768px) {
    .item {
        width: calc(50vw - 20px);
    }

    .direction {
        display: none;
    }
}
</style>
