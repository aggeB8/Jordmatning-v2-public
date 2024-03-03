<template>
    <header>
        <ul>
            <a><i class="ri-tools-line" /></a>
            <RouterLink to="/">Hem</RouterLink>
            <RouterLink to="/tool">Verktyget</RouterLink>
            <RouterLink to="/history">Tidigare mätningar</RouterLink>
            <a></a>
        </ul>
    </header>

    <RouterView />
</template>

<style scoped>
header {
    background-color: var(--c-fg);
}

header > ul {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
}

header > ul > a {
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    list-style-type: none;
    font-size: 0.95rem;
    font-weight: 300;
    padding: 0 2rem;
    height: 3rem;
    border-right: 1px solid var(--c-border);
    border-bottom: 1px solid var(--c-border);
    text-decoration: none;
    color: var(--c-txt);
    background-color: #f5f5f5;
}

header > ul > a:first-child {
    padding: 0 1rem;
}

header > ul > a:last-child {
    width: 100%;
    border-right: none;
}

header > ul > a > i {
    font-size: 1.3rem;
    opacity: 80%;
    color: #0051ff;
}

a.router-link-exact-active {
    background-color: var(--c-fg);
    border-bottom: none;
}

@media only screen and (max-width: 600px) {
    header > ul > a:first-child,
    ul > a:last-child {
        display: none;
    }

    header > ul > a {
        width: 100%;
        justify-content: center;
        align-items: center;
        padding: 0.5rem;
    }
}
</style>
