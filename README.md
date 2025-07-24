# Demo project with mocked API and framer motion for animation

To run in dev:
```shell
pnpm install
pnpm run prebuild # Generate a manifest of images in /public/images
pnpm run dev
```

To build
```shell
pnpm run build
# Then you can run preview to use Vite as a webserver for compiled project
pnpm run preview
```

If any errors related to Tanstack routes occur, try regenerating routeTree by
```shell
pnpm run generate:routes
```

If cards appear without images or you want to add your own pictures (`/public/images`) run
```shell
pnpm run prebuild
```
