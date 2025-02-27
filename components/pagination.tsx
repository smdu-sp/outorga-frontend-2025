import {
    Pagination as ShadPagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
   
  export function Pagination({ pagina, total, limite }:{ pagina: number, total: number, limite: number }) {
    const paginaFinal = Math.ceil(total / limite);
    function definePaginas(){
        if (paginaFinal === 1) return [1];
        const primeira = pagina === 1 ? pagina : (pagina < paginaFinal ? pagina - 1 : pagina - 2);
        if (paginaFinal === 2) return [primeira, pagina];
        const segunda = pagina === 1 ? pagina + 1 : (pagina < paginaFinal ? pagina : pagina - 1);
        const terceira = pagina === 1 ? pagina + 2 : (pagina < paginaFinal ? pagina + 1 : pagina);
        return [primeira, segunda, terceira];
    }
    const paginas = definePaginas();

    return (
      <ShadPagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          {paginas[0] > 1 && <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>}
          {paginas.map((pg) =>
            <PaginationItem key={pg}>
                <PaginationLink href="#">{pg}</PaginationLink>
            </PaginationItem>
          )}
          {paginaFinal > paginas[paginas.length - 1] && <PaginationItem title={`${paginaFinal} páginas`}>
            <PaginationEllipsis />
          </PaginationItem>}
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </ShadPagination>
    )
  }