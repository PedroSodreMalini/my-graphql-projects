import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useMutation } from "@apollo/client/react"
import { CREATE_IDEA } from "@/lib/graphql/mutations/idea"
import { toast } from "sonner"

interface CreateIdeaDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CreateIdeaDialog({
    onOpenChange,
    open,
}: CreateIdeaDialogProps) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [createIdea, { loading }] = useMutation(CREATE_IDEA, {
        onCompleted() {
            toast.success("Ideia criada com sucesso!")
            onOpenChange(false)
        },
        onError() {
            toast.error("Falha ao criar ideia.")
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        createIdea({
            variables: {
                data: {
                    title: title,
                    description: description
                }
            }
        })
    }

    const handleCancel = () => {
        setTitle("")
        setDescription("")
        onOpenChange(false)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogOverlay className="bg-indigo-700 opacity-5" />
            <DialogContent className="bg-gray-50 border-transparent px-6 pt-8 pb-4 gap-4">
                <DialogHeader className="space-y-2">
                    <DialogTitle className="text-2xl font-bold leading-tight">
                        Compartilhe sua ideia
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        Adicione uma nova ideia para seu time
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 w-full"
                >
                    <div className="space-y-1">
                        <Label
                            htmlFor="title"
                            className="text-sm font-normal"
                        >
                            Título
                        </Label>
                        <Input
                            id="title"
                            placeholder="Dê um nome à sua ideia"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full"
                            disabled={loading}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label
                            htmlFor="description"
                            className="text-sm font-normal"
                        >
                            Descrição
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Descreva sua ideia"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full"
                            disabled={loading}
                        />
                    </div>
                    <div className="flex justify-end gap-1">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="bg-indigo-700 text-white"
                            disabled={loading}
                        >
                            Salvar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}