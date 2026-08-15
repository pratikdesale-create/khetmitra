#!/bin/bash

kill -9 $(lsof -t -i:5050) 2>/dev/null
kill -9 $(lsof -t -i:5173) 2>/dev/null

trap 'kill 0' EXIT

pnpm --filter @workspace/api-server run dev &

PORT=5173 pnpm --filter @workspace/khetmitra run dev &

wait
