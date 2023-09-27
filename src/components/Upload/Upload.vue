<template>
    <div>
        <van-uploader :max-size="2 * 1024 * 1024" :show-upload="false" :after-read="afterRead" :before-read="beforeRead"
            @oversize="onOversize">
            <slot></slot>
        </van-uploader>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { showToast } from 'vant';
import { UploadRequest } from 'src/common'

export default defineComponent({
    setup() {
        const onOversize = () => {
            showToast('文件大小不能超过 2M');
        }
        const beforeRead = (file: any) => {
            if (!['image/jpeg', 'image/png'].includes(file.type)) {
                showToast('请上传 jpg 格式图片');
                return false;
            }
            return true;
        }

        const afterRead = (file: any) => {
            console.log(file);
            const formdata = new FormData();
            formdata.append('file', file.file);

            UploadRequest(formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        }

        return { onOversize, beforeRead, afterRead }
    }
})
</script>