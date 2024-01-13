<script lang="ts">
    import {cn} from "$lib/utils";

    let className: string | undefined | null = undefined;
    export {className as class};
</script>

<nav class={cn("flex items-center space-x-4 lg:space-x-6 container", className)}>
    <a href="/" class="text-sm font-medium transition-colors hover:text-primary">
        Dashboard
    </a>
    <a
            href="/auth/register"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
        Register
    </a>
    <a
            href="/auth/login"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
        Login
    </a>
    <a
            href="/"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
        Settings
    </a>
</nav>