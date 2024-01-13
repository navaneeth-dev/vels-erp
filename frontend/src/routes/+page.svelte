<script lang="ts">
    import {Calendar} from "$lib/components/ui/calendar";
    import {today, getLocalTimeZone} from "@internationalized/date";

    let value = today(getLocalTimeZone());

    export let data;
</script>

<div class="mt-4">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">VELS ERP</h1>
</div>

{#if data.user}
    <h2>{data.user.id}</h2>
    <h2>{data.user.name}</h2>
{/if}

<div class="flex">

    <Calendar bind:value class="border rounded-md shadow"/>
</div>
