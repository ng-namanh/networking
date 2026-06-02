import type { DiagramDefinition } from "./types";

export const websocketDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "client",
			type: "custom",
			position: {
				x: 80,
				y: 170,
			},
			data: {
				label: "Browser",
				type: "pc",
			},
		},
		{
			id: "server",
			type: "custom",
			position: {
				x: 590,
				y: 170,
			},
			data: {
				label: "WebSocket Server",
				type: "server",
				ip: ":443",
			},
		},
	],
	edges: [
		{
			id: "e-upgrade",
			type: "custom",
			source: "client",
			target: "server",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "HTTP Upgrade",
			},
		},
		{
			id: "e-101",
			type: "custom",
			source: "server",
			target: "client",
			sourceHandle: "left",
			targetHandle: "right",
			data: {
				label: "101 Switching Protocols",
			},
		},
		{
			id: "e-client-msg",
			type: "custom",
			source: "client",
			target: "server",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Message (client -> server)",
			},
		},
		{
			id: "e-server-msg",
			type: "custom",
			source: "server",
			target: "client",
			sourceHandle: "left",
			targetHandle: "right",
			data: {
				label: "Message (server -> client)",
			},
		},
	],
	steps: [
		{
			label: "HTTP Upgrade request",
			description:
				"The client sends an HTTP request with Upgrade: websocket and a random Sec-WebSocket-Key to request a protocol switch.",
			activeNodes: ["client"],
			activeEdges: ["e-upgrade"],
		},
		{
			label: "101 Switching Protocols",
			description:
				"The server responds with HTTP 101 and echoes a hashed Sec-WebSocket-Accept key, confirming the upgrade.",
			activeNodes: ["server", "client"],
			activeEdges: ["e-101"],
		},
		{
			label: "Bidirectional messaging",
			description:
				"The TCP connection stays open. Both sides can send messages at any time without re-establishing a connection.",
			activeNodes: ["client", "server"],
			activeEdges: ["e-client-msg", "e-server-msg"],
		},
		{
			label: "Connection close",
			description:
				"Either side sends a close frame to cleanly terminate. The TCP connection is then closed.",
			activeNodes: ["client", "server"],
			activeEdges: [],
		},
	],
};
