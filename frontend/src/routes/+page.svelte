<script lang="ts">
    import type {PageData} from "./$types";

    export let data: PageData;
    console.log(data)
    const percentage = ((data.workingDays - data.absentDays.length) / data.workingDays) * 100;
</script>

{#if data.user}
    <div class="">
        <h1 class="my-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Welcome
            Back, {data.user.name}</h1>
        <p>Attendance Percentage: {percentage.toFixed(2)}%</p>
    </div>
{:else}
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">VELS ERP</h1>
{/if}