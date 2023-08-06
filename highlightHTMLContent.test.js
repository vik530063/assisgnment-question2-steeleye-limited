const highlightHTMLContent = require('./solution');  

const fs = require('fs'); 

// Define a helper function to normalize whitespace and line breaks
const normalizeOutput = (output) => {
    return output.replace(/\s+/g, ' ').trim(); // Replace multiple spaces and line breaks with a single space
  };
  
  describe('highlightHTMLContent', () => {
    let htmlContent = '';
  
    beforeAll(() => {
      htmlContent = fs.readFileSync('./test.html', 'utf-8');
    });
  
    test('should highlight plain text positions correctly', () => {
      const plainText = `Hi David Headline: Energix Closes $520 Million Financing ...`;
      const plainTextPositions = [
        {
          start: 0,
          end: 8,
        },
        {
          start: 10,
          end: 16,
        },
      ];
  
      const expectedOutput = `
        <p><span><mark>Hi David</mark><br><br>Headline: Energix Closes $520 Million Financing ... </span></p>
      `.trim();
  
      const highlightedContent = highlightHTMLContent(htmlContent, plainText, plainTextPositions);
      const normalizedHighlightedContent = normalizeOutput(highlightedContent);
      const normalizedExpectedOutput = normalizeOutput(expectedOutput);
  
      expect(normalizedHighlightedContent).toEqual(normalizedExpectedOutput);
    });
  
    test('should handle overlapping plain text positions', () => {
      const plainText = `Energix Closes $520 Million Financing`;
      const plainTextPositions = [
        {
          start: 10,
          end: 16,
        },
        {
          start: 18,
          end: 27,
        },
      ];
  
      const expectedOutput = `
        <p><span>Hi David<br><br>Headline: <mark>Energix Closes $520 Million Financing</mark> and Tax Equity Deal ... </span></p>
      `.trim();
  
      const highlightedContent = highlightHTMLContent(htmlContent, plainText, plainTextPositions);
      const normalizedHighlightedContent = normalizeOutput(highlightedContent);
      const normalizedExpectedOutput = normalizeOutput(expectedOutput);
  
      expect(normalizedHighlightedContent).toEqual(normalizedExpectedOutput);
    });
  });
  