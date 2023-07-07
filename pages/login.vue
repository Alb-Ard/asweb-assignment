<template>
    <Panel class="loginPage">
        <h2>Login</h2>
        <div class="loginData">
        <label for="mail">Email:</label>
        <input type="email" id="mail" placeholder="Insert your mail here">
        <label for="pWord">Password:</label>
        <input type="password" id="pWord" placeholder="Insert your password here">
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
    label {
        align-self: center;
        display: block;
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
    .changePage, label,  h2 {
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
