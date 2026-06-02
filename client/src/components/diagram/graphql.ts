import type { DiagramDefinition } from "./types";

export const graphqlDiagram: DiagramDefinition = {
	nodes: [
		{
			id: "client",
			type: "custom",
			position: {
				x: 80,
				y: 170,
			},
			data: {
				label: "Client App",
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
				label: "GraphQL Server",
				type: "server",
				ip: ":443",
			},
		},
	],
	edges: [
		{
			id: "e-introspect",
			type: "custom",
			source: "client",
			target: "server",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "Introspection query",
			},
		},
		{
			id: "e-schema",
			type: "custom",
			source: "server",
			target: "client",
			sourceHandle: "left",
			targetHandle: "right",
			data: {
				label: "Schema / types",
			},
		},
		{
			id: "e-query",
			type: "custom",
			source: "client",
			target: "server",
			sourceHandle: "right",
			targetHandle: "left",
			data: {
				label: "POST /graphql { query }",
			},
		},
		{
			id: "e-data",
			type: "custom",
			source: "server",
			target: "client",
			sourceHandle: "left",
			targetHandle: "right",
			data: {
				label: "JSON { data }",
			},
		},
	],
	steps: [
		{
			label: "Schema discovery",
			description:
				"The client can ask the server for its schema, which describes every available type, query, mutation, and subscription.",
			activeNodes: ["client", "server"],
			activeEdges: ["e-introspect", "e-schema"],
		},
		{
			label: "Client sends a query",
			description:
				"A request to the GraphQL endpoint carries the query body. The client selects exactly the fields it needs, no more and no less.",
			activeNodes: ["client"],
			activeEdges: ["e-query"],
		},
		{
			label: "Server resolves and responds",
			description:
				"The server validates the query against the schema, runs resolvers, and returns a JSON object shaped like the query.",
			activeNodes: ["server", "client"],
			activeEdges: ["e-data"],
		},
	],
};
