<template>
    <Panel class="loginPage">
        <div class="loginData">
        <h3>Name:</h3>
        <input type="text" placeholder="Insert your name here">
        <h3>Email:</h3>
        <input type="text" placeholder="Insert your mail here">
        </div>
        <Button class="sendData">Log In</Button>
        <ButtonLink class="changePage" to="/register">Need to register? Click here!</ButtonLink>
    </Panel>  
</template>

<style scoped>

    .loginPage {
        margin-left: 200px;
        margin-right: 200px;
    }
    .loginData {
        margin: 20px;
    }
    .sendData {
        margin: auto;
        margin-bottom: 20px;
    }
    input{
        margin-left: 41%;
        size: 30px;
        margin-bottom: 20px;
        padding: 12px 20px;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .changePage, h3 {
        text-align: center;
        text-shadow: 2cm;
        margin-bottom: 20px;
    }
    .changePage {
        color: white;
        background-color: grey;
        margin-left:30%;
        margin-right: 30%;
    }
</style>
