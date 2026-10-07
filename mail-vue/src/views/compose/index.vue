<template>
  <writer ref="writerRef" />
</template>

<script setup>
import {onActivated, onMounted, ref} from 'vue'
import writer from '@/layout/write/index.vue'
import {useWriterStore} from '@/store/writer.js'

defineOptions({
  name: 'compose'
})

const writerRef = ref(null)
const writerStore = useWriterStore()

// 由各入口写入 writerStore 的 intent，这里在页面挂载/激活时消费一次
function applyIntent() {
  const payload = writerStore.intentPayload
  switch (writerStore.intent) {
    case 'reply':
      writerRef.value?.openReply(payload)
      break
    case 'forward':
      writerRef.value?.openForward(payload)
      break
    case 'draft':
      writerRef.value?.openDraft(payload)
      break
    default:
      writerRef.value?.open()
  }
  writerStore.clearIntent()
}

onMounted(() => applyIntent())

// 页面被 keep-alive 缓存后，只有出现新的 intent 才重新初始化
onActivated(() => {
  if (writerStore.intent) applyIntent()
})
</script>
