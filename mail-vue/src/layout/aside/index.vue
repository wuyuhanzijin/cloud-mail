<template>
  <div class="aside-inner" :class="{ 'is-collapsed': collapsed }">
    <el-scrollbar class="scroll">
      <div>
        <div class="title">
          <span class="brand-mark">
            <Icon icon="mdi:email-outline" width="16" height="16"/>
          </span>
          <span class="brand-name">{{ settingStore.settings.title }}</span>
        </div>
        <el-menu :collapse="collapsed" :collapse-transition="false" text-color="#fff" active-text-color="#fff" class="mail-menu">
          <el-menu-item @click="router.push({name: 'email'})" index="email"
                        :class="route.meta.name === 'email' ? 'choose-item' : ''">
            <Icon icon="hugeicons:mailbox-01" width="20" height="20" />
            <template #title><span class="menu-name">{{$t('inbox')}}</span></template>
          </el-menu-item>
          <el-menu-item @click="router.push({name: 'send'})" index="send" v-perm="'email:send'"
                        :class="route.meta.name === 'send' ? 'choose-item' : ''">
            <Icon icon="cil:send" width="20" height="20" />
            <template #title><span class="menu-name">{{$t('sent')}}</span></template>
          </el-menu-item>
          <el-menu-item @click="router.push({name: 'draft'})" index="draft" v-perm="'email:send'"
                        :class="route.meta.name === 'draft' ? 'choose-item' : ''">
            <Icon icon="ep:document" width="19" height="19" />
            <template #title><span class="menu-name">{{$t('drafts')}}</span></template>
          </el-menu-item>
          <el-menu-item @click="router.push({name: 'star'})" index="star"
                        :class="route.meta.name === 'star' ? 'choose-item' : ''">
            <Icon icon="solar:star-line-duotone" width="20" height="20" />
            <template #title><span class="menu-name">{{$t('starred')}}</span></template>
          </el-menu-item>
          <el-menu-item @click="router.push({name: 'setting'})" index="setting"
                        :class="route.meta.name === 'setting' ? 'choose-item' : ''">
            <Icon icon="fluent:settings-48-regular" width="20" height="20" />
            <template #title><span class="menu-name">{{$t('settings')}}</span></template>
          </el-menu-item>

          <template v-if="canManage">
            <div class="manage-title" :class="{ 'is-open': manageOpen }" @click="manageOpen = !manageOpen">
              <span>{{$t('manage')}}</span>
              <Icon class="manage-caret" width="16" height="16"
                    :icon="manageOpen ? 'fluent:chevron-up-16-regular' : 'fluent:chevron-down-16-regular'"/>
            </div>
            <div class="manage-group" v-show="manageOpen || collapsed">
              <el-menu-item @click="router.push({name: 'analysis'})" index="analysis" v-perm="'analysis:query'"
                            :class="route.meta.name === 'analysis' ? 'choose-item' : ''">
                <Icon icon="fluent:data-pie-20-regular" width="24" height="24" />
                <template #title><span class="menu-name">{{$t('analytics')}}</span></template>
              </el-menu-item>
              <el-menu-item @click="router.push({name: 'user'})" index="setting" v-perm="'user:query'"
                            :class="route.meta.name === 'user' ? 'choose-item' : ''">
                <Icon icon="si:user-alt-2-line" width="20" height="20" />
                <template #title><span class="menu-name">{{$t('allUsers')}}</span></template>
              </el-menu-item>
              <el-menu-item @click="router.push({name: 'all-email'})" index="all-email" v-perm="'all-email:query'"
                            :class="route.meta.name === 'all-email' ? 'choose-item' : ''">
                <Icon icon="fluent:mail-list-28-regular" width="22" height="22" />
                <template #title><span class="menu-name">{{$t('allMail')}}</span></template>
              </el-menu-item>
              <el-menu-item @click="router.push({name: 'role'})" index="setting" v-perm="'role:query'"
                            :class="route.meta.name === 'role' ? 'choose-item' : ''">
                <Icon icon="fluent:lock-closed-16-regular" width="22" height="22" />
                <template #title><span class="menu-name">{{$t('permissions')}}</span></template>
              </el-menu-item>
              <el-menu-item @click="router.push({name: 'reg-key'})" index="reg-key" v-perm="'reg-key:query'"
                            :class="route.meta.name === 'reg-key' ? 'choose-item' : ''">
                <Icon icon="fluent:fingerprint-20-filled" width="22" height="22" />
                <template #title><span class="menu-name">{{$t('inviteCode')}}</span></template>
              </el-menu-item>
              <el-menu-item @click="router.push({name: 'sys-setting'})" index="sys-setting" v-perm="'setting:query'"
                            :class="route.meta.name === 'sys-setting' ? 'choose-item' : ''">
                <Icon icon="eos-icons:system-ok-outlined" width="18" height="18" />
                <template #title><span class="menu-name">{{$t('SystemSettings')}}</span></template>
              </el-menu-item>
            </div>
          </template>
        </el-menu>
      </div>
    </el-scrollbar>

    <div class="aside-footer">
      <button type="button" class="account-trigger" @click="uiStore.toggleAccountPanel()">
        <span class="account-avatar">{{ accountInitial }}</span>
        <span class="account-meta">
          <span class="account-mail">{{ currentEmail }}</span>
          <span class="account-label">{{ $t('account') }}</span>
        </span>
        <Icon class="account-caret" icon="fluent:chevron-up-16-regular" width="16" height="16"/>
      </button>
    </div>
  </div>
</template>

<script setup>
import router from "@/router/index.js";
import { useRoute } from "vue-router";
import {Icon} from "@iconify/vue";
import {computed, ref} from "vue";
import {useSettingStore} from "@/store/setting.js";
import {useUiStore} from "@/store/ui.js";
import {useAccountStore} from "@/store/account.js";
import {useUserStore} from "@/store/user.js";

defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})

const settingStore = useSettingStore();
const uiStore = useUiStore();
const accountStore = useAccountStore();
const userStore = useUserStore();
const route = useRoute();

const MANAGE_PERMS = ['all-email:query', 'user:query', 'role:query', 'setting:query', 'analysis:query', 'reg-key:query']

const manageOpen = ref(false)

const canManage = computed(() => {
  const permKeys = userStore.user?.permKeys
  if (!permKeys?.length) return false
  return permKeys.includes('*') || MANAGE_PERMS.some(key => permKeys.includes(key))
})

const currentEmail = computed(() => {
  return accountStore.currentAccount?.email || userStore.user?.email || ''
})

const accountInitial = computed(() => {
  return (currentEmail.value[0] || '?').toUpperCase()
})

</script>

<style lang="scss" scoped>
.aside-inner {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--aside-backgound);
  overflow: hidden;

  .scroll {
    flex: 1;
    min-height: 0;
  }
}

.title {
  margin: 14px 8px 8px;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 8px;
  color: rgba(255, 255, 255, 0.94);

  .brand-mark {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    color: #ffffff;
    background: var(--el-color-primary);
  }

  .brand-name {
    font-size: 14.5px;
    font-weight: 600;
    letter-spacing: 0.01em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.manage-title {
  margin: 16px 0 6px;
  padding: 2px 18px;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.45);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  transition: color 0.15s ease;

  .manage-caret {
    opacity: 0.85;
  }

  &:hover {
    color: rgba(255, 255, 255, 0.72);
  }
}

.manage-group {
  padding-top: 2px;
  margin-top: 2px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

:deep(.el-menu-item) {
  margin: 1px 8px !important;
  border-radius: 7px;
  height: 34px;
  line-height: 34px;
  padding: 0 10px !important;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.72);
  transition: background 0.15s ease, color 0.15s ease;

  svg {
    width: 18px !important;
    height: 18px !important;
  }
}

.choose-item {
  font-weight: 500;
  color: #ffffff !important;
  background: var(--aside-menu-active-background) !important;
}

@media (hover: hover) {
  :deep(.el-menu-item:hover) {
    background: rgba(255, 255, 255, 0.06) !important;
    color: #ffffff;
  }
}

.menu-name {
  user-select: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

:deep(.el-scrollbar__wrap--hidden-default ) {
  background: var(--aside-backgound) !important;
}

:deep(.el-menu-item) {
  background: var(--aside-backgound);
}

:deep(.el-menu) {
  background: var(--aside-backgound);
}

.el-menu {
  border-right: 0;
  width: 224px;
}

.mail-menu {
  margin-top: 2px;
  padding-bottom: 8px;
}

/* 收起状态：只留图标 */
.mail-menu.el-menu--collapse {
  width: 64px;
}

.is-collapsed {
  .brand-name {
    display: none;
  }

  .title {
    justify-content: center;
    padding: 0;
  }

  .manage-title {
    display: none;
  }

  .manage-group {
    margin-top: 10px;
    border-top: none;
  }

  :deep(.el-menu-item) {
    justify-content: center;
    gap: 0;
    padding: 0 !important;
  }

  /* Element 收起态把图标塞进一个绝对定位的 trigger，左右各留 20px，
     既会把图标压扁、也让图标靠左。这里复位内边距并强制居中。 */
  :deep(.el-menu-tooltip__trigger) {
    padding: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .account-trigger {
    justify-content: center;
    padding: 6px 0;
  }

  .account-meta,
  .account-caret {
    display: none;
  }
}

/* 左下角：多邮箱入口 */
.aside-footer {
  flex-shrink: 0;
  padding: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.account-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 8px;
  border-radius: 8px;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  text-align: left;
  transition: background 0.15s ease;
}

.account-trigger:hover {
  background: rgba(255, 255, 255, 0.06);
}

.account-avatar {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 7px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
}

.account-meta {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  line-height: 1.35;
}

.account-mail {
  font-size: 12.5px;
  color: rgba(255, 255, 255, 0.88);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.account-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.42);
}

.account-caret {
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.45);
}

:deep(.el-divider__text) {
  background: var(--aside-backgound);
  color: #FFFFFF;
}
</style>
