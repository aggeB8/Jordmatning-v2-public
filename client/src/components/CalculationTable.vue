<script setup lang="ts">
import CitySelect from './CitySelect.vue'
import { ref } from 'vue'

let nanError = ref(false)
let selectedCity = ref()

let dataObj = {
    id3: ref(),
    jordart: ref(),
    djup: ref(),
    smgkgts: ref(),
    camgkgts: ref(),
    femgkgts: ref(),
    phinit: ref(),
    phox: ref(),
}

function liveNanErrorValidation(num: any) {
    //set error class
    if (isNaN(num.value)) {
        num.className = 'input-error'
    } else {
        num.className = ''
    }

    //get all classes and see if errors exist
    const inputErrors = Object.entries(dataObj).map((x) => {
        return x[1].value.className
    })
    if (inputErrors.includes('input-error')) {
        nanError.value = true
    } else {
        nanError.value = false
    }
}

defineExpose({
    dataObj,
    selectedCity,
})
</script>

<template>
    <div class="error-box box" v-if="nanError">
        <p>
            Detta formulär kan inte skickas på grund av följande fel: <br />
            Bara siffror tillåtna för andra sektionen. (0 - 9, punkt för
            decimaler).<br />
            Felaktig inmatning är markerad i rött.
        </p>
    </div>

    <div class="calc-table box">
        <div>
            <p class="input-label">Plats</p>
            <select v-model="selectedCity">
                <CitySelect />
            </select>
        </div>
        <div>
            <p class="input-label">Id3</p>
            <input name="id3" ref="dataObj.id3" placeholder="*" />
        </div>
        <div>
            <p class="input-label">Jordart</p>
            <input name="jordart" ref="dataObj.jordart" placeholder="*" />
        </div>
        <div>
            <p class="input-label">Djup (meter)</p>
            <input
                name="djup"
                @input="liveNanErrorValidation(dataObj.djup)"
                ref="dataObj.djup"
                placeholder="*"
            />
        </div>
        <div>
            <p class="input-label">S(mg/kg TS)</p>
            <input
                name="smgkgts"
                @input="liveNanErrorValidation(dataObj.smgkgts)"
                ref="dataObj.smgkgts"
                placeholder="*"
            />
        </div>
        <div>
            <p class="input-label">Ca(mg/kg TS)</p>
            <input
                name="camgkgts"
                @input="liveNanErrorValidation(dataObj.camgkgts)"
                ref="dataObj.camgkgts"
                placeholder="*"
            />
        </div>
        <div>
            <p class="input-label">Fe(mg/kg Ts)</p>
            <input
                name="femgkgts"
                @input="liveNanErrorValidation(dataObj.femgkgts)"
                ref="dataObj.femgkgts"
                placeholder="*"
            />
        </div>
        <div>
            <p class="input-label">pH(init)</p>
            <input
                name="phinit"
                @input="liveNanErrorValidation(dataObj.phinit)"
                ref="dataObj.phinit"
                placeholder="*"
            />
        </div>
        <div>
            <p class="input-label">pH(ox)</p>
            <input
                name="phox"
                @input="liveNanErrorValidation(dataObj.phox)"
                ref="dataObj.phox"
                placeholder="*"
            />
        </div>
    </div>
</template>

<style scoped>
.calc-table {
    width: 100%;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
    border-bottom: 1px solid var(--c-border);
}

.calc-table:last-child {
    border-bottom: none;
}

.calc-table > div > input,
select {
    width: 100%;
}

.input-label {
    font-weight: 300;
    margin-bottom: 0.2rem;
}

.input-error {
    border: 1px solid var(--c-border-err);
    outline: 0;
}
</style>
