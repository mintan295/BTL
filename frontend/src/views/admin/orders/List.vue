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
                <div class="main">
                    <h1>Danh sách tài khoản</h1>
                    <div class="card mb-3">
                        <div class="card-header">Danh sách</div>
                        <div class="card-body">
                            <table
                                class="table table-hover table-sm text-center"
                            >
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Hình Ảnh</th>
                                        <th>Tên Sách</th>
                                        <th>Người Mượn</th>
                                        <th>Hành Động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(order, index) in orders">
                                        <td>{{ index + 1 }}</td>
                                        <td>
                                            <img
                                                v-bind:src="
                                                    order.book.thumbnail
                                                "
                                                v-bind:alt="order.book.bookName"
                                                width="100px"
                                            />
                                        </td>
                                        <td>{{ order.book.bookName }}</td>
                                        <td>{{ order.user.fullName }}</td>

                                        <td>
                                            <router-link
                                                :to="{
                                                    name: 'admin.orders.detail',
                                                    params: {
                                                        id: order.order._id,
                                                    },
                                                }"
                                            >
                                                <button
                                                    class="btn btn-secondary mr-2"
                                                >
                                                    Detail
                                                </button>
                                            </router-link>

                                            <router-link
                                                :to="{
                                                    // name: 'admin.orders.edit',
                                                    params: { id: order._id },
                                                }"
                                            >
                                                <button
                                                    class="btn btn-warning mr-2"
                                                >
                                                    Edit
                                                </button>
                                            </router-link>
                                            <button class="btn btn-danger">
                                                <!-- @click="onDelete(order._id) -->
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
            orders: [],
        };
    },
    created() {
        const tokenAdmin = this.$cookies.get("tokenAdmin");
        if (!tokenAdmin) {
            this.$router.push({ name: "admin.login" });
        }
        this.getMyAccount(tokenAdmin);
        this.getAllOrder();
    },
    methods: {
        getAllOrder() {
            this.$request
                .get("http://localhost:5268/api/admin/orders/")
                .then((res) => {
                    if (res.data.success) {
                        this.orders = res.data.orders;
                        console.log(this.orders);
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
