<script setup lang="ts">
import router from '@/router'
</script>

<template>
    <div class="box">
        <div id="intro-wrapper">
            <h1>Bedömningsverktyg för sulfidjords försurningspotential</h1>
            <button @click="router.push('tool')">
                Klicka här för att komma till verktyget
            </button>
            <p>
                OBS Vänligen observera att verktyget som tillhandahålls på denna
                webbsida endast är avsett som ett extra hjälpmedel. Användaren
                ansvarar för att ta hänsyn till andra relevanta faktorer och att
                använda verktyget på ett lämpligt sätt. Inmatade data om
                sulfidjords egenskaper lagras för att vidareutveckla
                bedömningsverktyget och anpassa det för lokala/regionala
                variationer. Data som hanteras är enbart inmatade data om lokal,
                innehåll av svavel, järn, kalcium, samt uppmätt pH.
            </p>
        </div>
    </div>
</template>

<style scoped>
#intro-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

h1 {
    font-size: 1.2rem;
    font-weight: 400;
    text-align: center;
}

button {
    width: 100%;
}

p {
    font-weight: 300;
    opacity: 40%;
}
</style>
