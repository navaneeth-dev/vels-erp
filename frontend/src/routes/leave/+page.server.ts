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
    const absentDays = await event.locals.pb.collection("absent_days").getFullList({
        sort: '-created',
        filter: 'date.date <= @monthEnd && date.date >= @monthStart',
        expand: 'date'
    });

    return {
        workingDays,
        absentDays,
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
        const record = await event.locals.pb.collection("absent_days").create({
            user: {id: event.locals.user?.id},
            date: {
                id: 1
            }
        });
        return {
            form
        };
    }
};