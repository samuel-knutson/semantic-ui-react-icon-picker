import '@testing-library/jest-dom';

expect.extend({
  toBeSorted(received) {
    const sorted = [...received].sort((a, b) => a.localeCompare(b));

    if (this.isNot) {
      expect(received).not.toEqual(sorted);
    } else {
      expect(received).toEqual(sorted);
    }

    return { pass: !this.isNot };
  }
});
