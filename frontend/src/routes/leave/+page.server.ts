import {superValidate} from "sveltekit-superforms/server";
import {formSchema} from "./schema";
import type {Actions} from "./$types";
import {fail} from "@sveltejs/kit";
import {ClientResponseError} from "pocketbase";

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

        if (!event.locals.pb)
            return fail(403, {
                form
            });

        try {
            const record = await event.locals.pb.collection("absent_days").create({
                user: event.locals.pb?.authStore?.model?.id,
                date: form.data.date
            });
        } catch (err) {
            if (err instanceof ClientResponseError) {
                console.log(err.message);
                return fail(500, {
                    form
                })
            }
            return fail(500, {
                form
            })
        }
        return {
            form
        };
    }
};