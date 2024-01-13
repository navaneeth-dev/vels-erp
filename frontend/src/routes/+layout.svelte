<script>
    import '../app.pcss';
    import MainNav from '$lib/components/main-nav.svelte';
</script>

<div class="hidden flex-col md:flex">
    <div class="border-b">
        <div class="flex h-16 items-center px-4">
            <MainNav/>
        </div>
    </div>
</div>
<div class="container">
    <slot/>
</div>
