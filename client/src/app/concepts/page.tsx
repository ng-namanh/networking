"use client";

import { CheckCircle2, Circle, Clock, Play } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress, ProgressLabel } from "@/components/ui/progress";
import { concepts } from "@/data/concepts";
import {
	hydrateProgressStore,
	useProgressStore,
} from "@/store/useProgressStore";

export default function ConceptsPage() {
	const conceptProgress = useProgressStore((s) => s.conceptProgress);
	const lastVisitedConceptId = useProgressStore((s) => s.lastVisitedConceptId);

	useEffect(() => {
		hydrateProgressStore();
	}, []);

	const readCount = concepts.filter(
		(concept) => conceptProgress[concept.id]?.isRead,
	).length;
	const totalConcepts = concepts.length;
	const progressPercentage = Math.round((readCount / totalConcepts) * 100);

	const lastVisitedConcept = lastVisitedConceptId
		? concepts.find((c) => c.id === lastVisitedConceptId)
		: null;

	return (
		<div className="mx-auto flex max-w-[1400px] flex-col gap-12 px-6 py-12 lg:px-16 lg:py-16">
			<div className="relative overflow-hidden rounded-xl border bg-card p-8 shadow-level-3">
				<div className="mesh-gradient pointer-events-none absolute inset-x-0 top-0 h-32 opacity-25 blur-2xl" />
				<div className="relative flex max-w-3xl flex-col gap-4">
					<Badge variant="secondary" className="w-fit font-mono">
						{totalConcepts} concepts
					</Badge>
					<h1 className="text-display-xl text-foreground">
						Networking concepts.
					</h1>
					<p className="text-body-lg text-muted-foreground">
						Master networking fundamentals through interactive visual models. A
						deliberate, step-by-step journey through how data actually moves
						across the wire.
					</p>
				</div>

				<Progress value={progressPercentage} className="relative mt-10">
					<ProgressLabel>Learning progress</ProgressLabel>
					<span className="ml-auto text-body-sm text-muted-foreground tabular-nums">
						{readCount} / {totalConcepts} ({progressPercentage}%)
					</span>
				</Progress>

				{lastVisitedConcept && (
					<div className="relative mt-6 flex items-center gap-4">
						<Button
							variant="default"
							render={<Link href={`/concepts/${lastVisitedConcept.slug}`} />}
							nativeButton={false}
						>
							<Play data-icon="inline-start" />
							Continue: {lastVisitedConcept.title}
						</Button>
						<span className="text-body-sm text-muted-foreground">
							Last visited concept {lastVisitedConcept.order}
						</span>
					</div>
				)}
			</div>

			<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
				{concepts.map((concept) => {
					const progress = conceptProgress[concept.id];
					const isRead = progress?.isRead ?? false;
					const isInProgress = !isRead && progress?.lastVisitedAt != null;

					return (
						<Card
							key={concept.id}
							className="bg-card shadow-level-3 transition-colors hover:border-ring"
						>
							<Link href={`/concepts/${concept.slug}`} className="contents">
								<CardHeader>
									<div className="flex flex-col gap-2">
										<div className="flex items-center gap-2">
											<Badge variant="secondary" className="w-fit font-mono">
												Concept {concept.order}
											</Badge>
											{isRead && (
												<Badge variant="default" className="w-fit font-mono">
													Read
												</Badge>
											)}
											{isInProgress && (
												<Badge
													variant="outline"
													className="w-fit border-ring/30 bg-muted text-muted-foreground font-mono"
												>
													In progress
												</Badge>
											)}
										</div>
										<CardTitle className="text-display-sm">
											{concept.title}
										</CardTitle>
									</div>
									<CardAction>
										{isRead ? (
											<CheckCircle2 className="text-primary" />
										) : isInProgress ? (
											<Clock className="text-muted-foreground" />
										) : (
											<Circle className="text-muted-foreground/35" />
										)}
									</CardAction>
								</CardHeader>
								<CardContent>
									<CardDescription className="line-clamp-2 text-body-sm">
										{concept.summary}
									</CardDescription>
								</CardContent>
							</Link>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
