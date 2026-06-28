import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

export function MembersPage() {
    const [searchQuery, setSearchQuery] = useState("")

    function handleAddUser() {

    }

    return (
        <Page>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-medium text-purple-600">Usuários</h1>
                        <p className="text-muted-foreground">
                            Gerencie os membros e suas permissões
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-4 justify-end">
                            <Label htmlFor="search" className="text-sm whitespace-nowrap">
                                Busque membros
                            </Label>
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  id="search"
                                  placeholder="Nome ou e-mail"
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                  className="pl-9 max-w-[200px]"
                                />
                            </div>
                        </div>
                        <Button 
                          onClick={handleAddUser}
                          className="bg-indigo-700 text-white hover:opacity-80"
                        >
                            <Plus className="mr-1 h-4 w-4" />
                            Novo usuário
                        </Button>
                    </div>
                </div>
            </div>
        </Page>
    )
}