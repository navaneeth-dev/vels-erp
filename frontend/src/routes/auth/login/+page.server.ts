/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({locals, request}) => {
        const formData = await request.formData();
        const username = formData.get("username");
        const password = formData.get("password");

        const {token, record} = await locals.pb.collection('users').authWithPassword(username, password);
        console.log(token);
    }
};
