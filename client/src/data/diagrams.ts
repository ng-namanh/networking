import { bgpDiagram } from "@/components/diagram/bgp";
import { cdnDiagram } from "@/components/diagram/cdn";
import { defaultGatewayDiagram } from "@/components/diagram/default_gateway";
import { dhcpDiagram } from "@/components/diagram/dhcp";
import { dnsDiagram } from "@/components/diagram/dns";
import { ethernetDiagram } from "@/components/diagram/ethernet";
import { firewallDiagram } from "@/components/diagram/firewall";
import { graphqlDiagram } from "@/components/diagram/graphql";
import { grpcDiagram } from "@/components/diagram/grpc";
import { httpDiagram } from "@/components/diagram/http";
import { httpsDiagram } from "@/components/diagram/https";
import { icmpDiagram } from "@/components/diagram/icmp";
import { ipAddressDiagram } from "@/components/diagram/ip_address";
import { loadBalancerDiagram } from "@/components/diagram/load_balancer";
import { macAddressDiagram } from "@/components/diagram/mac_address";
import { mtlsDiagram } from "@/components/diagram/mtls";
import { natDiagram } from "@/components/diagram/nat";
import { ospfDiagram } from "@/components/diagram/ospf";
import { pingDiagram } from "@/components/diagram/ping";
import { portsDiagram } from "@/components/diagram/ports";
import { proxyDiagram } from "@/components/diagram/proxy";
import { reverseProxyDiagram } from "@/components/diagram/reverse_proxy";
import { reviewPathDiagram } from "@/components/diagram/review_path";
import { routerDiagram } from "@/components/diagram/router";
import { routesDiagram } from "@/components/diagram/routes";
import { sslDiagram } from "@/components/diagram/ssl";
import { staticIpDiagram } from "@/components/diagram/static_ip";
import { staticRoutingDiagram } from "@/components/diagram/static_routing";
import { subnetDiagram } from "@/components/diagram/subnet";
import { switchDiagram } from "@/components/diagram/switch";
import { tcpDiagram } from "@/components/diagram/tcp";
import { tlsDiagram } from "@/components/diagram/tls";
import type {
	DiagramDefinition,
	DiagramStep,
} from "@/components/diagram/types";
import { udpDiagram } from "@/components/diagram/udp";
import { vpnDiagram } from "@/components/diagram/vpn";
import { websocketDiagram } from "@/components/diagram/websocket";
import { wiFiDiagram } from "@/components/diagram/wi_fi";

export type { DiagramDefinition, DiagramStep };

export const diagrams: Record<string, DiagramDefinition> = {
	ethernet: ethernetDiagram,
	"wi-fi": wiFiDiagram,
	"mac-address": macAddressDiagram,
	switch: switchDiagram,
	"ip-address": ipAddressDiagram,
	"static-ip": staticIpDiagram,
	dhcp: dhcpDiagram,
	subnet: subnetDiagram,
	router: routerDiagram,
	"default-gateway": defaultGatewayDiagram,
	routes: routesDiagram,
	"static-routing": staticRoutingDiagram,
	ospf: ospfDiagram,
	bgp: bgpDiagram,
	ping: pingDiagram,
	icmp: icmpDiagram,
	tcp: tcpDiagram,
	udp: udpDiagram,
	ports: portsDiagram,
	firewall: firewallDiagram,
	tls: tlsDiagram,
	ssl: sslDiagram,
	vpn: vpnDiagram,
	dns: dnsDiagram,
	http: httpDiagram,
	https: httpsDiagram,
	"load-balancer": loadBalancerDiagram,
	nat: natDiagram,
	proxy: proxyDiagram,
	"reverse-proxy": reverseProxyDiagram,
	cdn: cdnDiagram,
	"review-path": reviewPathDiagram,
	websocket: websocketDiagram,
	graphql: graphqlDiagram,
	grpc: grpcDiagram,
	mtls: mtlsDiagram,
};

export function getDiagramForConcept(slug: string): DiagramDefinition {
	return (
		diagrams[slug] || {
			nodes: [
				{
					id: "placeholder",
					type: "custom",
					position: { x: 250, y: 150 },
					data: { label: "Coming Soon", type: "cloud" },
				},
			],
			edges: [],
			steps: [],
		}
	);
}
