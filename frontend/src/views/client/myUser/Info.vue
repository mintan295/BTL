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
            <div class="container my-5">
                <div class="row justify-content-center">
                    <div class="col-8">
                        <h1 class="text-center mb-5">Thông tin cá nhân</h1>
                        <form @submit.prevent="update()">
                            <div class="form-group">
                                <label for="userId"
                                    >Mã người dùng
                                    <span style="color: red">*</span>
                                </label>
                                <input
                                    readonly
                                    type="text"
                                    class="form-control"
                                    id="userId"
                                    name="userId"
                                    @blur="validate()"
                                    v-model="myUser.userId"
                                    v-bind:class="{
                                        'is-invalid': errors.userId,
                                    }"
                                />
                                <div
                                    class="invalid-feedback"
                                    v-if="errors.userId"
                                >
                                    {{ errors.userId }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="fullName"
                                    >Họ và tên <span style="color: red">*</span>
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="fullName"
                                    name="fullName"
                                    @blur="validate()"
                                    v-model="myUser.fullName"
                                    v-bind:class="{
                                        'is-invalid': errors.fullName,
                                    }"
                                />
                                <div
                                    class="invalid-feedback"
                                    v-if="errors.fullName"
                                >
                                    {{ errors.fullName }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="phone"
                                    >Số điện thoại
                                    <span style="color: red">*</span>
                                </label>
                                <input
                                    type="phone"
                                    class="form-control"
                                    id="phone"
                                    name="phone"
                                    @blur="validate()"
                                    v-model="myUser.phone"
                                    v-bind:class="{
                                        'is-invalid': errors.phone,
                                    }"
                                />
                                <div
                                    class="invalid-feedback"
                                    v-if="errors.phone"
                                >
                                    {{ errors.phone }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="address"
                                    >Địa chỉ <span style="color: red">*</span>
                                </label>
                                <input
                                    type="address"
                                    class="form-control"
                                    id="address"
                                    name="address"
                                    @blur="validate()"
                                    v-model="myUser.address"
                                    v-bind:class="{
                                        'is-invalid': errors.address,
                                    }"
                                />
                                <div
                                    class="invalid-feedback"
                                    v-if="errors.address"
                                >
                                    {{ errors.address }}
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="birthYear">Năm sinh</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="birthYear"
                                    name="birthYear"
                                    v-model="myUser.birthYear"
                                />
                            </div>
                            <div class="form-group">
                                <label for="sex">Giới tính</label>
                                <select
                                    v-model="myUser.sex"
                                    id="sex"
                                    class="form-control"
                                >
                                    <option value="">Không cung cấp</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary">
                                    Cập nhật
                                </button>
                                <div
                                    class="invalid-feedback"
                                    v-if="errors.message"
                                    style="display: block"
                                >
                                    {{ errors.message }}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <footer class="footer">Copyright 2024 by VanB2103573</footer>
    </div>
</template>

<style scoped>
button {
    margin-top: 20px;
}
</style>

<script>
export default {
    name: "InfoUser",
    data() {
        return {
            myStyle: {
                backgroundColor: "",
            },
            show: {
                display: "none",
            },
            errors: {
                userId: "",
                fullName: "",
                avatar: "",
                birthYear: "",
                sex: "",
                address: "",
                phone: "",
                password: "",
                status: "",
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
        validate() {
            let isValid = true;
            this.errors = {
                userId: "",
                fullName: "",
                password: "",
                phone: "",
                address: "",
                message: "",
            };
            if (!this.myUser.userId) {
                this.errors.userId = "User Id is required";
                isValid = false;
                return;
            }
            if (!this.myUser.fullName) {
                this.errors.fullName = "Name is required";
                isValid = false;
                return;
            }
            if (!this.myUser.phone) {
                this.errors.phone = "Phone is required";
                isValid = false;
                return;
            } else if (
                this.myUser.phone.length === 10 ||
                this.myUser.phone.length === 11
            ) {
            } else {
                this.errors.phone = "Phone is required length to 10 or 11";
                isValid = false;
                return;
            }

            if (!this.myUser.address) {
                this.errors.address = "Address is required";
                isValid = false;
                return;
            }
            return isValid;
        },
        update() {
            if (this.validate()) {
                if (this.myUser.userId) {
                    this.$request
                        .patch(
                            "http://localhost:5268/api/my-user/update",
                            this.myUser
                        )
                        .then((res) => {
                            this.getMyUser();
                            this.$swal.fire("Saved!", "", "success");
                        });
                }
            }
        },
        async openUploadWidget() {
            const widget = await window.cloudinary.createUploadWidget(
                {
                    cloud_name: "dyic01hpo",
                    upload_preset: "upload-image-book",
                },
                (error, result) => {
                    if (!error && result && result.event === "success") {
                        this.errors.avatar = "";
                        this.myUser.avatar = result.info.secure_url;
                    }
                }
            );
            widget.open();
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
        showmyUser() {
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
