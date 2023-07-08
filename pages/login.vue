<template>
    <Panel level="800" class="login-panel">
        <form action="#" method="post" v-on:submit.prevent="loginAsync">
            <h2>Login</h2>
            <Panel v-if="hasLastLoginFailed" color="danger" class="error-panel">
                <p>Incorrect data input! Please try again</p>
            </Panel>
            <label for="email">Email:</label>
            <input v-model="email" type="email" id="email" placeholder="Insert your mail here" required>
            <label for="password">Password:</label>
            <input v-model="password" type="password" id="password" placeholder="Insert your password here" required>
            <Button 
                v-bind:disabled="isLoading"
                v-bind:full-width="true"
                type="submit"
                color="primary"
                class="login-button"
            >
                Log In
            </Button>
            <ButtonLink 
                v-bind:disabled="isLoading"
                v-bind:flat="true"
                to="/register"
            >
                Need to register? Click here!
            </ButtonLink>
        </form>
    </Panel>  
</template>

<script setup lang="ts">
import { whileLoadingAsync } from "~/lib/dataStore";

const authentication = useAuthentication();
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const hasLastLoginFailed = ref(false);

const loginAsync = async () => {
    await whileLoadingAsync(isLoading, authentication.loginAsync(email.value, password.value));
    hasLastLoginFailed.value = !!!authentication.userStore.userData;
    if(!hasLastLoginFailed.value) {
        navigateTo("/");
    }
}

</script>

<style scoped>
    label {
        display: block;
        margin-bottom: 0.5rem;
    }

    input{
        padding: 1rem;
        width: 100%;
        font-family: inherit;
        border: 1px solid var(--color-grey-100);
        color: var(--color-foreground);
        background-color: var(--color-background);
        border-radius: 4px;
        box-sizing: border-box;
    }

    .login-panel {
        margin-inline: auto;
        width: min(95vw, 32rem);
    }

    .login-button, label, h2, p {
        text-align: center;
    }

    .login-button, .error-panel, h2, input {
        margin-bottom: 1rem;
    }
</style>
