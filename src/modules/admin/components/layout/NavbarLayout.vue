<template>
    <a-layout-header style="background: #fff">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="onCollapsed"
            style="font-size: 20px; margin-left: -35px" />
        <menu-fold-outlined v-else class="trigger" @click="onCollapsed" style="margin-left: -35px; font-size: 20px" />

        <div class="header-action-container">
            <!-- <a-badge count="2">
                <a-avatar shape="square" size="large" class="navbar-btn">
                    <shopping-cart-outlined class="menu-icon" />
                </a-avatar>
            </a-badge>
            <a-badge count="3">
                <a-avatar shape="square" size="large" class="navbar-btn">
                    <comment-outlined class="menu-icon" />
                </a-avatar>
            </a-badge> -->
            <a-badge>
                <logout-view />
            </a-badge>
        </div>
    </a-layout-header>
</template>

<script lang="ts" setup>

import LogoutView from '@/modules/auth/views/LogoutView.vue';
import { ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();
import {
    ShoppingCartOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    CommentOutlined,
    LogoutOutlined,
} from "@ant-design/icons-vue";

const collapsed = ref<boolean>(false);

const emit = defineEmits<{ (e: "toggleSidebar"): void }>();

const onCollapsed = () => {
    collapsed.value = !collapsed.value;
    emit("toggleSidebar");
};

const logout = () => {
    localStorage.removeItem("token");
    router.push({name:"auth.login"})
}
</script>

<style lang="scss">
.header-action-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
    margin-right: -25px;

    .navbar-btn {
        background-color: rgb(191, 219, 254);
        color: rgb(59, 130, 246);
        width: 32px;
        height: 32px;
        line-height: 32px;
        border-radius: 50% !important;
        padding-right: 0;
        padding-left: 0;
        text-align: center !important;

        :hover {
            cursor: pointer;
        }
    }
}

.ant-layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
}
</style>