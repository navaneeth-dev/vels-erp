<script lang="ts">
    import {page} from "$app/stores";
    import {Calendar as CalendarIcon} from "radix-icons-svelte";
    import {Calendar as CalendarPrimitive} from "bits-ui";
    import {
        type DateValue,
        DateFormatter,
        getLocalTimeZone,
        parseDate,
        CalendarDate,
        today, startOfMonth
    } from "@internationalized/date";
    import {cn} from "$lib/utils";
    import {Button, buttonVariants} from "$lib/components/ui/button";
    import {Calendar} from "$lib/components/ui/calendar";
    import * as Popover from "$lib/components/ui/popover";
    import * as Form from "$lib/components/ui/form";
    import type {SuperValidated} from "sveltekit-superforms";
    import {superForm} from "sveltekit-superforms/client";
    import {formSchema, type FormSchema} from "./schema";

    export let form: SuperValidated<FormSchema> = $page.data.datePicker;

    const theForm = superForm(form, {
        validators: formSchema,
        taintedMessage: null
    });

    const {form: formStore} = theForm;

    const df = new DateFormatter("en-US", {
        dateStyle: "long"
    });

    let value: DateValue | undefined = $formStore.date
        ? parseDate($formStore.date)
        : undefined;

    let placeholder: DateValue = today(getLocalTimeZone());

    /** @type {import('./$types').PageData} */
    export let data;
    const workingDays = data.workingDays.map(date => new Date(date.date).getDate());
    const absentDays = data.absentDays.map(date => new Date(date.expand.date.date).getDate());
    const isDateDisabled: CalendarPrimitive.Props['isDateDisabled'] = (date) => {
        return !workingDays.includes(date.day);
    }
    const isDateUnavailable: CalendarPrimitive.Props['isDateUnavailable'] = (date) => {
        return absentDays.includes(date.day);
    }
</script>

<div>
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-4 mb-6">Apply For Leave</h1>
    <Form.Root
            schema={formSchema}
            controlled
            form={theForm}
            let:config
            class="space-y-6"
    >
        <Form.Field {config} name="date">
            <Form.Item class="flex flex-col">
                <Form.Label for="date">Date Of Leave</Form.Label>
                <Popover.Root>
                    <Form.Control id="date" let:attrs>
                        <Popover.Trigger
                                id="date"
                                {...attrs}
                                class={cn(
              buttonVariants({ variant: "outline" }),
              "w-[240px] pl-3 justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
                        >
                            {value
                                ? df.format(value.toDate(getLocalTimeZone()))
                                : "Pick a date"}
                            <CalendarIcon class="ml-auto opacity-50 h-4 w-4"/>
                        </Popover.Trigger>
                    </Form.Control>
                    <Popover.Content class="w-auto p-0" side="top">
                        <Calendar
                                bind:value
                                bind:placeholder
                                minValue={startOfMonth(today('Etc/UTC'))}
                                maxValue={today('Etc/UTC')}
                                calendarLabel="Date of birth"
                                initialFocus
                                {isDateDisabled}
                                {isDateUnavailable}
                                onValueChange={(v) => {
              if (v) {
                 const foundWorkingDay = data.workingDays.find(({ date }) => {
                    return new Date(date).getDate() == v.day;
                });
                  $formStore.date = foundWorkingDay.id;
              } else {
                $formStore.date = "";
              }
            }}
                        />
                    </Popover.Content>
                </Popover.Root>
                <Form.Validation/>
            </Form.Item>
        </Form.Field>
        <Button type="submit">Apply</Button>
    </Form.Root>
</div>
