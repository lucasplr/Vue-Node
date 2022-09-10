<template>
    <div>
        <h1>Painel ADM!</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Cargo</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                    <td>{{process(user.role)}}</td>
                    <router-link :to="{name: 'edit', params: {id: user.id}}"><button class="button is-success">Editar</button></router-link>  <button class="button is-danger" @click="showMod(user.id)">Deletar</button>
                </tr>
            </tbody>
        </table>



        <div class="modal" :class="{modal: true, 'is-active': showModal}">
        <div class="modal-background"></div>
        <div class="modal-content">
                
            <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                Você quer realmente deletar?
                </p>
                <button class="card-header-icon" aria-label="more options">
                <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </button>
            </header>
            <div class="card-content">
                <div class="content">

                </div>
            </div>
            <footer class="card-footer">
                <a href="#" class="card-footer-item" @click="hideModal()">Cancelar</a>
                <a href="#" class="card-footer-item" @click="deletar()">Deletar</a>
            </footer>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="hideModal()"></button>
        </div>
    </div>
</template>

<script>

import axios from 'axios'


export default {

        created(){

            var req = {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }

            axios.get('http://localhost:8686/users',req).then(res => {
                console.log(res)
                this.users = res.data.users

            }).catch(err => {
                console.log(err)
            })
        },
        data(){
            return{
                users: [],
                showModal: false,
                deleteUserId: -1
            }
        },
        methods:{
            process(value){
                if(value == 1){
                    return 'Administrador'
                }else{
                    return 'Usuário comum'
                }
            },
            hideModal(){
                this.showModal = false
            },
            showMod(id){
                this.showModal = true
                this.deleteUserId = id
            },
            deletar(){

            var req = {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }

                axios.delete('http://localhost:8686/user/'+this.deleteUserId, req).then(res => {
                    console.log(res)
                    this.showModal = false
                    this.users = this.users.filter(u => u.id != this.deleteUserId)

                }).catch(err => {
                    console.log(err)
                    this.showModal = false
                })
            }
        }
}

</script>

<style scoped>

</style>
