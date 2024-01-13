<script lang="ts">
    import {Calendar} from "$lib/components/ui/calendar";
    import {Calendar as CalendarPrimitive} from "bits-ui";
    import {DateFormatter, type DateValue, getLocalTimeZone, today} from "@internationalized/date";
    import {Button} from "$lib/components/ui/button";
    import * as Popover from "$lib/components/ui/popover";
    import {cn} from "$lib/utils";
    import {Calendar as CalendarIcon} from "radix-icons-svelte";
    import type {PageData} from "./$types";

    const df = new DateFormatter("en-US", {
        dateStyle: "long"
    });

    let value: DateValue = today(getLocalTimeZone());

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
        <form method="post">
            <Popover.Root>
                <Popover.Trigger asChild let:builder>
                    <Button
                            variant="outline"
                            class={cn(
        "w-[240px] justify-start text-left font-normal",
        !value && "text-muted-foreground"
      )}
                            builders={[builder]}
                    >
                        <CalendarIcon class="mr-2 h-4 w-4"/>
                        {df.format(value.toDate(getLocalTimeZone()))}
                    </Button>
                </Popover.Trigger>
                <Popover.Content class="w-auto p-0" align="start">
                    <Calendar bind:value/>
                </Popover.Content>
            </Popover.Root>
        </form>
    </div>
{:else}
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">VELS ERP</h1>
{/if}