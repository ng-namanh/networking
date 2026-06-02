import type { DiagramDefinition } from "./types";

export const grpcDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "client",
			type: "custom",
			position: {
				x: 80,
				y: 170,
			},
			data: {
				label: "gRPC Client",
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
				label: "gRPC Server",
				type: "server",
				ip: ":443",
			},
		},
	],
	edges: [
		{
			id: "e-proto",
			type: "custom",
			source: "client",
			target: "server",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Protobuf request (binary)",
			},
		},
		{
			id: "e-response",
			type: "custom",
			source: "server",
			target: "client",
			sourceHandle: "left",
			targetHandle: "right",
			data: {
				label: "Protobuf response (binary)",
			},
		},
		{
			id: "e-stream",
			type: "custom",
			source: "server",
			target: "client",
			sourceHandle: "left",
			targetHandle: "right",
			data: {
				label: "Server stream frames",
			},
		},
	],
	steps: [
		{
			label: "Proto contract",
			description:
				"A .proto file defines services and messages. Both client and server code are generated from this contract, keeping them in sync.",
			activeNodes: ["client", "server"],
			activeEdges: [],
		},
		{
			label: "Unary call",
			description:
				"The client sends a binary-encoded Protobuf message over HTTP/2. The server decodes it, runs the handler, and returns a binary response.",
			activeNodes: ["client", "server"],
			activeEdges: ["e-proto", "e-response"],
		},
		{
			label: "Server streaming",
			description:
				"In server-streaming RPCs, the server sends multiple response frames over one HTTP/2 stream without opening new connections.",
			activeNodes: ["server", "client"],
			activeEdges: ["e-stream"],
		},
		{
			label: "Status and metadata",
			description:
				"gRPC uses HTTP/2 headers and trailers for status codes, errors, and metadata instead of HTTP status codes.",
			activeNodes: ["client", "server"],
			activeEdges: [],
		},
	],
};
