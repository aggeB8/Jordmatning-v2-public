<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

function downloadDB() {
    axios
        .post(
            '/api/dlc',
            {
                password: password.value,
            },
            { responseType: 'blob' }
        )
        .then((res) => {
            errRes.value = ''
            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'calculations.csv')
            document.body.appendChild(link)
            link.click()
            setTimeout(() => window.URL.revokeObjectURL(url), 0)
        })
        .catch((err) => {
            if (err.response) {
                switch (err.response.status) {
                    case 401: {
                        errRes.value = 'Fel lösenord'
                        break
                    }
                    case 500: {
                        errRes.value = 'Databas kunde inte hämtas'
                        break
                    }
                }
            }
        })
}

let errRes = ref('')
const password = ref()
</script>

<template>
    <div class="error-box box" v-if="errRes !== ''">
        <p>
            {{ errRes }}
        </p>
    </div>

    <input v-model="password" placeholder="Lösenord" />
    <button @click="downloadDB()">Ladda ned</button>
</template>
