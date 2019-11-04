<template>
  <div class="login">
    <el-form label-width="100px" class="demo-ruleForm" ref="loginForm" :model="loginForm" :rules="loginRules">

    <el-form-item label="账号" prop="username">
      <el-input placeholder="请输入账号" v-model="loginForm.username" ref="username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" ref="password"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="goLogin">登录</el-button>
      <el-button>重置</el-button>
    </el-form-item>
  </el-form>

  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }]
      }

    }
  },


  methods:{
    goLogin(){
      var self = this;
        if(!this.loginForm.username) return
        if(!this.loginForm.password) return

        //this.$refs.loginForm.validate  需要注意绑定元素
        //1、el-form rules，model属性绑定，ref标识
        //2、el-form-item prop属性绑定
        this.$refs.loginForm.validate( valid => {
           console.log(valid);
           if(valid) {
              // localStorage.setItem('token', 'abcde')
              // if(this.loginForm.name === 'admin' && this.loginForm.pass === '1') {
              //   this.$router.push('/dashboard')
              // } else {
              //   this.$message.error('账号或密码错了哦！！！');
              // }
              console.log(self.$store)
              self.$store.dispatch('user/login', this.loginForm)
              .then(() => {
                // this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                this.$router.push('/dashboard')
               
              })
              .catch(() => {
                this.$message.error('账号或密码错了哦！！！');
              })

           } else {
             console.log('no');
             return false;

           }

        })




    }

  }
}
</script>

<style>
.login{
  width: 400px;
  /* height:300px; */
  padding: 10px 10px;
  border: 1px solid #cccccc;
  text-align: center;

  margin: 0 auto;
}

</style>
