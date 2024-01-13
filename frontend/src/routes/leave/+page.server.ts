/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const workingDays = await event.locals.pb.collection("working_days").getFullList({
        sort: '-created',
        filter: 'date <= @monthEnd'
    });

    return {workingDays};
}