<template>
    <div>
        <h2>Edição de usuário</h2>
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
                <button class="button" @click="update">Editar</button>
        </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'


export default{
    created(){

        var req = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }

        axios.get('http://localhost:8686/users/' + this.$route.params.id, req).then(res => {
            this.name = res.data.name
            this.email = res.data.email
            this.id = res.data.id
            console.log(res)
        }).catch(err => {
            console.log(err.response)
            this.$router.push({name: 'users'})
        })
    },
    data() {
        return{
            name: '',
            email: '',
            id: -1,
            error: undefined
        }
    },
    methods: {
        update(){

            var req = {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
            axios.put('http://localhost:8686/user',{
                name: this.name,
                email: this.email,
                id: this.id
            }, req).then(res => {
                this.$router.push({name: 'users'})
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