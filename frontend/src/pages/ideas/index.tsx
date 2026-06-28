import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CreateIdeaDialog } from "@/pages/ideas/components/create-idea-dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@apollo/client/react"
import { LIST_IDEAS } from "@/lib/graphql/queries/idea";
import type { Idea } from "@/types";
import { IdeaCard } from "@/pages/ideas/components/idea-card";
import { IdeaDrawer } from "@/pages/ideas/components/idea-drawer";

export function IdeasPage() {
    const [open, setOpen] = useState(false)
    const [openDrawer, setOpenDrawer] = useState(false)
    const { data } = useQuery<{ listIdea: Idea[] }>(LIST_IDEAS)
    const [selectedIdeaId, setSelectedIdeaId] = useState("")

    const ideas = data?.listIdea ?? [] 

    const handleIdeaClick = (ideaId: string) => {
        setSelectedIdeaId(ideaId)
        setOpenDrawer(true)
    }

    return (
        <Page>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                        <Label className="text-3xl font-medium text-purple-600">
                            Ideias
                        </Label>
                        <Button 
                          className="bg-indigo-700 hover:opacity-80 text-white px-6 py-3"
                          onClick={() => setOpen(true)}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Nova ideia
                        </Button>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-6">
                {ideas.map((idea) => (
                    <IdeaCard
                      key={idea.id}
                      idea={idea}
                      onClick={() => handleIdeaClick(idea.id)}
                    />
                ))}
            </div>
            <IdeaDrawer open={openDrawer} onOpenChange={setOpenDrawer} ideaId={selectedIdeaId} />
            <CreateIdeaDialog open={open} onOpenChange={setOpen} />
        </Page>
    )
}