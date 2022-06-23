# SIMSELECT (Simple Select)
Solo necesitas crear un componente [select] con la clase [simSelect]. Puedes agregar las [option] que necesites.

# ESTRUCTURA CREADA (remplaza los select)
<main class="simSelect" data-simselect-index="1">
    <header class="simSelect-header" tabindex="0">
        <input type="text" class="simSelect-input" placeholder="Seleccione una opci&oacute;n" disabled>
        <span class="iconify-inline simSelect-icon" data-icon="akar-icons:chevron-down"
            style="color: rgb(31, 31, 31);" data-width="15"></span>
        <span class="iconify-inline simSelect-icon simSelect-hidden" data-icon="akar-icons:chevron-up"
            style="color: rgb(31, 31, 31);" data-width="15"></span>
    </header>
    <section class="simSelect-options simSelect-hidden">
        <header class="simSelect-filter-header">
            <input class="simSelect-filter" type="text" tabindex="0" placeholder="¿Qu&eacute; busca?">
            <section class="simSelect-icon-search">
                <span class="iconify-inline" data-icon="codicon:search" style="color: #36c;" data-width="16"></span>
            </section>
            <section class="simSelect-icon-close">
                <span class="iconify-inline" data-icon="codicon:chrome-close" data-width="18"></span>
            </section>
        </header>
        <section class="simSelect-option-container">
            <article class="simSelect__option" tabindex="0" value="">Seleccione una opci&oacute;n</article>
            <article class="simSelect__option" tabindex="0" value="1">Uno</article>
            <article class="simSelect__option" tabindex="0" value="2">Dos</article>
            <article class="simSelect__option" tabindex="0" value="3">Tres</article>
            <article class="simSelect__option" tabindex="0" value="4">Cuatro</article>
            <article class="simSelect__option" tabindex="0" value="5">Cinco</article>
            <article class="simSelect__option" tabindex="0" value="6">Seis</article>
            <article class="simSelect__option" tabindex="0" value="7">Siete</article>
        </section>
    </section>
</main