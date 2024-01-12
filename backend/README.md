# ERP Backend

Mark and calculate your own attendance.

## Self Hosting

```yml
---
version: "3"
services:
  pocketbase:
    image: ghcr.io/navaneeth-dev/vels-erp:main
    container_name: pocketbase
    restart: unless-stopped
    labels:
      caddy: erp-backend.rizexor.me
      caddy.reverse_proxy: "{{upstreams 8080}}"
  caddy:
    image: lucaslorentz/caddy-docker-proxy:ci-alpine
    container_name: caddy
    restart: unless-stopped
    depends_on: [ pocketbase ]
    ports:
      - 80:80
      - 443:443
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - caddy_data:/data
  watchtower:
    image: containrrr/watchtower
    container_name: watchtower
    restart: unless-stopped
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    command: --interval 30

volumes:
  caddy_data: { }
```