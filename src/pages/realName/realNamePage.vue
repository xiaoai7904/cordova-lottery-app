<template>
    <div class="real-name">
        <Headers title="实名认证" />
        <div class="real-name-content">

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUser } from 'src/hook';
import { onMounted } from 'vue';
export default defineComponent({
    setup() {
        const { getCertificationInfo, addCertificationInfo } = useUser();
        const isCertification = ref(true);

        onMounted(async () => {
            const data: any = await getCertificationInfo()
            isCertification.value = !!data.uid
        })

        return {}
    }
})
</script>

<style scoped lang="scss"></style>