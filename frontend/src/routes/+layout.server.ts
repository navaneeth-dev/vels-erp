export const load = ({locals}) => {
    if (locals.pb.authStore.isValid) {
        return {
            user: locals.pb.authStore.model
        }
    } else {
        return {
            user: null
        }
    }
};