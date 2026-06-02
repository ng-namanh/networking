"use client";

import {
	Background,
	ControlButton,
	Controls,
	type Edge,
	type Node,
	type NodeChange,
	Panel,
	ReactFlow,
	useNodesState,
} from "@xyflow/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DiagramStep } from "@/data/diagrams";
import "@xyflow/react/dist/style.css";
import { ChevronLeft, ChevronRight, RefreshCw, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CustomEdge } from "./CustomEdge";
import { CustomNode, type CustomNodeData } from "./CustomNode";

const nodeTypes = {
	custom: CustomNode,
};

const edgeTypes = {
	custom: CustomEdge,
};

interface DiagramRendererProps {
	initialNodes: Node<CustomNodeData>[];
	initialEdges: Edge[];
	steps?: DiagramStep[];
	currentStep: number;
	onStepChange: (step: number) => void;
	slug?: string;
}

export function DiagramRenderer({
	initialNodes,
	initialEdges,
	steps = [],
	currentStep,
	onStepChange,
	slug,
}: DiagramRendererProps) {
	const safeCurrentStep =
		steps.length === 0 || !Number.isFinite(currentStep)
			? 0
			: Math.min(Math.max(0, Math.floor(currentStep)), steps.length - 1);
	const step = steps[safeCurrentStep];

	const [, setNodePositions] = useState<
		Record<string, { x: number; y: number }>
	>({});
	const [nodes, setNodes, onNodesStateChange] = useNodesState<
		Node<CustomNodeData>
	>([]);

	useEffect(() => {
		let loadedPositions: Record<string, { x: number; y: number }> = {};
		if (typeof window !== "undefined" && slug) {
			const saved = localStorage.getItem(`diagram-positions-${slug}`);
			if (saved) {
				try {
					loadedPositions = JSON.parse(saved);
				} catch (e) {
					console.error(e);
				}
			}
		}
		setNodePositions(loadedPositions);

		setNodes(
			initialNodes.map((node) => ({
				...node,
				position: loadedPositions[node.id] || node.position,
				data: {
					...node.data,
					active: false,
				},
			})),
		);
	}, [slug, initialNodes, setNodes]);

	useEffect(() => {
		if (steps.length > 0 && currentStep !== safeCurrentStep) {
			onStepChange(safeCurrentStep);
		}
	}, [currentStep, onStepChange, safeCurrentStep, steps.length]);

	useEffect(() => {
		setNodes((prevNodes) =>
			prevNodes.map((node) => ({
				...node,
				data: {
					...node.data,
					active: step?.activeNodes?.includes(node.id) || false,
				},
			})),
		);
	}, [step, setNodes]);

	const onNodesChange = useCallback(
		(changes: NodeChange<Node<CustomNodeData>>[]) => {
			onNodesStateChange(changes);

			setNodePositions((prev) => {
				const next = { ...prev };
				let changed = false;
				for (const change of changes) {
					if (change.type === "position" && change.position) {
						next[change.id] = change.position;
						changed = true;
					}
				}
				if (changed) {
					if (slug) {
						localStorage.setItem(
							`diagram-positions-${slug}`,
							JSON.stringify(next),
						);
					}
					return next;
				}
				return prev;
			});
		},
		[onNodesStateChange, slug],
	);

	const handleResetPositions = useCallback(() => {
		setNodePositions({});
		if (slug) {
			localStorage.removeItem(`diagram-positions-${slug}`);
		}
		setNodes((prevNodes) =>
			prevNodes.map((node) => {
				const initialNode = initialNodes.find((n) => n.id === node.id);
				return {
					...node,
					position: initialNode ? initialNode.position : node.position,
				};
			}),
		);
	}, [slug, initialNodes, setNodes]);

	const edges = useMemo(
		() =>
			initialEdges.map((edge) => ({
				...edge,
				animated: step?.activeEdges?.includes(edge.id) || false,
				style: {
					...edge.style,
					stroke: step?.activeEdges?.includes(edge.id)
						? "var(--primary)"
						: "var(--border)",
					strokeWidth: step?.activeEdges?.includes(edge.id) ? 3 : 2,
				},
			})),
		[initialEdges, step],
	);

	return (
		<div className="h-full w-full bg-card">
			<ReactFlow
				nodes={nodes}
				edges={edges}
				nodeTypes={nodeTypes}
				edgeTypes={edgeTypes}
				onNodesChange={onNodesChange}
				fitView
				colorMode="light"
			>
				<Background color="var(--border)" gap={20} />
				<Controls className="border bg-card shadow-level-2">
					<ControlButton
						onClick={handleResetPositions}
						title="Reset node positions"
						className="cursor-pointer"
					>
						<RefreshCw className="h-4 w-4 text-foreground cursor-pointer" />
					</ControlButton>
				</Controls>

				{steps.length > 0 && (
					<Panel
						position="bottom-center"
						className="mb-8 flex min-w-[360px] flex-col gap-3 rounded-lg border bg-card p-5 shadow-level-5"
					>
						<div className="flex items-center justify-between">
							<Badge variant="secondary" className="font-mono">
								Step {safeCurrentStep + 1} of {steps.length}
							</Badge>
							<span className="text-body-sm font-medium text-foreground">
								{step.label}
							</span>
						</div>

						<p className="min-h-[40px] text-body-sm text-muted-foreground">
							{step.description}
						</p>

						<div className="flex items-center justify-center gap-6 pt-2">
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={() => onStepChange(Math.max(0, safeCurrentStep - 1))}
								disabled={safeCurrentStep === 0}
								className="cursor-pointer hover:bg-muted"
								title="Previous Step"
							>
								<ChevronLeft className="h-5 w-5" />
							</Button>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={() => onStepChange(0)}
								disabled={safeCurrentStep === 0}
								className="cursor-pointer hover:bg-muted"
								title="Restart Steps"
							>
								<RotateCcw className="h-4 w-4" />
							</Button>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={() =>
									onStepChange(Math.min(steps.length - 1, safeCurrentStep + 1))
								}
								disabled={safeCurrentStep === steps.length - 1}
								className="cursor-pointer hover:bg-muted"
								title="Next Step"
							>
								<ChevronRight className="h-5 w-5" />
							</Button>
						</div>
					</Panel>
				)}
			</ReactFlow>
		</div>
	);
}
