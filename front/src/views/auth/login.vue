<template>
  <div>
    <div class="home">
      <div id="container" class="container">
        <!-- 이메일 인증 전 정보 입력 -->
        <div v-show="!userSend" class="form-container sign-up-container">
          <form class="form" @submit.prevent="handleSubmit(clickUserSend)">
            <h1 class="title">Create Account</h1>
            <input v-model="name" type="text" placeholder="Name" class="input" />
            <b-form-select v-model="selected" class="select" :options="options"></b-form-select>
            <input v-model="userId" type="userid" placeholder="User Id" class="input" />
            <input v-model="password" type="Password" placeholder="Password" class="input" />
            <input v-model="phone" type="number" placeholder="Phone" class="input" />
            <button class="button" @click="clickUserSend">Sign Up</button>
          </form>
        </div>
        <!-- 이메일 인증코드 전송 -->
        <div v-show="userSend && !emailSend" class="form-container sign-up-container">
          <form class="form" @submit.prevent="handleSubmit(sendEmail)">
            <p class="title">
              인증메일 전송
              <span class="status">> 이메일 인증 </span>
            </p>
            <p class="subtitle" style="margin: 20px">
              인증 과정에서 사용하실<br />
              이메일 주소를 입력해 주세요.
            </p>
            <b-card-text>
              <div class="emailInput">
                <b-input-group append="@" class="mr-2">
                  <b-form-input v-model="emailId" placeholder="이메일 아이디"></b-form-input>
                </b-input-group>
                <p>uvc-company.com</p>
              </div>
              <b-button class="Ingle" block @click="sendEmail">인증메일 보내기</b-button>
              <p class="footer">
                - 입력하신 이메일로 인증코드가 전송됩니다.<br />
                - 이메일은 추후 계정 찾기에 이용됩니다.
              </p>
            </b-card-text>
          </form>
        </div>
        <!-- 인증코드 입력하고 가입 끝내기 -->
        <div v-show="emailSend" class="form-container sign-up-container">
          <form class="form" @submit.prevent="handleSubmit(authCode, resend, newEmail)">
            <p class="title">
              <span class="status">인증메일 전송</span>
              > 이메일 인증
            </p>
            <p class="subtitle" style="margin: 20px">이메일로 발송된 인증코드를<br />입력해 주세요.</p>
            <b-card-text>
              <!-- 백 서버 연결 후 이메일 제대로 담기게 기능 구현 예정 -->
              <b-input v-model="emailDi" class="emailDi-font-size" disabled></b-input>
              <b-input v-model="inputCode" class="mt-3 mb-3" maxlength="6" placeholder="인증코드 입력"></b-input>
              <b-button block class="Ingle" @click="authCode">인증 확인</b-button>
            </b-card-text>
            <b-list-group flush>
              <b-list-group-item>
                <div>
                  <button id="show-btn" class="check-button" @click="$bvModal.show('emailModal')">
                    인증메일을 받지 못하셨나요?
                  </button>
                  <b-modal id="emailModal" hide-footer>
                    <template #modal-title>인증메일을 받지 못하셨나요?</template>
                    <div class="d-block text-center">
                      <b-button block @click="resend">이메일 재전송하기</b-button>
                    </div>
                    <b-button class="mt-3" block @click="newEmail">다른 이메일로 전송하기</b-button>
                  </b-modal>
                </div>
              </b-list-group-item>
            </b-list-group>
          </form>
        </div>
        <!-- 로그인 화면 -->
        <div class="form-container sign-in-container">
          <form v-if="!userSend" class="form" @submit.prevent="handleSubmit(login)">
            <h1 class="title">Sign in</h1>
            <input v-model="userId" type="userid" placeholder="userId" class="input" />
            <input v-model="password" type="password" placeholder="Password" class="input" />
            <button class="button" @click="login">Sign In</button>
          </form>
        </div>
        <!-- 로그인&회원가입 권유하는 화면들 -->
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1 class="title">Welcome Back!</h1>
              <p class="subtitle">To keep connected with us please login with your personal info</p>
              <button id="signIn" class="transition-button">Sign In</button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1 class="title">Good Day!</h1>
              <p class="subtitle">Enter your personal details and start journey with us</p>
              <button id="signUp" class="transition-button">Sign Up</button>
            </div>
            <img src="../../../public/img/login.jpg" />
          </div>
        </div>
      </div>
      <div class="area">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'HomeView',
  data() {
    return {
      userSend: false,
      emailSend: false,
      emailId: '',
      emailDi: '',
      tempEmail: '',
      inputCode: '',
      name: '',
      userId: '',
      password: '',
      email: '',
      phone: '',
      selected: null,
      options: [
        { value: null, text: '직급을 선택하세요.', disabled: true },
        { value: '팀장', text: '팀장' },
        { value: '직원', text: '직원' },
        { value: '관리자', text: '관리자', disabled: true }
      ]
    }
  },
  mounted() {
    const signUpButton = document.getElementById('signUp')
    const signInButton = document.getElementById('signIn')
    const container = document.getElementById('container')

    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active')
    })

    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active')
    })
  },
  methods: {
    clickUserSend() {
      this.userSend = true
      this.emailSend = false
      console.log(this.userId)
    },
    async signUp() {
      const axiosBody = {
        name: this.name,
        userid: this.userId,
        password: this.password,
        email: this.emailId,
        role: this.selected,
        phone: this.phone
      }
      console.log('/auths/sign - axiosBody : ', axiosBody)
      await axios
        .post(process.env.VUE_APP_SERVER + '/auths/sign', axiosBody)
        .then(async res => {
          console.log('/auths/sign - response: ', res)
          alert('회원가입이 완료 되었습니다.')
          this.$router.go(0)
        })
        .catch(err => {
          console.log('errerr', err)
        })
    },

    async login() {
      const axiosBody = {
        userid: this.userId,
        password: this.password
      }
      await axios
        .post(process.env.VUE_APP_SERVER + '/auths/login', axiosBody)
        .then(async res => {
          console.log(res)
          const code = res.data
          localStorage.setItem('token', res.data.token)
          console.log('/auths/login - response: ', code)
          this.$router.push('/edukit/list')
        })
        .catch(err => {
          alert('다시 시도해주세요!')
          console.log('/auths/login - error: ', err)
          this.$router.go(0)
        })
    },
    sendEmail() {
      const email = `${this.emailId}@gmail.com`
      this.tempEmail = email
      this.emailDi = `${this.emailId}@uvc-company.com`
      alert(`"${this.emailId}@uvc-company.com"로 이메일을 발송합니다.`)
      axios
        .get(process.env.VUE_APP_SERVER + `/mails/send-mail/${email}`)
        .then(response => {
          console.log('email sent : ', response)
          if (localStorage.getItem('auth')) {
            localStorage.removeItem('auth')
          }
          this.emailSend = true
          console.log(response.data)
          localStorage.setItem('auth', JSON.stringify(response.data.hash))
        })
        .catch(error => {
          alert(`이메일을 다시 발송해주세요.`)
          console.log('email fail : ', error)
        })
    },

    authCode() {
      const email = `${this.emailId}@gmail.com`
      const user = JSON.parse(localStorage.getItem('auth'))
      console.log('유저 : ', user)
      axios
        .post(process.env.VUE_APP_SERVER + '/mails/check-code', {
          email: email,
          code: this.inputCode,
          hash: user
        })
        .then(response => {
          console.log('code success : ', response)
          localStorage.removeItem('auth')
          this.signUp()
        })
        .catch(error => {
          console.log('code fail : ', error)
          alert('인증에 실패하셨습니다. 입력하신 인증코드를 다시 확인해 주세요!')
        })
    },

    resend() {
      this.sendEmail()
      this.$bvModal.hide('emailModal')
    },
    newEmail() {
      this.emailSend = false
      console.log('이메일', this.emailSend)
      this.$bvModal.hide('emailModal')
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

.home {
  box-sizing: border-box;
  background: #024d92;
  /* background: #b7d1ea; */
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
}

.title {
  font-weight: bold;
  margin: 0;
}

.subtitle {
  font-size: 15px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

.button {
  border-radius: 20px;
  border: 1px solid #024d92;
  background-color: #024d92;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  margin-top: 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

.button:active {
  transform: scale(0.95);
}

.button:focus {
  outline: none;
}

.input:focus {
  outline: none;
}

.transition-button {
  background-color: transparent;
  border: 2.5px solid #fff;

  border-radius: 20px;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
}

.transition-button:focus {
  outline: none;
}

.form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

.input {
  background-color: #eee;
  border-radius: 5px;
  border: none;
  padding: 8px 11px;
  margin: 8px 0;
  width: 100%;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 530px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}
.status {
  color: rgba(180, 180, 180, 0.501);
}
.footer {
  border-top: 1px solid rgb(135, 135, 135);
  color: rgb(135, 135, 135);
  margin-top: 30px;
  padding-top: 30px;
  font-size: 12px;
}
.select {
  margin-top: 5px;
  margin-bottom: 5px;
  height: 40px;
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 25s linear infinite;
  bottom: -150px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}

.emailDi-font-size {
  font-size: 0.9rem;
  height: 40px;
  padding: 12px;
}
.check-button {
  background: none;
  border: none;
  color: rgb(113, 113, 113);
  font-size: 0.7rem;
  text-decoration: underline;
}
.check-button:focus {
  outline: none;
}
</style>
