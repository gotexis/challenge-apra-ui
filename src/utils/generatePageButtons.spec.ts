import generatePageButtons from "./generatePageButtons";

test('generates correct page buttons', () => {
    const total = 500;
    const current = 25;
    const pageSize = 10;

    const buttons = generatePageButtons(total, current, pageSize);

    expect(buttons).toHaveLength(13);
    expect(buttons[0]).toEqual({ label: 'First', page: 0 });
    expect(buttons[12]).toEqual({ label: 'Last', page: 49 });

    for (let i = 1; i < 11; i++) {
        const button = buttons[i];
        expect(button.label).toBe(String(current - 5 + i));
        expect(button.page).toBe(current - 5 + i - 1);
        expect(button.isCurrent).toBe(i === 6);
    }
});
