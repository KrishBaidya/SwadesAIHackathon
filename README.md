# Swades AI Hackathon

An intelligent multi-agent customer support system built for the hackathon. 

## Overview
This project uses a parent Router Agent to understand what a user is asking and then hands off the conversation to specialized Sub-Agents (Support, Order, Billing) to actually resolve the issue. Instead of one massive prompt, it distributes the logic so each agent is laser-focused on specific tools and data.

## Tech Stack
* **Frontend:** Next.js, React, Tailwind CSS. (Streaming responses manually with native `fetch` — no heavy AI SDK on the client).
* **Backend:** Bun, Hono.
* **AI:** Vercel AI SDK + Google Gemini 2.5 Flash.

## How it works
1. A user sends a message from the custom React UI.
2. The Hono backend receives it and sends it to the **Router Agent**.
4. The request goes to the matching **Sub-Agent** via `streamText`.
5. The Sub-Agent queries the mock database using its tools (e.g., fetching a refund status or order tracking) and streams the answer back to the UI.

## Local Setup

### 1. Start the Backend
```bash
cd server
bun install
# Create a .env file and add your GEMINI_API_KEY
bun run dev
```

### 2. Start the Frontend
```bash
cd web
bun install
bun run dev
```

The app will be available at `http://localhost:3000`.
