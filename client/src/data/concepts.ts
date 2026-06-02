export type Concept = {
	id: string;
	slug: string;
	title: string;
	summary: string;
	layer?: string;
	order: number;
	osiLayer: string;
	osiExplanation: string;
	whyNeed: string;
	limitation: string;
};

export const concepts: Concept[] = [
	{
		order: 1,
		id: "ethernet",
		slug: "ethernet",
		title: "Ethernet",
		summary: "Show frames moving between devices on a wired LAN.",
		osiLayer: "Layer 1 & 2 (Physical / Data Link)",
		osiExplanation:
			"Defines the physical cables, electrical signals (L1), formatting of data frames, MAC addressing, and collision detection (L2) on a wired network.",
		whyNeed:
			"To physically carry data signals between nearby devices using copper or fiber-optic cables.",
		limitation:
			"Requires physical wires, limiting movement and scaling beyond local environments.",
	},
	{
		order: 2,
		id: "wi-fi",
		slug: "wi-fi",
		title: "Wi-Fi",
		summary: "Show a wireless client communicating through an access point.",
		osiLayer: "Layer 1 & 2 (Physical / Data Link)",
		osiExplanation:
			"Uses radio waves (L1) to transmit frames, managing wireless medium access control (MAC) and encryption (L2).",
		whyNeed:
			"To connect devices to a network wirelessly through radio signals in the air.",
		limitation:
			"Signals degrade with distance and physical obstacles, and are susceptible to interference.",
	},
	{
		order: 3,
		id: "mac-address",
		slug: "mac-address",
		title: "MAC Address",
		summary: "Show two PCs with MAC addresses communicating through a switch.",
		osiLayer: "Layer 2 (Data Link)",
		osiExplanation:
			"A unique physical identifier burned into network interfaces, used to route packets within the same local network segment.",
		whyNeed:
			"Every device needs a unique hardware identifier to recognize its neighbors when directly connected.",
		limitation:
			"Only works locally; you cannot use a MAC address to locate or reach a device on another network.",
	},
	{
		order: 4,
		id: "switch",
		slug: "switch",
		title: "Switch",
		summary: "Show MAC learning and frame forwarding inside a LAN.",
		osiLayer: "Layer 2 (Data Link)",
		osiExplanation:
			"Inspects incoming MAC addresses to learn host locations and forwards local ethernet frames selectively to their destinations.",
		whyNeed:
			"Connects multiple devices on the same local network, sending data frames only to the port of the target MAC address.",
		limitation:
			"Only works within the local network segment; cannot forward traffic to other networks.",
	},
	{
		order: 5,
		id: "ip-address",
		slug: "ip-address",
		title: "IP Address",
		summary:
			"Show devices using IP addresses to identify source and destination hosts.",
		osiLayer: "Layer 3 (Network)",
		osiExplanation:
			"Logical logical addressing scheme used to uniquely identify and route data packets across different networks globally.",
		whyNeed:
			"To logically identify and reach devices across different networks worldwide.",
		limitation:
			"IP addresses can change dynamically, so they are not permanently bound to hardware.",
	},
	{
		order: 6,
		id: "static-ip",
		slug: "static-ip",
		title: "Static IP",
		summary: "Show a device manually configured with fixed IP settings.",
		osiLayer: "Layer 3 (Network)",
		osiExplanation:
			"A manually assigned, persistent IP address configuration that ensures consistent L3 network identity.",
		whyNeed:
			"To manually assign a fixed, unchanging IP address to servers or printers so they are always reachable at the same address.",
		limitation:
			"Requires manual configuration on each device, which becomes difficult and error-prone at scale.",
	},
	{
		order: 7,
		id: "dhcp",
		slug: "dhcp",
		title: "DHCP",
		summary:
			"Show Discover, Offer, Request, Acknowledge between client and DHCP server.",
		osiLayer: "Layer 7 (Application)",
		osiExplanation:
			"An application protocol (encapsulated in UDP at L4) that dynamically assigns L3 IP configurations to hosts.",
		whyNeed:
			"Automatically assigns IP addresses to devices when they join the network, avoiding manual configuration errors.",
		limitation:
			"Requires a running DHCP server on the local network; if it goes down, new devices cannot get IPs.",
	},
	{
		order: 8,
		id: "subnet",
		slug: "subnet",
		title: "Subnet",
		summary: "Show which devices are inside or outside the same network range.",
		osiLayer: "Layer 3 (Network)",
		osiExplanation:
			"A logical subdivision of an IP network that defines local broadcast boundaries and routes traffic inside or outside the local network.",
		whyNeed:
			"Defines the boundary and size of your local network, letting your device know who is local and who is remote.",
		limitation:
			"A subnet division is logical; moving a device to a different range requires changing its configuration.",
	},
	{
		order: 9,
		id: "router",
		slug: "router",
		title: "Router",
		summary: "Show traffic crossing from one subnet to another.",
		osiLayer: "Layer 3 (Network)",
		osiExplanation:
			"Reads destination IP addresses and forwards packets between different subnets/networks using routing tables.",
		whyNeed:
			"Acts as the exit door to connect different networks, reading destination IPs to forward packets across boundaries.",
		limitation:
			"Can become a bottleneck or single point of failure if it goes down.",
	},
	{
		order: 10,
		id: "default-gateway",
		slug: "default-gateway",
		title: "Default Gateway",
		summary: "Show a host sending non-local traffic to its gateway.",
		osiLayer: "Layer 3 (Network)",
		osiExplanation:
			"The IP routing point (typically a router) that hosts use to forward packets destinating outside their local subnet.",
		whyNeed:
			"Tells local devices where to send packets when they don't know the path to a remote destination.",
		limitation:
			"If the gateway IP is misconfigured, the device will be trapped inside its local network.",
	},
	{
		order: 11,
		id: "routes",
		slug: "routes",
		title: "Routes",
		summary: "Show route table decision-making for multiple destinations.",
		osiLayer: "Layer 3 (Network)",
		osiExplanation:
			"Paths and rules defined in routing tables that dictate how IP packets are forwarded step-by-step across networks.",
		whyNeed:
			"Defines forwarding rules in a routing table so routers know which path to choose for specific IP destinations.",
		limitation:
			"Outdated or incorrect routes can lead to routing loops or dropped traffic.",
	},
	{
		order: 12,
		id: "static-routing",
		slug: "static-routing",
		title: "Static Routing",
		summary: "Show manually configured routes between routers.",
		osiLayer: "Layer 3 (Network)",
		osiExplanation:
			"Manually entered routes in a routing table that do not dynamically update, determining hard-coded paths between networks.",
		whyNeed:
			"Manually configures exact paths between networks, which is secure and uses no bandwidth.",
		limitation:
			"Does not adapt automatically; if a link fails, traffic is blocked until manual reconfiguration.",
	},
	{
		order: 13,
		id: "ospf",
		slug: "ospf",
		title: "OSPF",
		summary:
			"Show routers sharing link-state information and choosing shortest paths.",
		osiLayer: "Layer 3 (Network)",
		osiExplanation:
			"A link-state routing protocol operating at L3 to dynamically discover network topologies and calculate the shortest paths.",
		whyNeed:
			"Dynamically shares network links inside an organization so routers automatically find the best and fastest paths.",
		limitation:
			"Only works within a single organization; is too complex and resource-heavy for global internet scale.",
	},
	{
		order: 14,
		id: "bgp",
		slug: "bgp",
		title: "BGP",
		summary: "Show autonomous systems exchanging routes across the internet.",
		osiLayer: "Layer 3 & 7 (Network / Application)",
		osiExplanation:
			"The core routing protocol of the internet (Network Layer control plane), which exchanges routing paths via TCP connections (Application Layer).",
		whyNeed:
			"Allows different independent networks (like ISPs and tech giants) to exchange routing paths, forming the internet.",
		limitation:
			"Trust-based design makes it vulnerable to configuration errors or routing hijack attacks.",
	},
	{
		order: 15,
		id: "ping",
		slug: "ping",
		title: "Ping",
		summary: "Show request and reply flow between two hosts.",
		osiLayer: "Layer 3 (Network)",
		osiExplanation:
			"A network tool using ICMP Echo requests and replies at the Network Layer to diagnose connectivity and latency.",
		whyNeed:
			"Quickly tests if a remote host is alive and measures the round-trip delay.",
		limitation:
			"Firewalls often block ping requests, making active hosts appear offline.",
	},
	{
		order: 16,
		id: "icmp",
		slug: "icmp",
		title: "ICMP",
		summary: "Show ICMP messages used for diagnostics and network control.",
		osiLayer: "Layer 3 (Network)",
		osiExplanation:
			"A supporting protocol in the IP suite used by network devices to send error messages and operational information.",
		whyNeed:
			"Used by network devices to send diagnostics, error notifications, and operational messages.",
		limitation:
			"It is a control protocol and cannot be used to transfer user application data.",
	},
	{
		order: 17,
		id: "tcp",
		slug: "tcp",
		title: "TCP",
		summary: "Show connection setup, reliable delivery, and teardown.",
		osiLayer: "Layer 4 (Transport)",
		osiExplanation:
			"Provides reliable, ordered, error-checked delivery of a stream of bytes between host applications using connection handshake and flow control.",
		whyNeed:
			"Guarantees reliable, error-checked, and in-order delivery of data by establishing a connection first.",
		limitation:
			"High overhead and latency because it must wait for delivery confirmations before sending more data.",
	},
	{
		order: 18,
		id: "udp",
		slug: "udp",
		title: "UDP",
		summary: "Show connectionless datagrams between client and server.",
		osiLayer: "Layer 4 (Transport)",
		osiExplanation:
			"A simple, connectionless transport protocol that sends independent packets (datagrams) without handshakes or delivery guarantees.",
		whyNeed:
			"Sends data immediately without handshakes, prioritizing speed over reliability.",
		limitation:
			"No guarantee of delivery; lost packets are gone forever, requiring applications to handle losses.",
	},
	{
		order: 19,
		id: "ports",
		slug: "ports",
		title: "Ports",
		summary:
			"Show one IP address hosting multiple services through different ports.",
		osiLayer: "Layer 4 (Transport)",
		osiExplanation:
			"Addressing identifiers at the Transport Layer that direct incoming traffic to specific services or application processes on a host.",
		whyNeed:
			"Directs traffic to the correct application process on a device, allowing multiple services to run on a single IP.",
		limitation: "There are only 65,535 ports available per IP address.",
	},
	{
		order: 20,
		id: "firewall",
		slug: "firewall",
		title: "Firewall",
		summary: "Show allowed and blocked flows based on rules.",
		osiLayer: "Layer 3, 4 & 7 (Network / Transport / Application)",
		osiExplanation:
			"Filters traffic based on IP addresses (L3), TCP/UDP ports (L4), or deep packet application payloads (L7).",
		whyNeed:
			"Controls allowed traffic in and out of a network based on security rules to block hackers and untrusted data.",
		limitation:
			"Can block legitimate traffic if rules are too strict, or allow attacks if configured poorly.",
	},
	{
		order: 21,
		id: "tls",
		slug: "tls",
		title: "TLS",
		summary: "Show encrypted session establishment over an existing transport.",
		osiLayer: "Layer 5 & 6 (Session / Presentation)",
		osiExplanation:
			"Secures communications by negotiating cryptographic keys (Session) and encrypting/decrypting data formats for application consumption (Presentation).",
		whyNeed:
			"Encrypts connections (like HTTPS) to prevent eavesdroppers from reading or altering messages in transit.",
		limitation:
			"Requires cryptographic handshakes, which adds computation time and latency.",
	},
	{
		order: 22,
		id: "ssl",
		slug: "ssl",
		title: "SSL",
		summary:
			"Explain SSL as legacy terminology and contrast it with modern TLS.",
		osiLayer: "Layer 5 & 6 (Session / Presentation)",
		osiExplanation:
			"The legacy predecessor to TLS, historically handling cryptographic formatting and session handshakes.",
		whyNeed:
			"Introduced connection encryption and laid the foundation for modern web security.",
		limitation:
			"Deprecated and cryptographically insecure; should not be used in modern networks.",
	},
	{
		order: 23,
		id: "mtls",
		slug: "mtls",
		title: "mTLS",
		summary:
			"Show both client and server exchanging and verifying certificates to establish a mutually authenticated encrypted connection.",
		layer: "Security Layer",
		osiLayer: "Layer 5 & 6 (Session / Presentation)",
		osiExplanation:
			"Extends TLS session establishment by requiring both peers to present and verify certificates before encrypted application data flows.",
		whyNeed:
			"Authenticates services to each other so internal APIs and service meshes do not trust anonymous clients.",
		limitation:
			"Requires certificate issuance, trust management, rotation, and careful expiry monitoring.",
	},
	{
		order: 24,
		id: "vpn",
		slug: "vpn",
		title: "VPN",
		summary:
			"Show encrypted tunnel traffic between client and private network.",
		osiLayer: "Layer 3 & 4 (Network / Transport)",
		osiExplanation:
			"Establishes secure, encrypted virtual connections using Network Layer tunneling (IPsec) or Transport Layer streams (OpenVPN/TLS).",
		whyNeed:
			"Creates a secure, encrypted tunnel to protect all outgoing and incoming traffic between your device and a private network.",
		limitation:
			"Adds routing overhead and latency, and requires a trusted VPN provider.",
	},
	{
		order: 25,
		id: "dns",
		slug: "dns",
		title: "DNS",
		summary:
			"Show domain name lookup through resolver and authoritative servers.",
		osiLayer: "Layer 7 (Application)",
		osiExplanation:
			"Translates human-readable domain names into machine-readable IP addresses using client-server requests.",
		whyNeed:
			"Translates human-readable domain names (google.com) into machine-readable IP addresses.",
		limitation:
			"If DNS resolution fails or is slow, websites become unreachable even if the physical internet connection is working.",
	},
	{
		order: 26,
		id: "http",
		slug: "http",
		title: "HTTP",
		summary: "Show request and response between browser/client and server.",
		osiLayer: "Layer 7 (Application)",
		osiExplanation:
			"The foundational protocol for data exchange on the web, enabling transfer of HTML pages, APIs, and media between clients and servers.",
		whyNeed:
			"Provides a standard format for browsers to request and servers to return web pages and APIs.",
		limitation:
			"Transfers data in plain text, meaning anyone in the middle can read passwords and cookies.",
	},
	{
		order: 27,
		id: "https",
		slug: "https",
		title: "HTTPS",
		summary: "Show HTTP over TLS, including encrypted request/response.",
		osiLayer: "Layer 7 (Application)",
		osiExplanation:
			"Encapsulates HTTP request/response exchanges within a secure, encrypted TLS/SSL session.",
		whyNeed:
			"Secures web browsing by running HTTP inside an encrypted TLS connection.",
		limitation:
			"Relies on certificate authorities; invalid or expired certificates will trigger blocking browser security warnings.",
	},
	{
		order: 28,
		id: "websocket",
		slug: "websocket",
		title: "WebSocket",
		summary:
			"Show a persistent, full-duplex connection between client and server after an HTTP upgrade handshake.",
		layer: "Application Layer",
		osiLayer: "Layer 7 (Application)",
		osiExplanation:
			"Starts with an HTTP upgrade request, then runs a full-duplex application messaging protocol over one persistent transport connection.",
		whyNeed:
			"Enables real-time messages such as chat, dashboards, games, and notifications without repeated polling requests.",
		limitation:
			"Long-lived connections require proxy support, heartbeat handling, scaling strategy, and connection cleanup.",
	},
	{
		order: 29,
		id: "graphql",
		slug: "graphql",
		title: "GraphQL",
		summary:
			"Show a client sending a structured query to an API endpoint and receiving exactly the fields it requested.",
		layer: "Application Layer",
		osiLayer: "Layer 7 (Application)",
		osiExplanation:
			"Defines an application API contract where queries, mutations, and subscriptions are validated against a schema and returned as structured data.",
		whyNeed:
			"Lets clients request the exact data shape they need through a consistent API contract.",
		limitation:
			"Resolver design can create hidden N+1 queries, expensive nested requests, and caching challenges.",
	},
	{
		order: 30,
		id: "grpc",
		slug: "grpc",
		title: "gRPC",
		summary:
			"Show binary Protobuf messages flowing between client and server over HTTP/2 with support for streaming.",
		layer: "Application Layer",
		osiLayer: "Layer 7 (Application)",
		osiExplanation:
			"Defines remote procedure calls using Protobuf messages over HTTP/2 streams, including unary and streaming communication patterns.",
		whyNeed:
			"Provides efficient, strongly typed service-to-service communication for microservices and internal APIs.",
		limitation:
			"Binary payloads and HTTP/2 behavior require specialized tooling and browser support usually needs gRPC-Web.",
	},
	{
		order: 31,
		id: "load-balancer",
		slug: "load-balancer",
		title: "Load Balancer",
		summary:
			"Show traffic distributed from one entry point to multiple backend servers.",
		osiLayer: "Layer 4 & 7 (Transport / Application)",
		osiExplanation:
			"Distributes traffic by reading either raw L4 connections (TCP/UDP ports) or application-specific attributes (L7 HTTP headers and cookies).",
		whyNeed:
			"Distributes user traffic across multiple servers to prevent overload and ensure high availability.",
		limitation:
			"If the load balancer itself fails, all backend servers become unreachable.",
	},
	{
		order: 32,
		id: "nat",
		slug: "nat",
		title: "NAT",
		summary:
			"Show private addresses translated to a public address for internet access.",
		layer: "Network/Transport Boundary",
		osiLayer: "Layer 3 & 4 (Network / Transport)",
		osiExplanation:
			"Rewrites IP addresses and often transport ports so private hosts can share public connectivity or receive forwarded traffic.",
		whyNeed:
			"Lets many private devices access external networks through fewer public IP addresses.",
		limitation:
			"Can complicate inbound connectivity, peer-to-peer traffic, logging, and troubleshooting.",
	},
	{
		order: 33,
		id: "proxy",
		slug: "proxy",
		title: "Proxy",
		summary:
			"Show a forward proxy making outbound requests on behalf of a client.",
		layer: "Application Layer",
		osiLayer: "Layer 7 (Application)",
		osiExplanation:
			"Acts as an application-aware intermediary that receives client requests and makes outbound requests on the client's behalf.",
		whyNeed:
			"Adds centralized outbound control, authentication, filtering, logging, or caching for client traffic.",
		limitation:
			"Misconfigured proxy settings can break DNS, TLS, authentication, or application connectivity.",
	},
	{
		order: 34,
		id: "reverse-proxy",
		slug: "reverse-proxy",
		title: "Reverse Proxy",
		summary:
			"Show a public entry point routing HTTP requests to internal backends.",
		layer: "Application/Edge",
		osiLayer: "Layer 7 (Application)",
		osiExplanation:
			"Terminates or forwards application requests in front of servers, often routing by host, path, headers, or protocol.",
		whyNeed:
			"Provides one public entry point for many backend services while handling routing, TLS, and headers.",
		limitation:
			"Can hide client details or introduce routing and timeout bugs if headers and upstream rules are wrong.",
	},
	{
		order: 35,
		id: "cdn",
		slug: "cdn",
		title: "CDN",
		summary:
			"Show edge cache serving users near them and fetching from origin on misses.",
		layer: "Edge Delivery",
		osiLayer: "Layer 7 (Application / Edge)",
		osiExplanation:
			"Serves application content from distributed edge caches and fetches from the origin when cached content is missing or stale.",
		whyNeed:
			"Reduces latency and origin load by serving cacheable content closer to users.",
		limitation:
			"Incorrect cache keys or TTLs can serve stale, personalized, or sensitive content to the wrong users.",
	},
	{
		order: 36,
		id: "review-path",
		slug: "review-path",
		title: "Review Path",
		summary:
			"Review the core end-to-end request path across DNS, routing, TLS, HTTP, and backend delivery.",
		osiLayer: "Layers 1-7 (Full Stack)",
		osiExplanation:
			"Visualizes an end-to-end client-server interaction, touching the OSI model from physical delivery through application software.",
		whyNeed:
			"Connects individual concepts into a unified journey so learners can see how each layer contributes to one request.",
		limitation:
			"Shows a simplified conceptual model; real-world enterprise traffic involves extra layers of complexity.",
	},
];
