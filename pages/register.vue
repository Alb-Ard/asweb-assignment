<template>
    <Panel level="800" class="register-panel">
        <form action="#" method="post" v-on:submit.prevent="registerAsync">
            <h2>Register</h2>
            <Panel v-if="hasRegisterFailed" color="danger" class="error-panel">
                <p>Incorrect data input! Please try again</p>
            </Panel>
            <InputLabel class="form-label" for="name" text="Username" required />
            <InputField v-model="username" type="text" id="name" placeholder="Insert your name here" required />
            <InputLabel class="form-label" for="email" text="Email" required />
            <InputField v-model="email" type="email" id="email" placeholder="Insert your mail here" required />
            <InputLabel class="form-label" for="password" text="Password" required />
            <InputField v-model="password" type="password" id="password" placeholder="Insert your password here" required />
            <Button 
                v-bind:disabled="isLoading"
                v-bind:full-width="true"
                color="primary"
                class="register-button"
                type="submit"
            >
                Register
            </Button>
            <ButtonLink 
                v-bind:disabled="isLoading"
                v-bind:flat="true"
                to="/login"
            >
                Already registered? Click here!
            </ButtonLink>
        </form>
    </Panel>  
</template>

<script setup lang="ts">
import { whileLoadingAsync } from "~/lib/dataStore";

const authentication = useAuthentication();
const username = ref("");
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const hasRegisterFailed = ref(false);

const registerAsync = async () => {
    await whileLoadingAsync(isLoading, authentication.registerAsync(username.value, email.value, password.value), null);
    hasRegisterFailed.value = !!!authentication.userStore.userData;
    if (!hasRegisterFailed.value) {
        navigateTo("/");
    }
 };
</script>

<style scoped>
    input {
        padding: 1rem;
        width: 100%;
        font-family: inherit;
        border: 1px solid var(--color-grey-100);
        color: var(--color-foreground);
        background-color: var(--color-background);
        border-radius: 4px;
        box-sizing: border-box;
    }

    .form-label {
        display: block;
        margin-bottom: 0.5rem;
    }

    .register-panel {
        margin-inline: auto;
        width: min(95vw, 32rem);
    }

    .register-button, label, h2, p {
        text-align: center;
    }

    .register-button, .error-panel, h2, input {
        margin-bottom: 1rem;
    }
</style>
