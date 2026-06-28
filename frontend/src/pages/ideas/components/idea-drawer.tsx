import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { GET_IDEA } from "@/lib/graphql/queries/idea";
import { CommentList } from "@/pages/ideas/components/comment-list";
import { CommentTextArea } from "@/pages/ideas/components/comment-text-area";
import type { Idea } from "@/types";
import { useLazyQuery } from "@apollo/client/react"
import { X } from "lucide-react";
import { useEffect } from "react";

interface DrawerProps {
    ideaId: string | null
    open: boolean
    onOpenChange: (open: boolean) => void
}


export function IdeaDrawer({ ideaId, onOpenChange, open }: DrawerProps) {
    const [getIdeaQuery, { data, loading }] = useLazyQuery<{ getIdea: Idea }>(GET_IDEA)

    useEffect(() => {
        getIdeaQuery({
            variables: {
                ideaId,
            },
        })
    }, [getIdeaQuery, ideaId])

    const { getIdea: idea } = data || {}

    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction="right">
            <DrawerContent className="flex flex-col rounded-l-2xl bg-white">
                <DrawerTitle>
                    <div className="flex-shrink-0 p-6 bg-slate-100 rounded-l-2xl">
                        <div className="flex items-start justify-between">
                            <h2 className="text-2xl font-bold pr-4 flex-1">
                                {idea?.title ?? "Carregando..."}
                            </h2>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onOpenChange(false)}
                              className="flex-shrink-0"
                            >
                              <X className="h-5 w-5" />
                            </Button>
                        </div>
                        {idea && (
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {idea.description ?? ""}
                            </p>
                        )}
                    </div>
                </DrawerTitle>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    <CommentList comments={idea?.comments ?? []} loading={loading} />
                </div>

                <CommentTextArea 
                  commentContent={""}
                  setCommentContent={console.log}
                  handleAddComment={console.log}
                  handleVote={console.log}
                  idea={idea ?? {} as Idea}
                />

            </DrawerContent>
        </Drawer>
    )
}