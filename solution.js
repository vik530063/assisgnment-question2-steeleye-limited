function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {


  for (const position of plainTextPositions) {
    const startPos = position.start;
    const endPos = position.end;

    const highlightedText = plainText.substring(startPos, endPos);
    const highlightedHtml = `<mark>${highlightedText}</mark>`;
    
    const htmlStart = htmlContent.indexOf(highlightedText);
    const htmlEnd = htmlStart + highlightedText.length;

    htmlContent = htmlContent.substring(0, htmlStart) +
                  highlightedHtml +
                  htmlContent.substring(htmlEnd);
  } 


  return htmlContent;
}
