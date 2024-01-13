<script lang="ts">
    // import {Icons} from "$lib/components/docs/icons";
    import {Button} from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import {Label} from "$lib/components/ui/label";
    import {Input} from "$lib/components/ui/input";
</script>

<Card.Root class="mx-auto max-w-2xl mt-4">
    <Card.Header class="space-y-1">
        <Card.Title class="text-2xl">Create an account</Card.Title>
        <Card.Description>Enter your email below to create your account</Card.Description>
    </Card.Header>
    <Card.Content class="grid gap-4">
        <div class="grid grid-cols-2 gap-6">
            <Button variant="outline" disabled>
                <!--                <Icons.gitHub class="mr-2 h-4 w-4"/>-->
                GitHub
            </Button>
            <Button variant="outline" disabled>
                <!--                <Icons.google class="mr-2 h-4 w-4"/>-->
                Google
            </Button>
        </div>
        <div class="relative">
            <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t"/>
            </div>
            <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-card px-2 text-muted-foreground"> Or continue with </span>
            </div>
        </div>
        <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com"/>
        </div>
        <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input id="password" type="password"/>
        </div>
    </Card.Content>
    <Card.Footer>
        <Button class="w-full">Create account</Button>
    </Card.Footer>
</Card.Root>
