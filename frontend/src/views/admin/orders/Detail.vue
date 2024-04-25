<template>
    <div class="container menu">
        <div class="row">
            <div class="navbar-main col-2">
                <ul class="nav flex-column">
                    <li class="nav-item user">
                        <a class="nav-link left_bar_item" href="#"
                            ><img
                                src="https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg"
                            />
                            <router-link
                                v-if="typeof myAccount._id !== 'undefined'"
                                :to="{
                                    name: 'admin.accounts.detail',
                                    params: { id: myAccount._id },
                                }"
                            >
                                <button
                                    class="btn btn-acc btn-primary btn-sm mr-2"
                                >
                                    {{ myAccount.accountId }}
                                </button>
                            </router-link></a
                        >
                    </li>
                    <li class="nav-item">
                        <a class="nav-link left_bar_item" href="#"
                            ><router-link to="/admin/dashboard">
                                <i class="fa-solid fa-chart-pie"></i> Tổng
                                quan</router-link
                            ></a
                        >
                    </li>
                    <li class="nav-item">
                        <a class="nav-link left_bar_item" href="#"
                            ><router-link to="/admin/books">
                                <i class="fa-solid fa-list-ul"></i>
                                Sản phẩm</router-link
                            ></a
                        >
                    </li>
                    <li class="nav-item">
                        <a class="nav-link left_bar_item" href="#">
                            <router-link to="/admin/publishers">
                                <i class="fa-solid fa-bookmark"></i>Nhà xuất
                                bản</router-link
                            ></a
                        >
                    </li>
                    <li class="nav-item">
                        <a class="nav-link left_bar_item" href="#">
                            <router-link to="/admin/accounts">
                                <i class="fa-solid fa-users-gear"></i>Tài
                                khoản</router-link
                            ></a
                        >
                    </li>
                    <li class="nav-item">
                        <a class="nav-link left_bar_item" href="#">
                            <router-link to="/admin/users"
                                ><i class="fa-solid fa-users"></i>Người
                                dùng</router-link
                            ></a
                        >
                    </li>
                    <li class="nav-item">
                        <a class="nav-link left_bar_item" href="#">
                            <router-link to="/admin/orders"
                                ><i class="fa-solid fa-basket-shopping"></i>Mượn
                                sách</router-link
                            ></a
                        >
                    </li>
                    <li class="nav-item">
                        <a class="nav-link left_bar_item" href="#">
                            <button
                                class="btn btn-danger btn-sm mr-2 btn-logout"
                                @click="onLogout()"
                            >
                                <i class="fa-solid fa-right-from-bracket"></i>
                                Đăng Xuất
                            </button></a
                        >
                    </li>
                </ul>
            </div>
            <div class="col-10 main">
                <div class="body">
                    <div class="sider">
                        <div class="inner-menu">
                            <ul>
                                <li>
                                    <router-link to="/admin/dashboard"
                                        >Tổng quan</router-link
                                    >
                                </li>
                                <li>
                                    <router-link to="/admin/books"
                                        >Danh sách sản phẩm</router-link
                                    >
                                </li>
                                <li>
                                    <router-link to="/admin/publishers"
                                        >Danh sách nhà xuất bản</router-link
                                    >
                                </li>
                                <li>
                                    <router-link to="/admin/accounts"
                                        >Danh sách tài khoản</router-link
                                    >
                                </li>
                                <li>
                                    <router-link to="/admin/users"
                                        >Danh sách người dùng</router-link
                                    >
                                </li>
                                <li>
                                    <router-link to="/admin/orders"
                                        >Danh sách mượn sách</router-link
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="main">
                        <div class="container">
                            <div class="row">
                                <div class="col-6">
                                    <div class="card mb-3">
                                        <div class="card-header">
                                            Thông tin sách
                                        </div>
                                        <div class="card-body">
                                            <div
                                                class="inner-thumbnail text-center"
                                            >
                                                <img
                                                    v-bind:src="
                                                        order.book.thumbnail
                                                    "
                                                    v-bind:alt="
                                                        order.book.bookName
                                                    "
                                                    width="60%"
                                                    style="object-fit: contain"
                                                />
                                            </div>
                                            <div class="inner-id">
                                                Mã sách:
                                                <span>{{
                                                    order.book.bookId
                                                }}</span>
                                            </div>
                                            <div class="inner-title">
                                                <h3>
                                                    {{ order.book.bookName }}
                                                </h3>
                                            </div>
                                            <div class="inner-author">
                                                Tác giả:
                                                <span>{{
                                                    order.book.author
                                                }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="card mb-3">
                                        <div class="card-header">
                                            Thông tin người mượn
                                        </div>
                                        <div class="card-body">
                                            <div
                                                class="inner-thumbnail text-center"
                                            >
                                                <img
                                                    v-bind:src="
                                                        order.user.avatar
                                                    "
                                                    v-bind:alt="
                                                        order.user.fullName
                                                    "
                                                    width="60%"
                                                    style="object-fit: contain"
                                                />
                                            </div>
                                            <div class="inner-id">
                                                Mã người mượn:
                                                <span>{{
                                                    order.user.userId
                                                }}</span>
                                            </div>
                                            <div class="inner-title">
                                                <h3>
                                                    {{ order.user.fullName }}
                                                </h3>
                                            </div>
                                            <div class="inner-phone">
                                                Số điện thoại:
                                                <span>{{
                                                    order.user.phone
                                                }}</span>
                                            </div>
                                            <div class="inner-address">
                                                Địa chỉ:
                                                <span>{{
                                                    order.user.address
                                                }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "OrderAdmin",
    data() {
        return {
            myAccount: {
                accountId: "",
            },
            order: {
                order: {
                    quantity: "",
                    createdAt: "",
                    updatedAt: "",
                },
                user: {
                    userId: "",
                    fullName: "",
                    avatar: "",
                    address: "",
                    phone: "",
                },
                book: {
                    bookId: "",
                    bookName: "",
                    thumbnail: "",
                    author: "",
                },
            },
        };
    },
    created() {
        const tokenAdmin = this.$cookies.get("tokenAdmin");
        if (!tokenAdmin) {
            this.$router.push({ name: "admin.login" });
        }
        this.getMyAccount(tokenAdmin);
        this.getOrder(this.$route.params.id);
    },
    methods: {
        getOrder(idOrder) {
            this.$request
                .get(`http://localhost:5268/api/admin/orders/detail/${idOrder}`)
                .then((res) => {
                    if (res.data.success) {
                        this.order = res.data.order;
                    }
                });
        },
        getMyAccount(token) {
            console.log(token);
            let tokenMyAcc = {
                tokenAdmin: token,
            };
            this.$request
                .post("http://localhost:5268/api/admin/my-account", tokenMyAcc)
                .then((res) => {
                    if (res.data.success) {
                        this.myAccount = res.data.account;
                        console.log(this.myAccount);
                    }
                });
        },
        onLogout() {
            this.$cookies.remove("tokenAdmin");
            this.$router.push({ name: "admin.login" });
        },
    },
};
</script>
