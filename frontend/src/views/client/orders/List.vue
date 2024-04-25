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
                            <h1 class="inner-title text-center mt-5 mb-5">
                                Sách đã mượn
                            </h1>
                        </div>
                    </div>
                </div>

                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Bìa sách</th>
                            <th scope="col">Tên sách</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Ngày mượn</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in orders">
                            <td>
                                <img
                                    v-bind:src="order.book.thumbnail"
                                    v-bind:alt="order.book.bookName"
                                />
                            </td>
                            <td>{{ order.book.bookName }}</td>
                            <td>{{ order.order.quantity }}</td>
                            <td>
                                <span
                                    v-if="
                                        order.order.createdAt ===
                                        order.order.updatedAt
                                    "
                                    >{{
                                        formatDate(order.order.createdAt)
                                    }}</span
                                ><span v-else>{{
                                    formatDate(order.order.updatedAt)
                                }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <footer class="footer">Copyright 2024 by VanB2103573</footer>
    </div>
</template>

<style scoped>
table img {
    max-width: 200px;
    max-height: 300px;
}

table td {
    padding-top: 30px;
}

table {
    font-size: 25px;
}
</style>

<script>
import moment from "moment";
export default {
    name: "OrderBook",
    data() {
        return {
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
            myOrder: {
                giveQuantity: "",
            },
            orders: [],
        };
    },
    created() {
        const tokenUser = this.$cookies.get("tokenUser");
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        if (tokenUser) {
            this.getMyUser(tokenUser);
            this.myStyle.backgroundColor = "#" + randomColor;
        }
    },
    methods: {
        giveOrder(userId, bookId) {
            this.$request
                .patch("http://localhost:5268/api/order/give", {
                    userId: userId,
                    bookId: bookId,
                    giveQuantity: this.myOrder.giveQuantity,
                })
                .then((res) => {
                    this.getAll(res.data.userId);
                    console.log(res.data);
                });
        },
        getAll(userId) {
            this.$request
                .get(`http://localhost:5268/api/order/${userId}`)
                .then((res) => {
                    if (res.data.success) {
                        this.orders = res.data.orders;
                    }
                });
        },
        formatDate(value) {
            if (value) {
                return moment(String(value)).format("DD/MM/YYYY");
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
                        this.getAll(this.myUser.userId);
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
    },
};
</script>
