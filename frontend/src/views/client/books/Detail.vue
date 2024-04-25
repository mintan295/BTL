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
                            <h1 class="inner-title text-center mt-5">
                                Chi tiết sản phẩm
                            </h1>
                        </div>
                    </div>
                </div>
                <div class="product-detail">
                    <div class="container my-5">
                        <div class="row">
                            <div class="col-5">
                                <div class="inner-thumb">
                                    <img
                                        v-bind:src="book.thumbnail"
                                        v-bind:alt="book.bookName"
                                    />
                                </div>
                            </div>
                            <div class="col-1"></div>
                            <div class="col-6">
                                <h2 class="inner-title">{{ book.bookName }}</h2>
                                <div class="inner-author" v-if="book.author">
                                    Tác giả: <b>{{ book.author }}</b>
                                </div>
                                <div class="inner-author" v-else>
                                    Tác giả: <b>Cộng đồng</b>
                                </div>
                                <div v-if="publisher.fullName">
                                    <div class="inner-publisher">
                                        Nhà xuất bản:
                                        <b>{{ publisher.fullName }}</b>
                                    </div>
                                </div>
                                <div class="inner-publisher" v-else>
                                    Nhà xuất bản: <b>Cộng đồng</b>
                                </div>
                                <div class="inner-publicYear">
                                    Năm xuất bản: <b>{{ book.publicYear }}</b>
                                </div>
                                <div
                                    class="inner-stock mb-2"
                                    v-if="book.stock >= 1"
                                >
                                    Còn lại <span>{{ book.stock }}</span> sản
                                    phẩm
                                </div>
                                <div v-else class="mb-2">
                                    <b style="color: red"
                                        >Sản phẩm đã hết hàng!</b
                                    >
                                </div>
                                <form
                                    v-if="book.stock"
                                    @submit.prevent="orderBook()"
                                >
                                    <div
                                        class="invalid-feedback"
                                        v-if="errors.message"
                                        style="display: block"
                                    >
                                        {{ errors.message }}
                                    </div>
                                    <button
                                        type="submit"
                                        class="btn btn-buy btn-block"
                                    >
                                        Mượn sách
                                    </button>
                                </form>
                                <hr />
                                <h2 class="text-center">Mô tả sản phẩm</h2>
                                <div
                                    class="inner-desc"
                                    v-html="book.description"
                                ></div>
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

<style scoped>
.product-detail .inner-thumb img {
    width: 100%;
    height: auto;
}

.inner-stock span {
    background-color: #a6cafc;
    color: black;
    border-radius: 20px;
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
    font-weight: bold;
}

hr {
    margin-top: 40px;
}

.btn-buy {
    background-color: #1b55d1;
    font-weight: bold;
    color: white;
}
</style>

<script>
export default {
    name: "DetailBook",
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
            errors: {
                message: "",
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
            book: {
                bookId: "",
                bookName: "",
                thumbnail: "",
                author: "Cộng đồng",
                stock: "",
                rate: "",
                description: "",
                publicYear: "",
            },
            publisher: {
                idPublisher: "",
                fullName: "Cộng đồng",
            },
            order: {
                userId: "",
                bookId: "",
                quantity: "1",
            },
        };
    },
    created() {
        const tokenUser = this.$cookies.get("tokenUser");
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        if (tokenUser) {
            this.getMyUser(tokenUser);
            this.myStyle.backgroundColor = "#" + randomColor;
        }
        this.getBook(this.$route.params.slugBook);
    },
    methods: {
        getBook(slugBook) {
            this.$request
                .get(`http://localhost:5268/api/books/detail/${slugBook}`)
                .then((res) => {
                    if (res.data.success) {
                        this.book = res.data.book;
                        this.publisher = res.data.publisher;
                        if (this.book.stock === 0) {
                            console.log(this.book);
                            this.$request
                                .patch(
                                    `http://localhost:5268/api/books/change-status/${slugBook}`
                                )
                                .then((res) => {
                                    if (res.data.success) {
                                        this.$router.push({
                                            name: "books.list",
                                        });
                                    }
                                });
                        }
                    }
                });
        },
        orderBook() {
            const tokenUser = this.$cookies.get("tokenUser");
            if (tokenUser) {
                this.order.userId = this.myUser.userId;
                this.order.bookId = this.book.bookId;
                this.$request
                    .post("http://localhost:5268/api/order/create", this.order)
                    .then((res) => {
                        if (res.data.success === true) {
                            this.getBook(this.$route.params.slugBook);
                            this.order.quantity = "1";
                            this.$swal.fire("Đã mượn!", "", "success");
                        } else {
                            this.errors.message = res.data.message;
                        }
                    });
            } else {
                this.$swal
                    .fire({
                        title: "Bạn cần có tài khoản để thực hiện mượn sách?",
                        showCancelButton: true,
                        confirmButtonText: "OK",
                    })
                    .then((result) => {
                        if (result.isConfirmed) {
                            this.$router.push({ name: "user.login" });
                        }
                    });
            }
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
