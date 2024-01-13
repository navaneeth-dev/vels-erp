/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const absentDays = await event.locals.pb.collection("absent_days").getFullList({
        sort: '-created',
        filter: 'date.date <= @monthEnd && date.date >= @monthStart'
    });
    const workingDays = (await event.locals.pb.collection("working_days").getFullList({filter: 'date <= @monthEnd && date >= @monthStart'})).length;

    return {absentDays, workingDays};
}