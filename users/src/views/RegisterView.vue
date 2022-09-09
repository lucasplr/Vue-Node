<template>
    <div>
        <h2>Registro de usuário!</h2>
        <hr>

            <div class="columns is-centered">
                <div class="column is-half">
                <div v-if="error != undefined">
                    <div class="notification is-danger">
                        <p>{{error}}</p>
                    </div>
                </div>
                <p>Nome</p>
                <input type="text" name=""  placeholder="Nome do Usuário" class="input" v-model="name">
                <p>Email</p>
                <input for='email' type="email" name="" placeholder="example@email.com" class="input" v-model="email">
                <p>Senha</p>
                <input type="text" name=""  placeholder="*******" class="input" v-model="password">
                <button class="button" @click="register">Cadastrar</button>
        </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'


export default{
    data() {
        return{
            name: '',
            password: '',
            email: '',
            error: undefined
        }
    },
    methods: {
        register(){
            axios.post('http://localhost:8686/user',{
                name: this.name,
                email: this.email,
                password: this.password
            }).then(res => {
                this.$router.push({name: 'home'})
                console.log(res)
            }).catch(err => {
                var msgErro = err.response.data.err
                this.error = msgErro
            })
        }
    }

}

</script>

<style scoped>
    #nameInput{
        width: 500px;
    }
</style>