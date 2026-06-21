"use client";

const Pagination = ({ currentPage, totalPages, setCurrentPage, theme }) => {
  const paginationStyle = {
    border: `1px solid ${theme.border}`,
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backgroundColor: theme.card,
    color: theme.subText,
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem" , marginBottom: "auto"}}>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        style={{ ...paginationStyle, opacity: currentPage === 1 ? 0.5 : 1 }}
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          style={{
            ...paginationStyle,
            backgroundColor: currentPage === i + 1 ? theme.buttonPrimaryBg : theme.card,
            color: currentPage === i + 1 ? theme.buttonPrimaryText : theme.subText,
          }}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        style={{ ...paginationStyle, opacity: currentPage === totalPages ? 0.5 : 1 }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
