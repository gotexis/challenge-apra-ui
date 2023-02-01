export default function generatePageButtons(total: number, current: number, pageSize: number, maxButtonsGenerated: number = 10) {
    const result = [];

    const half = Math.ceil(maxButtonsGenerated / 2);

    const totalPages = Math.ceil(total / pageSize);
    const firstPage = Math.max(0, current - half);
    const lastPage = Math.min(totalPages - 1, current + half);

    result.push({ label: 'First', page: 0 });

    for (let i = firstPage; i <= lastPage; i++) {
        
        result.push({
            label: String(i + 1),
            page: i,
            isCurrent: i === current,
        });
    }

    result.push({ label: 'Last', page: totalPages - 1 });

    return result;
}