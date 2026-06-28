import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export function formatRelativeDate(date: string): string {
    const data = new Date(date)

    const result = formatDistanceToNow(data, {
        addSuffix: true,
        locale: ptBR
    })

    return result
}