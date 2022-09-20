const {format_date, format_plural, format_url} = require('../utils/helpers');

test('format_url() returns a simplified url string', () => {
    const url1 = format_url('https://test.com/page/1');
    const url2 = format_url('https://www.random.com/abcd/');
    const url3 = format_url('https://google.com?q=hi');

    expect(url1).toBe('test.com');
    expect(url2).toBe('random.com');
    expect(url3).toBe('google.com');
});

test('format_plural() returns a pluralized word', () => {
    const word1 = format_plural('tiger', 1);
    const word2 = format_plural('lion', 2);

    expect(word1).toBe('tiger');
    expect(word2).toBe('lions');
});

test('format_date() returns a date string', () => {
    const date = new Date('2021-02-19 16:12:03');

    expect(format_date(date)).toBe('2/19/2021');
});