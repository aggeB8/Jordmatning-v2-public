<script setup lang="ts">
import { ref } from 'vue'
import CalculationTable from '@/components/CalculationTable.vue'
import { postCalculation } from '../composables/apicalls.js'
import { setLocalStorage } from '../composables/localStorage.js'
import router from '@/router'

let errRes = ref('')

let calcAmt = ref(1)
let calcMaxAmt = 10

function editCalculations(action: string) {
    switch (action) {
        case 'add':
            if (calcAmt.value != calcMaxAmt) {
                calcAmt.value++
            }
            break
        case 'remove':
            if (calcAmt.value > 1) {
                calcAmt.value--
            }
            break
    }
}

let calcTable = ref()

function getResults() {
    errRes.value = ''

    const calcData = calcTable.value.map((table: any) => {
        return `{
                "plats":"${table.selectedCity}",
                "id3":"${table.dataObj.id3.value.value}",
                "jordart":"${table.dataObj.jordart.value.value}",
                "djup":"${table.dataObj.djup.value.value}",
                "smgkgts":"${table.dataObj.smgkgts.value.value}",
                "camgkgts":"${table.dataObj.camgkgts.value.value}",
                "femgkgts":"${table.dataObj.femgkgts.value.value}",
                "phinit":"${table.dataObj.phinit.value.value}",
                "phox":"${table.dataObj.phox.value.value}"
            }`
    })

    postCalculation(calcData).then((res) => {
        switch (typeof res) {
            case 'object': {
                setLocalStorage(res)
                router.push('/history')
                break
            }
            case 'string': {
                switch (res) {
                    case 'empty-fields': {
                        errRes.value =
                            'Något formulär innehåller tomma inmatningar. Fyll i de tomma rutorna och pröva igen.'
                        break
                    }
                    case 'NaN': {
                        errRes.value =
                            'Något formulärs andra sektion innehåller värde(n) som inte är siffra. Gör de till siffror och pröva igen.'
                        break
                    }
                    case 'db-err': {
                        errRes.value =
                            'Oväntat fel inträffade. Kontakta brannmarkdev@gmail.com.'
                        break
                    }
                    default: {
                        errRes.value =
                            'Oväntat fel inträffade. Kontakta brannmarkdev@gmail.com.'
                        console.log(res)
                        break
                    }
                }
            }
        }
    })
}
</script>

<template>
    <div id="control-panel-wrapper" class="box">
        <div>
            <button @click="editCalculations('add')">
                Lägg till beräkning
            </button>
            <button @click="editCalculations('remove')">
                Ta bort beräkning
            </button>
            <button @click="getResults" id="result-button">Se resultat</button>
        </div>
        <p id="calc-amt">
            Antal beräkningar: <span>{{ calcAmt }} / {{ calcMaxAmt }}</span>
        </p>
    </div>
    <div class="error-box box" v-if="errRes !== ''">
        <p>
            {{ errRes }}
        </p>
    </div>
    <CalculationTable v-for="calc in calcAmt" ref="calcTable" />
</template>

<style scoped>
#control-panel-wrapper {
    border-bottom: 1px solid var(--c-border);
    padding: 1rem;
}

#calc-amt {
    font-weight: 300;
}

span {
    font-family: Geist Mono;
}

#control-panel-wrapper > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

#result-button {
    margin-left: auto;
}
</style>
