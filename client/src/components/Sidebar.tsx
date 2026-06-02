"use client";

import {
	Bookmark,
	Building2,
	CheckCircle2,
	Circle,
	Clock,
	GitBranch,
	Route,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { concepts } from "@/data/concepts";
import { cn } from "@/lib/utils";
import {
	hydrateProgressStore,
	useProgressStore,
} from "@/store/useProgressStore";

export function Sidebar() {
	const pathname = usePathname();
	const conceptProgress = useProgressStore((s) => s.conceptProgress);
	const bookmarkedConcepts = useProgressStore((s) => s.bookmarkedConcepts);

	useEffect(() => {
		hydrateProgressStore();
	}, []);

	return (
		<aside className="flex h-screen w-72 flex-col border-r bg-sidebar text-sidebar-foreground">
			<div className="flex h-16 items-center gap-3 px-6">
				<div className="flex size-8 items-center justify-center rounded-md border bg-card p-1 shadow-hairline">
					<Image
						src="/logo.svg"
						width={24}
						height={24}
						className="h-full w-full object-contain"
						alt="Logo"
					/>
				</div>
				<div className="min-w-0">
					<h1 className="truncate text-body-sm font-medium">
						Network Visualizer
					</h1>
					<p className="text-caption-mono text-muted-foreground">learn/lab</p>
				</div>
			</div>
			<Separator />
			<nav className="flex flex-1 flex-col gap-1 overflow-hidden p-3">
				<Link
					href="/concepts"
					className={cn(
						"flex items-center gap-2 rounded-md px-3 py-2 text-body-sm transition-colors",
						pathname === "/concepts"
							? "bg-sidebar-accent text-sidebar-accent-foreground"
							: "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
					)}
				>
					<Circle className="shrink-0" />
					Overview
				</Link>
				<Link
					href="/journeys"
					className={cn(
						"flex items-center gap-2 rounded-md px-3 py-2 text-body-sm transition-colors",
						pathname === "/journeys"
							? "bg-sidebar-accent text-sidebar-accent-foreground"
							: "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
					)}
				>
					<Route className="shrink-0" />
					Journey Mode
				</Link>
				<Link
					href="/dependency-map"
					className={cn(
						"flex items-center gap-2 rounded-md px-3 py-2 text-body-sm transition-colors",
						pathname === "/dependency-map"
							? "bg-sidebar-accent text-sidebar-accent-foreground"
							: "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
					)}
				>
					<GitBranch className="shrink-0" />
					Dependency Map
				</Link>
				<Link
					href="/business-network"
					className={cn(
						"flex items-center gap-2 rounded-md px-3 py-2 text-body-sm transition-colors",
						pathname === "/business-network"
							? "bg-sidebar-accent text-sidebar-accent-foreground"
							: "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
					)}
				>
					<Building2 className="shrink-0" />
					Business Network
				</Link>
				<div className="flex items-center justify-between px-3 pb-2 pt-5">
					<p className="text-caption-mono text-muted-foreground">Concepts</p>
					<Badge variant="secondary">{concepts.length}</Badge>
				</div>
				<ScrollArea className="min-h-0 flex-1">
					<div className="flex flex-col gap-0.5 pr-2">
						{concepts.map((concept) => {
							const progress = conceptProgress[concept.id];
							const isRead = progress?.isRead ?? false;
							const isInProgress = !isRead && progress?.lastVisitedAt != null;
							const isBookmarked = bookmarkedConcepts.includes(concept.id);
							const isActive = pathname === `/concepts/${concept.slug}`;

							return (
								<Link
									key={concept.id}
									href={`/concepts/${concept.slug}`}
									className={cn(
										"flex items-center justify-between rounded-md px-3 py-2 text-body-sm transition-colors",
										isActive
											? "bg-sidebar-accent text-sidebar-accent-foreground"
											: "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
									)}
								>
									<div className="flex min-w-0 items-center gap-2.5">
										{isRead ? (
											<CheckCircle2 className="shrink-0 text-primary" />
										) : isInProgress ? (
											<Clock className="shrink-0 text-muted-foreground" />
										) : (
											<Circle className="shrink-0 text-muted-foreground/35" />
										)}
										<span className="truncate">
											{concept.order}. {concept.title}
										</span>
									</div>
									{isBookmarked && (
										<Bookmark className="shrink-0 fill-muted-foreground text-muted-foreground" />
									)}
								</Link>
							);
						})}
					</div>
				</ScrollArea>
			</nav>
		</aside>
	);
}
