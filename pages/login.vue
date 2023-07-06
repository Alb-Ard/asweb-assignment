<template>
    <Panel class="loginPage">
        <div class="loginData">
        <h3>Username:</h3>
        <input placeholder="Username here">
        <h3>Password:</h3>
        <input type="password" placeholder="Password here">
        </div>
        <NuxtLink class="changePage" to="register">Are you not registered? Click here!</NuxtLink>
        <Button class="sendData">Log In</Button>
    </Panel>  
</template>

<style scoped>

    .loginPage {
        margin: 100px;
    }
    .loginData {
        margin: 20px;
    }
    .sendData {
        margin: auto;
        margin-top: 10px;
    }
    input{
        margin-left: 44%;
        margin-bottom: 20px;
    }
    .changePage, h3 {
        text-align: center;
        text-shadow: 2cm;
        margin-bottom: 20px;
    }
    .changePage {
        color: white;
        background-color: grey;
        margin-left:40%;
    }
</style>