<template>
  <div class="admin-login">
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-8">
          <h1 class="text-center">Đăng Nhập</h1>
          <form @submit.prevent="login()">
            <div class="form-group">
              <label for="accountId">Mã nhân viên </label>
              <input
                type="text"
                class="form-control"
                id="accountId"
                name="accountId"
                @blur="validate()"
                v-model="account.accountId"
                v-bind:class="{ 'is-invalid': errors.accountId }"
              />
              <div class="invalid-feedback" v-if="errors.accountId">
                {{ errors.accountId }}
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
                v-model="account.password"
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
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminLogin",
  data() {
    return {
      errors: {
        accountId: "",
        password: "",
        message: "",
      },
      account: {
        accountId: "",
        password: "",
      },
    };
  },
  methods: {
    validate() {
      let isValid = true;
      this.errors = {
        accountId: "",
        password: "",
      };
      if (!this.account.accountId) {
        this.errors.accountId = "Account Id is required";
        isValid = false;
        return;
      }
      if (!this.account.password) {
        this.errors.password = "Account Id is required";
        isValid = false;
        return;
      }
      return isValid;
    },
    login() {
      if (this.validate()) {
        this.$request
          .post("http://localhost:5268/api/admin/auth/login", this.account)
          .then((res) => {
            if (res.data.success) {
              this.$cookies.set("tokenAdmin", res.data.tokenAdmin);
              this.$router.push({ name: "admin.dashboard" });
            } else {
              // this.errors = {
              //   accountId: "",
              //   password: "",
              //   message: "",
              // };
              this.errors.message = res.data.message;
            }
          });
      }
    },
  },
};
</script>
