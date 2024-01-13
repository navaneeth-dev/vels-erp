<script lang="ts">
    // import {Icons} from "$lib/components/docs/icons";
    import {Button} from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import {Label} from "$lib/components/ui/label";
    import {Input} from "$lib/components/ui/input";
</script>

<form class="grid gap-4 mx-auto max-w-2xl mt-4" method="POST">
    <h1 class="scroll-m-20 text-center text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Welcome
        Back</h1>
    <div class="grid gap-2">
        <Label for="email">Username</Label>
        <Input id="email" type="text" placeholder="john" name="username" value="test"/>
    </div>
    <div class="grid gap-2">
        <Label for="password">Password</Label>
        <Input id="password" type="password" name="password" value="12345678"/>
    </div>
    <Button class="w-full" type="submit">Login</Button>
</form>
