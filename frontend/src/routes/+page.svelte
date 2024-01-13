<script lang="ts">
    import {Calendar} from "$lib/components/ui/calendar";
    import {Calendar as CalendarPrimitive} from "bits-ui";
    import {today, getLocalTimeZone, DateFormatter} from "@internationalized/date";
    import type {PageData} from "./$types";

    let value = today(getLocalTimeZone());

    export let data: PageData;
    const workingDays = data.workingDays.map(day => new Date(day.date).getDay());
    const isDateUnavailable: CalendarPrimitive.Props["isDateUnavailable"] = (date) => {
        return !workingDays.includes(date.day);
    };
</script>

{#if data.user}
    <div class="">
        <h1 class="my-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Welcome
            Back, {data.user.name}</h1>
        <div class="flex">
            <Calendar bind:value class="border rounded-md shadow" isDateDisabled={isDateUnavailable}/>
        </div>
    </div>
{:else}
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">VELS ERP</h1>
{/if}