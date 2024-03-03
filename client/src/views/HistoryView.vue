<script setup lang="ts">
import { clearLocalStorage } from '../composables/localStorage.js'
import { ref } from 'vue'
import { getAllLocalStorage } from '@/composables/localStorage'

const calcHistory = getAllLocalStorage()

let errCheck = ref(false)

const calcHistoryToJSON = Object.entries(calcHistory).map((obj: any) => {
    if (isNaN(obj[0])) {
        errCheck.value = true
        return clearLocalStorage()
    } else {
        return JSON.parse(obj[1])
    }
})

function refresh() {
    location.reload()
}
</script>

<template>
    <div id="calc-wrapper" class="box">
        <p>
            Här kan du se dina tidigare mätningar gjord på denna enheten, den
            senaste mätningen hamnar längst ned.
        </p>
        <button @click="clearLocalStorage(), refresh()">Rensa mätningar</button>
        <div
            v-if="!errCheck"
            id="calc"
            class="box"
            v-for="calc in calcHistoryToJSON"
        >
            <table>
                <thead>
                    <tr>
                        <th>Inmatning</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Plats</th>
                        <td>{{ calc.inputs.plats }}</td>
                    </tr>
                    <tr>
                        <th>Id3</th>
                        <td>{{ calc.inputs.id3 }}</td>
                    </tr>
                    <tr>
                        <th>Jordart</th>
                        <td>{{ calc.inputs.jordart }}</td>
                    </tr>
                    <tr>
                        <th>Djup (meter)</th>
                        <td>{{ calc.inputs.djup }}</td>
                    </tr>
                    <tr>
                        <th>S(mg/kg TS)</th>
                        <td>{{ calc.inputs.smgkgts }}</td>
                    </tr>
                    <tr>
                        <th>Ca(mg/kg TS)</th>
                        <td>{{ calc.inputs.camgkgts }}</td>
                    </tr>
                    <tr>
                        <th>Fe(mg/kg Ts)</th>
                        <td>{{ calc.inputs.femgkgts }}</td>
                    </tr>
                    <tr>
                        <th>pH(init)</th>
                        <td>{{ calc.inputs.phinit }}</td>
                    </tr>
                    <tr>
                        <th>pH(ox)</th>
                        <td>{{ calc.inputs.phox }}</td>
                    </tr>
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th>Resultat</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Beskrivning/klassning av jorden</th>
                        <td>
                            {{ calc.result['Beskrivning/klassning av jorden'] }}
                        </td>
                    </tr>
                    <tr v-if="calc.result['Gränszon 1'] !== '-'">
                        <th>Gränszon</th>
                        <td>{{ calc.result['Gränszon 1'] }}</td>
                    </tr>
                    <tr v-if="calc.result['Gränszon 2'] !== '-'">
                        <th>Gränszon</th>
                        <td>{{ calc.result['Gränszon 2'] }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
p {
    font-weight: 300;
}

#calc-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

table {
    font-weight: 400;
    width: 100%;
    text-align: left;
}

table:last-child {
    margin-top: 1rem;
}

th {
    font-weight: 300;
    width: 50%;
}

#calc {
    border: 1px solid var(--c-border);
}
</style>
