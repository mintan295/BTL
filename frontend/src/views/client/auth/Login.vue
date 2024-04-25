<template>
  <div class="admin-login">
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-8">
          <h1 class="text-center">Đăng Nhập</h1>
          <form @submit.prevent="login()">
            <div class="form-group">
              <label for="userId">Mã người dùng </label>
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
              <label for="password">Mật khẩu</label>
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
              <button type="submit" class="btn btn-primary btn-block">
                Đăng Nhập
              </button>
              <div
                class="invalid-feedback"
                v-if="errors.message"
                style="display: block"
              >
                {{ errors.message }}
              </div>
            </div>
            <router-link :to="{ name: 'user.register' }">
              <div class="text-right" style="font-size: 14px">
                Bạn muốn tạo tài khoản?
              </div>
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
        password: "",
        message: "",
      },
      user: {
        userId: "",
        password: "",
      },
    };
  },
  methods: {
    validate() {
      let isValid = true;
      this.errors = {
        userId: "",
        password: "",
      };
      if (!this.user.userId) {
        this.errors.userId = "User Id is required";
        isValid = false;
        return;
      }
      if (!this.user.password) {
        this.errors.password = "Password is required";
        isValid = false;
        return;
      }
      return isValid;
    },
    login() {
      if (this.validate()) {
        this.$request
          .post("http://localhost:5268/api/auth/login", this.user)
          .then((res) => {
            if (res.data.success) {
              this.$cookies.set("tokenUser", res.data.tokenUser);
              this.$router.go(-1);
            } else {
              this.errors.message = res.data.message;
            }
          });
      }
    },
  },
};
</script>
