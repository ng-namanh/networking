export type ConceptContent = {
	beginner: string;
	developer: string;
	terminal: string[];
	tips: string[];
};

export const conceptContent: Record<string, ConceptContent> = {
	ethernet: {
		beginner:
			"The standard for wired connections, using physical cables like copper or fiber optic to carry data between devices.",
		developer:
			"Developers see Ethernet indirectly when MTU, VLANs, duplicate MACs, or bad cables cause packet loss before IP troubleshooting even starts.",
		terminal: [
			"ip link show",
			"ethtool eth0",
			"tcpdump -i eth0 -e arp or icmp",
		],
		tips: [
			"Check link state and speed before debugging higher layers.",
			"An Ethernet frame only covers the local segment; routers replace the frame at every hop.",
		],
	},
	"wi-fi": {
		beginner:
			"Does the same job as Ethernet but sends data through the air using radio waves instead of physical cables.",
		developer:
			"Wireless adds signal strength, channel contention, roaming, and encryption behavior that can look like random latency to applications.",
		terminal: [
			"nmcli dev wifi list",
			"iw dev wlan0 link",
			"ping -c 5 your-gateway-ip",
		],
		tips: [
			"Weak signal often appears as jitter, retransmits, or low throughput.",
			"A Wi-Fi access point is usually a bridge, not necessarily the router.",
		],
	},
	"mac-address": {
		beginner:
			"A unique hardware identifier that every network device is born with, used by directly connected devices to recognize each other.",
		developer:
			"MAC addresses matter when ARP, switching, VLANs, container bridges, or duplicate virtual NIC addresses break local delivery.",
		terminal: ["ip link show", "arp -a", "tcpdump -e -i eth0 arp"],
		tips: [
			"MACs are local-link identifiers, not internet routes.",
			"A switch learns source MACs; it forwards based on destination MACs.",
		],
	},
	switch: {
		beginner:
			"Connects multiple devices on the same local network, reading the destination MAC address on each request to send it only to the correct device.",
		developer:
			"Switch behavior explains why two hosts on the same subnet can talk without a router and why loops require STP or loop prevention.",
		terminal: ["bridge fdb show", "ip neigh show", "tcpdump -i eth0 -e"],
		tips: [
			"Flooding unknown unicast is normal during learning.",
			"Switches separate collision domains, but VLANs separate broadcast domains.",
		],
	},
	"ip-address": {
		beginner:
			"A logical, assignable address that identifies your device across networks so it can communicate globally.",
		developer:
			"IP addressing is the first thing to verify when services cannot reach each other across hosts, containers, VPCs, or Kubernetes nodes.",
		terminal: ["ip addr show", "ip route get 8.8.8.8", "curl ifconfig.me"],
		tips: [
			"An IP address without the correct prefix length can put the host in the wrong network.",
			"Private IPs are routable inside private networks, not across the public internet without NAT or routing.",
		],
	},
	"static-ip": {
		beginner:
			"An IP address that is manually configured and typed into your device's network settings yourself, staying fixed over time.",
		developer:
			"Static addressing removes DHCP dependency but shifts responsibility to humans or infrastructure code to avoid conflicts and stale DNS.",
		terminal: [
			"ip addr add 192.168.10.20/24 dev eth0",
			"ip route add default via 192.168.10.1",
			"resolvectl dns eth0 1.1.1.1",
		],
		tips: [
			"Document reservations so DHCP does not hand out the same address.",
			"Static IP requires address, prefix, gateway, and DNS to be correct.",
		],
	},
	dhcp: {
		beginner:
			"Dynamic Host Configuration Protocol automatically assigns an IP address to your device when it joins a network, avoiding manual configuration.",
		developer:
			"DHCP issues often show up as 169.254 addresses, missing default routes, wrong DNS servers, or clients renewing old leases.",
		terminal: [
			"sudo dhclient -v eth0",
			"ip addr show",
			'journalctl -u NetworkManager --since "10 min ago"',
		],
		tips: [
			"DHCP works by broadcast before the client has an IP.",
			"The lease may include more than an address, including DNS and search domains.",
		],
	},
	subnet: {
		beginner:
			"Defines the boundary and size of your local network, letting your device know how big or small the local range is.",
		developer:
			"Wrong subnet masks create confusing bugs where ARP is attempted for remote hosts or gateway routing is used for local peers.",
		terminal: [
			"ipcalc 192.168.1.10/24",
			"ip route get 192.168.1.40",
			"ip route get 10.0.0.20",
		],
		tips: [
			"Longest prefix length means more specific network.",
			"Two hosts need compatible masks to agree they are local peers.",
		],
	},
	router: {
		beginner:
			"Connects different networks together. It acts as the exit door of your local network, reading the destination IP to decide where to forward the data next.",
		developer:
			"Routers are where subnet boundaries, NAT, ACLs, route tables, and cloud network policies often meet.",
		terminal: ["ip route", "traceroute 8.8.8.8", "ip route get 10.0.0.50"],
		tips: [
			"Routers decrement TTL at each hop.",
			"Routers do not forward Ethernet frames unchanged; they forward IP packets in new link-layer frames.",
		],
	},
	"default-gateway": {
		beginner:
			"The router that your device falls back on when it doesn't know where to send a packet, letting the gateway figure out the path.",
		developer:
			"Missing or wrong gateways cause local traffic to work while internet or cross-subnet traffic fails.",
		terminal: [
			"ip route show default",
			"ip route get 1.1.1.1",
			"ping -c 3 $(ip route | awk '/default/ {print $3; exit}')",
		],
		tips: [
			"A host can have many routes but usually one preferred default.",
			"The gateway IP must be reachable on the local subnet.",
		],
	},
	routes: {
		beginner:
			"Rules defined in routing tables that tell the router exactly where to forward traffic based on the destination IP address.",
		developer:
			"Route tables explain split tunnels, private service reachability, container networking, and why traffic exits through an unexpected interface.",
		terminal: ["ip route", "ip route get 10.20.1.10", "netstat -rn"],
		tips: [
			"Longest prefix match beats route order in most cases.",
			"A default route is just 0.0.0.0/0 or ::/0.",
		],
	},
	"static-routing": {
		beginner:
			"Manually telling the router which path to take to reach a specific network. Simple for small setups but highly complex for large networks.",
		developer:
			"Static routes are common in labs, small networks, VPN routes, and cloud route tables, but missing return routes are a frequent failure.",
		terminal: [
			"ip route add 10.2.0.0/24 via 172.16.0.2",
			"ip route get 10.2.0.10",
			"traceroute 10.2.0.10",
		],
		tips: [
			"Always verify the return path, not just the outbound path.",
			"Static routes do not adapt automatically when a next hop fails.",
		],
	},
	ospf: {
		beginner:
			"A routing protocol that allows routers inside the same organization to communicate and dynamically find the best paths automatically.",
		developer:
			"OSPF appears in enterprise and data center networks where routers need fast automatic convergence inside one administrative domain.",
		terminal: [
			"show ip ospf neighbor",
			"show ip route ospf",
			"show ip ospf database",
		],
		tips: [
			"OSPF neighbors need matching area and network settings.",
			"Lower total cost wins, not necessarily fewer hops.",
		],
	},
	bgp: {
		beginner:
			"Border Gateway Protocol enables large companies and Internet Service Providers (ISPs) to exchange routing paths, forming the backbone of the internet.",
		developer:
			"BGP is the routing control plane of the internet and also powers many cloud, edge, and Kubernetes networking integrations.",
		terminal: [
			"show bgp summary",
			"show bgp ipv4 unicast",
			"whois -h whois.radb.net 203.0.113.0/24",
		],
		tips: [
			"BGP is policy-driven, not purely shortest path.",
			"Bad route advertisements can have internet-scale impact.",
		],
	},
	ping: {
		beginner:
			"Sends a small diagnostic packet to a target destination and waits for a response to confirm if the host is reachable and active.",
		developer:
			"Ping is a quick Layer 3 signal, but a successful ping does not prove TCP ports, DNS, TLS, or application health.",
		terminal: [
			"ping -c 4 8.8.8.8",
			"ping -c 4 example.com",
			"traceroute 8.8.8.8",
		],
		tips: [
			"Blocked ICMP does not always mean the host is down.",
			"Compare ping by IP and by hostname to separate DNS from reachability.",
		],
	},
	icmp: {
		beginner:
			"The protocol used by Ping and network devices for general diagnostic reports, error messages, and network troubleshooting.",
		developer:
			"ICMP explains routing failures, traceroute hops, and path MTU discovery problems that affect application connections.",
		terminal: ["ping -c 4 1.1.1.1", "traceroute 1.1.1.1", "tcpdump -n icmp"],
		tips: [
			"Do not block all ICMP blindly; path MTU discovery can depend on it.",
			"ICMP errors are generated by network devices, not only final hosts.",
		],
	},
	tcp: {
		beginner:
			"Establishes a connection between devices before transmitting. It guarantees error-free and in-order packet delivery, but is slower because it waits for confirmations.",
		developer:
			"Most app protocols developers use, including HTTP/1.1, HTTP/2, SSH, and PostgreSQL, depend on TCP behavior.",
		terminal: [
			"nc -vz example.com 443",
			"ss -tanp",
			'tcpdump -n "tcp port 443"',
		],
		tips: [
			"Connection refused means the host replied but nothing accepted that port.",
			"Timeouts often point to routing, firewall, or packet loss.",
		],
	},
	udp: {
		beginner:
			"Sends data immediately without handshakes or delivery confirmations. It is fast and has low overhead, but lost packets are gone forever, making it ideal for streaming and gaming.",
		developer:
			"DNS, VoIP, games, telemetry, and QUIC use UDP because they need different tradeoffs than TCP.",
		terminal: [
			"nc -vzu 1.1.1.1 53",
			"dig @1.1.1.1 example.com",
			"tcpdump -n udp",
		],
		tips: [
			"No connection state means tools can be less definitive for UDP.",
			"Packet size matters; fragmentation can break unreliable paths.",
		],
	},
	ports: {
		beginner:
			"A number identifier that directs traffic to the correct application process on a device. While IP gets you to the device, the port gets you to the application.",
		developer:
			"Port mistakes are a common reason DNS resolves and ping works but the application still fails.",
		terminal: ["ss -tulpen", "nc -vz host 443", "curl -v http://host:8080"],
		tips: [
			"Listening on 127.0.0.1 is not reachable from other machines.",
			"Firewalls can allow one port and block another on the same IP.",
		],
	},
	firewall: {
		beginner:
			"Controls which traffic is allowed in and out of a network, blocking or allowing specific ports, IP addresses, or traffic types based on rules.",
		developer:
			"Firewalls exist on laptops, servers, cloud security groups, Kubernetes network policies, and perimeter appliances.",
		terminal: [
			"sudo ufw status verbose",
			"sudo iptables -S",
			"curl -v https://example.com",
		],
		tips: [
			"Check both host firewall and cloud/network firewall.",
			"Stateful firewalls usually allow return traffic for established connections.",
		],
	},
	tls: {
		beginner:
			"Encrypts the connection between devices so intermediate attackers cannot read or alter your plain text data. It is the modern successor to SSL.",
		developer:
			"TLS failures often involve certificate chains, hostname mismatch, expired certificates, protocol versions, or missing SNI.",
		terminal: [
			"openssl s_client -connect example.com:443 -servername example.com",
			"curl -Iv https://example.com",
			"testssl.sh example.com",
		],
		tips: [
			"The certificate name must match the hostname, not just the IP.",
			"TLS encrypts HTTP content but not every metadata field, such as the destination IP.",
		],
	},
	ssl: {
		beginner:
			"The deprecated, legacy version of TLS. The term is still commonly used today, but modern systems should disable old SSL protocols in favor of TLS.",
		developer:
			"When a dashboard says SSL certificate, treat it as certificate/TLS configuration unless it explicitly enables old SSL protocols.",
		terminal: [
			"openssl s_client -connect example.com:443 -tls1_2",
			"curl -Iv https://example.com",
			"nmap --script ssl-enum-ciphers -p 443 example.com",
		],
		tips: [
			"Use TLS 1.2 or TLS 1.3.",
			"SSL terminology is common; SSL protocols are not acceptable for modern security.",
		],
	},
	vpn: {
		beginner:
			"Creates a secure, encrypted tunnel between your device or network and another private network, protecting all transmitted traffic from outside visibility.",
		developer:
			"VPN bugs are often route conflicts, DNS split-horizon issues, MTU problems, or firewall rules on the private side.",
		terminal: ["ip route", "wg show", "ping -c 3 private-service.local"],
		tips: [
			"Check whether it is full tunnel or split tunnel.",
			"Overlapping private CIDRs can send traffic to the wrong place.",
		],
	},
	dns: {
		beginner:
			"Translates human-readable domain names (like google.com) into machine-readable IP addresses so you don't have to memorize numbers.",
		developer:
			"DNS issues can masquerade as app failures; always compare name lookup, returned IP, TTL, and direct connection to the IP.",
		terminal: [
			"dig example.com A",
			"dig +trace example.com",
			"nslookup example.com 1.1.1.1",
		],
		tips: [
			"TTL controls how long resolvers may cache an answer.",
			"A CNAME points to another name, not directly to an IP.",
		],
	},
	http: {
		beginner:
			"The request-response protocol used by browsers to load web assets, enabling you to ask for and receive HTML pages, APIs, and media files.",
		developer:
			"HTTP debugging is about what was sent, what status returned, which headers changed behavior, and whether intermediaries modified the request.",
		terminal: [
			"curl -v http://example.com",
			"curl -I http://example.com",
			"python3 -m http.server 8080",
		],
		tips: [
			"Status codes describe server response, not necessarily network reachability.",
			"Headers such as Host, Authorization, Cache-Control, and Content-Type matter.",
		],
	},
	https: {
		beginner:
			"A secure, encrypted web connection created by combining standard HTTP with TLS encryption.",
		developer:
			"For developers, HTTPS combines DNS, TCP, TLS, certificates, HTTP, proxies, and load balancers into one visible URL.",
		terminal: [
			"curl -v https://example.com",
			"openssl s_client -connect example.com:443 -servername example.com",
			"curl --resolve example.com:443:203.0.113.20 https://example.com",
		],
		tips: [
			"Use SNI when testing shared hosts.",
			"A TLS success can still return an HTTP 404 or 500; those are different layers.",
		],
	},
	"load-balancer": {
		beginner:
			"Sits in front of multiple backend servers to distribute incoming traffic and requests across them, preventing overload and keeping services responsive.",
		developer:
			"Load balancers affect source IP visibility, health checks, TLS termination, sticky sessions, retries, and timeout behavior.",
		terminal: [
			"curl -v https://service.example.com",
			"dig service.example.com",
			"for i in {1..5}; do curl -s https://service.example.com/hostname; done",
		],
		tips: [
			"Health checks determine whether a backend receives traffic.",
			"Preserve client IP with headers or proxy protocol when the app needs it.",
		],
	},
	nat: {
		beginner:
			"NAT translates private addresses to a public address so many internal devices can reach external networks through one gateway.",
		developer:
			"NAT bugs often involve missing translation state, asymmetric routing, port exhaustion, overlapping private ranges, or port forwarding rules pointing to the wrong host.",
		terminal: [
			"ip addr show",
			"ip route",
			"curl ifconfig.me",
			"sudo conntrack -L | grep tcp",
		],
		tips: [
			"NAT changes packet addresses; it is not the same thing as a firewall.",
			"Return traffic depends on translation state created by the outbound flow.",
			"Port forwarding is inbound NAT from a public address to a private service.",
		],
	},
	proxy: {
		beginner:
			"A forward proxy sits on the client side. The client deliberately sends requests to the proxy, and the proxy reaches the destination on the client's behalf.",
		developer:
			"Forward proxies appear in corporate networks, package managers, CI systems, and restricted environments where outbound access needs authentication, logging, filtering, or caching.",
		terminal: [
			"env | grep -i proxy",
			"curl -x http://proxy.local:8080 https://example.com",
			"curl -v --proxy http://proxy.local:8080 http://example.com",
		],
		tips: [
			"A forward proxy is configured by the client or client environment.",
			"HTTPS through an HTTP proxy usually uses the CONNECT method.",
			"DNS may be resolved by the client or the proxy depending on protocol and configuration.",
		],
	},
	"reverse-proxy": {
		beginner:
			"A reverse proxy sits in front of servers. Clients connect to the proxy, and the proxy routes each request to an internal backend.",
		developer:
			"Reverse proxies commonly handle TLS termination, host and path routing, header normalization, request buffering, compression, and source IP forwarding.",
		terminal: [
			"curl -v https://app.example.com",
			'curl -H "Host: app.example.com" http://203.0.113.10',
			"curl -I https://app.example.com",
		],
		tips: [
			"A reverse proxy is chosen by the service operator, not by the end user.",
			"Backends often need X-Forwarded-For and X-Forwarded-Proto to reconstruct the original request.",
			"TLS can terminate at the proxy while backend traffic uses HTTP or private TLS.",
		],
	},
	cdn: {
		beginner:
			"A CDN serves content from edge locations near users. If the edge has a fresh cached copy, it responds without contacting the origin server.",
		developer:
			"CDN debugging usually means checking DNS, cache status, Cache-Control, Age, Vary, ETag, purge behavior, and whether requests unexpectedly bypass the edge.",
		terminal: [
			"dig cdn.example.com",
			"curl -I https://cdn.example.com/app.js",
			'curl -H "Cache-Control: no-cache" -I https://cdn.example.com/app.js',
		],
		tips: [
			"A CDN is often a reverse proxy cache distributed across many edge locations.",
			"Cache-Control, Vary, ETag, and TTL decide whether content can be reused.",
			"Do not cache personalized or sensitive responses unless the cache key is correct.",
		],
	},
	"review-path": {
		beginner:
			"The review path connects the core learning model into a real request: resolve a name, route packets, connect with TCP, secure with TLS, send HTTPS, and reach a backend.",
		developer:
			"When debugging, isolate the failing layer instead of treating the request as one opaque operation. Advanced protocols such as WebSocket, GraphQL, and gRPC still depend on the same lower-layer path.",
		terminal: [
			"dig example.com",
			"ip route get $(dig +short example.com | head -1)",
			"curl -v https://example.com",
		],
		tips: [
			"Test in order: DNS, route, port, TLS, HTTP, application.",
			"Changing one layer can make another layer look broken.",
		],
	},
	websocket: {
		beginner:
			"WebSocket upgrades an HTTP connection into a persistent, full-duplex channel. After the handshake, both the client and server can send messages at any time without re-establishing a connection.",
		developer:
			"WebSocket starts as an HTTP request with Upgrade: websocket, then switches protocols. It is ideal for chat, live feeds, multiplayer, and dashboards where polling would waste bandwidth and add latency.",
		terminal: [
			"curl -v -H 'Upgrade: websocket' -H 'Connection: Upgrade' -H 'Sec-WebSocket-Version: 13' -H 'Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==' http://localhost:8080/ws",
			"websocat ws://localhost:8080/ws",
			"tcpdump -n -i lo 'tcp port 8080'",
		],
		tips: [
			"WebSocket uses one TCP connection for both directions after the handshake.",
			"Proxies and load balancers must support WebSocket upgrade or the connection will fail.",
			"Add ping/pong frames or application-level heartbeats to detect dead connections.",
		],
	},
	graphql: {
		beginner:
			"GraphQL is a query language for APIs. The client sends a query describing exactly which fields it needs, and the server returns a JSON response matching that shape. Most APIs expose one GraphQL endpoint for queries and mutations.",
		developer:
			"GraphQL commonly replaces multiple REST endpoints with one /graphql endpoint, usually called with POST. Some servers also allow GET for read-only queries. The schema defines types, queries, mutations, and subscriptions.",
		terminal: [
			'curl -X POST http://localhost:4000/graphql -H "Content-Type: application/json" -d \'{"query":"{ user(id: 1) { name email } }"}\'',
			"curl http://localhost:4000/graphql -H 'Content-Type: application/json' -d '{\"query\": \"{ __schema { types { name } } }\"}'",
			"curl -I http://localhost:4000/graphql",
		],
		tips: [
			"GraphQL commonly uses one endpoint; the query body selects the data, not a resource-shaped URL.",
			"Over-fetching is solved by the client requesting only needed fields.",
			"N+1 resolver calls are a common performance pitfall; use DataLoader or batching.",
			"Introspection is useful in development but often disabled in production.",
		],
	},
	grpc: {
		beginner:
			"gRPC lets programs call functions on remote servers as if they were local. It uses a contract file (.proto) to define the service, sends data as compact binary Protobuf messages, and runs over HTTP/2 for speed and streaming.",
		developer:
			"gRPC is common in microservices because Protobuf is smaller than JSON, HTTP/2 supports multiplexing and streaming, and generated client/server code keeps contracts in sync. It supports unary, server-streaming, client-streaming, and bidirectional RPCs.",
		terminal: [
			"grpcurl -plaintext localhost:50051 list",
			'grpcurl -plaintext -d \'{"name": "world"}\' localhost:50051 hello.Greeter/SayHello',
			"protoc --go_out=. --go-grpc_out=. greeter.proto",
		],
		tips: [
			"gRPC uses HTTP/2, so it is not directly browsable like REST without tools like grpcurl.",
			"Protobuf is binary; you cannot read it with curl or a text editor.",
			"Use gRPC-Web or a REST gateway when browser clients need to call gRPC services.",
			"Status codes and errors are in HTTP/2 trailers, not the response body.",
		],
	},
	mtls: {
		beginner:
			"Mutual TLS (mTLS) is like TLS but both sides prove their identity. The server sends its certificate as usual, and the client also sends its own certificate. Both are verified against a trusted certificate authority before any data flows.",
		developer:
			"mTLS is standard for service-to-service authentication in zero-trust architectures, Kubernetes service meshes like Istio and Linkerd, and internal APIs. The client certificate is verified by the server, and the server certificate is verified by the client, eliminating anonymous endpoints.",
		terminal: [
			"openssl s_client -connect service.local:443 -cert client.pem -key client-key.pem -CAfile ca.pem",
			"openssl x509 -in client.pem -text -noout",
			"curl --cert client.pem --key client-key.pem --cacert ca.pem https://service.local",
		],
		tips: [
			"mTLS requires a CA that both sides trust; self-signed certs need explicit trust configuration.",
			"Rotate client and server certificates before expiry to avoid outages.",
			"mTLS authenticates the connection, not the user; pair it with application-level auth if needed.",
			"Service meshes can handle mTLS transparently so application code does not need certificates.",
		],
	},
};
