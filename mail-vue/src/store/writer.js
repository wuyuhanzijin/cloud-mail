import { defineStore } from 'pinia'

export const useWriterStore = defineStore('writer', {
    state: () => ({
        sendRecipientRecord: [],
        // 进入 /compose 时要执行的动作，'new' | 'reply' | 'forward' | 'draft'
        intent: null,
        intentPayload: null
    }),
    actions: {
        startNew() {
            this.intent = 'new'
            this.intentPayload = null
        },
        startReply(email) {
            this.intent = 'reply'
            this.intentPayload = email
        },
        startForward(email) {
            this.intent = 'forward'
            this.intentPayload = email
        },
        startDraft(draft) {
            this.intent = 'draft'
            this.intentPayload = draft
        },
        clearIntent() {
            this.intent = null
            this.intentPayload = null
        }
    },
    persist: {
        pick: ['sendRecipientRecord'],
    },
})
