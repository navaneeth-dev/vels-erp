import {superValidate} from "sveltekit-superforms/server";
import {formSchema} from "./schema";
import type {Actions} from "./$types";
import {fail} from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const workingDays = await event.locals.pb.collection("working_days").getFullList({
        sort: '-created',
        filter: 'date <= @monthEnd && date >= @monthStart'
    });

    return {
        workingDays: workingDays.map(day => new Date(day.date).getDate()),
        form: await superValidate(formSchema)
    };
}

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, formSchema);
        if (!form.valid) {
            return fail(400, {
                form
            });
        }
        return {
            form
        };
    }
};