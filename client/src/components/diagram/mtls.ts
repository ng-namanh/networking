import type { DiagramDefinition } from "./types";

export const mtlsDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "client",
			type: "custom",
			position: {
				x: 80,
				y: 170,
			},
			data: {
				label: "Client",
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
				label: "Server",
				type: "server",
				ip: ":443",
			},
		},
		{
			id: "ca",
			type: "custom",
			position: {
				x: 330,
				y: 40,
			},
			data: {
				label: "Certificate Authority",
				type: "server",
			},
		},
	],
	edges: [
		{
			id: "e-server-hello",
			type: "custom",
			source: "server",
			target: "client",
			sourceHandle: "left",
			targetHandle: "right",
			data: {
				label: "Server cert + CertRequest",
			},
		},
		{
			id: "e-client-cert",
			type: "custom",
			source: "client",
			target: "server",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Client certificate",
			},
		},
		{
			id: "e-ca-client",
			type: "custom",
			source: "ca",
			target: "client",
			sourceHandle: "left",
			targetHandle: "right",
			data: {
				label: "Trusted CA root",
			},
		},
		{
			id: "e-ca-server",
			type: "custom",
			source: "ca",
			target: "server",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Issued cert chain",
			},
		},
		{
			id: "e-encrypted",
			type: "custom",
			source: "client",
			target: "server",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Encrypted traffic",
			},
		},
	],
	steps: [
		{
			label: "Server sends its certificate",
			description:
				"The server presents its certificate and also sends a CertificateRequest, asking the client to prove its identity.",
			activeNodes: ["server", "client"],
			activeEdges: ["e-server-hello"],
		},
		{
			label: "Client sends its certificate",
			description:
				"The client responds with its own certificate and a signed proof of possession of the corresponding private key.",
			activeNodes: ["client", "server"],
			activeEdges: ["e-client-cert"],
		},
		{
			label: "Both sides verify",
			description:
				"Each side validates the other certificate locally against its trusted CA roots. If either check fails, the connection is rejected.",
			activeNodes: ["client", "server"],
			activeEdges: [],
		},
		{
			label: "Encrypted channel established",
			description:
				"Both identities are confirmed. Application data flows over a mutually authenticated, encrypted connection.",
			activeNodes: ["client", "server"],
			activeEdges: ["e-encrypted"],
		},
	],
};
