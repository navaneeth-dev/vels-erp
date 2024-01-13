<script>
    import '../app.pcss';
    import MainNav from '$lib/components/main-nav.svelte';

    export let data;
    const {user} = data;
</script>

<div class="hidden flex-col md:flex">
    <div class="border-b">
        <div class="flex h-16 items-center px-4">
            <MainNav {user}/>
        </div>
    </div>
</div>
<div class="container">
    <slot/>
</div>
