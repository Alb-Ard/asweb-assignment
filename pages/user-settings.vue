<template>
    <main>
        <header>
            <h2>Profile settings</h2>
        </header>
        <p v-if="authentication.userStore.userData === undefined">Loading...</p>
        <p v-else-if="authentication.userStore.userData === null">
            <NuxtLink to="/login">Log in</NuxtLink> or <NuxtLink to="/register">Sign up</NuxtLink> to edit your profile!
        </p>
        <template v-else>
            <template v-if="!isEditEnabled">
                <p class="user-info">Username: {{ authentication.userStore.userData.username }}</p>
                <p class="user-info">Email: {{ censorize(authentication.userStore.userData.email) }}</p>
                <Button v-bind:full-width="true" v-on:click="isEditEnabled = true">Edit</Button>
            </template>
            <template v-else>
                <Panel v-if="hasUpdateFailed" color="danger">
                    <p>There was an error update your account informations, please try again.</p>
                </Panel>
                <form action="#" method="post" v-on:submit.prevent="handleSubmitAsync">
                    <InputLabel for="username" text="Change username" />
                    <InputField v-model="newUsername" type="text" id="username" placeholder="Enter a new username..." />
                    <InputLabel for="email" text="Change email" />
                    <InputField v-model="newEmail" type="email" id="email" placeholder="Enter a new email..." />
                    <InputLabel for="password" text="Change password" />
                    <InputField v-model="newPassword" type="password" id="password" placeholder="Enter a new password..." />
                    <InputLabel for="currentPassword" text="Current password" required />
                    <InputField v-model="currentPassword" type="password" id="currentPassword" placeholder="Enter your current password..." required />
                    <Button v-bind:full-width="true" v-bind:disabled="isLoading" class="save-edits-button" type="submit">Save</Button>
                </form>
            </template>
            <Button v-bind:full-width="true" class="delete-account-button" color="danger" v-on:click="isConfirmDeleteDialogShown = true">Delete account</Button>
        </template>
    </main>
    <dialog v-bind:open="isConfirmDeleteDialogShown" v-bind:ref="e => confirmDeleteDialog = (e as HTMLDialogElement)">
        <Panel v-if="hasDeleteFailed" color="danger">
            <p>There was an error deleting your account, please try again.</p>
        </Panel>
        <p>Are you sure? This action is not reversible, and will delete ALL your data!</p>
        <div>
            <Button v-bind:disabled="isLoading" v-on:click="isConfirmDeleteDialogShown = false">No, go back!</Button>
            <Button v-bind:disabled="isLoading" color="danger" v-on:click="handleDeleteAsync">Yes, delete my account</Button>
        </div>
    </dialog>
</template>

<script setup lang="ts">
import { whileLoadingAsync } from "~/lib/dataStore";

const authentication = useAuthentication();
const newUsername = ref("");
const newEmail = ref("");
const newPassword = ref("");
const currentPassword = ref("");
const confirmDeleteDialog = ref<HTMLDialogElement>();
const isEditEnabled = ref(false);
const isLoading = ref(false);
const isConfirmDeleteDialogShown = ref(false);
const hasUpdateFailed = ref(false);
const hasDeleteFailed = ref(false);

const censorize = (value: string) => {
    const limit = value.length / 10;
    let result = "";
    for (let i = 0; i < value.length; i++) {
        if (i < limit || i > value.length - limit) {
            result += value[i];
        } else {
            result += "*";
        }
    }
    return result;
}

const handleSubmitAsync = async () => {
    hasUpdateFailed.value = !(await whileLoadingAsync(isLoading, authentication.editAsync(newUsername.value, newEmail.value, newPassword.value, currentPassword.value), false));
    if (!hasUpdateFailed.value) {
        isEditEnabled.value = false;
    }
}
const handleDeleteAsync = async () => {
    hasDeleteFailed.value = !(await whileLoadingAsync(isLoading, authentication.deleteAsync(), false));
    if (!hasDeleteFailed.value) {
        navigateTo("/login");
    } 
}

watch(authentication.userStore, () => {
    newUsername.value = authentication.userStore.userData?.username ?? "";
    newEmail.value = authentication.userStore.userData?.email ?? "";
}, { immediate: true });
watch(isConfirmDeleteDialogShown, () => {
    if (!confirmDeleteDialog.value) {
        return;
    }
    if (isConfirmDeleteDialogShown.value) {
        confirmDeleteDialog.value.showModal();
    } else {
        confirmDeleteDialog.value.close();
        hasDeleteFailed.value = false;
    }
})
</script>

<style scoped>
main {
    height: 100%;
    margin-inline: auto;
    width: min(90vw, 32rem);
}

h2 {
    text-align: center;
    margin-bottom: 2rem;
}

label, .user-info {
    display: block;
    margin-block: 1rem;
}

.save-edits-button {
    margin-top: 1rem;
}

.delete-account-button {
    margin-top: 2rem;
}

dialog {
    width: min(100vw, 32rem);
    margin: auto;
    border: 2px solid var(--color-danger-700);
    background-color: var(--color-danger-900);
    padding: 1rem;
    border-radius: 1rem;
}

dialog::backdrop {
    backdrop-filter: blur(16px);
}

dialog > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
    margin-top: 1rem;
}

@media screen and (width <= 1024px) {
    dialog > div {
        grid-template-columns: unset;
        grid-template-rows: 1fr 1fr;
        column-gap: 0;
        row-gap: 2rem;
        margin-top: 2rem;
    }
}
</style>