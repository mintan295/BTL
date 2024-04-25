<template>
    <div class="list-book-client">
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

        <div>
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="box-head">
                            <h1 class="h1-title text-center">Tất cả sách</h1>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div
                        v-for="book in books"
                        class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 mb-3"
                    >
                        <div class="col">
                            <div
                                class="item product-item"
                                @click="sendDetail(book.slug)"
                            >
                                <img
                                    v-bind:src="book.thumbnail"
                                    v-bind:alt="book.bookName"
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
        </div>
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
    </div>
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

/* Product */
.item {
    border-radius: 5px;
    width: 250px;
    height: 400px;
    background-color: rgb(255, 255, 255);
    overflow: hidden;
    transition: transform 0.2s ease;
    /* border: 1px solid #ddd; */
}

.item img {
    display: block;
    margin: 10px auto 0px;
    max-width: 250px;
    max-height: 310px;
    object-fit: cover;
    border-radius: 5px;
}

.item .content {
    margin-top: 12px;
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
.item:hover {
    transform: translate(-7px, -7px);
}

.h1-title {
    margin-top: 30px;
    margin-bottom: 50px;
}
</style>
