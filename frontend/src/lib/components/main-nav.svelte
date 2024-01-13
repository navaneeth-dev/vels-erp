<script lang="ts">
    import {cn} from "$lib/utils";
    import type {AuthModel} from "pocketbase";

    let className: string | undefined | null = undefined;
    export {className as class};
    export let user: AuthModel | undefined;
</script>

<nav class={cn("flex items-center space-x-4 lg:space-x-6 container", className)}>
    {#if user}
        <a href="/" class="text-sm font-medium transition-colors hover:text-primary">
            Dashboard
        </a>
        <a href="/leave" class="text-sm font-medium transition-colors hover:text-primary">
            Apply For Leave
        </a>
    {:else}
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
    {/if}
</nav>