"use client";

import {
	ArrowLeft,
	ArrowRight,
	Bookmark,
	BookOpen,
	CheckCircle2,
	Code,
	Eye,
	Info,
	Layers,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { DiagramRenderer } from "@/components/diagram/DiagramRenderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { conceptContent } from "@/data/conceptContent";
import { concepts } from "@/data/concepts";
import { getDiagramForConcept } from "@/data/diagrams";
import { cn } from "@/lib/utils";
import {
	hydrateProgressStore,
	useProgressStore,
} from "@/store/useProgressStore";

export default function ConceptPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = use(params);
	const [viewMode, setViewMode] = useState<"beginner" | "developer">(
		"beginner",
	);

	const conceptProgress = useProgressStore((s) => s.conceptProgress);
	const bookmarkedConcepts = useProgressStore((s) => s.bookmarkedConcepts);
	const toggleRead = useProgressStore((s) => s.toggleRead);
	const toggleBookmark = useProgressStore((s) => s.toggleBookmark);
	const setLastVisited = useProgressStore((s) => s.setLastVisited);
	const setConceptStep = useProgressStore((s) => s.setConceptStep);
	const hasHydrated = useProgressStore((s) => s.hasHydrated);

	const concept = concepts.find((c) => c.slug === slug);
	const diagram = getDiagramForConcept(slug);

	const [currentStep, setCurrentStep] = useState(0);
	const initializedConceptRef = useRef<string | null>(null);

	useEffect(() => {
		hydrateProgressStore();
	}, []);

	useEffect(() => {
		if (!concept || !hasHydrated) return;
		if (initializedConceptRef.current === concept.id) return;

		const savedStep = conceptProgress[concept.id]?.lastStep ?? 0;
		const maxStep = Math.max(diagram.steps.length - 1, 0);
		const safeStep = Number.isFinite(savedStep)
			? Math.min(Math.max(0, Math.floor(savedStep)), maxStep)
			: 0;

		setCurrentStep(safeStep);
		setLastVisited(concept.id);
		initializedConceptRef.current = concept.id;
	}, [
		concept,
		conceptProgress,
		diagram.steps.length,
		hasHydrated,
		setLastVisited,
	]);

	const handleStepChange = useCallback(
		(step: number) => {
			setCurrentStep(step);
			if (concept) {
				setConceptStep(concept.id, step);
			}
		},
		[concept, setConceptStep],
	);

	if (!concept) return notFound();

	const content = conceptContent[slug];
	const progress = conceptProgress[concept.id];
	const isRead = progress?.isRead ?? false;
	const isBookmarked = bookmarkedConcepts.includes(concept.id);
	const isInProgress = !isRead && progress?.lastVisitedAt != null;

	const currentIndex = concepts.findIndex((c) => c.id === concept.id);
	const prevConcept = currentIndex > 0 ? concepts[currentIndex - 1] : null;
	const nextConcept =
		currentIndex < concepts.length - 1 ? concepts[currentIndex + 1] : null;

	const layer =
		concept.layer ??
		(concept.order <= 4
			? "Link Layer (L2)"
			: concept.order <= 14
				? "Network Layer (L3)"
				: "Transport/App Layer");

	return (
		<div className="flex h-full flex-col bg-background">
			<header className="flex-none border-b bg-card px-8 py-6 lg:px-12">
				<div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
					<div className="flex max-w-3xl flex-col gap-3">
						<div className="flex flex-wrap items-center gap-3">
							<Badge variant="secondary" className="font-mono">
								Concept {concept.order}
							</Badge>
							<Badge variant="outline" className="font-mono">
								{layer}
							</Badge>
							<Badge
								variant="outline"
								className="bg-primary/5 text-primary border-primary/20 font-mono"
							>
								{concept.osiLayer}
							</Badge>
							{isRead && (
								<Badge variant="default" className="font-mono">
									Read
								</Badge>
							)}
							{isInProgress && (
								<Badge
									variant="outline"
									className="border-ring/30 bg-muted text-muted-foreground font-mono"
								>
									In progress
								</Badge>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<h1 className="text-display-lg text-foreground">
								{concept.title}.
							</h1>
							<p className="text-body-md text-muted-foreground">
								{concept.summary}
							</p>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<Button
							type="button"
							variant={isBookmarked ? "default" : "outline"}
							size="icon-lg"
							onClick={() => toggleBookmark(concept.id)}
							title="Bookmark"
						>
							<Bookmark
								data-icon="inline-start"
								className={cn(isBookmarked && "fill-current")}
							/>
						</Button>
						<Button
							type="button"
							variant={isRead ? "default" : "outline"}
							size="lg"
							onClick={() => toggleRead(concept.id)}
						>
							{isRead ? (
								<>
									<CheckCircle2 data-icon="inline-start" />
									Mark unread
								</>
							) : (
								<>
									<Eye data-icon="inline-start" />
									Mark as read
								</>
							)}
						</Button>
					</div>
				</div>

				<Tabs
					value={viewMode}
					onValueChange={(value) =>
						setViewMode(value as "beginner" | "developer")
					}
					className="mt-8"
				>
					<TabsList>
						<TabsTrigger value="beginner">
							<BookOpen data-icon="inline-start" />
							Beginner
						</TabsTrigger>
						<TabsTrigger value="developer">
							<Code data-icon="inline-start" />
							Developer
						</TabsTrigger>
					</TabsList>
				</Tabs>
			</header>

			<div className="flex min-h-0 flex-1 flex-col gap-8 overflow-hidden p-8 lg:p-12 xl:flex-row">
				<Card className="min-h-[500px] flex-1 overflow-hidden bg-card p-0 shadow-level-3 xl:w-2/3">
					<DiagramRenderer
						initialNodes={diagram.nodes}
						initialEdges={diagram.edges}
						steps={diagram.steps}
						currentStep={currentStep}
						onStepChange={handleStepChange}
						slug={slug}
					/>
				</Card>

				<ScrollArea className="min-h-0 w-full xl:h-full xl:w-1/3">
					<div className="flex flex-col gap-6 pr-4 pb-12">
						<Card className="shadow-level-2">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-display-sm">
									<Info className="text-muted-foreground" />
									How it works.
								</CardTitle>
							</CardHeader>
							<CardContent className="flex flex-col gap-4 text-body-md text-muted-foreground">
								{viewMode === "beginner" ? (
									<>
										<p>{content?.beginner}</p>
										<p>
											Use the diagram steps to follow the exact handoff: which
											device starts, which connection carries the message, and
											what decision happens before the next hop.
										</p>
									</>
								) : (
									<>
										<div className="rounded-md border bg-muted p-4 text-code text-foreground">
											{`// Technical Definition: ${concept.title}`}
											<br />
											Layer: {layer}
										</div>
										<p>{content?.developer}</p>
										<ul className="flex list-none flex-col gap-2 pl-0">
											{content?.tips.map((tip) => (
												<li key={tip} className="flex items-start gap-2">
													<span className="select-none text-muted-foreground">
														•
													</span>
													{tip}
												</li>
											))}
										</ul>
									</>
								)}
							</CardContent>
						</Card>

						<Card className="shadow-level-2 bg-card/60">
							<CardHeader className="pb-2">
								<CardTitle className="text-display-sm">
									Core Concept & Scope
								</CardTitle>
							</CardHeader>
							<CardContent className="flex flex-col gap-4 text-body-md">
								<div>
									<h4 className="font-semibold text-foreground text-body-sm mb-1">
										Why do we need it?
									</h4>
									<p className="text-muted-foreground">{concept.whyNeed}</p>
								</div>
								<div>
									<h4 className="font-semibold text-body-sm mb-1 text-destructive/90 dark:text-destructive/80">
										Limitation / Scope
									</h4>
									<p className="text-muted-foreground">{concept.limitation}</p>
								</div>
							</CardContent>
						</Card>

						<Card className="border-l-4 border-l-primary bg-card shadow-level-2">
							<CardHeader className="pb-3">
								<CardTitle className="flex items-center gap-2 text-display-sm">
									<Layers className="text-muted-foreground h-5 w-5" />
									OSI Model Alignment
								</CardTitle>
								<CardDescription className="text-body-sm font-semibold text-foreground mt-1">
									{concept.osiLayer}
								</CardDescription>
							</CardHeader>
							<CardContent className="text-body-md text-muted-foreground">
								{concept.osiExplanation}
							</CardContent>
						</Card>

						<Card className="bg-muted shadow-hairline">
							<CardHeader>
								<CardTitle className="text-display-sm">
									Tips and tricks.
								</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="flex list-none flex-col gap-2 pl-0 text-body-sm text-muted-foreground">
									{content?.tips.map((tip) => (
										<li key={tip} className="flex gap-2">
											<span className="text-muted-foreground">•</span>
											<span>{tip}</span>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>

						<Card className="bg-primary text-primary-foreground shadow-level-4">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-display-sm">
									<Code />
									Developer toolbox.
								</CardTitle>
								<CardDescription className="text-primary-foreground/70">
									Terminal probes for this layer.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex flex-col gap-3 overflow-x-auto rounded-md border border-primary-foreground/10 bg-primary p-4 text-code">
									<div className="flex justify-between gap-4 border-b border-primary-foreground/10 pb-2 text-primary-foreground/50">
										<span>Terminal output</span>
										<span>bash</span>
									</div>
									<div className="flex flex-col gap-1">
										<p className="text-primary-foreground/45">
											# Investigating {concept.title}
										</p>
										{content?.terminal.map((command) => (
											<p key={command}>$ {command}</p>
										))}
									</div>
								</div>
							</CardContent>
						</Card>

						<Separator />

						<nav className="flex items-center justify-between gap-4 pb-6">
							{prevConcept ? (
								<Button
									variant="ghost"
									render={<Link href={`/concepts/${prevConcept.slug}`} />}
									nativeButton={false}
								>
									<ArrowLeft data-icon="inline-start" />
									{prevConcept.title}
								</Button>
							) : (
								<div />
							)}
							{nextConcept ? (
								<Button
									variant="ghost"
									render={<Link href={`/concepts/${nextConcept.slug}`} />}
									nativeButton={false}
								>
									{nextConcept.title}
									<ArrowRight data-icon="inline-end" />
								</Button>
							) : (
								<div />
							)}
						</nav>
					</div>
				</ScrollArea>
			</div>
		</div>
	);
}
