import React from "react";

interface PaginacaoProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

// sem itens (totalPages = 0) não mostra nada, evitando "Page 1 of 0"
const Paginacao: React.FC<PaginacaoProps> = ({ page, totalPages, onChange }) => {
  if (totalPages < 1) return null;

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="btn btn-secondary w-full sm:w-auto"
      >
        Previous
      </button>

      <span className="text-lg font-medium">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="btn btn-secondary w-full sm:w-auto"
      >
        Next
      </button>
    </div>
  );
};

export default Paginacao;
