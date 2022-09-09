<template>
    <div>
        <h2>Registro de usuário!</h2>
        <hr>

            <div class="columns is-centered">
        <div class="column is-half">
                <p>Nome</p>
                <input type="text" name=""  placeholder="Nome do Usuário" class="input">
                <p>Email</p>
                <input type="email" name=""  placeholder="example@email.com" class="input">
                <p>Senha</p>
                <input type="password" name=""  placeholder="*******" class="input">
                <button class="button">Cadastrar</button>
        </div>
        </div>
    </div>
</template>

<script>


export default{
    setup() {
        
    },
}

</script>

<style scoped>
    #nameInput{
        width: 500px;
    }
</style>