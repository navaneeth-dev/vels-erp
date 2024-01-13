/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({locals, request}) => {
        const formData = await request.formData();
        const username = formData.get("username");
        const name = formData.get("name");
        const password = formData.get("password");
        const passwordConfirm = formData.get("passwordConfirm");

        const {token, record} = await locals.pb.collection('users').create({username, name, password, passwordConfirm});
        console.log(token);
    }
};