<script lang="ts">

</script>

<script setup lang="ts">
import { Ref, ref } from "vue";
import type { CollapsibleEntry } from "../temp-reusable/collapsible-list/models/valueTypes";
import SearchableList from "../temp-reusable/collapsible-list/components/SearchableList.vue";
import { saveExpanded, loadExpanded } from "../temp-reusable/collapsible-list/models/collapse";
import { onShow, onHide } from "../temp-reusable/util";

const ENTITY_PERSIST_KEY = 'inspector-entity-hierarchy'

const renderData: Ref<CollapsibleEntry[]> = ref([])
const defaultExpanded: Ref<string[]> = ref([])

onShow(async () => {
  defaultExpanded.value = loadExpanded(ENTITY_PERSIST_KEY)
})

onHide(() => {

})

async function reloadState() {

}

const toggleOpenCallback = saveExpanded(ENTITY_PERSIST_KEY)
</script>

<template>
  <SearchableList :list="renderData" :onToggleCollapsed="toggleOpenCallback" :defaultOpenPaths="defaultExpanded" />
</template>

<style scoped>
</style>
