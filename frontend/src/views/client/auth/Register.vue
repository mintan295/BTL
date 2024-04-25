<template>
  <div class="admin-login">
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-8">
          <h1 class="text-center">Đăng Ký</h1>
          <form @submit.prevent="register()">
            <div class="form-group">
              <label for="userId"
                >Mã người dùng <span style="color: red">*</span>
              </label>
              <input
                type="text"
                class="form-control"
                id="userId"
                name="userId"
                @blur="validate()"
                v-model="user.userId"
                v-bind:class="{ 'is-invalid': errors.userId }"
              />
              <div class="invalid-feedback" v-if="errors.userId">
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
                v-model="user.fullName"
                v-bind:class="{ 'is-invalid': errors.fullName }"
              />
              <div class="invalid-feedback" v-if="errors.fullName">
                {{ errors.fullName }}
              </div>
            </div>
            <div class="form-group">
              <label for="password"
                >Mật khẩu <span style="color: red">*</span>
              </label>
              <input
                type="password"
                class="form-control"
                id="password"
                name="password"
                @blur="validate()"
                v-model="user.password"
                v-bind:class="{ 'is-invalid': errors.password }"
              />
              <div class="invalid-feedback" v-if="errors.password">
                {{ errors.password }}
              </div>
            </div>
            <div class="form-group">
              <label for="phone"
                >Số điện thoại <span style="color: red">*</span>
              </label>
              <input
                type="phone"
                class="form-control"
                id="phone"
                name="phone"
                @blur="validate()"
                v-model="user.phone"
                v-bind:class="{ 'is-invalid': errors.phone }"
              />
              <div class="invalid-feedback" v-if="errors.phone">
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
                v-model="user.address"
                v-bind:class="{ 'is-invalid': errors.address }"
              />
              <div class="invalid-feedback" v-if="errors.address">
                {{ errors.address }}
              </div>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block">
                Đăng Ký
              </button>
              <div
                class="invalid-feedback"
                v-if="errors.message"
                style="display: block"
              >
                {{ errors.message }}
              </div>
            </div>
            <router-link :to="{ name: 'user.login' }">
              <div class="text-right" style="font-size: 14px">Đăng nhập</div>
            </router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserLogin",
  data() {
    return {
      errors: {
        userId: "",
        fullName: "",
        password: "",
        phone: "",
        address: "",
        message: "",
      },
      user: {
        userId: "",
        fullName: "",
        password: "",
        phone: "",
        address: "",
      },
    };
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
      if (!this.user.userId) {
        this.errors.userId = "User Id is required";
        isValid = false;
        return;
      }
      if (!this.user.fullName) {
        this.errors.fullName = "Name is required";
        isValid = false;
        return;
      }
      if (!this.user.password) {
        this.errors.password = "Password is required";
        isValid = false;
        return;
      }
      if (!this.user.phone) {
        this.errors.phone = "Phone is required";
        isValid = false;
        return;
      } else if (
        this.user.phone.length === 10 ||
        this.user.phone.length === 11
      ) {
      } else {
        this.errors.phone = "Phone is required length to 10 or 11";
        isValid = false;
        return;
      }

      if (!this.user.address) {
        this.errors.address = "Address is required";
        isValid = false;
        return;
      }
      return isValid;
    },
    register() {
      if (this.validate()) {
        this.$request
          .post("http://localhost:5268/api/auth/register", this.user)
          .then((res) => {
            if (res.data.success) {
              this.$cookies.set("tokenUser", res.data.tokenUser);
              this.$router.push({ name: "user.home" });
            } else {
              this.errors.message = res.data.message;
            }
          });
      }
    },
  },
};
</script>
