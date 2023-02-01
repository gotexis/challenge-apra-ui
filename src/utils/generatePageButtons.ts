export default function generatePageButtons(total: number, current: number, pageSize: number) {
    const result = [];

    const totalPages = Math.ceil(total / pageSize);
    const firstPage = Math.max(0, current - 5);
    const lastPage = Math.min(totalPages - 1, current + 4);

    result.push({ label: 'first page', page: 0 });

    for (let i = firstPage; i <= lastPage; i++) {
        
        result.push({
            label: String(i + 1),
            page: i,
            isCurrent: i === current,
        });
    }

    result.push({ label: 'last page', page: totalPages - 1 });

    return result;
}